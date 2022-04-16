<template>
	<view>
		<header-back :name="$t('invest.investmentDetail')"></header-back>
		<view class="dapp">
			<view class="product">
				<view class="thumb">
					<view class="act">
						<view class="tit">佣金账户余额</view>
						<view class="val"></view>
					</view>
					<view class="img">
						<image src="" mode=""></image>
					</view>
				</view>
				<view class="infos">
					<view class="inf">
						<view class="tit">起投金额</view>
						<view class="val"></view>
					</view>
					<view class="inf">
						<view class="tit">最大投资金额</view>
						<view class="val"></view>
					</view>
					<view class="inf">
						<view class="tit">周期</view>
						<view class="val"> 日</view>
					</view>
					<view class="inf">
						<view class="tit">每日收益率</view>
						<view class="val"> %</view>
					</view>
				</view>
				<view class="submit">
					<view class="input">
						<input type="text" value="" placeholder="投资金额" /><span>最大</span>
					</view>
					<view class="input">
						<input type="text" placeholder="安全密码">
					</view>
					<!---->
					<view class="earning"> + ( * NaN * ) = 0</view>
					<view class="button">
						<uni-button class="">立即投资</uni-button>
					</view>
					<!---->
				</view>
				<view class="content">
					<view class="tit">项目规则</view>
					<view class="col"><span>项目规模金额:</span><span> TRX</span></view>
					<view class="col"><span>还款方式:</span><span>到期归还本息（节假日正常）</span></view>
					<view class="col"><span>起投金额:</span><span> TRX</span></view>
					<view class="col"><span>每日收益率:</span><span> %</span></view>
					<view class="col"><span>投资周期:</span><span> 天，24小时内自动结算</span></view>
					<view class="col"><span>预计收益:</span><span> * % * 日 = 总收入 0 TRX + 本金 TRX = 总本金和收益 0 TRX</span></view>
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
		onLoad(option) {
			this.getProductDetail(option.id)
		},
		methods: {
			async getProductDetail(id) {
				const {
					data,
				} = await this.$api.getProductDetails(id)
				console.log(data)
			}
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
	
	.dapp .product {
	  display: block;
	  padding: 16px;
	}
	
	.dapp .product .thumb {
	  display: block;
	  height: 80px;
	  background: linear-gradient(270deg,#851004,#fa6e5f);
	  border-radius: 8px;
	  position: relative;
	}
	
	.dapp .product .thumb .act {
	  padding: 25px 0 0 14px;
	  color: #fff;
	  font-size: 13px;
	}
	
	.dapp .product .thumb .img {
	  position: absolute;
	  right: 0;
	  top: 15px;
	  right: 10px;
	  width: 77px;
	  bottom: 15px;
	}
	
	.dapp .product .thumb .act .val {
	  font-size: 18px;
	  font-weight: 500;
	  padding-top: 6px;
	}
	
	.dapp .product .thumb .img {
	  position: absolute;
	  right: 0;
	  top: 15px;
	  right: 10px;
	  width: 77px;
	  bottom: 15px;
	}
	
	.dapp .product .infos {
	  padding: 14px;
	}
	
	.dapp .product .infos .inf {
	  display: flex;
	  justify-content: space-between;
	  padding: 16px 0;
	  font-size: 13px;
	  border-bottom: 1px solid hsla(0,0%,78.4%,.35);
	}
	
	.dapp .product .infos .tit {
	  color: #666;
	}
	
	.dapp .product .infos .val {
	  font-weight: 500;
	  font-size: 14px;
	}
	
	.dapp .product .submit {
	  background: #fffcf5;
	  border-radius: 8px;
	  padding: 16px;
	  position: relative;
	}
	
	.dapp .product .submit .input {
	  position: relative;
	  height: 33px;
	  background: #fff;
	  margin-bottom: 16px;
	  border: 1px solid #ddd;
	  border-radius: 16px;
	  overflow: hidden;
	}
	
	.dapp .product .submit .input uni-input {
	  width: 100%;
	  height: 33px;
	  text-indent: 16px;
	  font-size: 16px;
	  background: #fff;
	}
	
	.dapp .product .submit .input span {
	  position: absolute;
	  right: -1px;
	  top: -1px;
	  font-size: 14px;
	  font-weight: 500;
	  height: 33px;
	  line-height: 33px;
	  padding: 0 16px;
	  background: #b73e31;
	  color: #fff;
	  border-radius: 0 16px 16px 0;
	}
	
	.dapp .product .submit .earning {
	  text-align: right;
	  color: red;
	  font-size: 13px;
	}
	
	.dapp .product .submit .button {
	  display: block;
	  margin-top: 16px;
	}
	
	.dapp .product .submit .button > uni-button {
	  height: 42px;
	  border-radius: 42px;
	  background: linear-gradient(1turn,#741e15,#b73e31);
	  color: #fff;
	  font-weight: 500;
	  font-size: 16px;
	  transition: opacity .2s ease 0s;
	  cursor: pointer;
	}
	
	.dapp .product .content {
	  padding: 16px 0;
	  font-size: 13px;
	}
	
	.dapp .product .content .tit {
	  height: 33px;
	  line-height: 33px;
	  border-bottom: 1px solid #b73e31;
	  font-weight: 700;
	  font-size: 16px;
	  color: #b73e31;
	}
	
	.dapp .product .content .col {
	  display: flex;
	  justify-content: space-between;
	  padding: 12px 0;
	  border-bottom: 1px solid #f0f0f0;
	  line-height: 1.25;
	}
	
	.dapp .product .content .col > span:first-child {
	  min-width: 50%;
	}
</style>
