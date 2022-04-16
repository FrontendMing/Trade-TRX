<template>
	<view class="">
		<header-bar :tabName="$t('index.investment')"></header-bar>
		<view class="invest">
			<view class="toptab">
				<span class="cur">投资产品</span>
				<span @click="topUp">充值</span>
				<span @click="toMyinvests">我的投资</span>
			</view>
			<view class="intsbox">
				<view class="itembox" v-for="item in list" :key="item.id" @click="goToProductDetail(item.id)">
					<view class="thumb">
						<image src="/static/image/invests.jpeg" mode="scaleToFill"></image>
					</view>
					<view class="intro">
						<p>周期：<span>{{item.cycle}}</span>日</p>
						<p>每日收益率：<span>{{item.interestRate || 0}}</span>%</p>
						<p>起投金额：<span>{{item.minAmount}}</span></p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const collection = "hello";
	import HeaderBar from '@/components/HeaderBar.vue'
	export default {
		components: {
			HeaderBar
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getProducts()
		},
		methods: {
			// 产品列表
			async getProducts() {
				const { data, } = await this.$api.getProducts()
				this.list = data || []
			},
			// add() {
			// 	uni.showLoading();
			// 	let db = uniCloud.database()
			// 	db.collection(collection).add({
			// 		name: this.name
			// 	}).then((res) => {
			// 		uni.showToast({
			// 			title: this.$t('schema.add-success')
			// 		})
			// 	}).catch((err) => {
			// 		uni.showModal({
			// 			content: err.message,
			// 			showCancel: false
			// 		})
			// 	}).finally(() => {
			// 		uni.hideLoading();
			// 	})
			// },
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

<style scoped>
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
	}

	.invest .toptab {
	  background: #fffcf5;
	  border-bottom: 2px solid #b73e31;
	  height: 35px;
	  line-height: 35px;
	  display: flex;
	  text-align: center;
	  border-radius: 8px;
	  overflow: hidden;
	}

	.invest .toptab > span.cur {
	  background: #b73e31;
	  color: #fff;
	}

	.invest .toptab > span {
	  flex: 1;
	  font-weight: 500;
	  font-size: 14px;
	  position: relative;
	  color: #666;
	  cursor: pointer;
	}

	.invest .intsbox {
	  display: block;
	  padding-top: 16px;
	  box-sizing: border-box;
	}

	.invest .itembox {
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
	}

	.invest .itembox .thumb {
	  width: 55%;
	  box-sizing: border-box;
	}

	.invest .itembox .intro {
	  width: 42%;
	  color: #eee;
	  box-sizing: border-box;
	}

	.invest .itembox .thumb > uni-image {
	  width: 100%;
	  height: 94px;
	  display: block;
	  border-radius: 8px;
	}

	.invest .itembox .intro > p {
	  height: 29px;
	  line-height: 29px;
	  font-weight: 500;
	  font-size: 13px;
	}

	.invest .itembox .intro > p:first-child {
	  font-size: 15px;
	}

	.invest .itembox .intro > p > span {
	  margin: 0 2px 0 5px;
	  zoom: 1.1;
	  color: #fff;
	}
</style>
