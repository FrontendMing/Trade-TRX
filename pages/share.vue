<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			uni.redirectTo({
				url: `/pages/register?code=${option.code}`
			})
		}
	}
</script>

<style>

</style>
