<template>
	<view>
		<view :style="style">
			<view class="header" :style="{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}">
				<view class="header-logo">
					<image mode="heightFix" src="../static/image/logo.png"/>
					<text>{{tabName}}</text>
				</view>
				<view class="header-info">
					<button plain size="mini" @click="changeLanguage">{{languageName}}</button>
					<view class="header-info-icon" @click="toNotice">
						<uni-icons type="notification-filled" size="26"></uni-icons>
					</view>
					<view class="header-info-icon">
						<uni-icons type="headphones" size="26"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="popup-dialog">
				<view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
					<text class="text">{{item.text}}</text>
					<uni-icons type="checkmarkempty" size="20" color="green" v-if="item.code == localeCode"></uni-icons>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
const LANG_TYPE = {
	'zh-Hans': 'zh_cn',
	'zh-Hant': 'zh_hk',
	'en': 'en'
}
export default {
	props: {
		tabName: {
			type: String,
			required: true,
		},
		refreshNotice: {
			type: Boolean,
			default: true,
		}
	},
	data() {
		return {
			statusBarH: this.statusBar,
			customBarH: this.customBar,
		}
	},
	computed: {
		locales() {
			return [
				{
					text: this.$t('locale.en'),
					code: 'en'
				},
			    {
					text: this.$t('locale.zh-hans'),
					code: 'zh-Hans'
			    },
			    {
					text: this.$t('locale.zh-hant'),
					code: 'zh-Hant'
			    },
			]
        },
		localeCode() {
			return uni.getLocale();
		},
		languageName({ locales, localeCode, }) {
			const tar = locales.find(it => it.code === localeCode);
			return tar?.text || '';
		},
		style() {
			let _style = `height: ${this.customBarH}px;`
			return _style
		}
	},
	created() {
		this.refreshNotice && this.getNoticeData()
	},
	methods: {
		// 获取 通知信息
		getNoticeData() {
			this.$api.getPlatformNotices({
				lang: LANG_TYPE[this.localeCode],
			}).then(res => {
				console.log(res)
			})
		},
		changeLanguage() {
			this.$refs.popup.open();
		},
		onLocaleChange(e) {
			uni.setLocale(e.code);
			this.$i18n.locale = e.code;
			this.$refs.popup.close();
		},
		toNotice() {
			uni.navigateTo({
				url: '/pages/notice/index'
			})
		}
	}
}
</script>

<style lang="scss">
.header{
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 12px;
	margin: 0;
	width: 100%;
	max-width: 750px;
	background-color: #fff;
	position: fixed;
	z-index: 10;
	&-logo{
		display: flex;
		align-items: center;
		image{
			width: 40px;
			height: 40px;
			margin-right: 5px;
		}
	}
	&-info{
		display: flex;
		align-items: center;
		button{
			border-radius: 15px;
			margin-bottom: 0;
		}
		&-icon{
			margin-left: 10px;
		}
	}
}

.popup-dialog{
	width: 50vw;
	height: 170px;
	padding: 10px 20px;
	border-radius: 11px;
	box-sizing: border-box;
}
.locale-item{
	width: 100%;
    font-size: 14px;
	line-height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
