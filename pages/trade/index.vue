<template>
	<view>
		<header-bar :tabName="$t('index.trade')"></header-bar>
		<view class="container">
			<view class="rate">+5.00%</view>
			<view class="level">{{userInfo.levelName}}</view>
			<view class="wkbg">
				<image mode="aspectFit" src="/static/image/pool_bg.png"/>
			</view>
			<view class="status">云挖矿正在运行</view>
			<view class="trading">
				<view class="tit">交易利润
					<span @click="toTradeList"><text>查看全部</text>></span>
				</view>
				<view class="box" v-for="(item, index) in list" :key="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
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
	onLoad() {
		this.getUserInfo()
		this.getProfitFast()
	},
    methods: {
		// 获取用户信息
		getUserInfo() {
			this.$api.getUserInfo().then(res => {
				this.userInfo = Object.assign({}, res?.data || {})
			})
		},
		// 获取利润收益快表数据
		getProfitFast() {
			this.$api.getProfitFast().then(res => {
				this.list = res?.data || []
			})
		},
		toTradeList() {
			uni.navigateTo({
				url: '/pages/trade/tradeList/index'
			})
		}
    }
}
</script>

<style>
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
</style>
