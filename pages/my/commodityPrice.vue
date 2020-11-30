<template>
	<view class="">
		<view class="" style="text-align: center;border-bottom: 1rpx solid;font-size: 20px;height: 31.5px; margin-top: 8px;">
			<text>本店基础价位</text>
		</view>
		
		<view class="uni-padding-wrap">
		<view v-if="unionMemberType == 2">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
				<view class="" v-for="(item,index) in allClass" :key="index"  style="display: flex;flex-direction: row; justify-content: center;align-items: center;margin-top: 15px;height: 40px;padding-bottom: 10px;border-bottom: 1px solid #1CBBB4;">
					<view class="" style="display: flex;flex: 5;" @click="navigatorCommodity(item.taxId,item.taxName,item.ratio)">
						<text>{{item.taxName}}</text>
					</view>
					<view class="" style="display: flex;" @click="navigatorCommodity(item.taxId,item.taxName,item.ratio)">
						<text>建议价 - </text>
					</view>
					<view class="" style="display: flex;">
						<input type="text" v-model="item.ratio" style="width: 27px;"/>%
					</view>
					<view class="" style="display: flex;margin-left: 5px;">
						<button type="primary" @click="updateSupnuevoBuyerUnionPriceRatio(item.taxId,item.ratio)" style="flex: 1.5; background-color: #007AFF;border-radius: 9px;margin-right: 10px;font-size: 13px;">修改</button>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view v-else-if="unionMemberType != 2">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
				<view class="" v-for="(item,index) in allClass" :key="index" @click="navigatorCommodity(item.taxId,item.taxName,item.ratio)" style="display: flex;flex-direction: row; justify-content: center;align-items: center;margin-top: 15px;height: 40px;padding-bottom: 10px;border-bottom: 1px solid #1CBBB4;">
					<view class="" style="display: flex;flex: 5;">
						<text>{{item.taxName}}</text>
					</view>
					<view class="" style="display: flex;">
						<text>建议价 - {{item.ratio}}%</text>
					</view>
				</view>
			</scroll-view>
		</view>
		</view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionPriceTaxFormList,
		updateSupnuevoBuyerUnionPriceRatio
	} from '@/api/MyInfor.js'
	export default {
		data() {
			return {
				searchText: '',
				searchResult: [],
				selectedPrice: null,
				isSearchStatus: false,
				allClass:[],
				unionMemberType:'',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
			};
		},
		onShow() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.root = getApp().globalData.root;
			this.unionId = getApp().globalData.unionId;
			getSupnuevoBuyerUnionPriceTaxFormList({
				unionId: this.unionId
			}).then(res => {
				console.log(res)
				if (res.re === 1){
					this.allClass = res.data
					for(var i = 0;i < this.allClass.length ; i++){
						this.allClass[i].ratio = this.allClass[i].ratio*100
					}
				}
			}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
			});	
		},
		methods:{
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			navigatorCommodity(taxId,taxName,ratio){
				let form = {
					taxId:taxId,
					taxName:taxName,
					ratio: ratio
				}
				uni.navigateTo({
					url: './CommoditybytaxId?form='+encodeURIComponent(JSON.stringify(form))
				})
			},
			updateSupnuevoBuyerUnionPriceRatio(taxId,ratio){
				console.log(ratio)
				if (ratio === 0){
					uni.showModal({
						title: "提示",
						content: "请输入建议价",
						showCancel: false,
					})
				}else{
					updateSupnuevoBuyerUnionPriceRatio({
						unionId: this.unionId,
						taxId: taxId,
						ratio: ratio
					}).then(res => {
						if (res.re === 1){
							uni.showModal({
								title: "提示",
								content: "修改成功",
								showCancel: false,
							})
							this.getSupnuevoBuyerUnionPriceClass();
						}
					}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
					});	
				}
			},
		},
	}
</script>

<style>
	.uni-padding-wrap{
		width:100%;
		padding:0 30rpx;
	}
	.scroll-Y{
		height: 680px;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.uni-list-cell {
		justify-content: flex-start;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list .label-3 {
		padding: 0;
	}
	
	.label-2-text {
	    flex: 1;
	}
	.uni-common-mt{
		margin-top:30rpx;
	}
	.uni-form-item{
		display:flex;
		width:100%;
		padding:10rpx 0;
	}
	.uni-column {
		flex-direction: column;
	}
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}
	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
</style>
