<template>
	<view>
		<header-back :name="$t('forgot.forgetpass')"></header-back>
		<view class="dapp">
			<view class="reset">
				<view class="items">
					<view class="item">
						<view class="icon">
							<uni-icons type="email" size="20"></uni-icons>
						</view>
						<view class="text">
							<input type="text" v-model="email" :placeholder="$t('forgot.mailaddr')"/>
						</view>
					</view>
					<view class="item noline">
						<button class="btn a" @click="submit">{{$t('forgot.submit')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	import { validateEmail, } from '@/utils/validate.js'
	export default {
		components: {
			HeaderBack,
			uniIcons
		},
		data() {
			return {
				email: '',
			}
		},
		methods: {
			async submit() {
				const emailBool = validateEmail(this.form.email)
				if (!emailBool) {
					uni.showToast({
						title: this.$t('login.cormail'),
						icon: 'error'
					})
					return false
				}
				const { data, } = await this.$api.sendEmailReset({ email: this.email, })
				uni.showToast({
					title: this.$t('forgot.succ'),
					icon: 'success',
					complete: function() {
						setTimeout(() => {
							uni.navigateTo({
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
.reset {
	display: block;
	padding-top: 44px;
}
.reset .items {
	background: #f0f3f7;
	padding: 33px 44px 8px 44px;
	border-radius: 22px 22px 0 0;
}
.reset .item {
	display: flex;
	height: 55px;
	border-bottom: 1px solid rgba(80,80,80,.15);
	width: 100%;
	align-items: center;
	margin-bottom: 27px;
	position: relative;
}
.reset .item .icon {
	width: 41px;
}
.reset .item .text {
	width: 100%;
	position: relative;
}
.reset .item .text .send {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	display: flex;
	align-items: center;
}
.reset .item .text .send>span {
	display: inline-block;
	height: 38px;
	line-height: 38px;
	font-size: 18px;
	padding: 0 19px;
	border-radius: 19px;
	background: #b73e31;
	color: #fff;
	font-weight: 500;
}
.reset .item.noline {
	border-bottom: 0;
}
.reset .item uni-button.btn {
	border: 0;
	background: linear-gradient(1turn,#741e15,#b73e31);
	color: #fff;
	box-shadow: 1px 2px 4px rgba(0,0,0,.25);
	border: 1px solid #b73e31;
}
.reset .item uni-button {
    width: 100%;
    height: 61px;
    line-height: 61px;
    border-radius: 30px;
    outline: none;
    font-size: 27px;
    font-weight: 700;
    border: none;
}
</style>
