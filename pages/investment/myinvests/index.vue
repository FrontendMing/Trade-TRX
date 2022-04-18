<template>
	<view>
		<header-back :name="$t('invest.myinvest')"></header-back>
		<view class="invested">
			<view class="tab">
				<span :class="{'cur': currentTab === 1}" @click="switchTab(1)">进行中</span>
				<span :class="{'cur': currentTab === 2}" @click="switchTab(2)">已结算</span>
			</view>
			<view class="box">
				<view v-if="!data.length" class="more">没有数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				currentTab: 1,
				data: [], // 渲染到页面的数据
				underWayList: [], // 进行中
				finishList: [], // 已结算
			}
		},
		onShow() {
			this.getUserInvestDetail()
		},
		methods: {
			async getUserInvestDetail() {
				const { data, } = await this.$api.getUserInvestDetail()
				this.underWayList = data?.underWayList || []
				this.finishList = data?.finishList || []
			},
			switchTab(tab) {
				this.currentTab = tab;
				this.data = tab === 1 ? this.underWayList : this.finishList
			}
		}
	}
</script>

<style scoped>
.invested {
    display: block;
    background: #fff;
    padding: 16px;
	box-sizing: border-box;
}

.invested .tab {
    background: #fffcf5;
    border-bottom: 2px solid #b73e31;
    height: 35px;
    line-height: 35px;
    display: flex;
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
}

.invested .tab>span {
    flex: 1;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    color: #666;
    cursor: pointer;
}

.invested .tab>span.cur {
    background: #b73e31;
    color: #fff;
}

.invested .more {
    text-align: center;
    padding: 12px 0;
    color: #999;
    font-size: 14px;
	box-sizing: border-box;
}
</style>
