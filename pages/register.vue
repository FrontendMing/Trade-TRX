<template>
	<view class="passport">
		<header-bar :tabName="$t('system.register')"></header-bar>
		<view class="container">
			<view class="banner">
				<image src="/static/image/passport_bg.png"></image>
			</view>
			<view class="content">
				<view class="items">
					<view class="item">
						<view class="icon">
							<uni-icons type="email" size="22"></uni-icons>
						</view>
						<view class="text">
							<input v-model="form.email" type="text" :placeholder="$t('forgot.mailaddr')" />
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<uni-icons type="locked" size="22"></uni-icons>
						</view>
						<view class="text">
							<input v-if="loginPassType" v-model="form.loginPass" type="password" :placeholder="$t('login.logpass')"/>
							<input v-else v-model="form.loginPass" type="text" maxlength="32" :placeholder="$t('login.logpass')"/>
						</view>
						<view class="show">
							<uni-icons type="eye" size="22" @click="loginPassType = !loginPassType"></uni-icons>
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<uni-icons type="locked" size="22"></uni-icons>
						</view>
						<view class="text">
							<input v-if="safePassType" v-model="form.safePass" type="password" :placeholder="$t('regi.safepass')"/>
							<input v-else v-model="form.safePass" type="text" maxlength="32" :placeholder="$t('regi.safepass')"/>
						</view>
						<view class="show">
							<uni-icons type="eye" size="22" @click="safePassType = !safePassType"></uni-icons>
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<uni-icons type="mail-open" size="22"></uni-icons>
						</view>
						<view class="text">
							<input v-model="form.inviteCode" type="text" maxlength="6" :placeholder="$t('regi.invitecode')"/>
						</view>
					</view>
					<view class="item noline">
						<button class="btn a" type="default" @click="register">{{$t('regi.reg')}}</button>
					</view>
					<view class="item noline">
						<button class="txt a" type="default" @click="login">{{$t('regi.log')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBar from '@/components/HeaderBar.vue'
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import { validateEmail, validatepwd, } from '@/utils/validate.js'
	export default {
		components: {
			HeaderBar, uniIcons
		},
		data() {
			return {
				loginPassType: true,
				safePassType: true,
				form: {
					email: '',
					loginPass: '',
					safePass: '',
					inviteCode: '',
				}
			}
		},
		onLoad(option) {
			this.form.inviteCode = option.code
		},
		methods: {
			async register() {
				const emailBool = validateEmail(this.form.email)
				if (!emailBool) {
					return uni.showToast({
						title: this.$t('regi.validemail'),
						icon: 'error'
					})
				}
				const loginPwdBool = validatepwd(this.form.loginPass)
				if (!loginPwdBool) {
					return uni.showToast({
						title: this.$t('regi.validpass'),
						icon: 'error'
					})
				}
				const safePwdBool = validatepwd(this.form.safePass)
				if (!safePwdBool) {
					return uni.showToast({
						title: this.$t('regi.validsafepass'),
						icon: 'error'
					})
				}
				if (this.form.inviteCode === '') {
					return uni.showToast({
						title: this.$t('regi.validinvitecode'),
						icon: 'error'
					})
				}
				await this.$api.register(this.form)
				uni.showToast({
					title: this.$t('regi.succ'),
					icon: 'success',
					complete:function(){
						setTimeout(() => {
							uni.redirectTo({
								url:'/pages/login'
							})
						}, 1500)
					}
				})
			},
			login (){
				uni.navigateTo({
					url:'/pages/login'
				})
			}
		}
	}
</script>

<style scoped>
.passport .container {
	position: relative;
	z-index: 2;
	overflow: hidden;
	left: 0;
	min-height: 100vh;
	top: 0;
	width: 100%;
	padding: 0;
}

.banner {
	position: absolute;
	width: 100%;
	margin: auto;
	text-align: center;
	top: 75px;
}

.banner image {
	width: 70%;
}

.content {
	margin-top: 225px;
	background: #fff;
	border-radius: 24px 24px 0 0;
	min-height: calc(100vh - 225px);
	position: relative;
	z-index: 9;
	background-image: url(/static/image/passport_form_bg.png);
	background-repeat: no-repeat;
	background-position: 100% 100%;
	background-size: 45%;
}

.container .items {
	padding: 48px;
}

.bottomlink {
	position: absolute;
	bottom: 32px;
	right: 32px;
	font-weight: 500;
	font-size: 14px;
	color: #b73e31;
}

.passport .item {
	display: flex;
	height: 40px;
	border-bottom: 1px solid rgba(80,80,80,.15);
	width: 100%;
	align-items: center;
	margin-bottom: 20px;
	position: relative;
}

.passport .item .icon {
	width: 30px;
}

.passport .item .icon>uni-text {
	font-size: 19px;
	color: #333;
}

.uc-email::before {
	content: "\e68b";
}

.passport .item .text {
	width: 100%;
	position: relative;
}

.passport .item .text>uni-input {
	font-size: 16px;
}

.passport .item .show {
	position: absolute;
	right: 0;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	z-index: 8;
	background: #fff;
}

.passport .item .show>uni-text {
	font-size: 19px;
	color: #666;
}

.uc-lock::before {
	content: "\e6c0";
}

.uc-eye_close::before {
	content: "\e66f";
}

.uc-eye_open::before {
	content: "\e681";
}

.passport .item.ra {
	font-size: 14px;
	font-weight: 500;
	color: #666;
}

.passport .item.noline {
	border-bottom: 0;
}

.passport .item uni-switch {
	-webkit-transform: scale(.7);
	transform: scale(.7);
	margin-left: -8px;
}

.passport .item uni-button.btn {
	border: 0;
	background: linear-gradient(1turn,#741e15,#b73e31);
	color: #fff;
	box-shadow: 1px 1px 3px rgba(0,0,0,.25);
	border: 1px solid #b73e31;
}

.passport .item uni-button {
	width: 100%;
	height: 44px;
	line-height: 44px;
	border-radius: 22px;
	outline: none;
	font-size: 20px;
	font-weight: 700;
	border: none;
}

.passport .item uni-button::after {
	border: 0;
}

.passport .item uni-button.txt {
	background: none;
	font-size: 18px;
}

uni-button::after {
	content: " ";
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border: 1px solid rgba(0,0,0,.2);
	-webkit-transform: scale(.5);
	transform: scale(.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	box-sizing: border-box;
	border-radius: 10px;
}

.passport {
	background: linear-gradient(270deg,#741e15,#b73e31);
	min-height: 100vh;
	position: relative;
	max-width: 720px;
	margin: auto;
}
</style>
