<template>
	<view>
		<header-back :name="$t('invest.investmentDetail')"></header-back>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				
			}
		},
		onLoad(option) {
			this.getProductDetail(option.id)
		},
		methods: {
			async getProductDetail(id) {
				const { data, } = await this.$api.getProductDetails(id)
				console.log(data)
			}
		}
	}
</script>
