<template>
	<view>
		<header-back :name="$t('notice.detail')"></header-back>
		<uni-card
			title="基础卡片"
			sub-title="副标题"
			thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
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

		}
	},
	methods: {

	}
}
</script>

<style>

</style>

</style>
