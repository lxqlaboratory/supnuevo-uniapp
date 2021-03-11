<template>
	<view class="" >
		<wyb-loading ref="loading"/>
		<view class="" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn">
				<block class="" slot="sibScrollList">
					<view class="" v-for="(item,index) in list" :key="index">
						<view class="" @click="navigateGoodUpdate(item.codigo,item.commodityId)" style="padding: 10px;color: #428BCA;font-size: 20px;border-bottom: 2px solid #7C7C7C;width: 90%;margin: auto;">
							<text>|&nbsp;&nbsp;&nbsp;{{item.codigo}}</text>
						</view>
					</view>
				</block>
			</sib-list>
		</view>
	</view>
</template>

<script>
	import sibList from '@/components/sib-list/sib-list.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import {
		getIncompleteCommodityCodigoList 
	} from '@/api/MyInfor.js'
	import {
		getSupnuevoCommodityTaxInfoListMobile,
		getSupnuevoBuyerPriceFormByCodigoMobile
	} from '@/api/change.js'
	 
	export default {
		data(){
			return{
				unionId: '',
				commodityList: [],
				list: [],
				taxArr: [],
				sizeArr: [],
				index: 50,
				attachDataUrl1:null,
				attachDataUrl2:null,
				attachDataUrl3:null,
				attachDataUrl4:null,
				attachDataUrl:null,
				selectedCodeInfo: {},
				commodityId: '',
			}
		},
		components: {
				wybLoading,
				sibList
		},
		onShow() {
			this.$refs.loading.showLoading()
			this.unionId = getApp().globalData.unionId;
			this.getSupnuevoIncompleteCommodityList();
			this.$refs.loading.hideLoading() // 隐藏
		},
		methods:{
			getSupnuevoIncompleteCommodityList(){
				getIncompleteCommodityCodigoList({
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.commodityList = res.data
						if (res.data.length >=20 )
						for(var i = 0; i < this.index ;i++)
							this.list[i] = this.commodityList[i]
						else {
							this.list = res.data
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
			navigateGoodUpdate(codigo,commodityId){
				var merchantId = getApp().globalData.merchantId
				getSupnuevoCommodityTaxInfoListMobile({
					merchantId: merchantId
				}).then(res1 => {
					console.log(res1)
					var errorMsg = res1.errorMsg;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errorMsg,
							showCancel: false,
						})
					 }else {
						 var merchantId = getApp().globalData.merchantId
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
			 		
						 			if (goodInfo.priceShow == 0) {
						 				goodInfo.priceShow = "";
						 			}			
						 			this.selectedCodeInfo = goodInfo;
						 			this.commodityId = goodInfo.commodityId;
						 			this.attachDataUrl1 = goodInfo.attachDataUrl1;
						 			this.attachDataUrl2 = goodInfo.attachDataUrl2;
						 			this.attachDataUrl3 = goodInfo.attachDataUrl3;
						 			this.attachDataUrl4 = goodInfo.attachDataUrl4;
						 			this.attachDataUrl = goodInfo.attachDataUrl;
									console.log(this.commodityId )
									for (var i = 0; i < res1.taxArr.length; i++){
										var o = {'value': '', 'label': ''};
										o.label = res1.taxArr[i].label;
										o.value = res1.taxArr[i].value;
										this.taxArr.push(o);
									 }
									 if (res1.sizeArr === undefined)
										res1.sizeArr = [];
									 for (var i = 0; i < res1.sizeArr.length; i++) {
										var o = {'value': '', 'label': ''};
										o.label = res1.sizeArr[i].label;
										o.value = res1.sizeArr[i].value;
										this.sizeArr.push(o);
									}
									let form = {
										merchantId: merchantId,
										selectedCodeInfo : this.selectedCodeInfo,
										taxArr :this.taxArr,
										sizeArr : this.sizeArr, 
										commodityId : this.commodityId,
										attachDataUrl : this.attachDataUrl,
										attachDataUrl1 : this.attachDataUrl1,
										attachDataUrl2 : this.attachDataUrl2,
										attachDataUrl3 : this.attachDataUrl3,
										attachDataUrl4 : this.attachDataUrl4
									}
									console.log(form)
									uni.navigateTo({
										url: '../price/MaintainCommInfo?form='+encodeURIComponent(JSON.stringify(form))
									})
						 	}
						 })
	
					 }
				})							
			},
			touchstart: function(e) {
				this.$refs.sibList.refreshStart(e);
			},
			touchmove: function(e) {
				this.$refs.sibList.refreshMove(e);
			},
			touchend: function(e) {
				this.$refs.sibList.refreshEnd(e);
			},
			isRefresh: function() {
				const _this = this
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功,数据恢复初始值'
					})
					for(var i = 0; i < 20 ;i++)
						_this.list[i] = _this.commodityList[i]
					// 刷新结束调用
					this.$refs.sibList.endAfter()
				}, 1000)
			},
			scrolltolowerFn: function() {
				if(this.index == this.commodityList.length)
					return;
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 模拟请求
				const _this = this
				setTimeout(() => {
					// 请求成功
					const newData = []
					for(var i=0 ;i <= 20; i++){
						newData[i] = this.commodityList[this.index++]
						if (this.index == this.commodityList.length)
							return;
					}
					_this.list = _this.list.concat(newData)
					uni.hideLoading()
				}, 1000)
			},
		},
	}
</script>

<style>
</style>
