<template>
	<view>
		<header-back :name="$t('trade.tradelist')"></header-back>
		<view class="earnbox">
			<view class="inbox">
				<view class="inlist">
					<view class="tit">交易清单</view>
					<view class="box">
						<dl>
							<dt><span>日期</span><span>金额</span></dt>
							<dd v-for="(item,index) in list" :key="index">
								<view>{{item.createdAt}}
									<p>量化交易收入</p>
								</view>
								<view>{{floatNum(item.amount)}} TRX
									<p>
										<span v-if="item.status === 0 && !item.isExpired" class="no-get" @click="getProfit(item.id)">未收取</span>
										<span v-if="item.status === 1 && !item.isExpired">已收取</span>
										<span v-if="item.isExpired">已过期</span>
									</p>
								</view>
							</dd>
						</dl>
						<view class="more">
							<span>没有更多数据</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import { floatNum, } from '@/utils/index.js'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.getProfitDetails()
		},
		methods: {
			floatNum,
			// 获取利润收益详情数据
			async getProfitDetails() {
				const { data, } = await this.$api.getProfitDetails()
				this.list = data || []
			},
			// 收取 利润
			async getProfit(id) {
				await this.$api.collectProfit(id)
				const target = this.list.find(it => it.id === id)
				target && (target.status = 1)
				uni.showToast({
					title: '收取成功',
					icon: 'success'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.earnbox .inbox {
	background: #f0f3f7;
	padding: 16px;
	border-radius: 16px;
	text-align: center;
	box-sizing: border-box;
}

.earnbox .inlist {
	background: #fff;
	border-radius: 16px;
	text-align: left;
	box-sizing: border-box;
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

.earnbox .inlist dd>uni-view:first-child>p {
	font-size: 12px;
	color: #999;
	padding-top: 6px;
	font-weight: 400;
}

.earnbox .inlist dd>uni-view:last-child {
	color: #b73e31;
	font-size: 14px;
	font-weight: 500;
	display: flex;
	flex-direction: column;
	&>p{
		text-align: right;
		padding-top: 3px;
		span {
			background: linear-gradient(1turn,#909399,#c0c4cc);
			color: #fff;
			padding: 6px 12px;
			display: inline-block;
			font-size: 12px;
			border-radius: 12px;
			&.no-get{
				background: #b73e31;
			}
		}
	}
}
.earnbox .inlist .more {
	text-align: center;
	padding: 12px 0;
	color: #999;
	font-size: 14px;
}
</style>
