<template>
	<view>
		<wyb-loading ref="loading"/>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<scroll-view :scroll-top="scrollTop" class="scroll-Y" scroll-y="true"  @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品内码：</text>
						</view>
						<view class="InGood2">
							<text></text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品条码：</text>
						</view>
						<view class="InGood2">	
							<input type="text" v-model="newGoodInfo.codigo" style="flex: 8; background-color: white;height: 30px;margin-right: 10px;"/>
							<button type="primary" @click="startCamera" style="flex: 1.5; background-color: #3D4145;border-radius: 9px;margin-right: 10px;font-size: 13px;">扫码</button>
						</view>	
						
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品简称：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="newGoodInfo.nombre" style="background-color: white;height: 30px;"/>
						</view>
					</view>
					<view class="GoodInfo" v-if="root">
						<view class="InGood1">
							<text>商品全名：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="newGoodInfo.commodityName" style="background-color: white;height: 30px;"/>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品含量：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="newGoodInfo.setSizeValue" style="background-color: white;height: 30px;" />
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>含量单位：</text>
						</view>
						<view class="InGood2image">
							 <picker @change="sizeUnitButtonsChange" :value="index1" :range="sizeUnitButtons">
								 <view class="" style="display: flex;">
								 	<view class="uni-input" style="flex: 1;">{{newGoodInfo.sizeUnit}}</view>
									<view class="" style="flex: 1;">
										<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
									</view>
								 </view>							
							 </picker>
						</view>
						 
					</view>
					
					<view class="GoodInfo">
						<view class="InGood1">
							<text>比价单位：</text>
						</view>
						<view class="InGood2image">
							<view  v-if="scaleUnitButtons.length<=0"  @click="scaleclick">
								<view class="" style="display: flex;">
									<view class="uni-input">{{newGoodInfo.scaleUnit}}</view>
									<view class="" style="flex: 1;">
										<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
									</view>
								</view>
							</view>
							 <picker @change="scaleUnitButtonsChange" v-if="scaleUnitButtons.length>0" :value="index2" :range="scaleUnitButtons">
									<view class="" style="display: flex;">
										<view class="uni-input" style="flex: 1;">{{newGoodInfo.scaleUnit}}</view>
										<view class="" style="flex: 1;">
											<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
										</view>
									</view>									
							 </picker>
						</view>	 
					</view>
					
					<view class="GoodInfo" v-if="root">
						<view class="InGood1">
							<text>商品税类：</text>
						</view>
						<view class="InGood2">
							 <picker @change="taxButtonsChange" :value="index3" :range="taxButtons">
								 <view class="" style="display: flex;">
								 	<view class="uni-input" style="flex: 9;">{{newGoodInfo.selectTax}}</view> 
									<view class=""  style="flex: 1;">
										<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
									</view>
								 </view>				
							 </picker>
						</view>
					</view>
					
					<view class="" style="height: 280px;border: 1px solid #AAAAAA ;background-color: #CCE6FF;" v-if="picUrl1 === null || picUrl1 === '' ">
						<view class="" style="padding-top: 10px;text-align: center;">
							<text style="font-size: 20px;">商品图像</text>
						</view>
						<image src="../../static/image/images/timg.jpg" mode="aspectFit" style="height: 200px;width: 100%;margin-top: 10px;"></image>
					</view>
					
					<view class="" style="background-color: #CCE6FF; border: 1px solid #AAAAAA ;background-color: #CCE6FF;height: 280px;"
					 v-else-if="picUrl1 != null && picUrl1 != '' ">
						<view class="" style="padding-top: 10px;text-align: center;">
							<text style="font-size: 20px;">商品图像</text>
						</view>
						<view class="">
							<image :src="picUrl1" mode="aspectFit" style="height: 200px;width: 100%;margin-top: 10px;"></image>
						</view>
					</view>
					
					<view class="" style="background-color: #CCE6FF; border: 1px solid #AAAAAA ;background-color: #CCE6FF;height: 260px;">
						<view class="" style="padding-top: 10px;text-align: center;">
							<text style="font-size: 15px; ">备选图像</text>
						</view>
						<cover-view class="p-list">
							<cover-view class="l-item" v-for="(item, index) in photoArr" :key="index">
								<cover-image class="i-img" :src="item" mode="scaleToFill" @click="changeBigurl(index)"></cover-image>
								<cover-image @click="deletePhoto(index)" class="i-icon" src="../../static/image/images/delete.png" mode="scaleToFill"></cover-image>
							</cover-view>
						</cover-view>
						<view class="" style="margin-top: 10px;text-align:center">
							<button type="primary" @click="uploadFoodImg" size="mini">上传备选图像</button>
						</view>
					</view>
					
					<view class="" style="margin-top: 10px;margin-bottom: 10px;">
						<form @submit="MaintainSubmit" >
							<button type="primary" form-type="submit">确认</button> 
						</form>
					</view>				
				</scroll-view>
			</view>	
		  
		</view>
	</view>
