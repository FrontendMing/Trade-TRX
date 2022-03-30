<template>
	<view class="container">
		<view class="mine">
			<view class="logo">
				<image src="/static/image/mine_logo.png"></image>
			</view>
			<view class="level">
				<label for="">王者</label>
			</view>
			<view class="balance">
				<span>Total Balance:</span>
				<strong>999999</strong>
				<em>TRX</em>
			</view>
			<view class="rock">
				<view>
					<image src="/static/image/icon_5.png"></image><span>Deposit</span>
				</view>
				<view>
					<image src="/static/image/icon_6.png"></image><span>Withdrawal</span>
				</view>
			</view>
			<view class="quantity">
				<view class="word">
					<h2>TRX Deposit quantity</h2><p>Basic account</p><h3><strong>0</strong><label for="">TRX</label></h3><p>Promotion account</p><h3><strong>0</strong><label for="">TRX</label></h3><p>Recharge any number of TRX to activate the account and open the withdrawal function.</p>
				</view>
				<image src="/static/image/mine_bg.png"></image>
			</view>
			<view class="service">
				<view v-for="(item,index) in data" :key="index">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
