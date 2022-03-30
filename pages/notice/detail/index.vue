<template>
	<view>
		<header-back :name="$t('notice.detail')"></header-back>
		<uni-card
			:title="noticeTitle"
			:sub-title="noticeTime"
		>
			<text>
				这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。
			</text>
		</uni-card>
	</view>
</template>

<script>
import HeaderBack from '@/components/HeaderBack.vue'
export default {
	components: {
		HeaderBack,
	},
	data() {
		return {
			noticeTitle: '通知标题',
			noticeTime: '2022-03-30 09:30:27'
		}
	},
	methods: {

	}
}
</script>

<style>

</style>
