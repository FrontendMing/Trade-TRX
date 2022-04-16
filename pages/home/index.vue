<template>
	<view>
		<header-bar :tabName="$t('index.home')"></header-bar>
		<view class="container">
			<view class="banner">
				<p>总资产余额</p>
				<view>
					{{(userInfo.basicAmount || 0) + (userInfo.commAmount || 0)}}
					<label for="">TRX</label>
				</view>
				<image src="/static/image/icon_9.png" mode="widthFix"></image>
			</view>
			<view class="topic">
				<view class="gf"></view>
				<view class="wd">
					<marquee behavior="scroll" scrollamount="3">Welcome to BianTRX</marquee>
				</view>
				<view class="gd"></view>
			</view>
			<view class="tabs">
				<ul>
					<li v-for="(item, index) in tabs" :key="index" @click="handleClick(item)">
						<image :src="item.imgurl" mode="widthFix"></image>
						<p>{{item.name}}</p>
					</li>
				</ul>
			</view>
			<view class="home">
				<view class="amount">
					<view class="item">
						<image src="/static/image/icon_1.png" mode="widthFix"></image>
						<p class="name">钱包</p>
						<p class="small">账户</p>
						<em>{{userInfo.basicAmount || 0}}<i>TRX ≈ $0</i></em>
					</view>
					<view class="item">
						<image src="/static/image/icon_2.png" mode="widthFix"></image>
						<p class="name">佣金</p>
						<p class="small">账户</p>
						<em>{{userInfo.commAmount || 0}}<i>TRX ≈ $0</i></em>
					</view>
				</view>
				<view class="join">
					<h2>加入成为波声百万富翁</h2>
					<p>使用云挖矿和Defi技术，确保所有用户获得最大的TRX收益。</p>
					<image src="/static/image/work_bg.png" mode="widthFix"></image>
					<button @click="goToTrade">详情</button>
				</view>
				<view class="data">
					<h2>平台数据展示</h2>
					<ul>
						<li>
							<image src="/static/image/icon_3.png" mode="widthFix"></image>
							<p class="tit">累计利润</p>
							<p class="val">{{platformData.assets}}</p>
						</li>
						<li>
							<image src="/static/image/icon_4.png" mode="widthFix"></image>
							<p class="tit">会员数量</p>
							<p class="val">{{platformData.members}}</p>
						</li>
					</ul>
				</view>
				<view class="info">
					<h2>关于我们</h2>
					<h3>我们是最佳平台</h3>
					<p>云挖矿为比特币 Trx 和其他加密货币提供了一种具有潜在成本效益的挖矿方式。 同时，无论是量化交易还是DeFi技术，都可以让你用少量的资金轻松参与区块链交易，获得保险一样的稳定收益。</p>
					<image src="/static/image/about_bg.png" mode="widthFix"></image>
				</view>
				<view class="glob">
					<h2>全球合作伙伴</h2>
					<ul>
						<li v-for="(item,index) in partner" :key="index">
							<image :src="item.url" mode="widthFix"></image>
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
			HeaderBar
		},
		data() {
			return {
				userInfo: {},
				// 平台数据
				platformData: {
					assets: 0,
					members: 0,
				}
			}
		},
		computed: {
			tabs: () => [
				{
					name: '充值',
					imgurl: '/static/image/tab_1.png',
					url: '/pages/topup/index'
				},
				{
					name: '提款',
					imgurl: '/static/image/tab_2.png',
					url: '/pages/topup/index'
				},
				{
					type: 'invite',
					name: '邀请',
					imgurl: '/static/image/tab_3.png',
					url: '/pages/invite/index'
				},
				{
					name: '团队',
					imgurl: '/static/image/tab_4.png',
					url: '/pages/team/index'
				},
				{
					type: 'app',
					name: 'APP',
					imgurl: '/static/image/tab_5.png',
					url: ''
				},
				{
					type: 'logout',
					name: '登出',
					imgurl: '/static/image/tab_6.png',
				}
			],
			partner: () => [
				{
					url: '/static/image/icon_10.jpeg'
				},
				{
					url: '/static/image/icon_11.jpeg'
				},
				{
					url: '/static/image/icon_13.jpeg'
				},
				{
					url: '/static/image/icon_14.jpeg'
				},
				{
					url: '/static/image/icon_15.jpeg'
				},
				{
					url: '/static/image/icon_16.jpeg'
				}
			],
		},
		onLoad() {
			this.getUserInfo()
			this.getPlatformData()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userInfo = res?.data || {}
				})
			},
			// 获取平台数据
			getPlatformData() {
				this.$api.getPlatformData().then(res => {
					this.platformData = Object.assign(this.platformData, (res?.data || {}))
				})
			},
			handleClick({ type, url, }) {
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
				// 跳 app
				else if (type === 'app') {

				}
				else {
					uni.navigateTo({ url, })
				}
			},
			// 跳转 交易
			goToTrade() {
				uni.switchTab({
					url: '/pages/trade/index'
				})
			}
		}
	}
