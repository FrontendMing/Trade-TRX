<template>
	<view>
		<header-back :name="$t('invest.myinvest')"></header-back>
		<view class="invested">
			<view class="tab">
				<span class="cur">进行中</span>
				<span>已结算</span>
			</view>
			<view class="box">
				<view class="more">数据列表</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
