<template>
	<view>
		<header-bar :tabName="userInfo.email || ''"></header-bar>
		<view class="mine">
			<view class="mine-content">
				<view class="logo">
					<image src="/static/image/mine_logo.png" mode="widthFix"></image>
				</view>
				<view class="level">
					<label class="level-label">{{userInfo.levelName}}</label>
				</view>
				<view class="balance">
					<span>{{$t('mine.totalBalance')}}:</span>
					<strong>{{floatNum((userInfo.basicAmount || 0) + (userInfo.commAmount || 0))}}</strong>
					<em>TRX</em>
				</view>
				<view class="rock">
					<view @click="topUp">
						<image src="/static/image/icon_5.png" mode="aspectFit" />
						<span>{{$t('mine.topUp')}}</span>
					</view>
					<view @click="withdraw">
						<image src="/static/image/icon_6.png" mode="aspectFit" />
						<span>{{$t('mine.withDraw')}}</span>
					</view>
				</view>
				<view class="quantity">
					<view class="word">
						<h2>{{$t('mine.depositQuantity')}}</h2>
						<p>{{$t('mine.basicAccount')}}</p>
						<h3><strong>{{floatNum(userInfo.basicAmount)}}</strong><label for="">TRX</label></h3>
						<p>{{$t('mine.promotionAccount')}}</p>
						<h3><strong>{{floatNum(userInfo.commAmount )}}</strong><label for="">TRX</label></h3>
						<p>{{$t('mine.anyAmount')}}</p>
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
	import {
		floatNum,
	} from '@/utils/index.js'
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
			serviceData() {
				return [	
					{
						name: this.$t('team.team'),
						img: '/static/image/tab_7.png',
						url: '/pages/team/index',
					},
					{
						name: this.$t('mine.financeRecord'),
						img: '/static/image/tab_8.png',
						url: '/pages/earn/index',
					},
					{
						name: this.$t('mine.fundsTransfer'),
						img: '/static/image/tab_9.png',
						url: '/pages/mine/switch/index?tab=1',
					},
					{
						type: 'invite',
						name: this.$t('index.invite'),
						img: '/static/image/tab_10.png',
						url: '/pages/invite/index',
					},
					{
						name: this.$t('invite.vip-level'),
						img: '/static/image/tab_17.png',
						url: '/pages/invite/rules/index',
					},
					{
						type: 'logout',
						name: this.$t('index.logout'),
						img: '/static/image/tab_12.png',
						url: null
					},
					{
						name: this.$t('mine.modiPass'),
						img: '/static/image/tab_14.png',
						url: '/pages/modify?type=login',
					},
					{
						name: this.$t('mine.modiSaPass'),
						img: '/static/image/tab_15.png',
						url: '/pages/modify?type=safe',
					},
					{
						name: this.$t('mine.setGoogle'),
						img: '/static/image/tab_16.png',
						url: '/pages/modify?type=google',
					},
				]
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			floatNum,
			// 获取用户信息
			async getUserInfo() {
				const {
					data,
				} = await this.$api.getUserInfo()
				this.userInfo = Object.assign({}, data || {})
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
					url: '/pages/home/withdraw/index'
				})
			},
			async handleJump({
				type,
				url,
			}) {
				// 登出
				if (type === 'logout') {
					await this.$api.logout()
					uni.clearStorageSync()
					uni.navigateTo({
						url: '/pages/login',
					})
				}
				// 邀请
				else if (type === 'invite') {
					uni.switchTab({
						url,
					})
				} else {
					uni.navigateTo({
						url,
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		background: #fff url(/static/image/mine_banner.png) no-repeat top;
		background-size: 100%;
		padding: 210px 16px 16px;
	
	&-content {
			box-sizing: border-box;
			margin-top: -100px;

			.logo {
				display: block;
				text-align: center;

				&>image {
					width: 119px;
				}
			}

			.level {
				justify-content: center;
				display: flex;
				align-items: center;

				&-label {
					padding: 3px 9px;
					background: linear-gradient(1turn, #741e15, #b73e31);
					color: #fff;
					border-radius: 12px;
					font-size: 14px;
					font-weight: 700;
				}
			}

			.balance {
				overflow: hidden;
				margin-top: 18px;
				justify-content: center;
				display: flex;
				align-items: center;

				&>strong {
					font-size: 22px;
					color: #b73e31;
					margin: 0 6px;
					line-height: 1;
				}

				&>span {
					color: #999;
					font-size: 15px;
					font-weight: 500;
				}

				&>em {
					font-style: normal;
					font-weight: 700;
					color: #2a2a2a;
					font-size: 15px;
				}
			}

			.rock {
				display: flex;
				width: 100%;
				align-items: center;
				padding: 10px 0;
				background: #fff4f4;
				border-radius: 10px;
				margin-top: 12px;

				&>view {
					flex: 1;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					transition: opacity .2s ease 0s;

					&>image {
						height: 38px;
						width: 32px;
					}

					&>span {
						margin-left: 6px;
						font-size: 15px;
						font-weight: 500;
					}
				}
			}

			.quantity {
				overflow: hidden;
				padding: 32px 18px 0 18px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				h2 {
					font-size: 16px;
					padding-bottom: 16px;
				}

				p {
					line-height: 1.5;
					color: #999;
					font-size: 13px;
				}

				h3 {
					padding-bottom: 16px;
					color: #b73e31;

					&>strong {
						font-size: 22px;
					}

					&>uni-label {
						font-size: 14px;
						margin-left: 6px;
					}
				}

				image {
					width: 207px;
				}
			}

			.service {
				overflow: hidden;
				padding: 12px 12px 0 12px;
				display: block;
				background: #ff575e;
				color: #fff;
				margin-top: 12px;
				border-radius: 12px;

				ul {
					display: flex;
					flex-wrap: wrap;
					align-items: flex-start;
					list-style: none;
					padding: 0;

					li {
						width: 33.333%;
						display: flex;
						flex-direction: column;
						text-align: center;
						align-items: center;
						padding: 16px 0;
						transition: opacity .2s ease 0s;
						cursor: pointer;

						image {
							width: 50%;
							height: 50%;
							margin: auto;
						}

						p {
							font-weight: 500;
							padding-top: 9px;
							font-size: 13px;
						}
					}
				}

				.box>ul>li>p {
					font-weight: 500;
					padding-top: 9px;
					font-size: 13px;
					min-height: 40px;
				}
			}
		}
	}
</style>
