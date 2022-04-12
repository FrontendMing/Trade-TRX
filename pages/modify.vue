<template>
	<view>
		<header-back :name="$t('修改登录密码')"></header-back>
		<view class="dapp">
			<view class="withdraw">
				<view class="inbox">
					<view class="security">
						<input type="password" placeholder="旧登录密码">
					</view>
					<view class="security">
						<input type="password" placeholder="新登录密码">
					</view>
					<view class="security">
						<input type="password" placeholder="确认新密码">
					</view>
					<view class="emailcode">
						<input type="text" placeholder="邮件验证码">
						<view class="send">
							<span>发送</span>
						</view>
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

			}
		},
		methods: {

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
		padding-top: 44px;
	}

	.withdraw .inbox {
		background: #f0f3f7;
		padding: 22px;
		border-radius: 22px;
		text-align: center;
	}

	.withdraw .security {
		height: 45px;
		display: flex;
		width: 100%;
		align-items: center;
		background: #fff;
		border-radius: 22px;
		border: 1px solid #ced4da;
		margin: 16px 0;
	}

	.withdraw .security>input {
		width: 100%;
		font-size: 19px;
		font-weight: 500;
		outline: none;
		text-align: left;
		text-indent: 16px;
	}

	.withdraw .emailcode {
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

	.withdraw .emailcode .send {
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

	.withdraw .emailcode>input {
		width: 100%;
		font-size: 19px;
		font-weight: 500;
		outline: none;
		text-align: left;
		text-indent: 16px;
	}
	
	.withdraw .button>button {
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
