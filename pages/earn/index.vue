<template>
	<view>
		<header-back :name="$t('财务记录')"></header-back>
		<view class="dapp">
			<view class="earnbox">
				<view class="inbox">
					<view class="inlist">
						<view class="tit">
							财务记录
							<text></text>
						</view>
						<view class="box">
							<dl>
								<dt>
									<span>日期</span>
									<span>金额</span>
								</dt>
								<dd>
									<view>
										5:00 PM 04/15/2022
										<p>量化交易收入</p>
									</view>
									<view>
										44.10 TRX
										<p class="sc">完成</p>
									</view>
								</dd>
							</dl>
							<view class="more">
								<span>没有更多数据</span>
							</view>
						</view>
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

		},
		onLoad() {
			this.$api.getVipLevel()
		}
	}
</script>

<style>
	.dapp {
		position: relative;
		max-width: 720px;
		margin: auto;
		background-color: #fff;
	}
	
	.earnbox {
	    display: block;
	    padding-top: 16px;
	}
	
	.earnbox .inbox {
	    background: #f0f3f7;
	    padding: 16px;
	    border-radius: 16px;
	    text-align: center;
	}
	
	.earnbox .inlist {
	    background: #fff;
	    border-radius: 16px;
	    text-align: left;
	}
	
	.earnbox .inlist .tit {
	    height: 36px;
	    line-height: 36px;
	    border-bottom: 1px solid #ddd;
	    padding: 0 16px;
	    font-weight: 700;
	    font-size: 14px;
	    position: relative;
	}
	
	.earnbox .inlist .tit>span {
	    position: absolute;
	    right: 16px;
	}
	
	.earnbox .inlist .tit>span>uni-text {
	    font-size: 18px;
	    color: #b73e31;
	}
	
	.earnbox .inlist .more {
	    text-align: center;
	    padding: 12px 0;
	    color: #999;
	    font-size: 14px;
	}
	
	.earnbox .inlist dt {
	    display: flex;
	    justify-content: space-between;
	    padding: 12px 16px;
	    font-weight: 500;
	    font-size: 13px;
	    color: #2a2a2a;
	    border-bottom: 1px solid #eee;
	}
	
	.earnbox .inlist dd {
	    display: flex;
	    justify-content: space-between;
	    padding: 12px 16px;
	    border-bottom: 1px solid #eee;
	}
	
	.earnbox .inlist dd>uni-view:first-child {
	    color: #2a2a2a;
	    font-weight: 500;
	    font-size: 13px;
	}
	
	.earnbox .inlist dd>uni-view:last-child {
	    color: #b73e31;
	    font-size: 14px;
	    font-weight: 500;
	    display: flex;
	    flex-direction: column;
	}
	
	.earnbox .inlist dd>uni-view:first-child>p {
	    font-size: 12px;
	    color: #999;
	    padding-top: 6px;
	    font-weight: 400;
	}
	
	.earnbox .inlist dd>uni-view:last-child>p.sc {
	    display: block;
	    background: linear-gradient(1turn,#05680d,#10dd15);
	    color: #fff;
	    height: 22px;
	    padding: 0 6px;
	    line-height: 22px;
	    border-radius: 11px;
	    font-size: 12px;
	    margin-top: 4px;
	    text-align: center;
	}
</style>