</script>

<style>
	.locale-setting {
		font-size: 16px;
		font-weight: bold;
		margin-top: 15px;
		margin-bottom: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #f0f0f0;
	}

	.list-item {
		font-size: 14px;
		padding: 10px 0;
	}

	.list-item .v {
		margin-left: 5px;
	}

	.locale-item {
		display: flex;
		flex-direction: row;
		padding: 10px 0;
	}

	.locale-item .text {
		flex: 1;
	}

	.icon-check {
		margin-right: 5px;
		border: 2px solid #007aff;
		border-left: 0;
		border-top: 0;
		height: 12px;
		width: 6px;
		transform-origin: center;
		/* #ifndef APP-NVUE */
		transition: all 0.3s;
		/* #endif */
		transform: rotate(45deg);
	}

	.banner {
		height: 175px;
		display: flex;
		width: 100%;
		background: linear-gradient(320deg, #ff3e09, #ff575e);
		position: relative;
		flex-direction: column;
	}

	.banner p {
		padding: 65px 0 0 35px;
		font-size: 15px;
		color: #ffd6d2;
		font-weight: 500;
	}

	.banner>view {
		padding: 10px 0 0 35px;
		color: #fff;
		font-size: 34px;
		font-weight: 700;
		position: relative;
		display: flex;
		z-index: 2;
		align-items: center;
	}

	.container {
		padding: 0;
	}

	.banner uni-image {
		position: absolute;
		width: 135px;
		right: 8px;
		bottom: 24px;
		z-index: 1;
	}

	.banner>uni-view>uni-label {
		font-size: 16px;
		margin-left: 5px;
	}

	.topic {
		height: 55px;
		display: flex;
		background: url(/static/image/topic_bg.png) no-repeat;
		background-size: auto;
		background-size: 100% 100%;
		margin: 0 14px;
		margin-top: 0px;
		align-items: center;
		justify-content: space-between;
		margin-top: 15px;
	}

	.topic .wd {
		width: 100%;
		height: 30px;
		margin: 0 18px 0 8px;
		font-size: 14px;
		color: #333;
		line-height: 30px;
	}

	.topic .gf {
		width: 30px;
		height: 25px;
		background: url(/static/image/icon_17.png) no-repeat 50%;
		background-size: auto;
		background-size: cover;
		margin-left: 14px;
		opacity: .85;
	}

	.topic .gd {
		width: 25px;
		height: 20px;
		background: url(/static/image/icon_18.png) no-repeat 50%;
		background-size: auto;
		background-size: cover;
		margin-right: 14px;
		opacity: .85;
	}

	.tabs {
		display: flex;
		padding-top: 14px;
		flex-direction: column;
	}

	.tabs>ul {
		list-style: none;
		margin: 0;
		padding: 0;
		text-align: center;
	}

	.tabs>ul>li {
		width: 33.33333%;
		float: left;
		background: #fff;
		padding-bottom: 32px;
	}

	.tabs>ul>li>uni-image {
		width: 40%;
		margin: auto;
	}

	.home {
		background: #f6f6f6;
		padding: 14px;
	}

	.home .amount {
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.home .amount .item {
		overflow: hidden;
		width: 100%;
		height: 100px;
		padding: 16px 0;
		background: #fff;
		border-radius: 10px;
		text-align: left;
		position: relative;
		box-sizing: border-box;
	}

	.home .amount .item>uni-image {
		width: 90px;
		text-align: center;
		position: absolute;
		left: 5px;
	}

	.home .amount .item>p {
		margin-top: 6px;
		text-indent: 110px;
	}

	.home .amount .item>p.name {
		font-weight: 700;
		font-size: 16px;
	}

	.home .amount .item>p.small {
		font-size: 12px;
		color: #999;
		margin-bottom: 6px;
	}

	.home .amount .item>em {
		font-style: normal;
		min-height: 32px;
		font-size: 16px;
		font-weight: 700;
		color: #b73e31;
		line-height: 1;
		text-indent: 110px;
		display: block;
	}

	.home .amount .item>em>i {
		font-size: 11px;
		margin-left: 5px;
		color: #2a2a2a;
		font-weight: 400;
		font-style: normal;
	}

	.home .amount .item:last-child {
		margin-top: 10px;
	}

	.home .join {
		overflow: hidden;
		width: 100%;
		background: #fff;
		border-radius: 10px;
		margin-top: 16px;
		padding: 16px 19px;
		text-align: center;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.home .join>h2 {
		text-align: center;
		padding-top: 6px;
		font-size: 20px;
		color: #2a2a2a;
		font-weight: 700;
		line-height: 1;
		margin-bottom: 15px;
	}

	.home .join>p {
		font-size: 13px;
		color: #999;
		margin-bottom: 12px;
	}

	.home .join>uni-image {
		width: 75%;
		margin: auto;
	}

	.home .join>uni-button {
		margin: 18px auto 18px auto;
		display: inline-block;
		width: 144px;
		height: 33px;
		line-height: 33px;
		border-radius: 16px;
		outline: 0;
		background: linear-gradient(270deg, #741e15, #b73e31);
		font-size: 16px;
		color: #fff;
		font-weight: 500;
		cursor: pointer;
	}

	.home .data {
		overflow: hidden;
		margin-top: 16px;
		box-sizing: border-box;
	}

	.home .data>h2 {
		display: block;
		text-align: center;
		margin-bottom: 64px;
		margin-top: 22px;
		font-size: 20px;
		color: #2a2a2a;
		font-weight: 700;
		line-height: 1;
	}

	.home .data>ul {
		width: 100%;
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		justify-content: space-between;
	}

	.home .data>ul>li {
		width: 48%;
		display: flex;
		flex-direction: column;
		position: relative;
		background: #fff;
		border-radius: 10px;
		text-align: center;
		padding-top: 64px;
		height: 150px;
		box-sizing: border-box;
	}

	.home .data>ul>li>uni-image {
		position: absolute;
		z-index: 1;
		width: 100px;
		left: 50%;
		margin-left: -50px;
		top: -44px;
	}

	.home .data>ul>li>p.tit {
		font-size: 14px;
		color: #2a2a2a;
	}

	.home .data>ul>li>p.val {
		margin-top: 16px;
		font-size: 23px;
		font-weight: 700;
		color: #b73e31;
		line-height: 1;
		overflow: hidden;
	}

	.home .info {
		overflow: hidden;
		width: 100%;
		background: #fff;
		border-radius: 10px;
		margin-top: 16px;
		padding: 16px 19px;
		text-align: center;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.home .info>h2 {
		text-align: center;
		padding-top: 6px;
		font-size: 20px;
		color: #2a2a2a;
		font-weight: 700;
		line-height: 1;
		margin-bottom: 15px;
	}

	.home .info>h3 {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 6px;
	}

	.home .info>p {
		font-size: 13px;
		color: #999;
		margin-bottom: 12px;
		text-align: left;
		line-height: 1.5;
		padding: 6px 12px;
	}

	.home .info>uni-image {
		width: 85%;
		margin: auto;
		margin-bottom: auto;
		margin-bottom: 22px;
	}

	.home .glob {
		overflow: hidden;
		width: 100%;
		background: #fff;
		border-radius: 10px;
		margin-top: 16px;
		padding: 16px 12px;
		text-align: center;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.home .glob {
		overflow: hidden;
		width: 100%;
		background: #fff;
		border-radius: 10px;
		margin-top: 16px;
		padding: 16px 12px;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.home .glob>ul {
		width: 100%;
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.home .glob>ul>li {
		overflow: hidden;
		width: 28%;
		box-sizing: border-box;
	}

	.home .glob>ul>li>uni-image {
		width: 100%;
	}

	.home .glob>h2 {
		text-align: center;
		padding-top: 6px;
		font-size: 20px;
		color: #2a2a2a;
		font-weight: 700;
		line-height: 1;
		margin-bottom: 15px;
	}
</style>
