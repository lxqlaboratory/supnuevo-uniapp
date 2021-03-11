<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view class="priceinput">
			<taogewan-combox-remote class="input1" :placeholder="goods.codeNum"  emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/>
			<!-- <input class="input1" type="text" :value="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" @change="changecode"/> -->
			<button type="primary" class="priceButton" @click="startCamera" style="background-color: #3D4145;border-radius: 8px;">扫码</button>
			<button type="primary" class="priceButton" @click="selectNum" style="background-color: #3D4145;border-radius: 8px;">查询</button>
		</view>
		<view class="" v-if="priceId !== null && priceId !== undefined && priceId !== ''" style="height: 110px;width: 80%;margin: auto; margin-top: 15px;border: 1px solid #1CBBB4;border-radius: 20px;">
			<view class="" style="margin-top: 10px;margin-left: 10px;">
				<text>{{commodityName}}</text>
			</view>
			<view class="" style="margin-top: 10px;margin-left: 10px;color: red;">
				<text>$</text>
				<text>{{price}}</text>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType == 2">
			<view class="discount">
				<view class="">
					<text style="font-size: 18px;margin-right: 10px;">折扣编码</text>
				</view>
				<view >
					<input type="number" v-model="discountCode" placeholder="请输入折扣编码" style="border: 1px solid #000000;border-radius: 10px;height: 35px;padding: 5px;"/>
				</view>
			</view>
			<view class="discount">
				<view class="">
					<text style="font-size: 18px;margin-right: 10px;">折扣描述</text>
				</view>
				<view>
					<input type="text" v-model="discountPrompt" placeholder="请输入折扣描述" style="border: 1px solid #000000;border-radius: 10px;height: 35px;padding: 5px;"/>
				</view>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType != 2" style="margin-bottom: 20px;">
			<view class="discount">
				<view class="">
					<text style="font-size: 18px;margin-right: 10px;">折扣编码</text>
				</view>
				<view class="" style="border: 1px solid #000000;border-radius: 10px;height: 35px;width: 200px;display: flex;align-items: center;padding-left: 5px;">
					<text>{{discountCode}}</text>
				</view>
			</view>
			<view class="discount">
				<view class="">
					<text style="font-size: 18px;margin-right: 10px;">折扣描述</text>
				</view>
				<view class="discountInput">
					<text style="border: 1px solid #000000;border-radius: 10px;height: 35px;width: 200px;display: flex;align-items: center;padding-left: 5px;">{{discountPrompt}}</text>
				</view>
			</view>
		</view>
		
		<view class="" v-if="unionMemberType == 2" style="margin-bottom: 20px;">
			<button type="primary" @click="saveAdvertisement" style="width: 200px;border-radius: 10px;height: 35px;margin-top: 30px;vertical-align: middle;text-align: center;line-height: 35px;background-color: blue;">保存折扣</button>
		</view>
		<!-- <view class="" v-if="unionMemberType == 2" style="margin-bottom: 20px;">
			<button type="primary" @click="navigatorToPicture" style="width: 200px;border-radius: 10px;height: 35px;margin-top: 30px;vertical-align: middle;text-align: center;line-height: 35px;background-color: blue;">预览折扣图片</button>
		</view> -->
		
		<view class="" v-for="(item,index) in commodityDiscountList" :key="index" @click="onshowDiscount(item.discountCode,item.discountPrompt,item.priceId,item.commodityName,item.price,item)" style="display: flex;flex-direction: row; flex-direction: row; 
		align-items: center;border-top: 1px solid #939393;border-bottom: 1px solid #939393;">
			<view class="" style="margin-left: 10px;flex: 8;margin-top: 10px;margin-bottom: 10px;">
				<view class="">
					<text>商品条码:&nbsp;&nbsp;{{item.codigo}}</text>
				</view>
				<view class="">
					<text>折扣编码:&nbsp;&nbsp;{{item.discountCode}}</text>
				</view>
				<view class="">
					<text>折扣描述:&nbsp;&nbsp;{{item.discountPrompt}}</text>
				</view>
				<view class="">
					<text>价   格:&nbsp;&nbsp;{{item.price}}</text>
				</view>
			</view>
			
			<view class="" style="flex: 1;" v-if="unionMemberType == 2" @click="deleteSupnuevoBuyerUnionCommodityDiscount(item.priceId,item.discountPrompt)">
				<!-- <icon type="clear" size="26"/> -->
				<image src="../../static/image/images/delete.png" style="width: 26px;height: 26px;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getQueryDataListByInputStringMobile,
		getSupnuevoBuyerPriceFormByCodigoMobile,
		saveOrUpdateSupnuevoBuyerCommodityPriceMobile,
		saveOrUpdateSupnuevoBuyerCommodityPriceAllRelMerchantMobile,
		getSupnuevoCommodityTaxInfoListMobile,
		
	} from '@/api/change.js'
	import {
		getSupnuevoBuyerUnionPriceDiscountInfoList,
		getSupnuevoBuyerUnionPriceByCommodityId,
		updateSupnuevoBuyerUnionPriceDiscountInfo,
		getUnionQueryDataListByInputString,
		createSupnuevoBuyerUnionAdvertisement,
		getSupnuevoBuyerUnionAdvertisementFormList
	} from '@/api/MyInfor.js'
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				goods: {
					codeNum: '请输入商品条码尾数'
				},
				selectedCodeInfo: {},
				codigo: '',
				referencePriceButton: true,
				referencePrice: null,//参考价
				attachDataUrl1:null,
				attachDataUrl2:null,
				attachDataUrl3:null,
				attachDataUrl4:null,
				attachDataUrl:null,
				hasCodigo: false,
				priceShow: null,
				inputPrice: null,
				searchListFinal: [],
				printType: {type1: '1', type2: '0', type3: '0', type4: '0'},
				Gsuggestlevel: null,
				gengxingaijiaInput: '',
				commodityId: null,
				unionId: '',
				unionMemberType: '',
				commodityDiscountList: [],
				advertisements: [],
				goodsList: [],
				discountCode:"",
				discountPrompt:"",
				priceId:'',
				commodityName:'',
				price:'',
				discountPrice: '',
			}
		},
		components: {
				taogewanComboxRemote,
				wybLoading
		},
		onShow() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.unionId = getApp().globalData.unionId;
			if(this.unionMemberType !== 2)
			{
				this.discountCode = '';
				this.discountPrompt = '';
			}
			getSupnuevoBuyerUnionPriceDiscountInfoList({
				unionId: this.unionId
			}).then(res => {
				console.log(res)
				if(res.re === 1){
					this.commodityDiscountList = res.data
				}
			}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			this.getAdvertisementList();
			console.log(this.advertisements)
		},
		methods: {
			navigatorToPicture(){
				 if(this.discountCode==null || this.discountCode==undefined || this.discountCode==''){
					uni.showModal({
						title: "提示",
						content: "请先选择折扣!",
						showCancel: false,
					});	
					return
				}
				let form = {
					goods: this.goodsList,
					 discountCode:this.discountCode
				}
				uni.navigateTo({
					url:'./DiscountPic?form='+encodeURIComponent(JSON.stringify(form))
				})
			},
			getAdvertisementList(){
				getSupnuevoBuyerUnionAdvertisementFormList({
					unionId: this.unionId
				}).then(res =>{
				console.log(res)
					if(res.re === 1){
						this.advertisements = res.data
					}
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
					});	
			},
			onshowDiscount(discountCode,discountPrompt,priceId,commodityName,price,item){
				this.goodsList = item
				this.discountCode = discountCode;
				this.discountPrompt = discountPrompt;
				this.priceId = priceId;
				this.commodityName =commodityName;
				this.price = price
			},
			deleteSupnuevoBuyerUnionCommodityDiscount(priceId,discountPrompt){
				var that = this;
				uni.showModal({
					title: "提示",
					content: "是否删除该折扣",
					success:function(res){
						if (res.confirm){
							if(priceId == that.priceId){
								that.priceId = '';
								that.discountPrompt = '';
								that.discountCode = '';
							}
							updateSupnuevoBuyerUnionPriceDiscountInfo({
								unionId: that.unionId,
								priceId: priceId,
								discountCode: '00000000',
								discountPrompt: discountPrompt
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
										content: "删除成功",
										showCancel: false,
									})
									getSupnuevoBuyerUnionPriceDiscountInfoList({
										unionId: that.unionId
									}).then(res => {
										console.log(res)
										if(res.re === 1){
											that.commodityDiscountList = res.data
										}
									}).catch((err) => {
										uni.showModal({
											title: "提示",
											content: err,
											showCancel: false,
										})
										});	
								}
							}).catch((err) => {
										uni.showModal({
											title: "提示",
											content: err,
											showCancel: false,
										})
										});	
						}
					}
				})
			},
			toDecimal2(x) {
			        var f = parseFloat(x);
			        if (isNaN(f)) {
			            return false;
			        }
			        var f = Math.round(x*100)/100;
			        var s = f.toString();
			        var rs = s.indexOf('.');
			        if (rs < 0) {
			            rs = s.length;
			            s += '.';
			        }
			        while (s.length <= rs + 2) {
			            s += '0';
			        }
			        return s;
			    },
			updateSupnuevoBuyerUnionPriceDiscountInfo(advertisementNum,advertisementId){
				if (this.priceId === null || this.priceId === undefined || this.priceId === ''){
					uni.showModal({
						title: "提示",
						content: "请先选择折扣商品",
						showCancel: false,
					})
					return;
				}
				 var percentStr=this.discountCode.substring(6,8)
			   if(percentStr.charAt(0)==0){
					 this.discountPrice = this.toDecimal2(this.goodsList.price*(100-percentStr.charAt(1))/100)
				 }
				 else{
					  this.discountPrice = this.toDecimal2(this.goodsList.price*(100-percentStr)/100)
				 }
				  this.goodsList = Object.assign(this.goodsList,{discountCode: this.discountCode})
				  updateSupnuevoBuyerUnionPriceDiscountInfo({
				  	 unionId: this.unionId,
					priceId:this.priceId,
					discountCode: this.discountCode,
					discountPrompt: this.discountPrompt,
					discountPrice:this.discountPrice.toString(),
					ownerId: advertisementId,
					fileData: null,
					beanName:"supnuevoBuyerUnionAdvertisementProcessRmi",
					folder:"supnuevo/union/advertisement",
					fileName:this.unionId+'/'+advertisementNum+".jpg",
					remark:"supnuevo",
					attachType:"97",
					imageWidth:440,
					imageHeight:680,
					goods:this.goodsList,
				  }).then(res => {
				  	console.log(res)
				  	if(res.re === 1){
				  		uni.showModal({
				  		title: "提示",
				  		content: "保存成功",
				  		showCancel: false,
				  		})
				  		getSupnuevoBuyerUnionPriceDiscountInfoList({
				  			unionId: this.unionId
				  		}).then(res => {
				  			console.log(res)
				  			if(res.re === 1){
				  				this.commodityDiscountList = res.data
				  			}else {
								uni.showModal({
									title: "提示",
									content: res.data,
									showCancel: false,
								})
							}
				  		}).catch((err) => {
				  			uni.showModal({
				  				title: "提示",
				  				content: err,
				  				showCancel: false,
				  			})
				  		});	
				  	}
				  	else 
				  	uni.showModal({
				  	title: "提示",
				  	content: res.data,
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
			saveAdvertisement(){
				 var advertisementNum=this.discountCode.substring(0,2)
				  var advertisementId=0
				for(var i=0;i<this.advertisements.length;++i){
					if(advertisementNum==this.advertisements[i].advertisementNum){
						advertisementId=this.advertisements[i].advertisementId
						console.log('找到了'+i)
					}
				}
				console.log(advertisementId)
				if(advertisementId==null || advertisementId==undefined || advertisementId==''){
					createSupnuevoBuyerUnionAdvertisement({
						 unionId: this.unionId,
						 advertisementNum:advertisementNum,
					}).then(res => {
						var advertisementId=res.data.advertisementId
						 this.updateSupnuevoBuyerUnionPriceDiscountInfo(advertisementNum,advertisementId);
					})
				}else {
					 this.updateSupnuevoBuyerUnionPriceDiscountInfo(advertisementNum,advertisementId);
				}
				
			},
			changecode (keyword){
				var codeNum = keyword
				this.goods.codeNum = codeNum;
				this.queryGoodsCode(codeNum.toString());
			},
			onCodigoSelect(key, item){
				console.log(item.value)
				var codigo = item.value;
				getSupnuevoBuyerUnionPriceByCommodityId({
					commodityId: item.commodityId,
					unionId: this.unionId
				}).then(res1 => {
					console.log(res1)
					if (res1.re === 1){
						 var goodInfo = res1.data;
						  if (goodInfo.setSizeValue != undefined && goodInfo.setSizeValue != null
							 && goodInfo.sizeUnit != undefined && goodInfo.sizeUnit != null) {
							 goodInfo.nombre = goodInfo.nombre + ',' + goodInfo.setSizeValue + ',' + goodInfo.sizeUnit;
						 }
						 goodInfo.codeNum = codigo;
						 this.goods = goodInfo;
						 this.codigo = codigo;
						 this.goodsList = goodInfo;
						 this.commodityId = item.commodityId,
						 this.discountCode = goodInfo.discountCode;
						 this.discountPrompt = goodInfo.discountPrompt;
						 this.priceId = goodInfo.priceId;
						 console.log(this.priceId)
						 this.commodityName = goodInfo.commodityName;
						 this.price = goodInfo.price
					}
				}).catch((err) => {
					uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
					})
				});	
			},
			 queryGoodsCode (codeNum) {
					if (codeNum.length>=4){
					this.$refs.loading.showLoading()
					var merchantId = getApp().globalData.merchantId;
					this.searchListFinal = [];
			        getUnionQueryDataListByInputString({
						codigo: codeNum,
						merchantId: merchantId,
						unionId: this.unionId
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
							uni.showModal({
								title: "提示",
								content: '没有查到',
								showCancel: false,
							})
			            } else {
			                if (res.array !== undefined && res.array !== null && res.array.length > 0) {
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:'',commodityId:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									searchItem.commodityId = res.array[i].commodityId
									this.searchListFinal.push(searchItem)
								}
								this.referencePrice = null;
								this.referencePriceButton = true;
			                }
			                else {
								this.discountCode = null;
								this.discountPrompt = null;
								this.priceId = null;
								this.commodityName = null;
								this.price = null;
								getSupnuevoBuyerUnionPriceByCommodityId({
									commodityId: res.object.commodityId,
									unionId: this.unionId,
								}).then(res1 => {
									console.log(res1)
									if (res1.re === 1){
										 var goodInfo = res1.data;
										  if (goodInfo.setSizeValue != undefined && goodInfo.setSizeValue != null
											 && goodInfo.sizeUnit != undefined && goodInfo.sizeUnit != null) {
											 goodInfo.nombre = goodInfo.nombre + ',' + goodInfo.setSizeValue + ',' + goodInfo.sizeUnit;
										 }
										 goodInfo.codeNum = codeNum;
										 this.goods = goodInfo;
										 this.codigo = codeNum;
										 this.goodsList = goodInfo;
										 this.commodityId = res.commodityId;
										 this.discountCode = goodInfo.discountCode;
										 this.discountPrompt = goodInfo.discountPrompt;
										 this.priceId = goodInfo.priceId;
										 this.commodityName = goodInfo.commodityName;
										 this.price = goodInfo.price
									}
								}).catch((err) => {
									uni.showModal({
									title: "提示",
									content: err,
									showCancel: false,
									})
								});	
								
								}
							}
						}).catch((err) => {
							uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
							})
						});	
				}
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
				reset(){
					var printType = {type1: '1', type2: '0', type3: '0', type4: '0'}
					this.hasCodigo = false;
					this.selectedCodeInfo = {};
					this.priceShow = null;
					this.printType = printType;
					this.commodityId = null;
					this.referencePrice = null;
					this.gengxingaijiaInput = "";
					this.referencePriceButton = true;
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
