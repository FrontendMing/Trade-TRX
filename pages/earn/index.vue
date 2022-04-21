<template>
	<view>
		<header-back :name="$t('earn.financeRecords')"></header-back>
		<view class="dapp">
			<view class="earnbox">
				<view class="inbox">
					<view class="inlist">
						<view class="tit">
							<text>{{$t('earn.financeRecords')}}</text>
							<picker @change="bindPickerChange" :value="tradeType" :range="Object.values(FINANCE_TYPE)">
								<uni-icons v-if="tradeType === ''" type="more-filled" size="30"></uni-icons>
								<view class="tit-text">{{Object.values(FINANCE_TYPE)[tradeType]}}</view>
							</picker>
						</view>
						<view class="box">
							<dl>
								<dt>
									<span>{{$t('earn.date')}}</span>
									<span>{{$t('earn.amount')}}</span>
								</dt>
								<dd v-for="(item, index) in list" :key="index">
									<view>
										{{unixTimeToDate(item.tradeTime)}}
										<p>{{item.description}}</p>
									</view>
									<view>
										{{floatNum(item.amount)}} TRX
										<p class="sc">{{$t('earn.complete')}}</p>
									</view>
								</dd>
							</dl>
							<view class="loading">{{loadingText}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBack from '@/components/HeaderBack.vue'
import { floatNum, unixTimeToDate, } from '@/utils/index.js'

const FINANCE_TYPE = {
	0: '全部',
	1: '注册礼金',
	2: '佣金充币',
	3: '基础充币',
	4: '佣金提币',
	5: '基础提币',
	6: '佣金分红',
	7: '挖矿收益',
	8: '佣金转到基础账户',
	9: '基础转到佣金账户',
	10: '佣金投资产品',
	11: '邀请注册返利',
	12: '下线用户充值',
	13: '下线用户挖矿收益',
	14: '佣金提币拨回',
	15: '基础提币拨回',
}
export default {
	components: {
		HeaderBack,
	},
	data() {
		return {
			FINANCE_TYPE,
			list: [],
			loadingText: this.$t('system.loading'),
			canFresh: false,
			tradeType: '',
		}
	},
	onShow() {
		this.getTradeDetail()
	},
	methods: {
		floatNum,
		unixTimeToDate,
		async getTradeDetail() {
			this.loadingText = this.$t('system.loading')
			uni.showNavigationBarLoading()
			const { data, } = await this.$api.getTradeDetail({
				tradeType: this.tradeType ? this.tradeType - 1 : '',
			})
			this.canFresh = data?.length === 10

			if(data?.length < 10){
				this.loadingText = this.$t('system.load-finish')
			} else {
				this.loadingText = this.$t('system.load-more')
			}
			this.list = data || []
			uni.hideNavigationBarLoading();
		},
		// 加载分页数据
		async getMoreTradeDetail(lastId) {
			this.loadingText = this.$t('system.loading')
			uni.showNavigationBarLoading()
			const { data, } = await this.$api.getTradeDetail({
				lastId,
				tradeType: this.tradeType ? this.tradeType - 1 : '',
			})
			this.canFresh = data?.length === 10

			if(data?.length < 10){
				this.loadingText = this.$t('system.load-finish')
			} else {
				this.loadingText = this.$t('system.load-more')
			}
			this.list = this.list.concat(data)
			uni.hideNavigationBarLoading();
		},
		// 上拉加载
		onReachBottom() {
			if (this.canFresh) {
				const lastId = this.list[this.list.length - 1]?.id
				lastId && this.getMoreTradeDetail(lastId)
			}
		},
		bindPickerChange(e) {
			this.list = []
			this.tradeType = e.detail.value !== 0 ? e.detail.value : ''
			this.getTradeDetail()
		},
	},
}
</script>

<style lang="scss" scoped>
.dapp {
	position: relative;
	max-width: 720px;
	margin: auto;
	background-color: #fff;
}
.earnbox {
	display: block;
	padding-top: 16px;
}
.earnbox .inbox {
	background: #f0f3f7;
	padding: 16px;
	border-radius: 16px;
	text-align: center;
}
.earnbox .inlist {
	background: #fff;
	border-radius: 16px;
	text-align: left;
}
.earnbox .inlist .tit {
	height: 36px;
	line-height: 36px;
	border-bottom: 1px solid #ddd;
	padding: 0 16px;
	font-weight: 700;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	&-text{
		font-size: 13px;
		color: #b73e31;
	}
}
.earnbox .inlist .tit>span {
	position: absolute;
	right: 16px;
}
.earnbox .inlist .tit>span>uni-text {
	font-size: 18px;
	color: #b73e31;
}
.earnbox .inlist dt {
	display: flex;
	justify-content: space-between;
	padding: 12px 16px;
	font-weight: 500;
	font-size: 13px;
	color: #2a2a2a;
	border-bottom: 1px solid #eee;
}
.earnbox .inlist dd {
	display: flex;
	justify-content: space-between;
	padding: 12px 16px;
	border-bottom: 1px solid #eee;
}

.earnbox .inlist dd>uni-view:first-child {
	color: #2a2a2a;
	font-weight: 500;
	font-size: 13px;
}
.earnbox .inlist dd>uni-view:last-child {
	color: #b73e31;
	font-size: 14px;
	font-weight: 500;
	display: flex;
	flex-direction: column;
}

.earnbox .inlist dd>uni-view:first-child>p {
	font-size: 12px;
	color: #999;
	padding-top: 6px;
	font-weight: 400;
}
.earnbox .inlist dd>uni-view:last-child>p.sc {
	display: block;
	background: linear-gradient(1turn,#05680d,#10dd15);
	color: #fff;
	height: 22px;
	padding: 0 6px;
	line-height: 22px;
	border-radius: 11px;
	font-size: 12px;
	margin-top: 4px;
	text-align: center;
}
</style>
