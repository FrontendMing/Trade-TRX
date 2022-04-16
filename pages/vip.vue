<template>
	<view>
		<header-back :name="$t('VIP等级')"></header-back>
		<view class="dapp">
			<view class="vip">
				<view class="invip">
					<view class="vinfo">
						<view class="curvip">
							当前等级
							<p>VIP 1</p>
						</view>
						<view class="sumdep">TRX充值数量
							<p>
								0.00<label>TRX</label>
							</p>
						</view>
						<view class="upvips">立即升级</view>
					</view>
				</view>
				<view class="vptabs">
					<view class="vptabs">
						<view class="tab"><span class="cur">基础</span><span class="">返利</span></view>
						<view class="box">
							<view class="table">
								<view class="title"><span>等级</span><span>充值数量</span><span>收益</span><span>日提款</span>
								</view>
								<ul>
									<li>
										<span>VIP 1</span>
										<span>0.00 ~ 30000.00</span>
										<span>5.00
											%</span>
										<span>3.17 %</span>
									</li>
								</ul>
							</view>
							<view class="table">
								<view class="title"><span>等级</span><span>邀请返利</span><span>充值返利</span><span>挖矿返利</span>
								</view>
								<ul>
									<li><span>VIP 1</span><span>
											<p>Lev 1 : 30<uni-label class="uni-label-pointer">TRX</uni-label>
											</p>
											<p>Lev 2 : 20<uni-label class="uni-label-pointer">TRX</uni-label>
											</p>
											<p>Lev 3 : 10<uni-label class="uni-label-pointer">TRX</uni-label>
											</p>
										</span><span>
											<p>Lev 1 : 10.00 %</p>
											<p>Lev 2 : 5.00 %</p>
											<p>Lev 3 : 3.00 %</p>
										</span><span>
											<p>Lev 1 : 10.00 %</p>
											<p>Lev 2 : 7.00 %</p>
											<p>Lev 3 : 3.00 %</p>
										</span></li>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="vptip">如有任何问题，请联系我们
					<span>在线客服</span>.
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

	.dapp .vip .invip {
		padding: 16px;
	}

	.dapp .vip .vinfo {
		background: #fff url(/static/image/mine_banner.png) no-repeat top;
		background-size: 100%;
		height: 144px;
		border-radius: 12px;
		position: relative;
	}

	.dapp .vip .curvip {
		padding-top: 30px;
		padding-left: 30px;
		font-size: 13px;
		color: #ffd6d2;
	}

	.dapp .vip .sumdep {
		padding-top: 14px;
		padding-left: 30px;
		font-size: 13px;
		color: #ffd6d2;
	}

	.dapp .vip .upvips {
		position: absolute;
		right: 12px;
		bottom: 12px;
		display: inline-block;
		padding: 6px 9px;
		background: #fff;
		font-size: 13px;
		border-radius: 8px;
		color: #b73e31;
		font-weight: 500;
		cursor: pointer;
	}

	.dapp .vip .curvip>p {
		color: #fff;
		font-weight: 700;
		font-size: 16px;
		padding-top: 2px;
	}

	.dapp .vip .sumdep>p {
		color: #fff;
		font-weight: 700;
		font-size: 16px;
		padding-top: 2px;
	}

	.dapp .vip .vptabs {
		background: #fafafa;
	}

	.dapp .vip .vptabs .tab {
		height: 38px;
		line-height: 38px;
		display: flex;
		align-items: center;
	}

	.dapp .vip .vptabs .box {
		background: #fff;
	}

	.dapp .vip .vptabs .tab>span.cur {
		color: #b73e31;
		background: #fff6f5;
		border-bottom: 2px solid #b73e31;
		font-size: 16px;
		font-weight: 700;
	}

	.dapp .vip .vptabs .tab>span {
		flex: 1;
		text-align: center;
		font-size: 15px;
		font-weight: 500;
		position: relative;
		border-bottom: 2px solid #f0f0f0;
		cursor: pointer;
		transition: border-bottom .2s ease 0s, color .2s ease 0s;
	}

	.dapp .vip .table .title {
		display: flex;
		align-items: center;
		height: 33px;
		border-bottom: 1px solid hsla(0, 0%, 58.8%, .1);
		background: #fdfdfd;
	}

	.dapp .vip .table ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.dapp .vip .table .title>span:first-child {
		color: #b73e31;
	}

	.dapp .vip .table .title>span {
		flex: 1;
		text-align: center;
		font-weight: 500;
		font-size: 12px;
		color: #666;
		overflow: hidden;
	}

	.dapp .vip .table li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid hsla(0, 0%, 39.2%, .1);
	}

	.dapp .vip .table li>span {
		flex: 1;
		text-align: center;
		padding: 12px 6px;
		line-height: 1.25;
	}

	.dapp .vip .vptip {
		background: #fafafa;
		padding: 16px;
		font-size: 13px;
		line-height: 1.5;
	}

	.dapp .vip .vptip>span {
		font-weight: 700;
		color: #b73e31;
		margin-left: 6px;
		font-size: 14px;
	}
</style>
