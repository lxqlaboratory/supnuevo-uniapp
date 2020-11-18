<template>
	<view class="">
		<wyb-loading ref="loading"/>
		
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionOrderDiscountForm
	} from '@/api/MyInfor.js'
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				discountName: '折扣名称',
				discountId: null,
				startDate: null,
				endData: null,
				total1: null,
				scale1: null,
				total2: null,
				scale2: null,
				total3: null,
				scale3: null,
			}
		},
		components: {
				taogewanComboxRemote,
				wybLoading
		},
		onShow() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.unionId = getApp().globalData.unionId;
			this.getSupnuevoBuyerUnionOrderDiscountOfUnion();
		},
		methods: {
			getSupnuevoBuyerUnionOrderDiscountOfUnion(){
				getSupnuevoBuyerUnionOrderDiscountForm({
					unionId: this.unionId,
				}).then(res => {
					console.log(res)
					this.total1 = res.total1+"";
					this.scale1 = res.scale1*100+"";
					this.total2 = res.total2+"";
					this.scale2 = res.scale2*100+"";
					this.total3 = res.total3+"";
					this.scale3 = res.scale3*100+"";
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
		},
	}
</script>

<style>
	.input1 {
		display: flex;
		flex: 8;
		height: 35px;
		padding-left: 10;
		padding-right: 10;
		padding-top: 6;
		padding-bottom: 6;
		background-color: #FFFFFF;
		color: #333333;
	}
	.priceButton {
		margin-top: 4px;
		margin-bottom: 4px;
		margin-right: 8px;
		height: 35px;
		font-size: 14px;
		width: 56px;
	}
	.priceinput {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-width: 3px;
		border: 1px solid ;
		border-color: #999999;
	}
	.discount {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}
</style>
