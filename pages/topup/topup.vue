<template>
	<view>
		<header-back :name="$t('充值')"></header-back>
		<view class="deposit">
			<view class="choose">
				<view class="base">
					<view class="icon"><image src="/static/image/base.png" mode="widthFix"></image></view>
					<view class="name">转到基础账户</view>
				</view>
				<view class="pomo">
					<view class="icon"><image src="/static/image/pomo.png" mode="widthFix"></image></view>
					<view class="name">转到佣金账户</view>
				</view>
			</view>
			<view class="notes">
				<view class="tit">投资分为两种模式</view>
				<view class="txt">1：每天按照协调世界时（UTC）（24:00后）充值到基本账户并获得收益。</view>
				<view class="txt">2：充值到佣金账户，可按不同周期收取收益，到期返还本金和收益。</view>
				<view class="txt">注释：<p>投资前，请根据您的投资需求选择基本账户或推广账户进行投资。 请务必等待账户充值。 这是一个非常关键的问题。</p></view>
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
	.deposit .choose {
	    display: flex;
	    padding: 16px;
	    justify-content: space-between;
	}
	
	.deposit .choose>uni-view.base {
	    background: linear-gradient(270deg,#741e15,#b73e31);
	}
	
	.deposit .choose>uni-view:first-child {
	    margin-right: 16px;
	}
	
	.deposit .choose>uni-view {
	    width: 100%;
	    height: 166px;
	    text-align: center;
	    border-radius: 16px;
	    overflow: hidden;
	    cursor: pointer;
	    padding: 0 22px;
	    color: #fff;
	    font-weight: 700;
	    font-size: 16px;
	}
	
	.deposit .choose>uni-view .icon {
	    padding-top: 18px;
	}
	
	.deposit .choose>uni-view .name {
	    margin-top: 8px;
	    line-height: 1.25;
	}
	
	.deposit .choose>uni-view.pomo {
	    background: linear-gradient(270deg,#f8504e,#fc8b62);
	}
	
	.deposit .choose>uni-view uni-image {
	    width: 40px;
	}
	
	.deposit .notes {
	    display: block;
	    padding: 16px;
	    font-size: 15px;
	}
	
	.deposit .notes .tit {
	    font-weight: 500;
	    font-size: 16px;
	    margin-bottom: 6px;
	}
	
	.deposit .notes .txt {
	    margin: 14px 0;
	    color: #555;
	}
</style>
