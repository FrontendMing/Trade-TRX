<template>
	<view></view>
</template>

<script>
export default {
	// 分享 中间页，直接重定向到 注册页
	onLoad(option) {
		uni.redirectTo({
			url: `/pages/register?code=${option.code}`
		})
	}
}
</script>
