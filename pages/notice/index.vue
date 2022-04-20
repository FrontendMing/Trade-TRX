<template>
	<view>
		<header-back :name="$t('notice.title')"></header-back>
		<uni-list>
			<uni-list-item
				v-for="(item, index) in noticeList"
				:key="index"
				:title="item.title"
				:note="unixTimeToDate(item.publishTime)"
				:show-extra-icon="true"
				:extra-icon="{color: '#a4c7ec',size: '22',type: 'sound'}"
				link
				@click="goToNoticeDetail(index)"
			></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import HeaderBack from '@/components/HeaderBack.vue'
import { unixTimeToDate, } from '@/utils/index.js'
const LANG_TYPE = {
	'zh-Hans': 'zh_cn',
	'zh-Hant': 'zh_hk',
	'en': 'en'
}
export default {
	components: {
		HeaderBack,
	},
	data() {
		return {
			noticeList:[],
		}
	},
	computed: {
		localeCode() {
			return uni.getLocale();
		},
	},
	onShow() {
		this.getNoticeList();
	},
	methods:{
		unixTimeToDate,
		// 获取 通知信息
		async getNoticeList() {
			const { data, } = await this.$api.getPlatformNotices({
				lang: LANG_TYPE[this.localeCode],
			})
			this.noticeList = data || []
			uni.setStorageSync('noticeList', this.noticeList)
		},
		goToNoticeDetail(index) {
			uni.navigateTo({
				url: `/pages/notice/detail/index?index=${index}`
			})
		}
	}
}
</script>
