<template>
<view>
	<header-bar :tabName="$t('index.trade')"></header-bar>
	<view class="container">
		<view class="rate">
			+5.00%
		</view>
		<view class="level">VIP1</view>
		<view class="wkbg"><image src="/static/image/pool_bg.png"></image></view>
		<view class="status">云挖矿正在运行</view>
		<view class="trading">
			<view class="tit">交易利润
			<span><text>查看全部</text>></span>
			</view>
			<view class="box">99999</view>
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
			title: this.$t('')
		}
    },
    methods: {
      
    }
}
</script>

<style>

</style>
