<template>
	<view class="container">
		<button @click="copyName" data-code="kayce">uni.showToast</button>
	</view>
</template>

<script>
import { copyText, } from '@/utils/index.js'
export default {
	data() {
		return {

		}
	},
	methods: {
		copyName(e) {
			console.log(e.target)
			copyText(e.target.dataset.code).then(() => {
				uni.showToast({
					title:"Copied!"
				})
			});
		}
	}
}
</script>

<style>

</style>
