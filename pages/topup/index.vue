<template>
	<view>
		<header-back :name="$t('topu.deposit')"></header-back>
		<view class="deposit">
			<view v-if="!currentTab" class="choose">
				<view class="base" @click="switchTab(1)">
					<view class="icon">
						<image src="/static/image/base.png" mode="widthFix"></image>
					</view>
					<view class="name">{{$t('topu.tobasacc')}}</view>
				</view>
				<view class="pomo" @click="switchTab(2)">
					<view class="icon">
						<image src="/static/image/pomo.png" mode="widthFix"></image>
					</view>
					<view class="name">{{$t('topu.toproacc')}}</view>
				</view>
			</view>
			<view v-if="!currentTab" class="notes">
				<view class="tit">{{$t('topu.twomodes')}}</view>
				<view class="txt">{{$t('topu.mode1')}}</view>
				<view class="txt">{{$t('topu.mode2')}}</view>
				<view class="txt">{{$t('topu.notes')}}<p>{{$t('topu.notedetail')}}</p>
				</view>
			</view>
			<!-- 二维码页 -->
			<view v-if="currentTab">
				<view class="qrcode">
					<view class="img">
						<uqrcode ref="uQRCode" :text="userInfo.walletAddress" :size="138"/>
					</view>
					<p>{{$t('topu.address')}}</p>
				</view>
				<view class="address">
					<view class="sadd">
						<input type="text" :value="userInfo.walletAddress" disabled/>
						<view class="btn" @click="copyText">{{$t('topu.copyaddr')}}</view>
					</view>
					<view class="stip">
						<p>{{$t('topu.dont')}}</p>
						<p class="red">{{$t('topu.refresh')}}</p>
					</view>
				</view>
				<view class="realpush">
					<button @click="submit">{{$t('topu.complete')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import uqrcode from '@/components/uqrcode/uqrcode.vue'
	import { copyText, } from '@/utils/index.js'
	export default {
		components: {
			HeaderBack,
			uqrcode,
		},
		data() {
			return {
				userInfo: {},
				currentTab: null,
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			async getUserInfo() {
				const { data, } = await this.$api.getUserInfo()
				this.userInfo = data || {}
			},
			async copyText() {
				await copyText(this.userInfo.walletAddress)
				uni.showToast({
					title: this.$t('topu.copied'),
					icon: 'success'
				})
			},
			switchTab(tab) {
				this.currentTab = tab
			},
			async submit() {
				if (this.currentTab === 1) {
					await this.$api.rechargeBasic()
				} else {
					await this.$api.rechargeCommission()
				}
				uni.showToast({
					title: this.$t('topu.succ'),
					icon: 'success',
					complete: function() {
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/home/index'
							})
						}, 1500)
					}
				})
			}
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