</template>

<script>
	var that = null;
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import {
		getSupnuevoScaleInfoListMobile,
		saveOrUpdateSupnuevoCommonCommodityMobile,
		uploadAttachData,
		changeSupnuevoCommonCommodityImage,
		deleteSupnuevoCommonCommodityImage,
		getSupnuevoBuyerPriceFormByCodigoMobile
	} from '@/api/change.js'
	export default {
		data() {
			return {
				username:'',
				root:'',
				taxArr: [],
				sizeArr: [],
				scaleArr: [],
				photoArr: [],
				photoArrCapacity: 4,
				head: "https://supnuevo.s3.sa-east-1.amazonaws.com/",
				picUrl1: '',
				picUrl2: '',
				picUrl3: '',
				picUrl4: '',
				merchantId: '',
				sizeUnitButtons: [],
				scaleUnitButtons: [],
				taxButtons: [],
				form: {},
				newGoodInfo: {
					codigo: '',
					nombre: '',
					commodityName:'',
					setSizeValue: '',
					sizeUnit: '',
					scaleUnit: '',
					selectTax: '',
					taxId: null
				},
				index1: 0,
				index2: 0,
				index3: 0,
				commodityId: null, 
			}
		},
		components: {
		        wybLoading
		    },
		onLoad(option) {
			this.$refs.loading.showLoading()
			that = this;
			this.picUrl1 = null;
			this.root = getApp().globalData.root;
			this.form = JSON.parse(decodeURIComponent(option.form));
			this.taxArr = this.form.taxArr;
			this.sizeArr = this.form.sizeArr;
			this.merchantId = this.form.merchantId
			for (var i = 0 ; i < this.sizeArr.length ; i++){
					this.sizeUnitButtons.push(this.sizeArr[i].label)
			}
			for (var i = 0 ; i < this.taxArr.length ; i++){
				this.taxButtons.push(this.taxArr[i].label)
				if (this.taxArr[i].value == this.form.selectedCodeInfo.taxId){
					 this.selectTax = (this.form.taxArr[i].label)
				}
								
			}
			this.username = getApp().globalData.username
			uni.setNavigationBarTitle({
			    title: 'supnuevo-'+this.username
			});
			this.$refs.loading.hideLoading() // 隐藏
		},
		methods: {
			scaleclick(){
				if (this.scaleUnitButtons.length <= 0){
					uni.showModal({
						title: "提示",
						content: "请先选择含量单位",
						showCancel: false,
					})
				}
			},
			scaleUnitButtonsChange:  function(e) {
				this.index2 = e.target.value
				this.newGoodInfo.scaleUnit = this.scaleUnitButtons[this.index2]
				},
			startCamera(){
				var that = this;
				uni.scanCode({
					success:function(res){
						that.newGoodInfo.codigo = res.result
						console.log('条码内容：' + that.newGoodInfo.codigo);
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
					}
					
				})
			},
			sizeUnitButtonsChange: function(e) {
			    this.index1 = e.target.value
				this.newGoodInfo.sizeUnit = this.sizeUnitButtons[this.index1]
				 var sizeUnit = this.newGoodInfo.sizeUnit;
				 getSupnuevoScaleInfoListMobile({
					  sizeUnit: this.newGoodInfo.sizeUnit,
					  merchantId: this.merchantId
				 }).then(res => {
					  for (var i = 0 ; i < res.scaleArr.length ; i++){
							this.scaleArr.push(res.scaleArr[i])
					  }
					  for (var i = 0 ; i < this.scaleArr.length ; i++){
							this.scaleUnitButtons.push(this.scaleArr[i].label)
					  }
				 })
			},
			taxButtonsChange:  function(e){
				this.index3 = e.target.value
				this.newGoodInfo.selectTax = this.taxButtons[this.index3]
			},
			deletePhoto(index) {
				this.$refs.loading.showLoading()
				var flag = 0;
				getSupnuevoBuyerPriceFormByCodigoMobile({
					codigo: this.selectedCodeInfo.codigo,
					supnuevoMerchantId: this.merchantId
				}).then(res => {
					let goods = res.object;
					if ((this.head + goods.attachDataUrl1) === this.photoArr[index])
						flag = 1;
					else 
					if ((this.head + goods.attachDataUrl2) === this.photoArr[index])
						flag = 2;
					else 
					if ((this.head + goods.attachDataUrl3) === this.photoArr[index])
						flag = 3;
					else
					if ((this.head + goods.attachDataUrl4) === this.photoArr[index])
						flag = 4;
						
					deleteSupnuevoCommonCommodityImage({
						merchantId: this.merchantId,
						commodityId: this.commodityId,
						index: flag,
						isAdmin: "",
					}).then(res => {
						console.log(res)
						var errorMsg = res.errorMsg;
						if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							uni.showModal({
								title: "提示",
								content: errorMsg,
								showCancel: false,
							})
						}else{
							if (res.data != null && res.data != undefined && res.data != "") {
								uni.showModal({
									title: "提示",
									content: res.data,
									showCancel: false,
								})
							} else {
								uni.showModal({
									title: "提示",
									content: "删除成功",
									showCancel: false,
								})
								that.photoArr.splice(index, 1);
								this.$refs.loading.hideLoading() // 隐藏
							}
						}
					}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
					})	
					})	
			},
			uploadFoodImg() {
				if (this.commodityId === null){
					uni.showModal({
						title: "提示",
						content: "请先保存商品基本信息！",
						showCancel: false,
					})
					return;
				}
				this.$refs.loading.showLoading()
				let base64 = null
				if (that.photoArr.length >= that.photoArrCapacity) {
					uni.showModal({
						title: "提示",
						content: "超出限制咯~",
						showCancel: false,
					})
					return 0;
				}
				uni.chooseImage({
					count: that.photoArrCapacity - that.photoArr.length,
					success(res) {
						console.log(res.tempFilePaths[0]);
						uni.request({
							url: res.tempFilePaths[0],
							method: 'GET',
							responseType: 'arraybuffer',
							success: ress => {
								console.log(ress.data)
								base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
								// base64 = 'data:image/jpeg;base64,' + base64; 
								//不加上这串字符，在页面无法显示的哦
								that.uploadImg(base64)
							}
						})
						// res.tempFilePaths.forEach(item => {
						// 	// 正式环境下调用此方法上传图片
						// 	// that.uploadImg(item).then(result => {
						// 	// 	that.photoArr.push(result.data);
						// 	// });
						// 	that.photoArr.push(item);
			
						// });
					}
				});
			},
			uploadImg(base64){
				var flag;
				getSupnuevoBuyerPriceFormByCodigoMobile({
					codigo: this.newGoodInfo.codigo,
					supnuevoMerchantId: this.merchantId
				}).then(res => {
					let goods = res.object;
					console.log(goods)
					if (goods.attachDataUrl1 === null || goods.attachDataUrl1 === undefined)
						flag = 1;
					else
					if (goods.attachDataUrl2 === null|| goods.attachDataUrl2 === undefined)
						flag = 2;
					else
					if (goods.attachDataUrl3 === null|| goods.attachDataUrl3 === undefined)
						flag = 3;
					else
					if (goods.attachDataUrl4 === null|| goods.attachDataUrl4 === undefined)
						flag = 4;
					console.log(flag)
					uploadAttachData({
						ownerId: that.commodityId,
						fileData: base64,
						beanName: "supnuevoCommonCommodityProcessRmi",
						folder: "supnuevo/commodity",
						fileName: that.newGoodInfo.codigo + '/' + flag + ".jpg",
						remark: "supnuevo",
						attachType: "90",
						imageWidth: 480,
						imageHeight: 640,
						paras: {
							merchantId: that.merchantId,
							index: flag
						}
					}).then(res => {
						console.log(res)
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
								content: "图片上传成功",
								showCancel: false,
							})
							that.photoArr.push(that.head + res.urlAddress);
							that.picUrl1 = that.photoArr[0]
							this.$refs.loading.hideLoading() // 隐藏
						}
					}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
					})
				})			
			},
			changeBigurl(index){
				let temp = null
				if (index !== 0){
					getSupnuevoBuyerPriceFormByCodigoMobile({
						codigo: this.selectedCodeInfo.codigo,
						supnuevoMerchantId: this.merchantId
					}).then(res => {
						var flag = 0;
						let goods = res.object;
						console.log(goods)
						if ((this.head + goods.attachDataUrl2) === this.photoArr[index])
							flag = 2;
						else
						if ((this.head + goods.attachDataUrl3) === this.photoArr[index])
							flag = 3; 
						else
						if ((this.head + goods.attachDataUrl4) === this.photoArr[index])
							flag = 4;
						changeSupnuevoCommonCommodityImage({
								merchantId: this.merchantId,
								commodityId: this.commodityId,
								index: flag,
							}).then(res => {
								console.log(res)
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
										content: "设置成功！",
										showCancel: false,
									})
									temp = this.photoArr[index]
									this.photoArr[index] = this.photoArr[0] 
									this.photoArr[0]  = temp
									this.picUrl1 = this.photoArr[0] 
									}
							}).catch(err => {
							uni.showModal({
								title: "提示",
								content: err,
								showCancel: false,
							})
							})
						})
					}
			},
			MaintainSubmit(){
				 if (this.newGoodInfo != undefined && this.newGoodInfo != null) {
					 if (this.checkGoodsBaseInfo() !== false){
						 saveOrUpdateSupnuevoCommonCommodityMobile({
							 taxId: this.newGoodInfo.taxId,
							 supnuevoMerchantId: this.merchantId,
							 codigo: this.newGoodInfo.codigo,
							 nombre: this.newGoodInfo.nombre,
							 commodityName:this.newGoodInfo.commodityName,
							 sizeValue: this.newGoodInfo.setSizeValue,
							 sizeUnited: this.newGoodInfo.sizeUnit,
							 scaleUnited: this.newGoodInfo.scaleUnit
						 }).then(res => {
							 console.log(res)
							     var errorMsg = res.errorMsg;
							       var message = res.message;
								this.commodityId = res.commodityId;
							        if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							     		uni.showModal({
							     			title: "提示",
							     			content: errorMsg,
							     			showCancel: false,
							     		})
							     		
							     	}
							     if (message !== null && message !== undefined && message !== "") {
							     		uni.showModal({
							     			title: "提示",
							     			content: message,
							     			showCancel: false,
							     		})
							     	}
									}
							).catch(err => {
								uni.showModal({
									title: "提示",
									content: "添加不成功",
									showCancel: false,
								})
							})
						 }
					 
			}else {
				uni.showModal({
					title: "提示",
					content: "请添加商品的信息",
					showCancel: false,
				})
			}},
			checkGoodsBaseInfo(){
			        if (this.newGoodInfo.codigo === null || this.newGoodInfo.codigo === undefined || this.newGoodInfo.codigo === '') {
			           uni.showModal({
			           	title: "提示",
			           	content: "商品条码不能为空",
			           	showCancel: false,
			           })
			            return false;
			        }
			        if (this.newGoodInfo.codigo !== null || this.newGoodInfo.codigo !== undefined || this.newGoodInfo.codigo !== '') {
			            if (this.newGoodInfo.codigo.length < 6 || this.newGoodInfo.codigo.length > 15) {
							uni.showModal({
								title: "提示",
								content: "商品条码位数错误",
								showCancel: false,
							})
			 
			                return false;
			            }
			        }
			        // if (this.state.newGoodInfo.taxId === null || this.state.newGoodInfo.taxId === undefined || this.state.newGoodInfo.taxId === '') {
			        //     alert("商品税类不能为空");
			        //     return false;
			        // }
			        if (this.newGoodInfo.nombre === null || this.newGoodInfo.nombre === undefined || this.newGoodInfo.nombre === '') {
			          uni.showModal({
			          	title: "提示",
			          	content: "商品名称不能为空",
			          	showCancel: false,
			          })
			            return false;
			        }
			        if (this.newGoodInfo.nombre !== null || this.newGoodInfo.nombre !== undefined || this.newGoodInfo.nombre !== '') {
			            if (this.newGoodInfo.nombre.length < 10) {
			                uni.showModal({
			                	title: "提示",
			                	content: "商品名称不能少于10位",
			                	showCancel: false,
			                })
			                return false;
			            }
			        }
			
			        if (this.newGoodInfo.setSizeValue === null || this.newGoodInfo.setSizeValue === undefined || this.newGoodInfo.setSizeValue === '') {
			            uni.showModal({
			            	title: "提示",
			            	content: "商品含量不能为空",
			            	showCancel: false,
			            })
			            return false;
			        }
			        if (this.newGoodInfo.sizeUnit === null || this.newGoodInfo.sizeUnit === undefined || this.newGoodInfo.sizeUnit === '') {
			           uni.showModal({
			           	title: "提示",
			           	content: "含量单位不能为空",
			           	showCancel: false,
			           })
			            return false;
			        }
			        if (this.newGoodInfo.scaleUnit === null || this.newGoodInfo.scaleUnit === undefined || this.newGoodInfo.scaleUnit === '') {
			           uni.showModal({
			           	title: "提示",
			           	content: "比价单位不能为空",
			           	showCancel: false,
			           })
			            return false;
			        }
					return true
			    },
				
		}
	}
