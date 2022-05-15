<template>
	<view>
		<header-back :name="tabName"></header-back>
		<view class="dapp">
			<view class="modify">
				<view class="inbox">
					<view v-if="type !== 'google'" class="security">
						<input type="password" maxlength="32" v-model="form.oldPass" :placeholder="$t('modi.oldpass')">
					</view>
					<view v-if="type !== 'google'" class="security">
						<input type="password" maxlength="32" v-model="form.newPass" :placeholder="$t('modi.newpass')">
					</view>
					<view v-if="type !== 'google'" class="security">
						<input type="password" maxlength="32" v-model="againPass" :placeholder="$t('modi.confirmpass')">
					</view>
					<view v-if="type === 'google'" class="emailcode">
						<input type="text" value="sadhfsa42321dfsjdiori24" disabled>
						<view class="send" @click="copyGoogleText">{{$t('modi.copy')}}</view>
					</view>
					<view v-if="type === 'google'" class="security">
						<input type="password" maxlength="32" v-model="googleCode" :placeholder="$t('modi.googlecode')">
					</view>
					<view class="emailcode">
						<input type="number" maxlength="6" v-model="form.code" :placeholder="$t('modi.mailcode')">
						<view class="send" @click="sendEmailCode">{{$t('modi.send')}}</view>
					</view>
					<view class="button">
						<button @click="submitForm">{{$t('modi.confirm')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import { validatepwd, } from '@/utils/validate.js'
	import { copyText, } from '@/utils/index.js'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				type: 'login',
				form: {
					oldPass: '',
					newPass: '',
					code: '',
				},
				againPass: '',
				googleCode: ''
			}
		},
		computed: {
			tabName({ type, }) {
				return type === 'login'
							? this.$t('modi.loginpass')
							: type === 'safe'
								? this.$t('modi.safepass') : this.$t('modi.setgoogle')
			},
			oldPwdPlaceholder({ type, }) {
				return type === 'login'
							? this.$t('modi.oldlogpass')
							: type === 'safe'
								? this.$t('modi.oldsafpass') : ''
			},
			newPwdPlaceholder({ type, }) {
				return type === 'login'
							? this.$t('modi.newlogpass')
							: type === 'safe' ? this.$t('modi.newsafpass') : ''
			},
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			async copyGoogleText() {
				await copyText(this.shareUrl)
				uni.showToast({
					title: this.$t('modi.copy'),
					icon: 'success'
				})
			},
			// 发送邮箱验证码
			async sendEmailCode() {
				await this.$api.sendEmailCode({
					op: this.type === 'login' ? 1 : this.type === 'safe' ? 2 : 4,
					code: this.form.code,
				})
				uni.showToast({
					title: this.$t('modi.mailcodesuc'),
					icon: 'success'
				})
			},
			verifyForm() {
				const oldPwdBool = validatepwd(this.form.oldPass)
				if (!oldPwdBool) {
					uni.showToast({
						title: this.$t('modi.oldpasswrong'),
						icon: 'error'
					})
					return false
				}
				const newPwdBool = validatepwd(this.form.newPass)
				if (!newPwdBool) {
					uni.showToast({
						title: this.$t('modi.newpassvalid'),
						icon: 'error'
					})
					return false
				}
				const againPwdBool = validatepwd(this.againPass)
				if (!againPwdBool) {
					uni.showToast({
						title: this.$t('modi.confirmnewpass'),
						icon: 'error'
					})
					return false
				}
				if (this.form.newPass !== this.againPass) {
					uni.showToast({
						title: this.$t('modi.newpassdiff'),
						icon: 'error'
					})
					return false
				}
				if (!this.form.code) {
					return uni.showToast({
						title: this.$t('modi.mailcode'),
						icon: 'error'
					})
					return false
				}
				return true
			},
			// 提交
			async submitForm() {
				// 修改登录密码
				if (this.type === 'login') {
					if (!this.verifyForm()) return
					await this.$api.modifyLoginPassword(this.form)
					uni.showToast({
						title: this.tabName,
						complete: function() {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/login'
								})
							}, 1500);
						}
					})
				}
				// 修改安全密码
				else if (this.type === 'safe') {
					if (!this.verifyForm()) return
					await this.$api.modifySafePassword(this.form)
					uni.showToast({
						title: this.tabName,
						complete: function() {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/login'
								})
							}, 1500);
						}
					})
				}
				// 设置谷歌验证码
				else {
					if (!this.googleCOde || (this.form.googleCOde && this.form.googleCOde.length < 6)) {
						uni.showToast({
							title: this.$t('modi.googlecodewrong'),
							icon: 'error'
						})
						return false
					}
					if (!this.form.code || (this.form.code && this.form.code.length < 6)) {
						return uni.showToast({
							title: this.$t('modi.mailcodewrong'),
							icon: 'error'
						})
					}
					await this.$api.modifySafePassword(this.form)
					uni.showToast({
						title: this.tabName,
						complete: function() {
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/login'
								})
							}, 1500);
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
.dapp {
	position: relative;
	max-width: 720px;
	margin: auto;
	background-color: #fff;
}
.modify {
	display: block;
	padding-top: 44px;
}
.modify .inbox {
	background: #f0f3f7;
	padding: 22px;
	border-radius: 22px;
	text-align: center;
}
.modify .security {
	height: 45px;
	display: flex;
	width: 100%;
	align-items: center;
	background: #fff;
	border-radius: 22px;
	border: 1px solid #ced4da;
	margin: 16px 0;
}
.modify .security>input {
	width: 100%;
	font-size: 19px;
	font-weight: 500;
	outline: none;
	text-align: left;
	text-indent: 16px;
}
.modify .emailcode {
	height: 45px;
	display: flex;
	width: 100%;
	align-items: center;
	background: #fff;
	border-radius: 22px;
	border: 1px solid #ced4da;
	margin: 16px 0;
	position: relative;
}
.modify .emailcode .send {
	position: absolute;
	right: 0;
	top: 0;
	height: 42px;
	line-height: 42px;
	color: #fff;
	border-radius: 22px;
	background: #b73e31;
	min-width: 83px;
	padding: 0 22px;
	font-size: 19px;
	font-weight: 500;
	box-sizing: border-box;
}
.modify .emailcode>input {
	width: 100%;
	font-size: 19px;
	font-weight: 500;
	outline: none;
	text-align: left;
	text-indent: 16px;
}
.modify .button>button {
	height: 58px;
	border-radius: 42px;
	background: linear-gradient(1turn,#741e15,#b73e31);
	color: #fff;
	font-weight: 500;
	font-size: 22px;
	transition: opacity .2s ease 0s;
	cursor: pointer;
}
</style>
