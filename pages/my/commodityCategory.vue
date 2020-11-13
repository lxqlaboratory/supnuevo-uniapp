<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view class="" style="height: 190px;border: 1px solid #555555;width: 80%;margin: 0 auto;margin-top: 20px;border-radius:25px;">
			<view class="Inrow">
				<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
					<text>选中</text>
				</view>
				<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
					<text>层级</text>
				</view>
				<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
					<text>商品数</text>
				</view>
			</view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll" v-if="unionMemberType === 2">
				<view class="Inrow" v-for="(item,index) in priceClassList" :key="index" @click="setUnionCurrentMerchantCount(item.priceCount)">
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						  <icon type="success" size="26" v-if="item.select === 1"/>
						  <icon type="cancel" size="26" v-if="item.select !== 1"/>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.priceCount}}</text>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.count}}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll" v-if="unionMemberType !== 2">
				<view class="Inrow" v-for="(item,index) in priceClassList" :key="index">
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						  <icon type="success" size="26" v-if="item.select === 1"/>
						  <icon type="cancel" size="26" v-if="item.select !== 1"/>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.priceCount}}</text>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.count}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="priceinput">
			<taogewan-combox-remote class="input1" :placeholder="goods.codeNum"  emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/>
			<!-- <input class="input1" type="text" :value="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" @change="changecode"/> -->
			<button type="primary" class="priceButton" @click="startCamera" style="background-color: #3D4145;border-radius: 8px;">扫码</button>
			<button type="primary" class="priceButton" @click="selectNum" style="background-color: #3D4145;border-radius: 8px;">查询</button>
		</view>
		
		<view class="" style="margin-top: 10px;justify-content: center;align-items: center;display:flex;" v-if="unionMemberType === 2">
			<button type="primary" size="mini" style="border-radius: 10px;background-color: #007AFF;" @click="setAllCommodityIsAlive">全部置为可用</button>
		</view>
		
		<scroll-view scroll-y="true" style="height: 435px;border-top: 1px solid #1CBBB4;margin-top: 10px;" @scroll="scroll" v-if="unionMemberType === 2" >
			<view class="Inrow1" v-for="(item,index) in goodsList" :key="index" @click="checkAlive(item.isAlive,item.commodityId)">
				<view class="" style="flex: 8;">
					<view class="">
						<text>{{index+1}}、codigo:&nbsp;&nbsp;{{item.codigo}}</text>
					</view>
					<view class="">
						<text>descripcion:&nbsp;&nbsp;{{item.nombre}}</text>
					</view>
				</view>
				<view class="" style="flex: 1;">
					<icon type="success" size="26" v-if="item.isAlive === 1"/>
					<icon type="cancel" size="26" v-if="item.isAlive !== 1"/>
				</view>
			</view>
		</scroll-view>
		
		<scroll-view  scroll-y="true" style="height: 435px;border-top: 1px solid #1CBBB4;margin-top: 10px;" @scroll="scroll" v-if="unionMemberType !== 2">
			<view class="Inrow1" v-for="(item,index) in goodsList" :key="index">
				<view class="" style="flex: 8;">
					<view class="">
						<text>codigo:&nbsp;&nbsp;{{item.codigo}}</text>
					</view>
					<view class="">
						<text>descripcion:&nbsp;&nbsp;{{item.nombre}}</text>
					</view>
				</view>
				<view class="" style="flex: 1;">
					<icon type="success" size="26" v-if="item.isAlive === 1"/>
					<icon type="cancel" size="26" v-if="item.isAlive !== 1"/>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionPriceClassList,
		setUnionCurrentMerchantCount,
		getSupnuevoBuyerUnionPriceListByPriceCount,
		setAllCommodityIsAlive,
		setSupnuevoBuyerUnionCommodityIsAlive
	} from '@/api/MyInfor.js'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				unionMemberType:'',
				unionId:'',
				priceClassList:[],
				// 扫码搜索
				goods: [],
				goodsList: [],
				wait: false,
				codesModalVisible: false,
				codigo: null,
				commodityId:null,
				camera: {},
				cameraModalVisible: false,
				openFlash: false,
				isAlive:true,
				commodityList:[true],
				selected:null,
				// selectedIdx:this.props.selectedIdx,
				selectedIdx:null,
				currentRow:0,
				goods: {
					codeNum: '请输入商品条码尾数'
				},
				searchListFinal: [],
			};
		},
		components: {
				wybLoading
		},
		onShow(){
			this.unionId = getApp().globalData.unionId;
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.getSupnuevoBuyerUnionPriceClassList();
		},
		methods:{
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			checkAlive(isAlive,commodityId){
				if(isAlive === 1){
					this.setCommodityIsAlive(commodityId,0);
				}
				if(isAlive === 0){
					this.setCommodityIsAlive(commodityId,1);
				}
			},
			setCommodityIsAlive(commodityId,AliveState){
				setSupnuevoBuyerUnionCommodityIsAlive({
					unionId: this.unionId,
					commodityId: commodityId,
					isAlive: AliveState
				}).then(res => {
					var errorMsg = res.errorMsg;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errorMsg,
							showCancel: false,
						})
					} else {
						uni.showModal({
							title: "提示",
							content: "设置成功",
							showCancel: false,
						})
						this.getSupnuevoBuyerUnionPriceListByPriceCount(this.selectedIdx);
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			setAllCommodityIsAlive(){
				setAllCommodityIsAlive({
					unionId: this.unionId
				}).then(res => {
					var errorMsg = res.errorMsg;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errorMsg,
							showCancel: false,
						})
					} else {
						uni.showModal({
							title: "提示",
							content: "设置成功",
							showCancel: false,
						})
						this.getSupnuevoBuyerUnionPriceListByPriceCount(this.selectedIdx);
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			checkSelect(){
				for(var i = 0; i < this.priceClassList.length; i++){
					if (this.priceClassList[i].select === 1){
						this.selectedIdx = this.priceClassList[i].priceCount 
						this.getSupnuevoBuyerUnionPriceListByPriceCount(this.selectedIdx)
					}
				}
			},
			getSupnuevoBuyerUnionPriceListByPriceCount(priceCount){
				this.$refs.loading.showLoading()
				getSupnuevoBuyerUnionPriceListByPriceCount({
					unionId: this.unionId,
					priceCount: priceCount
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.goodsList = res.data
					}
					this.$refs.loading.hideLoading() // 隐藏
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
			});	
			},
			getSupnuevoBuyerUnionPriceClassList(){
				getSupnuevoBuyerUnionPriceClassList({
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if(res.re === 1){
						this.priceClassList = res.data
					}
					if(this.priceClassList.length > 0){
						this.checkSelect()
					}
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			},
			setUnionCurrentMerchantCount(merchantCount){
				var that = this;
				uni.showModal({
					title: "提示",
					content: "是否更改维护种类",
					 success: function (res) {
					        if (res.confirm) {
									that.$refs.loading.showLoading()
					            	that.selectedIdx = merchantCount;
					            	setUnionCurrentMerchantCount({
					            		unionId: that.unionId,
					            		merchantCount: merchantCount
					            	}).then(res => {
					            		if (res.re === 1){
					            			uni.showModal({
					            				title: "提示",
					            				content: "设置成功",
					            				showCancel: false,
					            			})
					            		 that.getSupnuevoBuyerUnionPriceListByPriceCount(merchantCount);//去掉？
					            		 that.getSupnuevoBuyerUnionPriceClassList();
					            		}
					            	}).catch((err) => {
					            	uni.showModal({
					            		title: "提示",
					            		content: err,
					            		showCancel: false,
					            	})
					            });	
					        } else if (res.cancel) {
					            return;
					        }
					    }
				})
			},
			changecode (keyword){
				var codeNum = keyword
				this.goods.codeNum = codeNum;
				this.queryGoodsCode(codeNum.toString());
			},
			onCodigoSelect(key, item){
				console.log(item.value)
				const merchantId = getApp().globalData.merchantId;
				var codigo = item.value;
				getSupnuevoBuyerPriceFormByCodigoMobile({
					codigo: codigo,
					supnuevoMerchantId: merchantId
				}).then(res => {
					if(res.re == -2){
					    uni.navigateTo({
					    	url:'../index/index'
					    })
					}
					
					 if (res.errMessage !== null && res.errMessage !== undefined) {
					    var errMsg = res.errMessage.toString();
					     uni.showModal({
					     	title: "提示",
					     	content: errMsg,
					     	showCancel: false,
					     }) 
						 return;
					}else {
						 console.log(res)
						var goodInfo = res.object;
						if (goodInfo.setSizeValue != undefined && goodInfo.setSizeValue != null
							&& goodInfo.sizeUnit != undefined && goodInfo.sizeUnit != null) {
							goodInfo.goodName = goodInfo.nombre + ',' +
							goodInfo.setSizeValue + ',' + goodInfo.sizeUnit;
						}
						else {
							goodInfo.goodName = goodInfo.nombre;
						}
						
						var printType = goodInfo.printType;
						for (var i = 0; i < printType.length; i++) {
							var j = i + 1;
							var type = "type" + j;
							this.printType[type] = printType.charAt(i);
							if (i === 0 && printType.charAt(i) !== 1) {
								this.printType[type] = 1;
							}
							}
							var newPrintType = this.printType;
							goodInfo.printType = newPrintType.type1 + newPrintType.type2 + newPrintType.type3 + newPrintType.type4;
			
							this.goods.codeNum = 0;
							var goods = this.goods;
						
							if (goodInfo.priceShow == 0) {
								goodInfo.priceShow = "";
							}
							var referencePrice = goodInfo.minPrice;
							if(referencePrice==null || referencePrice==0.0)
								this.referencePriceButton = true;
							else if (referencePrice !== null && referencePrice !== undefined) {
								this.setStatereferencePrice = referencePrice, this.referencePriceButton = false
							}			
							this.selectedCodeInfo = goodInfo;
							this.codigo = goodInfo.codigo;
							this.priceShow = goodInfo.priceShow,
							this.printType = newPrintType, 
							this.goods = goods, 
							this.hasCodigo = true,
							this.Gsuggestlevel = goodInfo.suggestLevel,
							this.gengxingaijiaInput = goodInfo.priceShow,
							this.commodityId = goodInfo.commodityId,
							this.attachDataUrl1 = goodInfo.attachDataUrl1,
							this.attachDataUrl2 = goodInfo.attachDataUrl2,
							this.attachDataUrl3 = goodInfo.attachDataUrl3,
							this.attachDataUrl4 = goodInfo.attachDataUrl4,
							this.attachDataUrl = goodInfo.attachDataUrl
			
					}
				})
			},
			 queryGoodsCode (codeNum) {
					if (codeNum.length>=4){
					this.$refs.loading.showLoading()
					var merchantId = getApp().globalData.merchantId;
					this.searchListFinal = [];
			        getQueryDataListByInputStringMobile({
						codigo: codeNum,
						merchantId: merchantId
					}).then(res => {
						console.log(res)
			            if(res.re == -2){
							uni.navigateTo({
								url:'../index/index'
							})
			            }
			            var errorMsg = res.message;
			            this.reset();
			            if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							console.log(742)
							uni.showModal({
								title: "提示",
								content: '没有查到',
								showCancel: false,
							})
			            } else {
			                if (res.array !== undefined && res.array !== null && res.array.length > 0) {
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									this.searchListFinal.push(searchItem)
								}
								this.codesModalVisible = true;
								this.referencePrice = null;
								this.referencePriceButton = true;
			                }
			                else {
								var merchantId = getApp().globalData.merchantId
								getSupnuevoBuyerPriceFormByCodigoMobile({
									codigo: res.object.codigo,
									supnuevoMerchantId: merchantId
								}).then(res => {
									if(res.re == -2){
									    uni.navigateTo({
									    	url:'../index/index'
									    })
									}
									
									 if (res.errMessage !== null && res.errMessage !== undefined) {
									    var errMsg = res.errMessage.toString();
									     uni.showModal({
									     	title: "提示",
									     	content: errMsg,
									     	showCancel: false,
									     }) 
										 return;
									}else {
										 console.log(res)
										var goodInfo = res.object;
										if (goodInfo.setSizeValue != undefined && goodInfo.setSizeValue != null
											&& goodInfo.sizeUnit != undefined && goodInfo.sizeUnit != null) {
											goodInfo.goodName = goodInfo.nombre + ',' +
											goodInfo.setSizeValue + ',' + goodInfo.sizeUnit;
										}
										else {
											goodInfo.goodName = goodInfo.nombre;
										}
										
										var printType = goodInfo.printType;
										for (var i = 0; i < printType.length; i++) {
											var j = i + 1;
											var type = "type" + j;
											this.printType[type] = printType.charAt(i);
											if (i === 0 && printType.charAt(i) !== 1) {
												this.printType[type] = 1;
											}
											}
											var newPrintType = this.printType;
											goodInfo.printType = newPrintType.type1 + newPrintType.type2 + newPrintType.type3 + newPrintType.type4;
											
											this.goods.codeNum = 0;
											var goods = this.goods;
										
											if (goodInfo.priceShow == 0) {
												goodInfo.priceShow = "";
											}
											var referencePrice = goodInfo.minPrice;
											if(referencePrice==null || referencePrice==0.0)
												this.referencePriceButton = true;
											else if (referencePrice !== null && referencePrice !== undefined) {
												this.setStatereferencePrice = referencePrice, this.referencePriceButton = false
											}			
											this.selectedCodeInfo = goodInfo;
											this.codigo = goodInfo.codigo;
											this.priceShow = goodInfo.priceShow,
											this.printType = newPrintType, 
											this.goods = goods, 
											this.hasCodigo = true,
											this.Gsuggestlevel = goodInfo.suggestLevel,
											this.gengxingaijiaInput = goodInfo.priceShow,
											this.commodityId = goodInfo.commodityId,
											this.attachDataUrl1 = goodInfo.attachDataUrl1,
											this.attachDataUrl2 = goodInfo.attachDataUrl2,
											this.attachDataUrl3 = goodInfo.attachDataUrl3,
											this.attachDataUrl4 = goodInfo.attachDataUrl4,
											this.attachDataUrl = goodInfo.attachDataUrl
									}
								})
								
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
				selectNum (){
					if (this.goods.codeNum !== undefined && this.goods.codeNum !== null){
						var codeNum = this.goods.codeNum;
						if (codeNum.toString().length >= 4 && codeNum.toString().length <= 13) {
							this.queryGoodsCode(this.goods.codeNum.toString());
						}else {
							uni.showModal({
								title: "提示",
								content: '请输入4-13位的商品条码进行查询',
								showCancel: false,
							})
						}
					}else {
						uni.showModal({
							title: "提示",
							content: '请输入4-13位的商品条码进行查询',
							showCancel: false,
						})
					}
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
		},
	}
</script>

<style>
	.Inrow {
		display: flex;
		justify-content: center;
		flex-direction: row; 
		align-items: center;
		height: 35px;
		border-bottom: 1px solid #333333;
	}
	.Inrow1 {
		display: flex;
		justify-content: center;
		flex-direction: row; 
		align-items: center;
		height: 70px;
		border-bottom: 1px solid #333333;
	}
	.scroll-Y{
		height: 155px;
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
</style>