</script>

<style>
	.InGood2image {
			height: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			flex: 6.5;
			vertical-align:middle ;
		}
		.uni-input {
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
		}
		.icon-right {
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			width: 27px;
			height: 27px;
		}
		.GoodInfo {
			height: 45px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border: 1px solid #AAAAAA ;
			background-color: #CCE6FF;
		}
		.InGood1 {
			height: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			flex: 3.5;
		}
		.InGood2 {
			height: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			flex: 6.5;
		}
		.p-list {
			margin-top: 20px;
			background-color: rgba(9, 9, 9, 0.3);
			bottom: 0rpx;
			width: 100%;
			height: 150px;
			display: flex;
		} 
		.l-item {
			margin-left: 7rpx;
			color: #ff0000;
			height: 120px;
			width: 90px;
		}
		.i-img {
			margin-top: 20rpx;
			width: 85px;
			height: 115px;
		}
		.i-icon {
			position: relative;
			top: -115px;
			left: 130rpx;
			width: 35rpx;
			height: 35rpx;
		}
		
		
		@font-face {
		  font-family: 'myIcon';
		  src: url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf') format('truetype');
		}
		.uni-common-mt{
			margin-top:30rpx;
		}
		.uni-padding-wrap{
			width:100%;
			padding:0 30rpx;
		}
	
	
		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
		}
	.uni-bg-red{
		background:#F76260; color:#FFF;
	}
	.uni-bg-green{
		background:#09BB07; color:#FFF;
	}
	.uni-bg-blue{
		background:#007AFF; color:#FFF;
	}
		.scroll-view-item {
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;
			font-size: 36rpx;
		}
	
		.scroll-view-item_H {
			display: inline-block;
			width: 100%;
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;
			font-size: 36rpx;
		}
</style>
