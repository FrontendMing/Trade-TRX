<template>
	<view>
		<header-bar :tabName="$t('index.invite')"></header-bar>
		<view class="container">
			<view class="qrcode">
				<view>
					<img src="/static/img/logo.07a51f2d.png" alt="">
				</view>
				<view><text style="font-size: small;">邀请码：</text></view>
				<view class="qrcode"><h3>邀请您的联系人</h3><p style="font-size: small;">或朋友并赚取奖励</p></view>
			</view>
			<view class="button">
				<button @click="showModel" size="mini">邀请规则</button>
			</view>
			<view class="cpyurl">
				<image src="/static/image/share_code.png" style="width:74px;height:74px;" mode="aspectFit"></image>
				<h3>推荐并赚取奖励</h3>
				<p>分享您的推荐链接并开始赚钱</p>
				<view class="slink">
					<input type="text" value="邀请链接"/>
					<button type="default" size="mini">复制链接</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
export default {
	components: {
		HeaderBar
	},
    data() {
		return {}
    },
    methods: {
		showModel() {
			uni.showModal({
				content: this.$t('api.message'),
				success: (res) => {
					console.log(res);
				}
			})
		}
    }
}
</script>

<style>
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
}
.cpyurl>image {
	position: absolute;
	top: -10px;
	right: 10px;
}
.cpyurl>h3 {
	padding: 44px 0 0 34px;
	
}
.cpyurl>p {
	padding: 12px 0 0 34px;
}
.slink {
	background: #fff;
	height: 44px;
	border-radius: 10px;
	margin: 24px 34px 0 34px;
	display: flex;
	align-items: center;
	position: relative;
}
.slink>input {
	width: 100%;
	text-indent: 12px;
	outline: 0;
	border: 0;
	font-size: 12px;
	color: #2a2a2a;
}
.slink>button {
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
</style>
