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
						<uni-icons type="notification-filled" color="#fff" size="18"></uni-icons>
						<span class="tip-circle"></span>
					</view>
					<view class="header-info-icon">
						<uni-icons type="headphones" color="#fff" size="18"></uni-icons>
						<span class="tip-circle"></span>
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
		// this.refreshNotice && this.getNoticeData()
	},
	methods: {
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

<style lang="scss" scoped>
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
		text {
			font-size: 18px;
			font-weight: bold;
			max-width: 140px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	&-info{
		display: flex;
		align-items: center;
		button{
			border-radius: 15px;
			margin-bottom: 0;
			color: #b73e31;
			border: 1px solid #b73e31;
			padding: 0 0.5em;
			line-height: 2;
		}
		&-icon{
			margin-left: 9px;
			height: 24px;
			width: 24px;
			border: 1px solid #b73e31;
			text-align: center;
			line-height: 24px;
			border-radius: 12px;
			background: #b73e31;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			&:last-of-type{
				border-color: #f97600;
				background: #f97600;
			}
			.tip-circle{
				position: absolute;
				top: -3px;
				right: -3px;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: red;
			}
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
