<template>
	<view>
		<header-bar :tabName="$t('index.trade')"></header-bar>
		<view class="trade">
			<view class="rate">+{{floatNum(userInfo.earnings, 2)}}%</view>
			<view class="level">
				<label class="level-label">{{userInfo.levelName}}</label>
			</view>
			<view class="wkbg">
				<image mode="aspectFit" src="/static/image/pool_bg.png"/>
			</view>
			<view class="status">{{$t('trade.miningWorking')}}</view>
			<view class="trading">
				<view class="tit">{{$t('trade.tradingProfit')}}
					<span @click="toTradeList"><text>{{$t('trade.viewAll')}}</text>></span>
				</view>
				<view class="box">
					<view v-for="(item,index) in list" :key="index" class="trade-list">
						<view class="trade-list-image">
							<image src="/static/image/icon_8.png" mode="widthFix"/>
						</view>
						<view class="trade-list-left">
							<p><strong>{{floatNum(item.amount)}}</strong><span>TRX</span></p>
							<p>{{$t('trade.revenue')}}</p>
						</view>
						<view class="trade-list-right">
							<span v-if="item.status === 0 && !item.isExpired" class="no-get" @click="getProfit(item.id)">收取</span>
							<span v-if="item.status === 1 && !item.isExpired">{{$t('trade.received')}}</span>
							<span v-if="item.isExpired">{{$t('trade.expired')}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import { floatNum, } from '@/utils/index.js'
export default {
	components: {
		HeaderBar,
	},
    data() {
		return {
			userInfo: {},
			list: [],
		}
    },
	onShow() {
		this.getUserInfo()
		this.getProfitFast()
	},
    methods: {
		floatNum,
		// 获取用户信息
		async getUserInfo() {
			const { data, } = await this.$api.getUserInfo()
			this.userInfo = Object.assign({}, data || {})
		},
		// 获取利润收益快表数据
		async getProfitFast() {
			const { data, } = await this.$api.getProfitFast()
			this.list = data || []
		},
		toTradeList() {
			uni.navigateTo({
				url: '/pages/trade/tradeList/index'
			})
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
.trade{
	.rate {
		font-size: 21px;
		text-align: center;
		font-weight: 700;
		color: #2a2a2a;
		padding: 24px 0 6px 0;
	}
	.level {
		justify-content: center;
		display: flex;
		align-items: center;
		&-label{
			padding: 3px 9px;
			background: linear-gradient(1turn,#741e15,#b73e31);
			color: #fff;
			border-radius: 10px;
			font-size: 12px;
			font-weight: 700;
		}
	}
	.wkbg {
		display: flex;
		flex-direction: column;
	}
	.wkbg>image {
		margin: 7px auto;
		width: 88%;
	}
	.status {
		text-align: center;
	}
	.tit {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 33px;
		font-size: 19px;
		font-weight: 700;
		margin-bottom: 22px;
	}
	.tit>span {
		font-size: 14px;
		font-weight: 400;
		color: #999;
		margin-right: 11px;
		cursor: pointer;
	}
	.trading {
		padding: 33px 16px;
		overflow: hidden;
		padding-left: 33px;
	}
	.trade-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 33px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 64px;
		border-radius: 15px;
		padding-left: 23px;
		position: relative;
		&:nth-of-type(odd) {
			background: #fff4f3;
		}
		&-image{
			width: 52px;
			position: absolute;
			top: 0;
			left: 0;
			image{
				width: 100%;
			}
		}
		&-left {
			padding-left: 54px;
			font-size: 14px;
			font-weight: 500;
			display: flex;
			flex-direction: column;
			&>p{
				font-size: 12px;
				color: #999;
				padding-top: 6px;
				strong{
					color: #b73e31;
					margin-right: 6px;
				}
				span{
					font-weight: bold;
					font-size: 13px;
					color: #2a2a2a;
				}
			}
		}
		&-right {
			padding-right: 16px;
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
}
</style>
