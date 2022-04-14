<template>
	<view>
		<header-bar :tabName="$t('index.mine')"></header-bar>
		<view class="container">
			<view class="mine">
				<view class="logo">
					<image src="/static/image/mine_logo.png" mode="widthFix"></image>
				</view>
				<view class="level">
					<label for="">{{userInfo.levelName}}</label>
				</view>
				<view class="balance">
					<span>总资产余额:</span>
					<strong>{{userInfo.basicAmount + userInfo.commAmount}}</strong>
					<em>TRX</em>
				</view>
				<view class="rock">
					<view @click="topUp">
						<image src="/static/image/icon_5.png" mode="aspectFit"/>
						<span>充值</span>
					</view>
					<view @click="withdraw">
						<image src="/static/image/icon_6.png" mode="aspectFit"/>
						<span>提款</span>
					</view>
				</view>
				<view class="quantity">
					<view class="word">
						<h2>TRX充值数量</h2>
						<p>基础账户</p>
						<h3><strong>{{userInfo.basicAmount}}</strong><label for="">TRX</label></h3>
						<p>佣金账户</p>
						<h3><strong>{{userInfo.commAmount}}</strong><label for="">TRX</label></h3>
						<p>充值任意数量的TRX即可激活账户并开通提现功能。</p>
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
				userInfo: {},
			}
		},
		computed: {
			serviceData: () => [
				{
					type: 'team',
					name: '团队',
					img: '/static/image/tab_7.png',
					url: '/pages/team/index',
				},
				{
					type: 'team',
					name: '账务记录',
					img: '/static/image/tab_8.png',
					url: '/pages/investment/myinvests/index',
				},
				{
					type: 'team',
					name: '转账',
					img: '/static/image/tab_9.png',
					url: '/pages/topup/index',
				},
				{
					type: 'invite',
					name: '邀请',
					img: '/static/image/tab_10.png',
					url: '/pages/invite/index',
				},
				{
					type: 'vipLevel',
					name: 'VIP等级',
					img: '/static/image/tab_17.png',
					url: '/pages/invite/rules/index',
				},
				{
					type: 'logout',
					name: '登出',
					img: '/static/image/tab_12.png',
					url: null
				},
			]
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userInfo = Object.assign({}, res?.data || {})
				})
			},
			// 充值
			topUp() {
				uni.navigateTo({
					url: '/pages/topup/index'
				})
			},
			// 提款
			withdraw() {
				uni.navigateTo({
					url: '/pages/topup/index'
				})
			},
			handleJump({ type, url, }) {
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
					uni.switchTab({ url, })
				}
				else {
					uni.navigateTo({ url, })
				}
			}
		}
	}
</script>

<style>
.container {
	background: #fff url(/static/image/mine_banner.png) no-repeat top;
	background-size: 100%;
	padding: 210px 16px 16px;
}
.mine {
	box-sizing: border-box;
	margin-top: -100px;
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
