<template>
	<view>
		<header-back :name="$t('reset.resetpass')" :hasBack="false"></header-back>
		<view class="dapp">
			<view class="modify">
				<view class="inbox">
					<view  class="security">
						<input type="password" maxlength="20" v-model="form.password" :placeholder="$t('reset.newpass')">
					</view>
					<view class="security">
						<input type="password" maxlength="20" v-model="againPass" :placeholder="$t('reset.confirmpass')">
					</view>
					<view class="button">
						<button @click="submitForm">{{$t('reset.confirm')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import { validatepwd, } from '@/utils/validate.js'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				form: {
					password: '',
					auth: '',
				},
				againPass: '',
			}
		},
		onLoad(option) {
			this.form.auth = option.auth
		},
		methods: {
			verifyForm() {
				const newPwdBool = validatepwd(this.form.newPass)
				if (!newPwdBool) {
					uni.showToast({
						title: this.$t('reset.validpass'),
						icon: 'error'
					})
					return false
				}
				const againPwdBool = validatepwd(this.againPass)
				if (!againPwdBool) {
					uni.showToast({
						title: this.$t('reset.repeatpass'),
						icon: 'error'
					})
					return false
				}
				if (this.form.newPass !== this.againPass) {
					uni.showToast({
						title: this.$t('reset.passdiff'),
						icon: 'error'
					})
					return false
				}
				return true
			},
			// 提交
			async submitForm() {
				// 重置密码
				if (!this.verifyForm()) return
				await this.$api.resetPassword(this.form)
				uni.showToast({
					title: this.$t('reset.succ'),
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
