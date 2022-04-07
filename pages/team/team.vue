<template>
	<view>
		<header-back :name="$t('团队')"></header-back>
		<view class="earnbox">
			<view class="inbox">
				<view class="isbox">
					<view class="level">
						<view>
							<view class="tit cur">Level 1</view>
							<view class="val">0</view>
						</view>
						<view>
							<view class="tit">Level 2</view>
							<view class="val">0</view>
						</view>
						<view>
							<view class="tit">Level 3</view>
							<view class="val">0</view>
						</view>
					</view>
				</view>
				<view class="isbox">
					<dl>
						<dt>
							<span>账户</span><span>加入时间</span>
						</dt>
					</dl>
					<view class="more">
						<span>没有数据</span>
					</view>
				</view>
			</view>
		</view>
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
		methods: {
			
		}
	}
</script>

<style>
	.earnbox .inbox {
	    background: #f0f3f7;
	    padding: 16px;
	    border-radius: 16px;
	    text-align: center;
	}
	
	.earnbox .isbox {
	    background: #fff;
	    margin-bottom: 16px;
	    border-radius: 16px;
	    text-align: left;
	}
	
	.earnbox .isbox .level {
	    display: flex;
	    justify-content: space-between;
	    padding: 12px;
	}
	
	.earnbox .isbox .level>uni-view {
	    text-align: center;
	    flex: 1;
	}
	
	.earnbox .isbox .level>uni-view .tit {
	    background: #b73e31;
	    margin: 2px;
	    color: #fff;
	    padding: 6px 0;
	    border-radius: 5px;
	    font-weight: 500;
	    font-size: 13px;
	}
	
	.earnbox .isbox .level>uni-view .tit.cur {
	    background: #741e15;
	}
	
	.earnbox .isbox .level>uni-view .val {
	    padding: 6px 0;
	    font-size: 13px;
	    font-weight: 500;
	}
	
	.earnbox .isbox:last-child {
	    margin-bottom: 0;
	}
	
	.earnbox .isbox dt {
	    display: flex;
	    justify-content: space-between;
	    padding: 12px 16px;
	    font-weight: 500;
	    font-size: 13px;
	    color: #2a2a2a;
	    border-bottom: 1px solid #eee;
	}
	
	.earnbox .isbox .more {
	    text-align: center;
	    padding: 12px 0;
	    color: #999;
	    font-size: 14px;
	}
</style>
