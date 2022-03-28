<template>
	<view class="container">
		<view class="locale-setting">{{$t('index.language-info')}}</view>
		<view class="list-item">
			<text class="k">{{$t('index.system-language')}}:</text>
			<text class="v">{{systemLocale}}</text>
		</view>
		<view class="list-item">
			<text class="k">{{$t('index.application-language')}}:</text>
			<text class="v">{{applicationLocale}}</text>
		</view>
		<view class="locale-setting">{{$t('index.language')}}</view>
		<view class="locale-list">
			<view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
				<text class="text">{{item.text}}</text>
				<text class="icon-check" v-if="item.code == applicationLocale"></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			systemLocale: '',
			applicationLocale: ''
		}
	},
    computed:{
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
			  //   {
					// text: this.$t('locale.ja'),
					// code: 'ja'
			  //   }
			]
        }
    },
    onLoad() {
		let systemInfo = uni.getSystemInfoSync();
		this.systemLocale = systemInfo.language;
		this.applicationLocale = uni.getLocale();
		this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
		uni.onLocaleChange((e) => {
			this.applicationLocale = e.locale;
		})
    },
    methods: {
		onLocaleChange(e) {
			if (this.isAndroid) {
				uni.showModal({
					content: this.$t('index.language-change-confirm'),
					success: (res) => {
						if (res.confirm) {
							uni.setLocale(e.code);
						}
					}
				})
			} else {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
			}
		}
    }
  }
</script>

<style>
.locale-setting {
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #f0f0f0;
}

.list-item {
    font-size: 14px;
    padding: 10px 0;
}

.list-item .v {
    margin-left: 5px;
}

.locale-item {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
}

.locale-item .text {
    flex: 1;
}

.icon-check {
    margin-right: 5px;
    border: 2px solid #007aff;
    border-left: 0;
    border-top: 0;
    height: 12px;
    width: 6px;
    transform-origin: center;
    /* #ifndef APP-NVUE */
    transition: all 0.3s;
    /* #endif */
    transform: rotate(45deg);
}
</style>
