<template>
	<view :style="style">
		<view class="header-back" :style="{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}">
			<uni-icons v-if="hasBack" class="icon" type="back" size="30" @click="goBack"></uni-icons>
			<text>{{name}}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		hasBack: {
			type: Boolean,
			default: true,
		},
		name: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			statusBarH: this.statusBar,
			customBarH: this.customBar,
		}
	},
	computed: {
		style() {
			let _style = `height: ${this.customBarH}px;`
			return _style
		}
	},
	methods: {
		goBack() {
			uni.navigateBack();
		}
	}
}
</script>

<style lang="scss" scoped>
.header-back{
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 100%;
	max-width: 750px;
	background-color: #f8f8f8;
	position: fixed;
	z-index: 1;
	.icon{
		position: absolute;
		left: 10px;
		top: 8px;
	}
}
</style>
