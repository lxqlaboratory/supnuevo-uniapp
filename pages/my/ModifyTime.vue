<template>
	<view>
		<wyb-loading ref="loading"/>
		<luPopupWrapper ref="luPopupWrapper"
			:type="type"
			:transition="transition"
			:backgroundColor="backgroundColor"
			:active="active"
			:height="height"
			:width="width"
			:popupId="popupId"
			:maskShow="maskShow"
			:maskClick="maskClick"
			:closeCallback="closeCallback"
			>
			<view class="mycontent">
				<view style="background-color: #18B4ED;height: 40px;width: 100%;display: flex;align-items: center;">
					<uni-icons type="close" size="30" color="white" style="margin-left: 5px;" @click="close()"></uni-icons>
					<view style="font-size: 18px;color: white;margin-left: 110px;">
						<text>选择条形码</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 680px">
					<view class="uni-common-mt">
						<view class="uni-form-item uni-column">
							<checkbox-group class="uni-list" >
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in searchListFinal" :key="index" @click="onCodigoSelect(index,item)">
									<view>
										{{item.value}}
									</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</scroll-view>
				
			</view>
		</luPopupWrapper>
		<view class="priceinput">
			<!-- <taogewan-combox-remote class="input1" :placeholder="goods.codeNum"  emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/> -->
			<input class="input1" type="number" v-model="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" />
			<button type="primary" class="priceButton" @click="queryGoodsCode" style="background-color: #3D4145;border-radius: 8px;">查询</button>
			<button type="primary" class="priceButton" @click="startCamera" style="background-color: #3D4145;border-radius: 8px;">扫码</button>
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
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	export default {
		data() {
			return {
				goods: {
					codeNum: ''
				},
				searchListFinal: [],
				modifyList: [],
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"100%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
			}
		},
		components: {
			wybLoading,
			luPopupWrapper
		},
		onShow(){
			this.unionId = getApp().globalData.unionId;
			this.unionMemberType = getApp().globalData.unionMemberType;
		},
		methods:{
			fade: function() {
				this.width ="100%";
				this.height ="100%";
				this.transition = "fade";
				this.type = "bottom";
				this.show();
				let that = this;
			},
			show: function() {
				this.$refs.luPopupWrapper.show();
			},
			close: function() {
				this.$refs.luPopupWrapper.close();
			},
			closeCallback:function() {
				console.log("关闭后回调");
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
					 this.close()
					}
				}).catch((err) => {
				});	
			},
			//通过输入条码模糊查询
			 queryGoodsCode () {
					var codeNum = this.goods.codeNum
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
							this.searchListFinal = [];
			                if (res.array !== undefined && res.array !== null && res.array.length > 1) {
								console.log(123)
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:'',commodityId:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									searchItem.commodityId = res.array[i].commodityId
									this.searchListFinal.push(searchItem)
								}
								this.show();
			                }
			                else  {
								  //精确查询对应条码商品信息
								var merchantId = getApp().globalData.merchantId
								var searchItem={key:null,value:'',commodityId:''}
								searchItem.key = 0
								searchItem.value = res.object.codigo
								searchItem.commodityId = res.object.commodityId
								this.searchListFinal.push(searchItem)
								this.show()
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
		height: 110px;
		border-bottom: 1px solid #333333;
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
		font-size: 20px;
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
	.uni-list-cell {
		justify-content: flex-start;
		position: relative;
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
		align-items: center;
		
	}
	
	.uni-list .label-3 {
		padding: 0;
	}
	
	.label-2-text {
	    flex: 1;
	}
	.mycontent{
		height: 100%;
		width: 100%;
	}
</style>
