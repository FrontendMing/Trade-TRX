<template>
<view>
	<header-bar :tabName="$t('index.trade')"></header-bar>
	<view class="container">
		<no-data></no-data>
	</view>
</view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue'
export default {
	components: {
		HeaderBar,
	},
    data() {
		return {
			title: this.$t('')
		}
    },
    methods: {
      
    }
}
</script>

<style>

</style>
