<template>
	<view>
		<header-bar :tabName="$t('index.invite')"></header-bar>
		<view class="invite">
			<view class="qrcode">
				<view>
					<img src="/static/img/logo.07a51f2d.png" alt="">
				</view>
				<view>
					<text style="font-size: small;">{{$t('invite.invite-code')}}：{{inviteCode}}</text>
				</view>
				<view class="qrcode">
					<h3>{{$t('invite.invite-your-contacts')}}</h3>
					<p style="font-size: small;">{{$t('invite.invite-your-friends')}}</p>
				</view>
			</view>
			<view class="button">
				<button @click="goToInviteRules" size="mini">{{$t('invite.invite-rule')}}</button>
			</view>
			<view class="cpyurl">
				<image src="/static/image/share_code.png" style="width:74px;height:74px;" mode="aspectFit"></image>
				<h3>{{$t('invite.earnReward')}}</h3>
				<p>{{$t('invite.sharelink')}}</p>
				<view class="slink">
					<input type="text" :value="shareUrl" disabled/>
					<button type="default" size="mini" @click="copyLink">{{$t('invite.invite-copy-link')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
import { copyText, } from '@/utils/index.js'
export default {
	components: {
		HeaderBar
	},
    data() {
		return {
			inviteCode: '',
			shareUrl: ''
		}
    },
	async onShow() {
		const { data, } = await this.$api.getUserInviteCode()
		this.inviteCode = data?.code
		this.shareUrl = `${data?.domain}/pages/share?code=${this.inviteCode}`
	},
    methods: {
		goToInviteRules() {
			uni.navigateTo({
				url: '/pages/invite/rules/index'
			})
		},
		async copyLink() {
			await copyText(this.shareUrl)
			uni.showToast({
				title: this.$t('invite.copy'),
				icon: 'success'
			})
		}
    }
}
</script>

<style lang="scss" scoped>
.invite{
	padding: 16px;
	.qrcode {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-top: 32rpx;
	}
	.button {
		display: flex;
		flex-direction: column;
		margin: 24rpx;
	}
	.button>button {
		background: linear-gradient(1turn,#741e15,#b73e31);
		color: white;
		border-radius: 19px;
	}
	.cpyurl {
		color: white;
		background: url(/static/image/share_bg.png) no-repeat 50%;
		margin-top: 18px;
		background-size: 100% 100%;
		position: relative;
		height: 200px;
		&>image {
			position: absolute;
			top: -10px;
			right: 10px;
		}
		&>h3 {
			padding: 44px 0 0 34px;
		}
		>p {
			padding: 12px 0 0 34px;
		}
	}
	.slink {
		background: #fff;
		height: 44px;
		border-radius: 10px;
		margin: 24px 34px 0 34px;
		display: flex;
		align-items: center;
		position: relative;
		/deep/ .uni-input-wrapper{
			width: 60%;
			box-sizing: border-box;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		>input {
			width: 100%;
			text-indent: 12px;
			outline: 0;
			border: 0;
			font-size: 12px;
			color: #2a2a2a;
		}
		&>button {
			padding: 0;
			position: absolute;
			right: 7px;
			top: 7px;
			height: 31px;
			line-height: 31px;
			font-size: 12px;
			font-weight: 700;
			border-radius: 8px;
			border: 0;
			color: #fff;
			background: linear-gradient(1turn,#741e15,#b73e31);
			width: 81px;
		}
	}
}
</style>
