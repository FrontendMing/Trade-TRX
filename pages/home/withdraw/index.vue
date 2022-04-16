<template>
	<view>
		<header-back :name="$t('提款')"></header-back>
		<view class="dapp">
			<view class="withdraw">
				<view class="inbox">
					<view class="account_name">{{$t("基础账户余额")}}</view>
					<view class="time_service">{{$t("24小时提款")}}</view>
					<view class="balance">{{userInfo.basicAmount}}</view>
					<view class="limit">
						{{$t("每日提款限额")}}
						<strong>{{userInfo.limitAmount}}</strong>
						<label for="">TRX</label>
					</view>
					<view class="switch">
						<span class="p" >{{$t("转到佣金账户")}}</span>
					</view>
					<view class="account_type">
						<select name="" id="">
							<option value="base">{{$t("基础账户")}}</option>
							<option value="promotion">{{$t("佣金账户")}}</option>
						</select>
					</view>
					<view class="number">
						<input type="text" placeholder="限额 0.1-1000000">
					</view>
					<view class="received">手续费: 0, 到账 0</view>
					<view class="address">
						<textarea value="" placeholder="地址（以T开头）" />
					</view>
					<view class="security">
						<input type="text" placeholder="请输入安全密码">
					</view>
					<view class="button">
						<button>确认</button>
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
				userInfo: {}
			}
		},
		methods: {
			async getUserInfo() {
				const { data, } = await this.$api.getUserInfo()
				this.userInfo = Object.assign({}, data || {})
			}
		},
		onLoad() {
			this.getUserInfo()
		}
	}
</script>
