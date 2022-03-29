<template>
	<view>
		<header-back :name="$t('notice.title')"></header-back>
		<uni-list>
			<uni-list-item
				v-for="(item, index) in noticeList"
				title="列表左侧带略缩图"
				note="列表描述信息"
				:show-extra-icon="true"
				:extra-icon="{color: '#4cd964',size: '22',type: 'sound'}"
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
			loadingText:'加载中...',
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
			if(this.loadingText != '' && this.loadingText != '加载更多'){
				return false;
			}
			this.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url: '',
				method: 'GET',
				success:(res) => {
					this.loadingText = '';
					if(res.data == null){
						uni.hideNavigationBarLoading();
						this.loadingText = '已加载全部';
						return false;
					}
					this.page++;
					console.log(res);
					this.noticeList = this.noticeList.concat(res.data.split('--hcSplitor--'));
					this.loadingText = '加载更多';
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
			// 		this.loadingText = '加载更多';
			// 	}
			// });
			setTimeout(() => {
				this.loadingText = '';
				// if(res.data == null){
					this.noticeList = 20;
					uni.hideNavigationBarLoading();
					this.loadingText = '已加载全部';
					return false;
				// }
				// this.page++;
				// console.log(res);
				// this.noticeList = this.noticeList.concat(res.data.split('--hcSplitor--'));
				// this.loadingText = '加载更多';
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
