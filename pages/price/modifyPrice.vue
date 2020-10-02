<template>
	<view class="container">
		<view class="priceinput">
			<taogewan-combox-remote class="input1" placeholder="请输入商品条码尾数" emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/>
			<!-- <input class="input1" type="text" :value="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" @change="changecode"/> -->
			<button type="primary" class="priceButton" @click="startCamera">扫码</button>
			<button type="primary" class="priceButton" @click="selectNum">查询</button>
		</view>
		
		<view class="change-price">
			<view class="change">
				<text class="change-text">原价位</text>
			</view>
			<view class="change">
				<text class="change-text">建议价</text>
			</view>
			<view class="change1">
				<text class="change-text">参考价</text>
			</view>
		</view>
		
		<view class="unmean">
			<view class="unmeanprice" >
				<text>123</text>
			</view>
			<view class="unmeanprice" style="border-left: solid 1px white ;border-right: solid 1px white ;">
				<text>123</text>
			</view>
			<view class="unmeanprice" >
				<text>123</text>
			</view>
		</view>
		
		<view class="shopInfo">
			<view class="Inshop">
				<text>商品条码:</text>
			</view>
			<view class="">
				<text>{{codigo}}</text>
			</view>
		</view>
		<view class="shopInfo">
			<view class="Inshop">
				<text>商品名称:</text>
			</view>
			<view class="">
				<text>{{selectedCodeInfo.goodName}}</text>
			</view>
		</view>
		<view class="shopInfo">
			<view class="Inshop">
				<text>更新改价:</text>
			</view>
			<view class="">
				<text></text>
			</view>
		</view>
		
		<view class="">
			
		</view>
	</view>
</template>

<script>
	import {
		getQueryDataListByInputStringMobile,
		getSupnuevoBuyerPriceFormByCodigoMobile
	} from '@/api/change.js'
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	export default {
		components: {
				taogewanComboxRemote 
		},
		data() {
			return {
				goods: {
					codeNum: ''
				},
				selectedCodeInfo: {},
				codigo: '',
				codesModalVisible: false,
				referencePriceButton: true,
				referencePrice: null,//参考价
				commodityId: null,
				attachDataUrl1:null,
				attachDataUrl2:null,
				attachDataUrl3:null,
				attachDataUrl4:null,
				attachDataUrl:null,
				hasCodigo: false,
				priceShow: null,
				inputPrice: null,
				selectedCodeInfo: {},
				printType: {type1: '1', type2: '0', type3: '0', type4: '0'},
				commodityId: null,
				referencePrice: null,//参考价
				gengxingaijiaInput: "",
				referencePriceButton: true,
				Gsuggestlevel: null,
				gengxingaijiaInput: '',
				scanTime: null,
				referencePriceList: [],
				searchListFinal: [],
				jisuanConfigModalVisible: false,//计算键设置的modal
				uploadModalVisible: false,
			}
		},
		methods: {
			changecode (keyword){
				var codeNum = keyword
				this.goods.codeNum = codeNum;
				console.log(codeNum)
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
					    // this.props.dispatch(loginAction(username, password))
					}
					
					 if (res.errMessage !== null && res.errMessage !== undefined) {
					    var errMsg = res.errMessage.toString();
					     //下面這些不會  
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
							this.codigo = codigo;
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
					const merchantId = getApp().globalData.merchantId;
			        getQueryDataListByInputStringMobile({
						codigo: codeNum,
						merchantId: merchantId
					}).then(res => {
						console.log(res)
			            if(res.re == -2){
			                this.props.dispatch(loginAction(username, password))
							//这个也不名表明白
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
								console.log(2222222)
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									this.searchListFinal.push(searchItem)
								}
								console.log(this.searchListFinal[1]);
								this.codesModalVisible = true;
								this.referencePrice = null;
								this.referencePriceButton = true;
			                }
			                else {
								console.log(res.object.commodityId)
			                    var code = {codigo: res.object.codigo, commodityId: res.object.commodityId, referencePrice: null,referencePriceButton:true}
								this.onCodigoSelect(code);
								console.log(this.codigo)
			                }
			            }
			        }).catch(err => {
			           
			        });}
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
				startCamera(){
					
					
				}
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
		border: solid;
		border-color: #999999;
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
	
	.priceButton {
		margin-top: 4px;
		margin-bottom: 4px;
		margin-right: 8px;
		
	}
	
	.container {
		position: fixed;
		height: 100%;
		bottom: 0;
		width: 100%;
		background-size: cover;
		background-position: center;
	}
	.change-price {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 45px;
		background-color: #EEEEEE;
		margin-top: 5px;
		margin-bottom: 5rpx;
		border-radius: 8px;
		border: solid 1px;
	}
	.change {
		width: 33%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-right: 1rpx;
		align-items: center;
		border-right:solid 1px;
	}
	.change1{
		width: 33%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-right: 1rpx;
		align-items: center;
	}
	.change-text {
		font-size: 17px;
		color: '#444'
	}
	.unmean {
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 45px;
		border-radius: 8px;
		border: solid 1px;
		background-color: #007AFF;
	}
	.unmeanprice {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}
	.shopInfo {
		display: flex;
		flex-direction: row;
		height: 45px;
		margin-top: 3px;
		border: solid 0.5px #4CD964;
	}
	.Inshop {
		justify-content: center;
		align-items: center;
		background-color: #007AFF;
		height: 45px;
		width: 40%;
	}
</style>
