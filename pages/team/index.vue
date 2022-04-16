<template>
	<view>
		<header-back :name="$t('团队')"></header-back>
		<view class="earnbox">
			<view class="inbox">
				<view class="isbox">
					<view class="level">
						<view>
							<view :class="['tit', {'cur': currentTab === 1 }]" @click="switchTab(1)">Level 1</view>
							<view class="val">{{levelData.level1Count || 0}}</view>
						</view>
						<view>
							<view :class="['tit', {'cur': currentTab === 2 }]" @click="switchTab(2)">Level 2</view>
							<view class="val">{{levelData.level2Count || 0}}</view>
						</view>
						<view>
							<view :class="['tit', {'cur': currentTab === 3 }]" @click="switchTab(3)">Level 3</view>
							<view class="val">{{levelData.level3Count || 0}}</view>
						</view>
					</view>
				</view>
				<view class="isbox">
					<dl>
						<dt>
							<span>账户</span>
							<span>加入时间</span>
						</dt>
						<dd v-for="(item,index) in list" :key="index">
							<span>{{item.email}}</span>
							<span>{{unixTimeToDate(item.joinTime)}}</span>
						</dd>
					</dl>
					<view v-if="!list.length" class="more">没有数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderBack from '@/components/HeaderBack.vue'
	import { unixTimeToDate, } from '@/utils/index.js'
	export default {
		components: {
			HeaderBack
		},
		data() {
			return {
				currentTab: 1,
				levelData: {
					level1Count: 0,
					level2Count: 0,
					level3Count: 0,
				},
				list: [],
			}
		},
		onLoad() {
			this.getRelations(1)
			this.getRelationsCount()
		},
		methods: {
			unixTimeToDate,
			getRelations(level) {
				this.$api.getRelations({ proxyLevel: level, }).then(res => {
					this.list = res?.data || []
				})
			},
			getRelationsCount() {
				this.$api.getRelationsCount().then(res => {
					this.levelData = Object.assign(this.levelData, res?.data || {})
				})
			},
			switchTab(tab) {
				this.currentTab = tab
				this.getRelations(tab)
			}
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
	
	.earnbox .isbox dt,
	.earnbox .isbox dd{
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
