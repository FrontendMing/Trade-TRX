<script>
import Vue from 'vue'
export default {
    onLaunch: function() {
		uni.getSystemInfo({
			success:function(e){
				Vue.prototype.statusBar = e.statusBarHeight
				// #ifndef MP
				if(e.platform == 'android') {
					Vue.prototype.customBar = e.statusBarHeight + 50
				}else {
					Vue.prototype.customBar = e.statusBarHeight + 45
				}
				// #endif

				// #ifdef MP-WEIXIN
				let custom = wx.getMenuButtonBoundingClientRect()
				Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
				// #endif
			}
		})
    },
    onShow: function() {
		console.log('App Show')
    },
    onHide: function() {
		console.log('App Hide')
    }
}
</script>

<style>
@import "@/static/style/uniicons.css";
.loading{
	text-align: center;
	padding: 12px 0;
	color: #999;
	font-size: 14px;
}
button {
    margin-bottom: 15px;
}
</style>
