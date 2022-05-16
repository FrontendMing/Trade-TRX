<template>
	<view>
		<header-back :name="$t('invest.myInvest')"></header-back>
		<view class="invested">
			<view class="tab">
				<span :class="{'cur': currentTab === 1}" @click="switchTab(1)">{{$t('invest.active')}}</span>
				<span :class="{'cur': currentTab === 2}" @click="switchTab(2)">{{$t('invest.finished')}}</span>
			</view>
			<view class="box">
				<uni-card
					class="box-list"
					v-for="(item, index) in list"
					:key="item.id || index"
					:is-shadow="false"
				>
					<template v-slot:title>
						<view class="box-list-title">
							<span>{{$t('myinve.orderNo')}}：{{item.orderNo}}</span>
							<uni-icons type="link" size="30" color="#fff" @click="copyText(item.orderNo)"></uni-icons>
						</view>
					</template>
					<uni-row class="box-list-row">
						<uni-col :span="12">
							<view class="sub-title">{{$t('myinve.amount')}}</view>
							<view class="sub-content">{{floatNum(item.amount)}}</view>
						</uni-col>
						<uni-col :span="12">
							<view class="sub-title">{{$t('myinve.expectedrevenue')}}</view>
							<view class="sub-content">{{floatNum(item.pi - item.amount)}}</view>
						</uni-col>
						<uni-col :span="12">
							<view class="sub-title">{{$t('invest.dailyRevenue')}}</view>
							<view class="sub-content">{{floatNum(item.interest, 2)}} %</view>
						</uni-col>
						<uni-col :span="12">
							<view class="sub-title">{{$t('invest.cycle')}}</view>
							<view class="sub-content">{{item.day}} {{$t('myinve.day')}}</view>
						</uni-col>
						<uni-col :span="12">
							<view class="sub-title">{{$t('myinve.invetime')}}</view>
							<view class="sub-content">{{unixTimeToDate(item.createdAt)}}</view>
						</uni-col>
						<uni-col :span="12">
							<view class="sub-title">{{$t('myinve.exptime')}}</view>
							<view class="sub-content">{{unixTimeToDate(item.settlementDate)}}</view>
						</uni-col>
					</uni-row>
				</uni-card>
				<view class="loading">{{loadingText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import { unixTimeToDate, copyText, floatNum, } from '@/utils/index.js'
	export default {
		components: {
			HeaderBack,
		},
		data() {
			return {
				currentTab: 1,
				list: [],
				loadingText: this.$t('system.loading'),
				canFresh: false,
			}
		},
		onShow() {
			this.getUserInvestDetail()
		},
		methods: {
			unixTimeToDate,
			floatNum,
			switchTab(tab) {
				this.currentTab = tab;
				this.list = []
				this.getUserInvestDetail()
			},
			async getUserInvestDetail() {
				this.loadingText = this.$t('system.loading')
				uni.showNavigationBarLoading()
				const { data, } = await this.$api.getUserInvestDetail({ status: this.currentTab - 1, })
				this.canFresh = data?.details?.length === 10

				if(data?.details?.length < 10){
					this.loadingText = this.$t('system.load-finish')
				} else {
					this.loadingText = this.$t('system.load-more')
				}
				this.list = data?.details || []
				uni.hideNavigationBarLoading();
			},
			// 加载分页数据
			async getMoreUserInvestDetail(lastId) {
				this.loadingText = this.$t('system.loading')
				uni.showNavigationBarLoading()
				const { data, } = await this.$api.getUserInvestDetail({
					status: this.currentTab - 1,
					lastId,
				})
				this.canFresh = data?.details?.length === 10
				
				if(data?.details?.length < 10){
					this.loadingText = this.$t('system.load-finish')
				} else {
					this.loadingText = this.$t('system.load-more')
				}
				this.list = data?.details || []
				uni.hideNavigationBarLoading();
			},
			// 上拉加载
			onReachBottom() {
				if (this.canFresh) {
					const lastId = this.list[this.list.length - 1]?.id
					lastId && this.getMoreUserInvestDetail(lastId)
				}
			},
			// 复制 订单号
			async copyText(orderNo) {
				await copyText(orderNo)
				uni.showToast({
					title: this.$t('myinve.copied'),
					icon: 'success'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.invested {
    display: block;
    background: #fff;
    padding: 16px;
	box-sizing: border-box;
	.tab {
	    background: #fffcf5;
	    border-bottom: 2px solid #b73e31;
	    height: 35px;
	    line-height: 35px;
	    display: flex;
	    text-align: center;
	    border-radius: 8px;
	    overflow: hidden;
		& > span {
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
	.box{
		&-list{
			margin: 15px 0!important;
			padding: 0!important;
			/deep/ .uni-card__content{
				padding: 0!important;
			}
			&-title{
				background: linear-gradient(270deg, #f8504e, #fc8b62);
				color: #fff;
				line-height: 26px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 7px 15px;
			}
			&-row{
				.uni-col{
					border-top: 1px solid #EBEEF5;
					&:first-of-type{
						border-top: none;
					}
					&:nth-of-type(odd) {
						border-right: 1px solid #EBEEF5;
					}
				}
				.sub-title{
					padding: 5px 10px 0;
					border-top: 1px solid #EBEEF5;
				}
				.sub-content{
					padding: 3px 10px 5px;
					color: #444;
					font-weight: 500;
				}
			}
		}
	}
}
</style>
