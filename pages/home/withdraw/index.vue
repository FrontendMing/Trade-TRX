<template>
	<view>
		<header-back :name="$t('提款')"></header-back>
		<view class="dapp">
			<view class="withdraw">
				<view class="inbox">
					<view v-if="currentTab === 'base'">
						<view class="account_name">{{$t("withdraw.basbalance")}}</view>
						<view class="time_service">{{$t("withdraw.24with")}}</view>
						<view class="balance">{{floatNum(basicData.basicAmount)}}</view>
						<view class="limit">
							{{$t("withdraw.dailylimit")}}
							<strong>{{floatNum(basicData.limitAmount)}}</strong>
							<label>TRX</label>
						</view>
						<view class="limit">
							{{$t("withdraw.lefttoday")}}
							<strong>{{floatNum(basicData.surplusAmount)}}</strong>
							<label>TRX</label>
							{{$t("withdraw.available")}}
						</view>
						<view class="switch">
							<span class="p" @click="goToSwitch(2)">{{$t("withdraw.toproacc")}}</span>
						</view>
					</view>
					<view v-if="currentTab === 'promotion'">
						<view class="account_name">{{$t("withdraw.probalance")}}</view>
						<view class="time_service">{{$t("withdraw.24with")}}</view>
						<view class="balance">{{floatNum(commissionData.commAmount)}}</view>
						<view class="limit">
							{{$t("widtdraw.withlimit")}}
							<strong>{{floatNum(commissionData.limitAmount)}}</strong>
							<label>TRX</label>
						</view>
						<view class="limit">
							{{$t("widtdraw.fixedamount")}}
							<strong>{{floatNum(commissionData.fixedAmount)}}</strong>
							<label>TRX</label>
						</view>
						<view class="switch">
							<span class="pp" @click="goToSwitch(1)">{{$t("widtdraw.tobasacc")}}</span>
						</view>
					</view>

					<view class="account_type">
						<select v-model="currentTab">
							<option value="base">{{$t("widtdraw.basaccount")}}</option>
							<option value="promotion">{{$t("widtdraw.proaccount")}}</option>
						</select>
					</view>
					<view class="number">
						<input type="digit" v-model="form.amount" :placeholder="$t('widtdraw.limit')">
					</view>
					<view class="received">{{$t('widtdraw.warn')}}</view>
					<view class="address">
						<textarea v-model="form.address" maxlength="300" :placeholder="$t('widtdraw.address')" />
					</view>
					<view class="security">
						<input type="password" v-model="form.safePass" :placeholder="$t('widtdraw.safeword')">
					</view>
					<view class="button">
						<button @click="submit">{{$t('widtdraw.confirm')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBack from '@/components/HeaderBack.vue'
import { validatepwd, } from '@/utils/validate.js'
import { floatNum, } from '@/utils/index.js'
export default {
	components: {
		HeaderBack
	},
	data() {
		return {
			currentTab: 'base',
			basicData: {
				basicAmount: 0,
				limitAmount: 0,
				surplusAmount: 0,
			},
			commissionData: {
				commAmount: 0,
				fixedAmount: 0,
				limitAmount: 0,
			},
			form: {
				address: '',
				amount: '',
				safePass: ''
			},
		}
	},
	onShow() {
		this.getUserBasic()
		this.getUserCommission()
	},
	methods: {
		floatNum,
		// 基础账户信息
		async getUserBasic() {
			const { data, } = await this.$api.getUserBasic()
			this.basicData = Object.assign(this.basicData, data || {})
		},
		// 佣金账户信息
		async getUserCommission() {
			const { data, } = await this.$api.getUserCommission()
			this.commissionData = Object.assign(this.commissionData, data || {})
		},
		goToSwitch(tab) {
			uni.navigateTo({
				url: `/pages/mine/switch/index?tab=${tab}`
			})
		},
		verifyForm() {
			const amount = this.form.amount * Math.pow(10, 4)
			// 校验提款金额
			if (
				amount < Math.pow(10, 3) ||
				amount > Math.pow(10, 10) ||
				amount > this.basicData.limitAmount
			) {
				uni.showToast({
					title: '取款金额错误',
					icon: 'error'
				})
				return false
			}
			// 校验地址
			if (this.form.address.replace(/^\s*|\s*$/g, '') === '') {
				uni.showToast({
					title: '地址不能为空',
					icon: 'error'
				})
				return false
			}
			// 校验安全密码
			const safePassBool = validatepwd(this.form.safePass)
			if (!safePassBool) {
				uni.showToast({
					title: '安全密码输入有误',
					icon: 'error'
				})
				return false
			}
			return true
		},
		async submit() {
			if (!this.verifyForm()) return

			if (this.currentTab === 'base') {
				await this.$api.refundBasic({
					...this.form,
					amount: this.form.amount * Math.pow(10, 4)
				})
			} else {
				await this.$api.refundCommission({
					...this.form,
					amount: this.form.amount * Math.pow(10, 4)
				})
			}
			uni.showToast({
				title: '提款成功',
				icon: 'success',
				complete: () => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/home/index'
						})
					}, 1500)
				}
			})
		}
	},
}
</script>

