<template>

	<view class="container">
		<wyb-loading ref="loading"/>
		<view class="zaiui-head-search-box" style="background-color: #0081FF;">
			<view class="zaiui-flex-tab ">
				<view class="flex text-white">
					<view class="basis-xxs">
						<view class="sort-icon">
							<view class="uni-list">
							            <view class="uni-list-cell">
							                <view class="uni-list-cell-db">
							                    <picker @change="bindPickerChange" :value="index" :range="array">   
												<text class="cuIcon-sort"/>
							                    </picker>				
											</view>
							            </view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="priceinput">
			<taogewan-combox-remote class="input1" :placeholder="goods.codeNum"  emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/>
			<!-- <input class="input1" type="text" :value="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" @change="changecode"/> -->
			<button type="primary" class="priceButton" @click="startCamera" style="background-color: #3D4145;border-radius: 8px;">扫码</button>
			<button type="primary" class="priceButton" @click="selectNum" style="background-color: #3D4145;border-radius: 8px;">查询</button>
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
				<text v-if="priceShow!=undefined&&priceShow!=null">{{priceShow}}</text>
			</view>
			<view class="unmeanprice" style="border-left: solid 1px white ;border-right: solid 1px white ;" >
				<text v-if="priceShow!=undefined&&priceShow!=null">{{priceShow}}</text>
			</view>
			<view class="unmeanprice" v-if="priceShow!=undefined&&priceShow!=null">
				<text v-if="priceShow!=undefined&&priceShow!=null">{{priceShow}}</text>
			</view>
		</view>
		
		<view class="shopInfo">
			<view class="Inshop">
				<text>商品条码:</text>
			</view>
			<view class="Inshop1">
				<text>{{codigo}}</text>
			</view>
		</view>
		<view class="shopInfo" v-if="IsModify == false" @click="changeIsModify">
			<view class="Inshop">
				<text>商品名称:</text>
			</view>
			<view class="Inshop1">
				<text>{{selectedCodeInfo.goodName}}</text>
			</view>
		</view>
		<view class="shopInfo" v-if="IsModify == true" @click="changeIsModify" style="background-color: #007AFF;">
			<view class="Inshop">
				<text>商品名称:</text>
			</view>
			<view class="Inshop1">
				<text>{{selectedCodeInfo.goodName}}</text>
			</view>
		</view>
		<view class="shopInfo">
			<view class="Inshop">
				<text>更新改价:</text>
			</view>
			<view class="Inshop1">
				<input type="text" v-model="priceShow" />
			</view>
		</view>
		
		<view class="discount">
			<view class="Indiscount" v-if="printType.type1 == 1" style="background-color: #007AFF;" @click="changetype1">
				<text>标签</text>
			</view>
			<view class="Indiscount" v-else-if="printType.type1 == 0" @click="changetype1">
				<text>标签</text>
			</view>
			
			<view class="Indiscount" v-if="printType.type2 == 1" @click="changetype2" style="border-left: solid 1px white ;border-right: solid 1px white;background-color: #007AFF;">
				<text>大折扣</text>
			</view>
			<view class="Indiscount"  v-else-if="printType.type2 == 0" @click="changetype2" style="border-left: solid 1px white ;border-right: solid 1px white;">
				<text>大折扣</text>
			</view>
			
			<view class="Indiscount" v-if="printType.type3 == 1" @click="changetype3" style="border-right: solid 1px white;background-color: #007AFF">
				<text>中折扣</text>
			</view>
			<view class="Indiscount" v-else-if="printType.type3 == 0" @click="changetype3" style="border-right: solid 1px white;">
				<text>中折扣</text>
			</view>
			
			<view class="Indiscount" v-if="printType.type4 == 1" @click="changetype4" style="background-color: #007AFF;">
				<text>小折扣</text>
			</view>
			<view class="Indiscount" v-else-if="printType.type4 == 0" @click="changetype4">
				<text>小折扣</text>
			</view>
		</view>
		
		<view class="discount" style="background-color: #007AFF; color: #EEEEEE;" v-if="pricedicount.doubleORper == 1">
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice1)">
				<text>{{pricedicount.IVAprice1}}</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice2)" style="border-left: solid 1px white ;border-right: solid 1px white;">
				<text>{{pricedicount.IVAprice2}}</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice3)" style="border-right: solid 1px white;">
				<text>{{pricedicount.IVAprice3}}</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice4)">
				<text>{{pricedicount.IVAprice4}}</text>
			</view>
		</view>
		
		<view class="discount" style="background-color: #007AFF; color: #EEEEEE;" v-else-if="pricedicount.doubleORper == 2">
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice1)">
				<text>{{pricedicount.IVAprice1}}%</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice2)" style="border-left: solid 1px white ;border-right: solid 1px white;">
				<text>{{pricedicount.IVAprice2}}%</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice3)" style="border-right: solid 1px white;">
				<text>{{pricedicount.IVAprice3}}%</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.IVAprice4)">
				<text>{{pricedicount.IVAprice4}}%</text>
			</view>
		</view>
		
		<view class="discount" style="background-color: #007AFF; color: #EEEEEE;" v-if="pricedicount.doubleORper == 1">
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice1)">
				<text>{{pricedicount.profitprice1}}</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice2)" style="border-left: solid 1px white ;border-right: solid 1px white;">
				<text>{{pricedicount.profitprice2}}</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice3)" style="border-right: solid 1px white;">
				<text>{{pricedicount.profitprice3}}</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice4)">
				<text>{{pricedicount.profitprice4}}</text>
			</view>
		</view>
		
		<view class="discount" style="background-color: #007AFF; color: #EEEEEE;"  v-else-if="pricedicount.doubleORper == 2">
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice1)">
				<text>{{pricedicount.profitprice1}}%</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice2)" style="border-left: solid 1px white ;border-right: solid 1px white;">
				<text>{{pricedicount.profitprice2}}%</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice3)" style="border-right: solid 1px white;">
				<text>{{pricedicount.profitprice3}}%</text>
			</view>
			
			<view class="Indiscount" @click="priceCalculation(pricedicount.profitprice4)">
				<text>{{pricedicount.profitprice4}}%</text>
			</view>
		</view>
		
		
		<view class="discount" style="background-color: #007AFF;">
			<view class="Indiscount" @click="saveRelPrice">
				<text>联动改价</text>
			</view>
			
			<view class="Indiscount" @click="navigate_priceGroupChange" style="border-right: solid 1px white; border-left: solid 1px white ;">
				<text>组改价</text>
			</view>
			
			<view class="Indiscount" @click="savePrice">
				<text>确认</text>
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
		getSupnuevoCommodityTaxInfoListMobile
	} from '@/api/change.js'
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			},
		},   	
		components: {
				taogewanComboxRemote,
				wybLoading
		},
		data() {
			return {
				username:'',
				taxArr: [],
				sizeArr: [],
				array: ['维护商品信息', '价格偏差表', '计算键设置', '扫码间隔时间'],
				index: 0,
				goods: {
					codeNum: '请输入商品条码尾数'
				},
				selectedCodeInfo: {},
				codigo: '',
				codesModalVisible: false,
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
				printType: {type1: '1', type2: '0', type3: '0', type4: '0'},
				commodityId: null,
				referencePrice: null,//参考价
				gengxingaijiaInput: "",
				referencePriceButton: true,
				Gsuggestlevel: null,
				gengxingaijiaInput: '',
				scanTime: null,
				referencePriceList: [],
				appVersion:'app5.2',
				searchListFinal: [],
				IsModify:false,
				jisuanConfigModalVisible: false,//计算键设置的modal
				uploadModalVisible: false,
				taxMark: '',
				amount: '',
				pricedicount : {
					IVAprice1: '',
					IVAprice2: '',
					IVAprice3: '',
					IVAprice4: '',
					doubleORper: '',//1是浮点制，2是百分制
					profitprice1: '',
					profitprice2: '',
					profitprice3: '',
					profitprice4: ''
				},
				 wait: false,
			}
		},
		onShow(){
			this.username = getApp().globalData.username
			this.pricedicount.IVAprice1 = getApp().globalData.IVAprice1
			this.pricedicount.IVAprice1 = getApp().globalData.IVAprice1
			this.pricedicount.IVAprice2 = getApp().globalData.IVAprice2
			this.pricedicount.IVAprice3 = getApp().globalData.IVAprice3 
			this.pricedicount.IVAprice4 = getApp().globalData.IVAprice4
			this.pricedicount.doubleORper = getApp().globalData.doubleORper
			this.pricedicount.profitprice1 = getApp().globalData.profitprice1
			this.pricedicount.profitprice2 = getApp().globalData.profitprice2
			this.pricedicount.profitprice3 = getApp().globalData.profitprice3
			this.pricedicount.profitprice4 = getApp().globalData.profitprice4
			uni.setNavigationBarTitle({
			    title: 'supnuevo-'+this.username
			});
			if (this.codigo !== null && this.codigo !== undefined && this.codigo !== ''){
				const merchantId = getApp().globalData.merchantId;
				getSupnuevoBuyerPriceFormByCodigoMobile({
					codigo: this.codigo,
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
				
		},
		methods: {
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
			bindPickerChange: function(e) {
			            this.index = e.target.value
						if (this.index == 2){
							uni.navigateTo({
								url: './compute'
							})
						}else if(this.index == 0){
							if (!this.hasCodigo){
								var merchantId = getApp().globalData.merchantId
								getSupnuevoCommodityTaxInfoListMobile({
									merchantId: merchantId
								}).then(res => {
									var errorMsg = res.errorMsg;
									if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
										uni.showModal({
											title: "提示",
											content: errorMsg,
											showCancel: false,
										})
									 }else {
										 for (var i = 0; i < res.taxArr.length; i++){
											var o = {'value': '', 'label': ''};
											o.label = res.taxArr[i].label;
											o.value = res.taxArr[i].value;
											this.taxArr.push(o);
										 }
										 if (res.sizeArr === undefined)
											res.sizeArr = [];
										 for (var i = 0; i < res.sizeArr.length; i++) {
											var o = {'value': '', 'label': ''};
											o.label = res.sizeArr[i].label;
											o.value = res.sizeArr[i].value;
											this.sizeArr.push(o);
										}
										
										let form = {
											merchantId: merchantId,
											selectedCodeInfo : this.selectedCodeInfo,
											taxArr :this.taxArr,
											sizeArr : this.sizeArr,
										}
										uni.navigateTo({
											url: './AddCommInfo?form='+encodeURIComponent(JSON.stringify(form))
										})
										
									 }
								})							
								
							}else {
								var merchantId = getApp().globalData.merchantId
								getSupnuevoCommodityTaxInfoListMobile({
									merchantId: merchantId
								}).then(res =>{
									console.log(res)  
									 var errorMsg = res.errorMsg;
									 if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
											uni.showModal({
												title: "提示",
												content: errorMsg,
												showCancel: false,
											})
									  }else{
										   for (var i = 0; i < res.taxArr.length; i++){
											    var o = {'value': '', 'label': ''};
												o.label = res.taxArr[i].label;
												o.value = res.taxArr[i].value;
												this.taxArr.push(o);
										   }
											for (var i = 0; i < res.sizeArr.length; i++) {
												var o = {'value': '', 'label': ''};
												o.label = res.sizeArr[i].label;
												o.value = res.sizeArr[i].value;
												this.sizeArr.push(o);
											}
											if (this.selectedCodeInfo.codigo != undefined && this.selectedCodeInfo.codigo != null && this.selectedCodeInfo.codigo != ''){
													
													let form = {
														merchantId: merchantId,
														selectedCodeInfo : this.selectedCodeInfo,
														taxArr :this.taxArr,
														sizeArr : this.sizeArr, 
														// onCodigoSelect: this.onCodigoSelect.bind(this),
														// setHasCodigo: this.setHasCodigo.bind(this),
														// reset: this.reset.bind(this),
														commodityId : this.commodityId,
														attachDataUrl : this.attachDataUrl,
														attachDataUrl1 : this.attachDataUrl1,
														attachDataUrl2 : this.attachDataUrl2,
														attachDataUrl3 : this.attachDataUrl3,
														attachDataUrl4 : this.attachDataUrl4
													}
														uni.navigateTo({ 
															url: './MaintainCommInfo?form='+encodeURIComponent(JSON.stringify(form))
														})
													}	
									  }      
								})
								
							}
						}
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
				changeIsModify(){
					this.IsModify = !this.IsModify
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
				changetype1(){
					if (this.printType.type1 == 1)
						this.printType.type1 = 0;
					else this.printType.type1 = 1;
					this.selectedCodeInfo.printType = this.printType.type1 + this.printType.type2 + this.printType.type3 + this.printType.type4;
					console.log(123)
				},
				changetype2(){
					if (this.printType.type2 == 1)
						this.printType.type2 = 0;
					else this.printType.type2 = 1;
					this.selectedCodeInfo.printType = this.printType.type1 + this.printType.type2 + this.printType.type3 + this.printType.type4;
				},
				changetype3(){
					if (this.printType.type3 == 1)
						this.printType.type3 = 0;
					else this.printType.type3 = 1;
					this.selectedCodeInfo.printType = this.printType.type1 + this.printType.type2 + this.printType.type3 + this.printType.type4;
				},
				changetype4(){
					if (this.printType.type4 == 1)
						this.printType.type4 = 0;
					else this.printType.type4 = 1;
					this.selectedCodeInfo.printType = this.printType.type1 + this.printType.type2 + this.printType.type3 + this.printType.type4;
				},
				changeprice (){
					console.log(this.priceShow)
					this.gengxingaijiaInput = this.priceShow,
					this.inputPrice = this.priceShow,
					this.taxMark = 0,
					this.amount = 0
				},
				priceCalculation(price){
					// var priceShow = this.gengxingaijiaInput;
					//var doubleORper = this.pricedicount.doubleORper;
					if (this.priceShow == null || this.priceShow == undefined) {
					            return;
					 }
					if (this.pricedicount.doubleORper == 1) {
					             this.priceShow = (this.priceShow * price).toFixed(0);
					             this.priceShow = parseInt(this.priceShow);
					         } else if (this.pricedicount.doubleORper == 2) {
					             this.priceShow = ((this.priceShow * price / 100) + (this.priceShow * 1)).toFixed(0);
					             this.priceShow = parseInt(this.priceShow);
					         }
				},
				isNumber(val){
				    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				    if(regPos.test(val) || regNeg.test(val)){
				        return true;
				    }else{
				        return false;
				    }
				},
				savePrice(){
					if (this.priceShow !== null && this.priceShow !== undefined){
						if (this.codigo == null || this.codigo == undefined || this.codigo == ''){
							uni.showModal({
								title: "提示",
								content: '请输入正确条码',
								showCancel: false,
							})
							return;
						}
						if(this.commodityId==null || this.commodityId == undefined || this.commodityId ==''){
							uni.showModal({
								title: "提示",
								content: '请选择正确的商品',
								showCancel: false,
							})
							return;
						}
						
						if (this.priceShow !== null && this.priceShow !== undefined && this.priceShow !== '') {
							  if(! this.isNumber(this.priceShow)){
								uni.showModal({
								title: "提示",
								content: '请选择正确的商品',
								showCancel: false,
							})
							return;
							}							
						}
						var merchantId = getApp().globalData.merchantId
						var nombre = this.IsModify?this.selectedCodeInfo.nombre:null
						console.log(this.selectedCodeInfo.printType.toString())
						saveOrUpdateSupnuevoBuyerCommodityPriceMobile({
							 merchantId: merchantId,
							 price: this.priceShow.toString(),
							commodityId: this.commodityId,
							 printType: this.selectedCodeInfo.printType.toString(),
							 codigo: this.codigo.toString(),
							 appVersion:this.appVersion,
							 nombre:nombre,
						}).then(res => {
							console.log(res)
							var errorMsg = res;
							if (errorMsg === null && errorMsg === undefined) {
								uni.showModal({
									title: "提示",
									content: errorMsg,
									showCancel: false,
								})
							}else {
								 var message = res.message;
								 uni.showModal({
								 	title: "提示",
								 	content: message,
								 	showCancel: false,
								 })
								  this.reset();
							}
						})
						}
				},
				navigate_priceGroupChange(){
					var selectGoodInfo = this.selectedCodeInfo;
					let codigo = this.selectedCodeInfo.codigo;
					let price = this.priceShow;
					if (codigo==null || codigo == undefined || codigo== "" || codigo.length < 8 || codigo.length > 13){
						uni.showModal({
							title: "提示",
							content: "条码错误！！",
							showCancel: false,
						})
						return;
					} else
					 if(selectGoodInfo==null || selectGoodInfo == undefined || selectGoodInfo == ""){
						uni.showModal({
							title: "提示",
							content: "请输入条码！！",
							showCancel: false,
						})
						return ;
					}else
					 if (price == undefined || price == null || price == "") {
						uni.showModal({
							title: "提示",
							content: "请先输入价格！！",
							showCancel: false,
						})
						return;
					}else
					if(!this.isNumber(price)){
						uni.showModal({
							title: "提示",
							content: "请输入正确的价格！！",
							showCancel: false,
						})
						return;
					}else {
						let form = {
							merchantId: getApp().globalData.merchantId,
							price: price,
							goodInfo: selectGoodInfo,
							codigo: selectGoodInfo.codigo,
						}
						uni.navigateTo({
							url:'./Group?form='+encodeURIComponent(JSON.stringify(form))
						})
					}
					
				},
				saveRelPrice(){
					if (this.priceShow !== null && this.priceShow !== undefined){
					var priceShow = this.priceShow.toString();
					var commodityId = this.selectedCodeInfo.commodityId;
					var codigo = this.selectedCodeInfo.codigo.toString();
					var printType = this.selectedCodeInfo.printType.toString();
					 if (priceShow !== null && priceShow !== undefined && priceShow !== ''){
						 saveOrUpdateSupnuevoBuyerCommodityPriceAllRelMerchantMobile({
							 merchantId :getApp().globalData.merchantId,
							 price: priceShow,
							 commodityId: commodityId,
							 printType: printType,
							 codigo: codigo,
							 appVersion:this.appVersion,
						 }).then(res =>{
							   var errorMsg = res;
								 if (errorMsg === null && errorMsg === undefined) {
									 uni.showModal({
									 	title: "提示",
									 	content: errorMsg,
									 	showCancel: false,
									 })
								 } else {
									 var message = res.message;
									 uni.showModal({
									 	title: "提示",
									 	content: message,
									 	showCancel: false,
									 })
									 this.reset();
								 }
							})
					 }else {
						 uni.showModal({
						 	title: "提示",
						 	content: "请输入查询商品后再进行改价",
						 	showCancel: false,
						 })
					 }
					 }else{
						 uni.showModal({
						 	title: "提示",
						 	content: "请输入查询商品后再进行改价",
						 	showCancel: false,
						 })
					 }
				},
				}
	}
</script>

<style lang="scss">
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
		display: flex;
		flex: 4;
		justify-content: center;
		align-items: center;
		background-color: #C0C0C0;
		height: 45px;
	}
	.Inshop1 {
		display: flex;
		flex: 6;
		align-items: center;
		height: 45px;
	}
	.discount {
		margin-top: 15px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 50px;
		border-radius: 8px;
		border: solid 1px;
	}
	.Indiscount {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: 18px;
	}
	.zaiui-head-search-box {
		top: 0;
		background-color: rgba(229, 77, 66,0);
		.zaiui-flex-tab {
			transition: opacity .25s;
			.flex {	
				.sort-icon {
					font-size: 55rpx;
					line-height: 64rpx;
					text-align: center;
				}
			}
		}
	}
	.cuIcon-sort:before {
		content: "\e700";
	}
	.text-white {
	color: #ffffff;
	}
	
</style>
