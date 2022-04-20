<template>
	<view>
		<header-back :name="$t('财务记录')"></header-back>
		<view class="dapp">
			<view class="earnbox">
				<view class="inbox">
					<view class="inlist">
						<view class="tit">
							财务记录
							<text></text>
						</view>
						<view class="box">
							<dl>
								<dt>
									<span>日期</span>
									<span>金额</span>
								</dt>
								<dd v-for="(item, index) in list" :key="index">
									<view>
										{{unixTimeToDate(item.tradeTime)}}
										<p>{{item.description}}</p>
									</view>
									<view>
										{{floatNum(item.amount)}} TRX
										<p class="sc">完成</p>
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
	0: '注册礼金',
	1: '佣金充币',
	2: '基础充币',
	3: '佣金提币',
	4: '基础提币',
	5: '佣金分红',
	6: '挖矿收益',
	7: '佣金转到基础账户',
	8: '基础转到佣金账户',
	9: '佣金投资产品',
	1: '0邀请注册返利',
	11: '下线用户充值',
	12: '下线用户挖矿收益',
	13: '佣金提币拨回',
	14: '基础提币拨回',
}
export default {
	components: {
		HeaderBack,
	},
	data() {
		return {
			list: [],
			loadingText: this.$t('system.loading'),
			canFresh: false,
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
			const { data, } = await this.$api.getTradeDetail()
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
			const { data, } = await this.$api.getTradeDetail({ lastId, })
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
	},
}
</script>

<style scoped>
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
	position: relative;
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
