<template>
	<view>
		<view class="" style="margin-top: 8px;margin-left: 4px;font-size: 20px;display: flex;">
			<view class="" style="flex: 8;margin: auto;">
				<text>
					改动的价格：&nbsp;&nbsp;&nbsp;
					<text style="font-weight: bold;font-size: 22px;">{{updatePrice}}</text>
				</text>
			</view>
			<view class="" style="flex: 4;margin-right: 10px;">
				<button type="primary" style="border-radius: 9px;" @click="changePriceRelated">
					改价
				</button>
			</view>
		</view>
		
		<view class="" style="margin-top: 8px;margin-left: 4px;font-size: 20px;display: flex;">
			<view class="" style="flex: 8;margin: auto;">
				<text>
					商品组名：&nbsp;&nbsp;&nbsp;
					<text style="font-weight: bold;font-size: 22px;">{{goodInfo.groupName}}</text>
				</text>
			</view>
		</view>
		
		<view class="" style="font-size: 20px;display: flex;margin-top: 10px;">
			<view class="" style="flex: 4;" v-if="selectAll">
				<button type="primary" style="border-radius: 9px;" @click="changeselectAll">
					全选
				</button>
			</view>
			<view class="" style="flex: 4;" v-else-if="!selectAll">
				<button type="primary" style="border-radius: 9px;" @click="changeselectAll">
					全不选
				</button>
			</view>
			<view class="" style="flex: 8;border: 1rpx solid; align-items: center;justify-content:center;display: flex;">
				<text>商品信息</text>
			</view>
		</view>
		
		<view class="uni-common-mt" v-if="relatedGoods0.length > 0">
			<view class="uni-form-item uni-column">
		                <checkbox-group class="uni-list" >
		                    <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in relatedGoods0" :key="index" @click="checkboxChange1(index)">
		                        <view>
		                            <checkbox :checked="item.checked"></checkbox>
		                        </view>
								<view>{{item.codigo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原价位:{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{item.goodName}}</view>
		                    </label>
		                </checkbox-group>
			</view>
		</view>
		
		<view class="uni-common-mt" v-if="relatedGoods1.length > 0">
			<view class="uni-form-item uni-column">
		                <checkbox-group class="uni-list" >
		                    <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in relatedGoods1" :key="index" @click="checkboxChange2(index)">
		                        <view>
		                            <checkbox :checked="item.checked"></checkbox>
		                        </view>
								<view>{{item.codigo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原价位:{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{item.goodName}}</view>
		                    </label>
		                </checkbox-group>
			</view>
		</view>
		</view>
</template>

<script>
	import {
		getSupnuevoBuyerCommodityPriceFormListOfGroupMobile,
		updateSupnuevoBuyerCommodityPriceGroupMobile
	} from '@/api/change.js'
	export default {
		data() {
			return {
				username:'',
				form:{},
				goodInfo:{},
				merchantId:'',
				codigo:'',
				updatePrice:'',
				relatedGoods0:{},
				relatedGoods1:{},
				goodIndex:'',
				appVersion:'app5.2',
				selectAll: false,
			}
		},
		onLoad(option){
			this.username = getApp().globalData.username
			uni.setNavigationBarTitle({
			    title: 'supnuevo-'+this.username
			});
			this.form = JSON.parse(decodeURIComponent(option.form));
			this.goodInfo = this.form.goodInfo;
			console.log(this.goodInfo)
			this.merchantId = this.form.merchantId;
			this.codigo = this.form.codigo;
			this.updatePrice = this.form.price;
			this.getCommoditiesByPriceId(this.goodInfo.commodityId);
		},
		methods: {
			getCommoditiesByPriceId(commodityId){
				getSupnuevoBuyerCommodityPriceFormListOfGroupMobile({
					commodityId: commodityId,
					codigo: this.codigo,
					updatePrice:this.updatePrice.toString()
				}).then(res => {
					console.log(res)
					var errorMsg = res.errorMessage;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errorMsg,
							showCancel: false,
						})
					} else {
						var relatedGoods0 = res.array0;
						var relatedGoods1 = res.array1;
						var goodIndex = 0;
						if (relatedGoods0 != undefined && relatedGoods0 != null){
							for (var i = 0; i < relatedGoods0.length; i++){
								if (relatedGoods0[i].commodityId == commodityId || relatedGoods0[i].groupPriceMark == 1 || relatedGoods0[i].flag==1){
										relatedGoods0[i].checked = true;
									 if(relatedGoods0[i].commodityId == commodityId){
										relatedGoods0[i].price = this.goodInfo.oldPrice;
										goodIndex = i;
									 }    
								}else {
									relatedGoods0[i].checked = false;
								}
								
								if (relatedGoods0[i].sizeValue != undefined && relatedGoods0[i].sizeValue != null && relatedGoods0[i].sizeUnit !=undefined && relatedGoods0[i].sizeUnit != null){
									relatedGoods0[i].goodName = relatedGoods0[i].nombre + ',' + relatedGoods0[i].sizeValue + ',' + relatedGoods0[i].sizeUnit;
								}else {
									relatedGoods0[i].goodName = relatedGoods0[i].nombre;
								}
							}
						}
						
						if (relatedGoods1 != undefined && relatedGoods1 != null){
							for (var i = 0; i < relatedGoods1.length; i++){
								if (relatedGoods1[i].commodityId == commodityId || relatedGoods1[i].groupPriceMark == 1 || relatedGoods1[i].flag==1){
										relatedGoods1[i].checked = true;
									 if(relatedGoods1[i].commodityId == commodityId){
										relatedGoods1[i].price = this.goodInfo.oldPrice;
										goodIndex = i;
									 }    
								}else {
									relatedGoods1[i].checked = false;
								}
								
								if (relatedGoods1[i].sizeValue != undefined && relatedGoods1[i].sizeValue != null && relatedGoods1[i].sizeUnit !=undefined && relatedGoods1[i].sizeUnit != null){
									relatedGoods1[i].goodName = relatedGoods1[i].nombre + ',' + relatedGoods1[i].sizeValue + ',' + relatedGoods1[i].sizeUnit;
								}else {
									relatedGoods1[i].goodName = relatedGoods1[i].nombre;
								}
							}
						}
						
						relatedGoods0.sort(function(a,b){
							return a.price - b.price;
						})
						this.relatedGoods0 = relatedGoods0;
						this.relatedGoods1 = relatedGoods1;
						this.goodIndex = goodIndex;
					}
				}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
				})	
			},
			changePriceRelated(){
				var selectedRelativePriceIds = [];
				for(var i = 0; i < this.relatedGoods0.length; i++){
					if (this.relatedGoods0[i].checked){
						selectedRelativePriceIds.push(this.relatedGoods0[i].commodityId);
					}
				}
				for(var i = 0; i < this.relatedGoods1.length; i++){
					if (this.relatedGoods1[i].checked){
						selectedRelativePriceIds.push(this.relatedGoods1[i].commodityId);
					}
				}
				var price = this.goodInfo.price.toString();
				updateSupnuevoBuyerCommodityPriceGroupMobile({
					commodityIds: selectedRelativePriceIds.toString(),
					merchantId: this.merchantId,
					priceShow: price,
					printType: this.goodInfo.printType,
					price: price,
					appVersion:this.appVersion
				}).then(res => {
					var errorMsg = res.errorMessage;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						console.log(123)
						uni.showModal({
							title: "提示",
							content: errorMsg,
							success: function() {
								uni.navigateBack({
									delta: 1
								})
							},
							showCancel: false,
						})
					} else {
						uni.showModal({
							title: "Alert Title",
							content: "组改价成功",
							success: function() {
								uni.navigateBack({
									delta: 1
								})
							},
							showCancel: false,
						})
					}
				}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
				})	
			},
			changeselectAll(){
				this.selectAll = !this.selectAll;
				if (this.relatedGoods0.length > 0 && this.selectAll){
					for(var i = 0; i < this.relatedGoods0.length; i++){
						this.relatedGoods0[i].checked = true;
					}
				}else
				if (this.relatedGoods1.length > 0 && this.selectAll){
					for(var i = 0; i < this.relatedGoods0.length; i++){
						this.relatedGoods1[i].checked = true;
					}
				}else
				if (this.relatedGoods0.length > 0 && !this.selectAll){
					for(var i = 0; i < this.relatedGoods0.length; i++){
						this.relatedGoods0[i].checked = false;
					}
				}else
				if (this.relatedGoods1.length > 0 && this.selectAll){
					for(var i = 0; i < this.relatedGoods0.length; i++){
						this.relatedGoods1[i].checked = false;
					}
				}
			},
			 checkboxChange1(index){
				this.relatedGoods0[index].checked = !this.relatedGoods0[index].checked
			 },
			 checkboxChange2(index){
			 	this.relatedGoods1[index].checked = !this.relatedGoods1[index].checked
			 },
		}
	}
</script>

<style>
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
