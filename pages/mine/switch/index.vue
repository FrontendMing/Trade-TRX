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
						<view class="">佣金账户<p>0.00<label>TRX</label>
							</p>
							<view class="icon">
								<uni-icons type="forward" color="#fff" size="24"></uni-icons>
							</view>
						</view>
						<view>基础账户<p>926.10<label>TRX</label>
							</p>
						</view>
					</view>

					<view class="account" v-if="currentTab === '2'">
						<view class="s">基础账户<p>926.10<label>TRX</label>
							</p>转账限额<p>0.00<label>
									TRX</label>
							</p>
							<view class="icon">
								<uni-icons type="forward" color="#fff" size="24"></uni-icons>
							</view>
						</view>
						<view>佣金账户<p>0.00<label>TRX</label>
							</p>
						</view>
					</view>
					<view class="number">
						<input type="text" value="转换数量" />
						<view class="max"><span>全部</span></view>
					</view>
					<view class="security">
						<input type="password" placeholder="输入您的安全密码">
					</view>
					<view class="button">
						<button class="">确认</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				currentTab: '1',
			}
		},
		onLoad(option) {
			this.currentTab = option.tab || '1'
		},
		methods: {
			switchTab(tab) {
				this.currentTab = tab
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
