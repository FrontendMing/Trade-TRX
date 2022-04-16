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
			getProductDetail(id) {
				this.$api.getProductDetails(id).then(res => {
					console.log(res.data)
				})
			}
		}
	}
</script>

<style>

</style>
