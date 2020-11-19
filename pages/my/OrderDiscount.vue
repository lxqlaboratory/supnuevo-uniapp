<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
			<view style="flex: 2;display: flex;height: 40px;align-items: center;justify-content: center;font-size: 22px;">
				<text>购买总金额</text>
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
			</view>
			<view style="flex: 2;display: flex;height: 40px;align-items: center;justify-content: center;font-size: 22px;">
				<text>折扣</text>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType === 2" style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 30px;">
			<view style="flex: 2;display: flex;text-align: center;">
				<input type="text" v-model="total1" />
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
				<text>-</text>
			</view>
			<view style="flex: 2;display: flex;text-align: center;">
				<input type="text" v-model="scale1" />
			</view>
		</view>
		<view class="" v-if="unionMemberType !== 2" style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 30px;">
			<view style="flex: 2;display: flex;align-items: center;justify-content: center;">
				<text>{{total1}}</text>
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
				<text>-</text>
			</view>
			<view style="flex: 2;display: flex;align-items: center;justify-content: center;">
				<text>{{scale1}}%</text>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType === 2" style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 30px;">
			<view style="flex: 2;display: flex;text-align: center;">
				<input type="text" v-model="total2" />
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
				<text>-</text>
			</view>
			<view style="flex: 2;display: flex;text-align: center;">
				<input type="text" v-model="scale2" />
			</view>
		</view>
		<view class="" v-if="unionMemberType !== 2" style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 30px;">
			<view style="flex: 2;display: flex;align-items: center;justify-content: center;">
				<text>{{total2}}</text>
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
				<text>-</text>
			</view>
			<view style="flex: 2;display: flex;align-items: center;justify-content: center;">
				<text>{{scale2}}%</text>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType === 2" style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 30px;">
			<view style="flex: 2;display: flex;text-align: center;">
				<input type="text" v-model="total3" />
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
				<text>-</text>
			</view>
			<view style="flex: 2;display: flex;text-align: center;">
				<input type="text" v-model="scale3" />
			</view>
		</view>
		<view class="" v-if="unionMemberType !== 2" style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 30px;">
			<view style="flex: 2;display: flex;align-items: center;justify-content: center;">
				<text>{{total3}}</text>
			</view>
			<view style="flex: 1;display: flex;align-items: center;justify-content: center;">
				<text>-</text>
			</view>
			<view style="flex: 2;display: flex;align-items: center;justify-content: center;">
				<text>{{scale3}}%</text>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType === 2" style="margin-bottom: 20px;">
			<button type="primary" @click="saveSupnuevoBuyerUnionOrderDiscount" style="width: 200px;border-radius: 10px;height: 35px;margin-top: 30px;vertical-align: middle;text-align: center;line-height: 35px;background-color: #1989FA;color: #2C405A;">保存折扣</button>
		</view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionOrderDiscountForm,
		updateSupnuevoBuyerUnionOrderDiscount
	} from '@/api/MyInfor.js'
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				discountName: '折扣名称',
				discountId: '',
				startDate: '',
				endData: '',
				total1: '',
				scale1: '',
				total2: '',
				scale2: '',
				total3: '',
				scale3: '',
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
			saveSupnuevoBuyerUnionOrderDiscount(){
				const total1 = parseFloat(this.total1);
				const total2 = parseFloat(this.total2);
				const total3 = parseFloat(this.total3);
				const scale1 = parseFloat(this.scale1);
				const scale2 = parseFloat(this.scale2)
				const scale3 = parseFloat(this.scale3)
				if(total3 === 0){
					if (total2 !== 0){
						if(total1 <= total2){
							uni.showModal({
								title: "提示",
								content: "总价1须大于总价2",
								showCancel: false,
							})
								return;
							}
						}
				}else {
					if (total2 <= total3){
						uni.showModal({
							title: "提示",
							content: "总价2须大于总价3",
							showCancel: false,
						})
						return;
					} else {
						if (total2 !== 0){
							if (total1 < total2){
								uni.showModal({
									title: "提示",
									content: "总价1须大于总价2",
									showCancel: false,
								})
								return;
							}
						}
					}
				}
				 if(scale1<=scale2){
					uni.showModal({
						title: "提示",
						content: "折扣1须大于折扣2",
						showCancel: false,
					})
					return
				}
				else {
					if(scale2<=scale3){
						uni.showModal({
							title: "提示",
							content: "折扣2须大于折扣3",
							showCancel: false,
						})
						return
					}
				}
				updateSupnuevoBuyerUnionOrderDiscount({
					unionId: this.unionId,
					total1: total1,
					scale1: scale1/100,
					total2: total2,
					scale2: scale2/100,
					total3: total3,
					scale3: scale3/100,
				}).then(res => {
					if (res.re === 1)
						uni.showModal({
							title: "提示",
							content: "保存成功",
							showCancel: false,
						})
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			getSupnuevoBuyerUnionOrderDiscountOfUnion(){
				getSupnuevoBuyerUnionOrderDiscountForm({
					unionId: this.unionId,
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.total1 = res.data.total1+"";
						this.scale1 = res.data.scale1*100+"";
						this.total2 = res.data.total2+"";
						this.scale2 = res.data.scale2*100+"";
						this.total3 = res.data.total3+"";
						this.scale3 = res.data.scale3*100+"";
					}
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
