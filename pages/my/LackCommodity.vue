<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view class="" v-for="(item,index) in commodityList" :key="index">
			<view class="" style="padding: 10px;border-bottom: 2px solid #7C7C7C;width: 90%;margin: auto;color: #939393;">
				<view class="">
					<text>|&nbsp;&nbsp;{{item.codigo}}</text>
				</view>
				<view class="">
					<text>|&nbsp;&nbsp;{{item.commoditName}}</text>
				</view>
				<view class="">
					<text>|&nbsp;&nbsp;${{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getHashNotUnionCommodityListOfMerchant
	} from '@/api/MyInfor.js'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data(){
			return {
				unionId: '',
				merchantId: '',
				commodityList: [],
			}
		},
		components: {
				wybLoading
		},
		onShow() {
			this.$refs.loading.showLoading()
			this.unionId = getApp().globalData.unionId;
			this.merchantId = getApp().globalData.merchantId;
			this.getSupnuevoLackCommodityList();
			this.$refs.loading.hideLoading() // 隐藏
		},
		methods: {
			getSupnuevoLackCommodityList(){
				getHashNotUnionCommodityListOfMerchant({
					unionId: this.unionId,
					merchantId: this.merchantId
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.commodityList = res.data
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
		}
	}
</script>

<style>
</style>
