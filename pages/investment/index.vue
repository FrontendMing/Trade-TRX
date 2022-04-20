<template>
	<view class="">
		<header-bar :tabName="$t('index.investment')"></header-bar>
		<view class="invest">
			<view class="toptab">
				<span class="cur">{{$t('invest.product')}}</span>
				<span @click="topUp">{{$t('invest.topUp')}}</span>
				<span @click="toMyinvests">{{$t('invest.myInvest')}}</span>
			</view>
			<view class="intsbox">
				<view class="itembox" v-for="item in list" :key="item.id" @click="goToProductDetail(item.id)">
					<view class="thumb">
						<image src="/static/image/invests.jpeg" mode="scaleToFill"></image>
					</view>
					<view class="intro">
						<p>{{$t('invest.cycle')}}：<span>{{item.cycle}}</span>{{$t('invest.day')}}</p>
						<p>{{$t('invest.dailyRevenue')}}：<span>{{floatNum(item.interestRate, 2)}}</span>%</p>
						<p>{{$t('invest.miniInvest')}}：<span>{{floatNum(item.minAmount)}}</span></p>
					</view>
				</view>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
	const collection = "hello";
	import HeaderBar from '@/components/HeaderBar.vue'
	import { floatNum, } from '@/utils/index.js'
	export default {
		components: {
			HeaderBar
		},
		data() {
			return {
				list: [],
				loadingText: this.$t('system.loading'),
				canFresh: false,
			}
		},
		onShow() {
			this.getProducts()
		},
		methods: {
			floatNum,
			// 产品列表
			async getProducts() {
				this.loadingText = this.$t('system.loading')
				uni.showNavigationBarLoading()
				const { data, } = await this.$api.getProducts()
				this.canFresh = data?.length === 10

				if(data?.length < 10){
					this.loadingText = this.$t('system.load-finish')
				} else {
					this.loadingText = this.$t('system.load-more')
				}
				this.list = data || []
				uni.hideNavigationBarLoading()
			},
			// 加载分页数据
			async getMoreProducts(lastId) {
				this.loadingText = this.$t('system.loading')
				uni.showNavigationBarLoading()
				const { data, } = await this.$api.getProducts({ lastId, })
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
					lastId && this.getMoreProducts(lastId)
				}
			},
			// 产品详情
			goToProductDetail(id) {
				uni.navigateTo({
					url: `/pages/investment/details/index?id=${id}`
				})
			},
			// 我的投资
			toMyinvests() {
				uni.navigateTo({
					url: '/pages/investment/myinvests/index'
				})
			},
			topUp() {
				uni.navigateTo({
					url: '/pages/topup/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.input {
	border: 1px solid #ebebeb;
	border-radius: 3px;
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 8px;
}
.invest {
	display: block;
	background: #fff;
	padding: 8px 16px 16px 16px;
	.toptab {
		background: #fffcf5;
		border-bottom: 2px solid #b73e31;
		height: 35px;
		line-height: 35px;
		display: flex;
		text-align: center;
		border-radius: 8px;
		overflow: hidden;
		& > span{
			flex: 1;
			font-weight: 500;
			font-size: 14px;
			position: relative;
			color: #666;
			cursor: pointer;
			&.cur {
				background: #b73e31;
				color: #fff;
			}
		}
	}
	.intsbox {
		display: block;
		padding-top: 16px;
		box-sizing: border-box;
	}
	.itembox {
		height: 110px;
		cursor: pointer;
		margin-bottom: 16px;
		background: linear-gradient(270deg,#851004,#fa6e5f);
		border-radius: 8px;
		padding: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		&:last-of-type {
			margin-bottom: 0;
		}
		.thumb {
			width: 55%;
			box-sizing: border-box;
			& > uni-image {
				width: 100%;
				height: 94px;
				display: block;
				border-radius: 8px;
			}
		}
		.intro {
			width: 42%;
			color: #eee;
			box-sizing: border-box;
			& > p {
				height: 29px;
				line-height: 29px;
				font-weight: 500;
				font-size: 13px;
				&:first-child {
					font-size: 15px;
				}
				& > span {
					margin: 0 2px 0 5px;
					zoom: 1.1;
					color: #fff;
				}
			}
		}
	}
}
</style>
