<template>
	<view>
		<header-back :name="$t('invest.investmentDetail')"></header-back>
		<view class="dapp">
			<view class="product">
				<view class="thumb">
					<view class="act">
						<view class="tit">{{$t('invDetail.proaccbalance')}}</view>
						<view class="val">{{floatNum(userInfo.commAmount)}}</view>
					</view>
					<view class="img">
						<image src="" mode=""></image>
					</view>
				</view>
				<view class="infos">
					<view class="inf">
						<view class="tit">{{$t('invDetail.startamount')}}</view>
						<view class="val">{{floatNum(productData.minAmount)}}</view>
					</view>
					<view class="inf">
						<view class="tit">{{$t('invDetail.maxamount')}}</view>
						<view class="val">{{floatNum(productData.maxAmount)}}</view>
					</view>
					<view class="inf">
						<view class="tit">{{$t('invDetail.cycle')}}</view>
						<view class="val">{{productData.cycle || 0}} {{$t('invDetail.day')}}</view>
					</view>
					<view class="inf">
						<view class="tit">{{$t('invDetail.dailyrate')}}</view>
						<view class="val">{{floatNum(productData.interestRate, 2)}} %</view>
					</view>
				</view>
				<view class="submit">
					<view class="input">
						<input type="digit" v-model="form.amount" :placeholder="$t('invDetail.invamount')"/>
						<span @click="getNum">{{$t('invDetail.max')}}</span>
					</view>
					<view class="input">
						<input type="password" v-model="form.password" :placeholder="$t('invDetail.safeword')"/>
					</view>
					<!---->
					<view class="earning">{{form.amount}} + ({{form.amount}} * {{floatNum(productData.interestRate)}} * {{productData.cycle || 0}}) = {{calcAmount}}</view>
					<view class="button">
						<uni-button @click="submit">{{$t('invDetail.participate')}}</uni-button>
					</view>
					<!---->
				</view>
				<view class="content">
					<view class="tit">{{$t('invDetail.rule')}}</view>
					<view class="col"><span>{{$t('invDetail.projamount')}}:</span><span>{{floatNum(productData.maxAmount)}} TRX</span></view>
					<view class="col"><span>{{$t('invDetail.repaymeth')}}:</span><span>{{$t('invDetail.methdetail')}}</span></view>
					<view class="col"><span>{{$t('invDetail.startamt')}}:</span><span>{{floatNum(productData.minAmount)}} TRX</span></view>
					<view class="col"><span>{{$t('invDetail.dailypro')}}:</span><span>{{floatNum(productData.interestRate, 2)}} %</span></view>
					<view class="col"><span>{{$t('invDetail.releasecyc')}}:</span><span>{{productData.cycle || 0}}{{$t('invDetail.cycdetail')}}</span></view>
					<view class="col"><span>{{$t('invDetail.estincome')}}:</span><span>{{form.amount}} * {{floatNum(productData.interestRate, 2)}}% * {{productData.cycle || 0}}{{$t('invDetail.day')}} = {{$t('invDetail.totincome')}} {{profit}} TRX + {{$t('invDetail.principal')}}{{form.amount}} TRX = {{$t('invDetail.totintrest')}} {{calcAmount}} TRX</span></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderBack from '@/components/HeaderBack.vue'
import { validatepwd, } from '@/utils/validate.js'
import { floatNum, } from '@/utils/index.js'
export default {
	components: {
		HeaderBack
	},
	data() {
		return {
			userInfo: {},
			productData: {},
			form: {
				amount: 0,
				password: '',
				productId: '',
			}
		}
	},
	computed: {
		profit({ form, productData, }) {
			return form.amount * floatNum(productData.interestRate) * (productData.cycle || 0)
		},
		calcAmount({ form, productData, profit}) {
			return Number(form.amount) + profit
		},
	},
	onLoad(option) {
		this.form.productId = option.id
	},
	onShow() {
		this.getUserInfo()
		this.getProductDetail(this.form.productId)
	},
	methods: {
		floatNum,
		// 获取用户信息
		async getUserInfo() {
			const { data, } = await this.$api.getUserInfo()
			this.userInfo = Object.assign({}, data || {})
		},
		// 投资产品详情
		async getProductDetail(id) {
			const { data, } = await this.$api.getProductDetails(id)
			this.productData = Object.assign({}, data || {})
			this.form.amount = this.floatNum(this.productData.minAmount)
		},
		getNum() {
			this.form.amount = this.floatNum(this.userInfo.commAmount)
		},
		verifyForm() {
			// 校验投资金额
			if (this.form.amount < this.floatNum(this.productData.minAmount)){
				uni.showToast({
					title: '投资金额不能小于起投金额',
					icon: 'error'
				})
				return false
			}
			// 校验安全密码
			const safePassBool = validatepwd(this.form.safePass)
			if (!safePassBool) {
				uni.showToast({
					title: '安全密码输入有误',
					icon: 'error'
				})
				return false
			}
			return true
		},
		async submit() {
			if (!this.verifyForm()) return

			await this.$api.getTradeInvest({
				...this.form,
				amount: this.form.amount * Math.pow(10, 4),
			})
			uni.showToast({
				title: '投资成功',
				icon: 'success',
				complete: function(){
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}
			})
		},
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
