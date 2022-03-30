<template>
	<view>
		<header-bar :tabName="$t('index.home')"></header-bar>
		<view class="container">

		</view>
	</view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
export default {
	components: {
		HeaderBar,
	},
	data() {
		return {

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
			]
        }
    },
    onLoad() {

    },
    methods: {

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
