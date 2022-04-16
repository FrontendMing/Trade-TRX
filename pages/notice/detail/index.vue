<template>
	<view>
		<header-back :name="$t('notice.detail')"></header-back>
		<uni-card
			:title="notice.title"
			:sub-title="unixTimeToDate(notice.publishTime)"
		>
			<text>{{notice.content}}</text>
		</uni-card>
	</view>
</template>

<script>
import HeaderBack from '@/components/HeaderBack.vue'
import { unixTimeToDate, } from '@/utils/index.js'
export default {
	components: {
		HeaderBack,
	},
	data() {
		return {
			notice: {}
		}
	},
	onLoad(option) {
		const index = option.index
		const noticeList = uni.getStorageSync('noticeList') || []
		this.notice = noticeList[index]
	},
	methods: {
		unixTimeToDate,
	},
}
</script>
