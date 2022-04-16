<template>
	<view>
		<header-back :name="$t('notice.title')"></header-back>
		<uni-list>
			<uni-list-item
				v-for="(item, index) in noticeList"
				title="列表左侧带略缩图"
				note="列表描述信息"
				:show-extra-icon="true"
				:extra-icon="{color: '#a4c7ec',size: '22',type: 'sound'}"
				link
				@click="goToNoticeDetail(item)"
			></uni-list-item>
			<view class="loading">{{loadingText}}</view>
		</uni-list>
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
			noticeList:[],
			loadingText: this.$t('system.loading'),
			page: 1,
			timer: null,
		}
	},
	onLoad() {
		this.getNoticeList();
	},
	onPullDownRefresh() {
		this.getNoticeList();
	},
	onReachBottom() {
		if(this.timer != null){
			clearTimeout(this.timer);
		}
		this.timer = setTimeout(() => this.getMoreNotice(), 1000);
	},
	methods:{
		getMoreNotice(){
			if(this.loadingText !== '' && this.loadingText !== this.$t('system.load-more')){
				return false;
			}
			this.loadingText = this.$t('system.loading');
			uni.showNavigationBarLoading();
			uni.request({
				url: '',
				method: 'GET',
				success:(res) => {
					this.loadingText = '';
					if(res.data == null){
						uni.hideNavigationBarLoading();
						this.loadingText = this.$t('system.load-finish');
						return false;
					}
					this.page++;
					console.log(res);
					this.noticeList = this.noticeList.concat(res.data.split('--hcSplitor--'));
					this.loadingText = this.$t('system.load-more')
					uni.hideNavigationBarLoading();
				}
			});
		},
		getNoticeList() {
			this.page = 1;
			uni.showNavigationBarLoading();
			// uni.request({
			// 	url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=1',
			// 	method: 'GET',
			// 	success: (res) => {
			// 		this.page++;
			// 		this.noticeList = res.data.split('--hcSplitor--');
			// 		uni.hideNavigationBarLoading();
			// 		uni.stopPullDownRefresh();
			// 		this.loadingText = this.$t('system.load-more')
			// 	}
			// });
			setTimeout(() => {
				this.loadingText = '';
				// if(res.data == null){
					this.noticeList = 5;
					uni.hideNavigationBarLoading();
					this.loadingText = this.$t('system.load-finish');
					return false;
				// }
				// this.page++;
				// console.log(res);
				// this.noticeList = this.noticeList.concat(res.data.split('--hcSplitor--'));
				// this.loadingText = this.$t('system.load-more')
				// uni.hideNavigationBarLoading();
			}, 1000);
		},
		goToNoticeDetail(id) {
			uni.navigateTo({
				url: `/pages/notice/detail/index?id=${id}`
			})
		}
	}
}
</script>

<style>
.loading{
	text-align:center;
	line-height:80px;
}
</style>
