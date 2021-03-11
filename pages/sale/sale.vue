<template>
	<view class="container">
		<wyb-loading ref="loading"/>
		<view class="" style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 5px;margin-right: 5px;">
			<view class="saleinput">
				<taogewan-combox-remote class="input1" v-model="usertextinput" placeholder="条码尾数或价格"  emptyTips=" " :candidates="codes" @input="changecode" @select="onCodigoSelect"/>
				<!-- <input class="input1" type="text" :value="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" @change="changecode"/> -->
			</view>	
			<view class="">
				<button type="primary" @click="codeQuery(usertextinput, 0)" 
				style="background-color: #CAE1FF;border-radius: 1px;color: #343434;width: 80px;height: 40px;font-size: 16px;margin-left: 5px;">查询</button>
			</view>
			<view class="">
				<button type="primary" @click="ClassSelect" 
				style="background-color: #CAE1FF;border-radius: 1px;color: #343434;width: 80px;height: 40px;font-size: 16px;margin-left: 5px;">分类</button>
			</view>
		</view>
		
		<view>
			<scroll-view style="height: 525px;margin-top: 10px;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(item, index) in commodityList" :key="index">
						<template v-slot:left>
							<view class="slot-button">
								<text class="slot-button-text" @click="goodcountsmin(index)">数量-1</text>
							</view>
						</template>
						<view style="border-bottom: 1px solid #9999;width: 100%;">
							<view>
								<text style="margin-left: 10px;">{{item.goodsCount}}*{{item.price}}</text>
								<text  style="margin-left: 20px;">{{item.codigo}}</text>
							</view>
							<view >
								<text style="margin-left: 10px;">{{item.nombre}}</text>
								<text style="margin-left: 100px;">{{item.sum}}</text>
							</view>
						</view>
						<template v-slot:right>
							<view class="slot-button"><text class="slot-button-text" @click="goodcountsadd(index)">数量+1</text></view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</scroll-view>
		</view>
		
		
		<view class="" style="bottom: 5px;position: fixed;display: flex;flex-direction: row;z-index: 1;">
			<view class="">
				<button type="primary" @click="checkOut" 
				style="background-color: #CAE1FF;border-radius: 1px;color: #343434;width: 80px;height: 40px;font-size: 16px;margin-left: 5px;">结账</button>
			</view>
			<view class="">
				<button type="primary" @click="startCamera" 
				style="background-color: #CAE1FF;border-radius: 1px;color: #343434;width: 80px;height: 40px;font-size: 16px;margin-left: 10px;">扫码</button>
			</view>
			<view style="color: #343434;font-size: 16px;align-items: center;justify-content: center;display: flex;width: 80px;">
				<text>TOTAL:</text>
			</view>
			<view style="color: #343434;font-size: 16px;align-items: center;justify-content: center;display: flex;width: 80px;">
				<text style="">{{total}}</text>
			</view>
		</view>
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
			<view class="mycontent" v-for="(item,index) in commodityList1" :key="index" @click="addcommdity(index)">
				<view style="margin-top: 15px;margin-bottom: 15px;background-color: #fff;border-bottom: 1px solid #eee;width: 100%;height: 30px;">
					<text style="font-size: 20px;color: #444;">
						{{item}}
					</text>
				</view>
			</view>
		</luPopupWrapper>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerPriceCommodityListByLastFourCodigoMobile,
		gerCommodityInfoByCodigoMobile,
		saveCommoditySaleMobile
	} from '@/api/sale.js'
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				weightService: '',
				codeNum: '',
				codes: [],
				commodityList: [],
				usertextinput: '',
				price: '',
				total: 0,
				usertextinput: "",
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"100%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
				commodityList1: [],
			}
		},
		onShow() {
			this.weightService = getApp().globalData.weightService;	
			console.log(this.weightService)
			
		},
		components: {
			wybLoading,
			taogewanComboxRemote,
			luPopupWrapper
		},
		methods:{
			addcommdity(index){
				var commodity = {codigo: '',sum: this.price, nombre: this.commodityList1[index],goodsCount: 1,price: this.price + ""};
				var commodityList = this.commodityList
				this.price = '';
				commodityList.push(commodity)
				this.commodityList = commodityList
				console.log(this.commodityList)
				this.close();
				this.goodcountsadd(this.commodityList.length-1);
				this.commodityList[this.commodityList.length-1].sum -= this.commodityList[this.commodityList.length-1].price
				this.commodityList[this.commodityList.length-1].goodsCount--;
				// console.log(commodityList)
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
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			changecode (keyword){
				var codeNum = keyword;
				if (codeNum.length>=4){
				this.$refs.loading.showLoading()
				var a = codeNum.substring(0, 3);
				 a = parseInt(a);
				 if (a === 200) {
					this.queryGoodsCode(codeNum, 200);
				} else if (a === 210) {
					this.queryGoodsCode(codeNum, 210);
				} else if (a === 220) {
					this.queryGoodsCode(codeNum, 220);
				} else if (a === 230) {
					this.queryGoodsCode(codeNum, 230);
				}
				else {
					this.queryGoodsCode(codeNum, null);
				}
				}
			},
			queryGoodsCode (codeNum,n) {
				var weightService = this.weightService;
				  if (n === 200 || n === 210 || n === 220 || n === 230) {
					 if (n === 200) {
						 var a = weightService[200];
					 } else if (n === 210) {
						 var a = weightService[210];
					 } else if (n === 220) {
						 var a = weightService[220];
					 } else if (n === 230) {
						 var a = weightService[230];
					 }
					 this.codeQuery(codeNum, a);
				 }else {
					 getSupnuevoBuyerPriceCommodityListByLastFourCodigoMobile({
						  codigo: codeNum,
					 }).then(res => {
						  var errorMsg = res.errorMsg;
						 if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							 uni.showModal({
							 title: "提示",
							 content: errorMsg,
							 showCancel: false,
							 })
						 } else {
							 if (res.array.length === 1) {
								 var code = {codigo: res.array[0].codigo, commodityId: res.array[0].commodityId}
								 this.codeQuery(code.codigo, 0);
								  this.$refs.loading.hideLoading() // 隐藏
							 }
							 else {
								 this.codes = [];
								 var codes = res.array;
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									this.codes.push(searchItem)
								}
								 console.log(this.codes)
								 this.$refs.loading.hideLoading() // 隐藏
							 }
						 }
					 }) .catch((err) => {
							uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
							})
						});
				 }	  	
			    },
				onCodigoSelect(key,item) {
					console.log(item.value)
				    this.codeQuery(item.value, 0);
				 },
				codeQuery(codeNum, flag) {
					 if (flag === 0 || flag === 11) {//当flag=0是输入条码，11是扫码 
						gerCommodityInfoByCodigoMobile({
							 codigo: codeNum,
						}).then(res => {
							console.log(res);
							var errMessage = res.errMessage;
							if (errMessage !== null && errMessage !== undefined && errMessage !== "") {
								uni.showModal({ 
									title: "提示",
									content: errMessage,
									showCancel: false,
								})
							} else if (res.price === null) {
								uni.showModal({
								title: "提示",
								content: "该商品暂时缺少价格",
								showCancel: false,
								})
							} else {
								var commodity = {codigo: res.codigo, nombre: res.nombre, price: res.price + ""};
								var commodityList = this.commodityList;
								var i = 0;
								var f = 0;
								for (i = 0; i < commodityList.length; i++) {
									if (commodity.codigo === commodityList[i].codigo) {
									f = 1;
									commodityList[i].goodsCount++;
									commodityList[i].sum = commodityList[i].goodsCount * commodityList[i].price;
									}
								}
								if (i === commodityList.length && f === 0) {
									commodity.goodsCount = 1;
									commodity.sum = res.price;
									commodityList.push(commodity);
								}
								this.commodityList = commodityList;
								this.total +=  res.price;
									// if (flag === 11) {
									// 	this.closeCameraThenBegin();
									// }
								}
								}).catch((err) => {
									uni.showModal({
									title: "提示",
									content: err,
									showCancel: false,
									})
								});
						}else {
								var priceA = [codeNum.substring(8, 10) * 1].toString();
								var priceB = codeNum.substring(10, 12).toString();
								var commodity = {codigo: codeNum, nombre: flag, price: priceA + "." + priceB};
								var commodityList = this.commodityList;
								commodity.goodsCount = 1;
								commodity.sum = commodity.price * 1;
								commodityList.push(commodity);
								this.commodityList = commodityList;
						      }
					        // if (this.sListView !== undefined && this.sListView !== null && this.sListView.length>0) {
					        //     const bottomOfList = this.state.listHeight - this.state.scrollViewHeight;
					        //     this.sListView._listView.scrollTo({y: bottomOfList});
					        // }
				},
				ClassSelect(){
					 var userinput = this.usertextinput;
					 if (userinput === null || userinput === 0 || userinput === "" || userinput.length > 4) {
						uni.showModal({
						title: "提示",
						content: "请您先输入价格",
						showCancel: false,
						})
					}else {
						this.width ="100%";
						this.height ="80%";
						this.transition = "fade";
						this.type = "bottom";
						this.show();
						let that = this;
						this.price = userinput;
						this.commodityList1 = [];
						this.commodityList1 = getApp().globalData.commodityClassList
						console.log(this.commodityList1)
						
					}
				},
				goodcountsadd(index){
					var commodityList = this.commodityList;
					var i = 0;
					var k = 0;
					this.total = this.total - commodityList[index].sum;
					commodityList[index].goodsCount += 1;
					commodityList[index].sum = commodityList[index].goodsCount * commodityList[index].price;
					commodityList[index].sum += "";
					i = commodityList[index].sum.indexOf(".");
					 if (i != -1) {
					k = commodityList[index].sum.substring(i + 2, i + 3) * 1;
					if (k === 9) {
						commodityList[index].sum = commodityList[index].sum * 1;
						commodityList[index].sum += 0.001;
						commodityList[index].sum += "";
					}
					commodityList[index].sum = commodityList[index].sum.substring(0, i + 2);
				}
				commodityList[index].sum = commodityList[index].sum * 1;
				this.total = this.total + commodityList[index].sum;
				this.commodityList = commodityList;
				},
				goodcountsmin(index){
					var commodityList = this.commodityList;
					var i = 0;
					var k = 0;
					this.total = this.total - commodityList[index].sum;
					commodityList[index].goodsCount -= 1;
					commodityList[index].sum = commodityList[index].goodsCount * commodityList[index].price;
					if (commodityList[index].goodsCount === 0) {
						commodityList.splice(index, 1);
					}
					else {
						commodityList[index].sum += "";
						i = commodityList[index].sum.indexOf(".");
						if (i != -1) {
							// alert(i);
							k = commodityList[index].sum.substring(i + 2, i + 3) * 1;
							if (k === 9) {
								commodityList[index].sum = commodityList[index].sum * 1;
								commodityList[index].sum += 0.001;
								commodityList[index].sum += "";
							}
							commodityList[index].sum = commodityList[index].sum.substring(0, i + 2);
						}
						commodityList[index].sum = commodityList[index].sum * 1;
						this.total = this.total + commodityList[index].sum;
					}
					this.commodityList = commodityList;
				},
				checkOut(){
					 var commodityList = this.commodityList;
					 if (commodityList !== [] && commodityList.length !== 0) {
						 saveCommoditySaleMobile({
							 commodityList: commodityList,
						 }).then(res => {
							 var errMessage = res.errMessage;
							 if (errMessage !== null && errMessage !== undefined && errMessage !== "") {
							 	uni.showModal({ 
							 		title: "提示",
							 		content: errMessage,
							 		showCancel: false,
							 	})
							 }else {
								   this.commodityList = [];  
							 }
						 }).catch((err) => {
							uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
							})
						});
					 }else {
						 uni.showModal({
						 	title: "提示",
						 	content: "没有结账内容",
						 	showCancel: false,
						 })
					 }
					 this.total = 0;
				},
				startCamera(){
					var that = this;
					uni.scanCode({
						success:function(res){
							that.usertextinput = res.result;
							console.log('条码内容：' + that.usertextinput);
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
	.mycontent{
		height: 100%;
		width: 100%;
	}
	.saleinput {
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-width: 3px;
		border: 1px solid #000000;
		padding: 5px;
		width: 200px;
	}
	.input1 {
		display: flex;
		flex: 8;
		height: 35px;
		padding-left: 10;
		padding-right: 10;
		padding-top: 6;
		padding-bottom: 6;
		background-color: white;
		color: #333333;
	}
	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	.content-box {
		flex: 1;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.content-text {
		font-size: 15px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}

	.slot-button {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #ff5a5f;
	}

	.slot-button-text {
		color: #ffffff;
		font-size: 14px;
	}
</style>
