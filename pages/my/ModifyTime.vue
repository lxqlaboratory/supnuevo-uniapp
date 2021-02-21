<template>
	<view>
		<wyb-loading ref="loading"/>
		<view class="priceinput">
			<taogewan-combox-remote class="input1" :placeholder="goods.codeNum"  emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/>
			<!-- <input class="input1" type="text" :value="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" @change="changecode"/> -->
			<button type="primary" class="priceButton" @click="startCamera" style="background-color: #3D4145;border-radius: 8px;">扫码</button>
			<button type="primary" class="priceButton" @click="selectNum" style="background-color: #3D4145;border-radius: 8px;">查询</button>
		</view>
		<scroll-view  scroll-y="true" style="height: 665px;border-top: 1px solid #1CBBB4;margin-top: 10px;">
			<view class="Inrow1" v-for="(item,index) in modifyList" :key="index">
				<view class="" style="flex: 8;">
					<view class="" style="margin-left: 10px;">
						<text>店铺ID:&nbsp;&nbsp;{{item.merchantId}}</text>
					</view>
					<view class="" style="margin-left: 10px;">
						<text>店铺名称:&nbsp;&nbsp;{{item.shopName}}</text>
					</view>
					<view class="" style="margin-left: 10px;">
						<text>商品价格:&nbsp;&nbsp;{{item.price}}</text>
					</view>
					<view class="" style="margin-left: 10px;">
						<text>改价时间:&nbsp;&nbsp;{{item.priceTime}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	import {
		getUnionQueryDataListByInputString,
		getSupnuevoBuyerUnionPriceByCommodityId,
		getQueryDataListByInputStringMobile,
		getSupnuevoBuyerPriceModifyList
	} from '@/api/MyInfor.js'
	import sibList from '@/components/sib-list/sib-list1.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				goods: {
					codeNum: '请输入商品条码尾数'
				},
				searchListFinal: [],
				modifyList: [],
			}
		},
		components: {
			wybLoading
		},
		onShow(){
			this.unionId = getApp().globalData.unionId;
			this.unionMemberType = getApp().globalData.unionMemberType;
		},
		methods:{
			changecode (keyword){
				var codeNum = keyword
				this.goods.codeNum = codeNum;
				if (codeNum.length >= 4 )
				this.queryGoodsCode(codeNum.toString());
			},
			getSupnuevoBuyerUnionModifyPriceList(commodityId){
				getSupnuevoBuyerPriceModifyList({
					 unionId: this.unionId,
					 commodityId:commodityId,
				}).then(res => {
					console.log(res)
					 if(res.re === 1){
						this.modifyList = res.data;
						for(var i = 0; i < this.modifyList.length; i++){
							if (this.modifyList[i].shopName === undefined)
								this.modifyList[i].shopName = '';
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
			  //精确查询对应条码商品信息
			onCodigoSelect(key, item){
				console.log(item.commodityId)
				const merchantId = getApp().globalData.merchantId;
				var codigo = item.value;
				getSupnuevoBuyerUnionPriceByCommodityId({
					commodityId: item.commodityId,
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if(res.re == -2){
					    uni.navigateTo({
					    	url:'../index/index'
					    })
					}
					if (res.re === 1) {
					 this.getSupnuevoBuyerUnionModifyPriceList(item.commodityId)
					}
				}).catch((err) => {
				});	
			},
			//通过输入条码模糊查询
			 queryGoodsCode (codeNum) {
					if (codeNum.length>=4){
					this.$refs.loading.showLoading()
					var merchantId = getApp().globalData.merchantId;
					this.searchListFinal = [];
			        getQueryDataListByInputStringMobile({
						codigo: codeNum,
						merchantId: merchantId,
					}).then(res => {
						console.log(res)
			            if(res.re == -2){
							uni.navigateTo({
								url:'../index/index'
							})
			            }
			            var errorMsg = res.message;
			            if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							uni.showModal({
								title: "提示",
								content: errorMsg,
								showCancel: false,
							})
			            } else {
			                if (res.array !== undefined && res.array !== null && res.array.length > 1) {
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:'',commodityId:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									searchItem.commodityId = res.array[i].commodityId
									this.searchListFinal.push(searchItem)
								}
			                }
			                else if(res.array.length === 1) {
								  //精确查询对应条码商品信息
								var merchantId = getApp().globalData.merchantId
								getSupnuevoBuyerUnionPriceByCommodityId({
									commodityId:res.array[0].commodityId,
									unionId: this.unionId
								}).then(res => {
									console.log(res)
									if(res.re == -2){
									    uni.navigateTo({
									    	url:'../index/index'
									    })
									}
									if (res.re === 1) {
									}	
								}).catch((err) => {
								});	
			                }
			            }
			        }).catch((err) => {
						uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
					});	}
					 this.$refs.loading.hideLoading() // 隐藏
			    },
			startCamera(){
				var that = this;
				uni.scanCode({
					success:function(res){
						that.goods.codeNum = res.result;
						console.log('条码内容：' + that.goods.codeNum);
						uni.showModal({
							title: "提示",
							content: "扫码成功！！",
							showCancel: false,
						})
					},
					fail:function(res){
						uni.showModal({
							title: "提示",
							content: "扫码失败！！",
							showCancel: false,
						})
					},
				})
			},
		}
	}
</script>

<style>
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
	.priceButton {
		margin-top: 4px;
		margin-bottom: 4px;
		margin-right: 8px;
		height: 35px;
		font-size: 14px;
		width: 56px;
	}
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
	.Inrow1 {
		display: flex;
		justify-content: center;
		flex-direction: row; 
		align-items: center;
		height: 100px;
		border-bottom: 1px solid #333333;
	}
</style>
