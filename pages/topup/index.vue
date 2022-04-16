<template>
	<view>
		<header-back :name="$t('充值')"></header-back>
		<view class="deposit">
			<view class="choose">
				<view class="base">
					<view class="icon">
						<image src="/static/image/base.png" mode="widthFix"></image>
					</view>
					<view class="name">转到基础账户</view>
				</view>
				<view class="pomo">
					<view class="icon">
						<image src="/static/image/pomo.png" mode="widthFix"></image>
					</view>
					<view class="name">转到佣金账户</view>
				</view>
			</view>
			<view class="notes">
				<view class="tit">投资分为两种模式</view>
				<view class="txt">1：每天按照协调世界时（UTC）（24:00后）充值到基本账户并获得收益。</view>
				<view class="txt">2：充值到佣金账户，可按不同周期收取收益，到期返还本金和收益。</view>
				<view class="txt">注释：<p>投资前，请根据您的投资需求选择基本账户或推广账户进行投资。 请务必等待账户充值。 这是一个非常关键的问题。</p>
				</view>
			</view>
			<!-- 二维码页 -->
			<view>
				<view class="qrcode">
					<view class="img">
						<canvas></canvas>
					</view>
					<p>地址</p>
				</view>
				<view class="address">
					<view class="sadd">
						<input type="text" value="" />
						<view class="btn">复制地址</view>
					</view>
					<view class="stip">
						<p>请不要为其他非TRX资产充值。 充值后约5~10分钟会到账。</p>
						<p class="red">如果长时间未到账，请刷新此页面。 最低充值 5TRX，小於 5TRX 無法入賬。</p>
					</view>
				</view>
				<view class="realpush">
					<button class="">充值完成</button>
				</view>
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

<style scoped>
	.deposit .choose {
		display: flex;
		padding: 16px;
		justify-content: space-between;
	}

	.deposit .choose>view.base {
		background: linear-gradient(270deg, #741e15, #b73e31);
	}

	.deposit .choose>view:first-child {
		margin-right: 16px;
	}

	.deposit .choose>view {
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

	.deposit .choose>view .icon {
		padding-top: 18px;
	}

	.deposit .choose>view .name {
		margin-top: 8px;
		line-height: 1.25;
	}

	.deposit .choose>view.pomo {
		background: linear-gradient(270deg, #f8504e, #fc8b62);
	}

	.deposit .choose>view uni-image {
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
	
	.deposit .qrcode {
	  display: flex;
	  flex-direction: column;
	  width: 100%;
	  text-align: center;
	  padding: 32px 0;
	  align-items: center;
	}
	
	.deposit .qrcode .img {
	  margin: auto;
	  padding: 5px;
	  border: 1px solid #ebf1ff;
	  border-radius: 3px;
	}
	
	.deposit .qrcode p {
	  padding: 6px 0;
	  color: #b73e31;
	  font-size: 13px;
	  font-weight: 500;
	}
	
	.deposit .address {
	  background: #f0f3f7;
	  padding: 16px;
	  border-radius: 16px;
	}
	
	.deposit .realpush {
	  padding: 16px;
	}
	
	.deposit .address .sadd {
	  background: #fff;
	  display: flex;
	  width: 100%;
	  height: 33px;
	  align-items: center;
	  border-radius: 16px;
	  position: relative;
	}
	
	.deposit .address .stip {
	  text-align: center;
	  padding: 16px;
	  background: #fff;
	  border-radius: 16px;
	  margin-top: 16px;
	  color: #666;
	  line-height: 1.5;
	}
	
	.deposit .address .sadd > uni-input {
	  width: 100%;
	  text-indent: 11px;
	  font-weight: 500;
	  font-size: 14px;
	  outline: none;
	  position: relative;
	  z-index: 2;
	}
	
	.deposit .address .sadd .btn {
	  position: absolute;
	  z-index: 3;
	  top: 0;
	  right: 0;
	  height: 33px;
	  line-height: 33px;
	  background: #b73e31;
	  color: #fff;
	  border-radius: 0 16px 16px 0;
	  font-weight: 500;
	  font-size: 13px;
	  padding: 0 12px;
	  transition: background .2s ease 0s;
	  cursor: pointer;
	}
	
	.deposit .address .stip .red {
	  color: red;
	}
	
	.deposit .realpush > uni-button {
	  height: 42px;
	  border-radius: 42px;
	  background: linear-gradient(1turn,#741e15,#b73e31);
	  color: #fff;
	  font-weight: 500;
	  font-size: 16px;
	  transition: opacity .2s ease 0s;
	  cursor: pointer;
	}
</style>
