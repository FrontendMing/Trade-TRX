<template>
	<view>
		<header-back :name="$t('资金转账')"></header-back>
		<view class="dapp">
			<view class="withdraw">
				<view class="inbox">
					<view class="tantab">
						<view :class="{'cur' : currentTab === '1'}" @click="switchTab('1')">转到基础账户</view>
						<view :class="{'cur' : currentTab === '2'}" @click="switchTab('2')">转到佣金账户</view>
					</view>
					<view class="account" v-if="currentTab === '1'">
						<view class="">佣金账户<p>{{floatNum(commissionData.commAmount)}}<label>TRX</label>
							</p>
							<view class="icon">
								<uni-icons type="forward" color="#fff" size="24"></uni-icons>
							</view>
						</view>
						<view>基础账户<p>{{floatNum(basicData.basicAmount)}}<label>TRX</label>
							</p>
						</view>
					</view>

					<view class="account" v-if="currentTab === '2'">
						<view class="s">基础账户<p>{{floatNum(basicData.basicAmount)}}<label>TRX</label>
							</p>转账限额<p>{{floatNum(basicData.surplusAmount)}}<label>TRX</label>
							</p>
							<view class="icon">
								<uni-icons type="forward" color="#fff" size="24"></uni-icons>
							</view>
						</view>
						<view>佣金账户
							<p>{{floatNum(commissionData.commAmount)}}<label>TRX</label></p>
						</view>
					</view>
					<view class="number">
						<input type="number" v-model="amount" placeholder="转换数量"/>
						<view class="max" @click="getNum">全部</view>
					</view>
					<view class="security">
						<input type="password" v-model="password" maxlength="32" placeholder="输入您的安全密码">
					</view>
					<view class="button">
						<button @click="submit">确认</button>
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
				currentTab: '1',
				amount: this.floatNum(0),
				password: '',
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
			}
		},
		onLoad(option) {
			this.currentTab = option.tab || '1'
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
			switchTab(tab) {
				this.currentTab = tab
				this.amount = this.floatNum(0)
			},
			// 全部
			getNum() {
				if (this.currentTab === '1') {
					this.amount = this.floatNum(this.commissionData.commAmount)
				} else {
					const num = Math.min(this.basicData.basicAmount, this.basicData.surplusAmount)
					this.amount = this.floatNum(num)
				}
			},
			async submit() {
				if (this.amount === 0.0000) {
					uni.showToast({
						title: '请输入转账资金',
						icon: 'error'
					})
					return false
				}
				const passwordBool = validatepwd(this.password)
				if (!passwordBool) {
					uni.showToast({
						title: '安全密码输入有误',
						icon: 'error'
					})
					return false
				}
				if (this.currentTab === '1') {
					await this.$api.comm2basic({
						amount: this.amount * Math.pow(10, 4),
						password: this.password,
					})
				} else {
					await this.$api.basic2comm({
						amount: this.amount * Math.pow(10, 4),
						password: this.password,
					})
				}
				uni.showToast({
					title: '转账成功',
					icon: 'success',
					complete: () => {
						this.getUserBasic()
						this.getUserCommission()
					}
				})
			}
		}
	}
</script>

<style>
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
	
	.withdraw .tantab {
	  display: flex;
	  height: 36px;
	  margin-bottom: 12px;
	  justify-content: space-between;
	  line-height: 36px;
	  border-bottom: 2px solid #b73e31;
	  border-radius: 8px;
	  overflow: hidden;
	}
	
	.withdraw .tantab > uni-view {
	  width: 100%;
	  text-align: center;
	  background: #fff;
	  font-weight: 500;
	  font-size: 12px;
	  overflow: hidden;
	  cursor: pointer;
	  white-space: nowrap;
	}
	
	.withdraw .tantab > uni-view.cur {
	  font-size: 13px;
	  background: #b73e31;
	  color: #fff;
	}
	
	.withdraw .account {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 12px;
	}
	
	.withdraw .account > uni-view {
	  background: #fff;
	  width: 48%;
	  border-radius: 16px;
	  padding: 16px 0;
	  color: #999;
	  font-size: 13px;
	  position: relative;
	}
	
	.withdraw .account > uni-view > p {
	  padding-top: 16px;
	  font-size: 16px;
	  font-weight: 500;
	  color: #b73e31;
	}
	
	.withdraw .account > uni-view.s > p {
	  padding: 3px 0;
	}
	
	.withdraw .account > uni-view > p > uni-label {
	  color: #2a2a2a;
	  font-size: 13px;
	  margin-left: 6px;
	}
	
	.withdraw .account > uni-view:first-child > .icon {
	  position: absolute;
	  width: 33px;
	  height: 33px;
	  background: #b73e31;
	  top: 50%;
	  margin-top: -16px;
	  right: 0;
	  margin-right: -22px;
	  z-index: 222;
	  border-radius: 50%;
	  line-height: 33px;
	  box-shadow: 1px 1px 5px hsla(0,0%,39.2%,.5);
	}
	
	.withdraw .account > uni-view:first-child > .icon > uni-text {
	  font-size: 18px;
	  color: #fff;
	  font-weight: 700;
	}
	
	.withdraw .number {
	  height: 33px;
	  display: flex;
	  width: 100%;
	  align-items: center;
	  background: #fff;
	  border-radius: 16px;
	  border: 1px solid #ced4da;
	  position: relative;
	}
	
	.withdraw .number > uni-input {
	  width: 100%;
	  font-size: 14px;
	  font-weight: 500;
	  outline: none;
	  text-align: left;
	  text-indent: 12px;
	}
	
	.withdraw .number .max {
	  position: absolute;
	  right: 0;
	  top: 0;
	  height: 31px;
	  line-height: 31px;
	  color: #fff;
	  border-radius: 16px;
	  background: #b73e31;
	  min-width: 60px;
	  padding: 0 16px;
	  font-size: 14px;
	  font-weight: 500;
	  display: block;
	  box-sizing: border-box;
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
	
	.withdraw .number .max span {
		box-sizing: border-box;
	}
</style>