<style lang="scss" scoped>
	.dapp {
	  position: relative;
	  max-width: 720px;
	  margin: auto;
	  background-color: #fff;
	}


	.withdraw {
	  display: block;
	  padding-top: 32px;
	}

	.withdraw .inbox {
	  background: #f0f3f7;
	  padding: 16px;
	  border-radius: 16px;
	  text-align: center;
	}

	.withdraw .account_name {
	  font-size: 16px;
	  font-weight: 500;
	  margin-bottom: 8px;
	  color: #fb796b;
	}

	.withdraw .time_service {
	  color: red;
	  font-size: 14px;
	  font-weight: 500;
	}

	.withdraw .balance {
	  background: #fff;
	  color: #b73e31;
	  padding: 16px 0;
	  font-weight: 700;
	  font-size: 36px;
	  margin: 8px 0;
	  border-radius: 16px;
	}

	.withdraw .limit {
	  font-size: 13px;
	  color: #555;
	}

	.withdraw .switch {
	  display: block;
	  text-align: center;
	  margin-top: 8px;
	}

	.withdraw .limit strong {
	  margin: 0 4px;
	  color: #b73e31;
	  font-size: 15px;
	}

	.withdraw .limit > uni-label {
	  color: #777;
	}

	.withdraw .switch > span {
	  display: inline-block;
	  padding: 8px 18px;
	  border-radius: 16px;
	  font-size: 14px;
	  color: #fff;
	  font-weight: 500;
	  box-shadow: 1px 2px 5px hsla(0,0%,58.8%,.35);
	  &.p{
		  background: linear-gradient(270deg,#741e15,#b73e31);
	  }
	  &.pp{
		  background: linear-gradient(270deg,#741e15,#b73e31);
	  }
	}

	.withdraw .account_type {
	  margin: 24px 0 12px 0;
	}

	.withdraw .account_type select {
	  background: #fff;
	  border: 1px solid #ced4da;
	  width: 100%;
	  height: 33px;
	  border-radius: 16px;
	  text-indent: 12px;
	  outline: none;
	  font-size: 14px;
	  font-weight: 500;
	}

	.withdraw .number {
	  height: 33px;
	  display: flex;
	  width: 100%;
	  align-items: center;
	  background: #fff;
	  border-radius: 16px;
	  border: 1px solid #ced4da;
	}

	.withdraw .number > uni-input {
	  width: 100%;
	  font-size: 14px;
	  font-weight: 500;
	  outline: none;
	  text-align: left;
	  text-indent: 12px;
	}

	.withdraw .received {
	  color: red;
	  text-align: left;
	  text-indent: 12px;
	  padding: 4px 0 0 0;
	  font-size: 13px;
	}

	.withdraw .address {
	  height: 64px;
	  width: 100%;
	  align-items: center;
	  background: #fff;
	  border-radius: 16px;
	  border: 1px solid #ced4da;
	  margin-top: 12px;
	  overflow: hidden;
	}

	.withdraw .address > uni-textarea {
	  width: 100%;
	  font-size: 14px;
	  font-weight: 500;
	  outline: none;
	  text-align: left;
	  padding: 6px 12px 6px 12px;
	}

	.withdraw .security {
	  height: 33px;
	  display: flex;
	  width: 100%;
	  align-items: center;
	  background: #fff;
	  border-radius: 16px;
	  border: 1px solid #ced4da;
	  margin: 12px 0;
	}

	.withdraw .security > uni-input {
	  width: 100%;
	  font-size: 14px;
	  font-weight: 500;
	  outline: none;
	  text-align: left;
	  text-indent: 12px;
	}

	.withdraw .button > uni-button {
	  height: 42px;
	  border-radius: 42px;
	  background: linear-gradient(1turn,#741e15,#b73e31);
	  color: #fff;
	  font-weight: 500;
	  font-size: 16px;
	  transition: opacity .2s ease 0s;
	  cursor: pointer;
	}

	.withdraw .switch > span.p {
	  background: linear-gradient(270deg,#f8504e,#fc8b62);
	}
</style>
