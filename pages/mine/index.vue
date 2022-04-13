<template>
	<view>
		<header-bar :tabName="$t('index.mine')"></header-bar>
		<view class="container">
			<view class="mine">
				<view class="logo">
					<image src="/static/image/mine_logo.png" mode="widthFix"></image>
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
					<view @click="topUp">
						<image src="/static/image/icon_5.png" mode="aspectFit"></image><span>Deposit</span>
					</view>
					<view>
						<image src="/static/image/icon_6.png" mode="aspectFit"></image><span>Withdrawal</span>
					</view>
				</view>
				<view class="quantity">
					<view class="word">
						<h2>TRX Deposit quantity</h2>
						<p>Basic account</p>
						<h3><strong>0</strong><label for="">TRX</label></h3>
						<p>Promotion account</p>
						<h3><strong>0</strong><label for="">TRX</label></h3>
						<p>Recharge any number of TRX to activate the account and open the withdrawal function.</p>
					</view>
					<image src="/static/image/mine_bg.png" mode="widthFix"></image>
				</view>
				<view class="service">
					<ul>
						<li v-for="(item, index) in serviceData" :key="index" @click="handleJump(item)">
							<image :src="item.img" mode="widthFix"></image>
							<p>{{item.name}}</p>
						</li>
					</ul>
				</view>
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
				serviceData: [
					{
						type: 'team',
						name: '团队',
						img: '/static/image/tab_7.png',
						link: '/pages/team/team',
					},
					{
						type: 'team',
						name: '账务记录',
						img: '/static/image/tab_8.png',
						link: '/pages/investment/myinvests/myinvests',
					},
					{
						type: 'team',
						name: '转账',
						img: '/static/image/tab_9.png',
						link: '/pages/topup/topup',
					},
					{
						type: 'invite',
						name: '邀请',
						img: '/static/image/tab_10.png',
						link: '/pages/invite/index',
					},
					{
						type: 'vipLevel',
						name: 'VIP等级',
						img: '/static/image/tab_17.png',
						link: '/pages/invite/rules/index',
					},
					{
						type: 'logout',
						name: '登出',
						img: '/static/image/tab_12.png',
						link: null
					},
				]
			}
		},
		methods: {
			topUp() {
				uni.navigateTo({
					url: '/pages/topup/topup'
				})
			},
			handleJump({ type, link, }) {
				// 登出
				if (type === 'logout') {
					this.$api.logout().then(res => {
						uni.clearStorageSync()
						uni.navigateTo({
							url: '/pages/login',
						})
					})
				}
				// 邀请
				else if (type === 'invite') {
					uni.switchTab({
						url: link,
					})
				}
				else {
					uni.navigateTo({
						url: link,
					})
				}
			}
		}
	}
</script>

<style>
	.mine {
		box-sizing: border-box;
	}

	.logo {
		display: block;
		text-align: center;
	}

	.logo>image {
		width: 119px;
	}

	.mine .level {
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.mine .balance {
		overflow: hidden;
		margin-top: 18px;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.mine .balance>strong {
		font-size: 22px;
		color: #b73e31;
		margin: 0 6px;
		line-height: 1;
	}

	.mine .balance>span {
		color: #999;
		font-size: 15px;
		font-weight: 500;
	}

	.mine .balance>em {
		font-style: normal;
		font-weight: 700;
		color: #2a2a2a;
		font-size: 15px;
	}

	.mine .rock {
		display: flex;
		width: 100%;
		align-items: center;
		padding: 10px 0;
		background: #fff4f4;
		border-radius: 10px;
		margin-top: 12px;
	}

	.mine .rock>view {
		flex: 1;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: opacity .2s ease 0s;
	}

	.rock>view>image {
		height: 38px;
		width: 32px;
	}

	.rock>view>span {
		margin-left: 6px;
		font-size: 15px;
		font-weight: 500;
	}

	.quantity {
		overflow: hidden;
		padding: 32px 18px 0 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.quantity h2 {
		font-size: 16px;
		padding-bottom: 16px;
	}

	.quantity p {
		line-height: 1.5;
		color: #999;
		font-size: 13px;
	}

	.quantity h3 {
		padding-bottom: 16px;
		color: #b73e31;
	}

	.quantity h3>strong {
		font-size: 22px;
	}

	.quantity h3>uni-label {
		font-size: 14px;
		margin-left: 6px;
	}

	.quantity image {
		width: 207px;
	}

	.container {
		background: #fff url(/static/image/mine_banner.png) no-repeat top;
		background-size: 100%;
		padding: 210px 16px 16px;
	}

	.service ul {
		list-style: none;
		padding: 0;
	}

	.service ul li {
		width: 33.333%;
		float: left;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		padding: 16px 0;
		transition: opacity .2s ease 0s;
		cursor: pointer;
	}

	.service {
		overflow: hidden;
		padding: 12px 12px 0 12px;
		display: block;
		background: #ff575e;
		color: #fff;
		margin-top: 12px;
		border-radius: 12px;
	}

	.service li image {
		width: 50%;
		height: 50%;
		margin: auto;
	}

	.mine .service .box>ul>li>p {
		font-weight: 500;
		padding-top: 9px;
		font-size: 13px;
		min-height: 40px;
	}
</style>
