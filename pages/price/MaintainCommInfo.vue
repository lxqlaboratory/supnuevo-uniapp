<template>
	<view>
		<wyb-loading ref="loading" />
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<scroll-view :scroll-top="scrollTop" class="scroll-Y" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower"
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
							<text>{{selectedCodeInfo.codigo}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品简称：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="selectedCodeInfo.nombre" style="background-color: white;height: 30px;" />
						</view>
					</view>
					<view class="GoodInfo" v-if="root">
						<view class="InGood1">
							<text>商品全名：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="selectedCodeInfo.commodityName" style="background-color: white;height: 30px;" />
						</view>
					</view>
					<view class="GoodInfo" v-else-if="!root">
						<view class="InGood1">
							<text>商品全名：</text>
						</view>
						<view class="InGood2">
							<text>{{selectedCodeInfo.commodityName}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品含量：</text>
						</view>
						<view class="InGood2">
							<input type="number" v-model="selectedCodeInfo.setSizeValue" style="background-color: white;height: 30px;" />
						</view>

					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>含量单位：</text>
						</view>
						<view class="InGood2image">
							<picker @change="sizeUnitButtonsChange" :value="index1" :range="sizeUnitButtons">
								<view class="" style="display: flex;justify-content: center;flex-direction: row;align-items: center;height: 43px;width: 209px;">
									<view class="" style="flex: 8;text-align: center;">
										<text>{{selectedCodeInfo.sizeUnit}}</text>
									</view>
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
							<view v-if="scaleUnitButtons.length<=0" @click="scaleclick">
								<view class="" style="display: flex;justify-content: center;flex-direction: row;align-items: center;height: 43px;width: 209px;">
									<view class="" style="flex: 8;text-align: center;">
										<text>{{selectedCodeInfo.scaleUnit}}</text>
									</view>
									<view class="" style="flex: 1;">
										<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
									</view>
								</view>
							</view>
							<picker @change="scaleUnitButtonsChange" v-if="scaleUnitButtons.length>0" :value="index2" :range="scaleUnitButtons">
								<view class="" style="display: flex;justify-content: center;flex-direction: row;align-items: center;height: 43px;width: 209px;">
									<view class="" style="flex: 8;text-align: center;">
										<text>{{selectedCodeInfo.scaleUnit}}</text>
									</view>
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
								<view class="" style="display: flex;justify-content: center;flex-direction: row;align-items: center;height: 43px;width: 209px;">
									<view class="" style="flex: 9;text-align: center;">
										<text>{{selectTax}}</text>
									</view>
									<view class="" style="flex: 1;">
										<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
									</view>
								</view>
							</picker>
						</view>
					</view>

					<view class="GoodInfo" v-if="!root">
						<view class="InGood1">
							<text>商品税类：</text>
						</view>
						<view class="InGood2">
							<text>{{selectTax}}</text>
						</view>
					</view>

					<view class="" style="height: 280px;border: 1px solid #AAAAAA ;background-color: #CCE6FF;" v-if="photoArr[0] === null || photoArr[0] === '' || photoArr[0] === undefined">
						<view class="" style="padding-top: 10px;text-align: center;">
							<text style="font-size: 20px;">商品图像</text>
						</view>
						<image src="../../static/image/images/timg.png" mode="aspectFit" style="height: 200px;width: 100%;margin-top: 10px;"></image>
					</view>

					<view class="" style="background-color: #CCE6FF; border: 1px solid #AAAAAA ;background-color: #CCE6FF;height: 280px;"
					 v-else-if="photoArr[0] != null && photoArr[0] != '' && photoArr[0] != undefined">
						<view class="" style="padding-top: 10px;text-align: center;">
							<text style="font-size: 20px;">商品图像</text>
						</view>
						<view class="">
							<image :src="photoArr[0]" mode="aspectFit" style="height: 200px;width: 100%;margin-top: 10px;"></image>
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
							<button type="primary" @click="uploadFoodImg" size="mini" style="border-radius: 10px;background-color: blue;">上传备选图像</button>
						</view>
					</view>

					<view class="" style="margin-top: 10px;margin-bottom: 10px;">
						<form @submit="MaintainSubmit">
							<button type="primary" form-type="submit" style="background-color: blue;width: 200px;border-radius: 8px;">确认</button>
						</form>
					</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import {
		getSupnuevoScaleInfoListMobile,
		saveOrUpdateSupnuevoCommonCommodityMobile,
		uploadAttachData,
		changeSupnuevoCommonCommodityImage,
		deleteSupnuevoCommonCommodityImage,
		getSupnuevoBuyerPriceFormByCodigoMobile
	} from '@/api/change.js'
	var that = null;
	export default {
		components: {
			wybLoading
		},
		data() {
			return {
				username:'',
				root: '',
				commodityId: '',
				scaleArr: [],
				taxButtons: [],
				selectTax: '',
				sizeUnitButtons: [],
				scaleUnitButtons: [],
				photoArr: [],
				photoArrCapacity: 4,
				index1: 0,
				index2: 0,
				index3: 0,
				head: "https://supnuevo.s3.sa-east-1.amazonaws.com/",
				picUrl1: '',
				picUrl2: '',
				picUrl3: '',
				picUrl4: '',
				form: {},
				title: '',
				merchantId: '',
				selectedCodeInfo: {},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onShow() {
		},
		onLoad(option) {
			this.$refs.loading.showLoading()
			this.username = getApp().globalData.username
			uni.setNavigationBarTitle({
			    title: 'supnuevo-'+this.username
			});
			this.root = getApp().globalData.root
			this.form = JSON.parse(decodeURIComponent(option.form));
			this.commodityId = this.form.commodityId
			console.log(this.form)
			console.log(this.root)
			this.picUrl1 = this.form.attachDataUrl1
			var index = 0 ;
			if (this.picUrl1 !== null && this.picUrl1 !== undefined && this.picUrl1 !== '')
				this.photoArr[index++] = this.head + this.picUrl1
			this.picUrl2 = this.form.attachDataUrl2
			if (this.picUrl2 !== null && this.picUrl2 !== undefined && this.picUrl2 !== '')
				this.photoArr[index++] = this.head + this.picUrl2
			this.picUrl3 = this.form.attachDataUrl3
			if (this.picUrl3 !== null && this.picUrl3 !== undefined && this.picUrl3 !== '')
				this.photoArr[index++] = this.head + this.picUrl3
			this.picUrl4 = this.form.attachDataUrl4
			if (this.picUrl4 !== null && this.picUrl4 !== undefined && this.picUrl4 !== '')
				this.photoArr[index++] = this.head + this.picUrl4
			this.selectedCodeInfo = this.form.selectedCodeInfo
			this.merchantId = this.form.merchantId
			that = this;
			for (var i = 0; i < this.form.sizeArr.length; i++) {
				this.sizeUnitButtons.push(this.form.sizeArr[i].label)
			}
			for (var i = 0; i < this.form.taxArr.length; i++) {
				this.taxButtons.push(this.form.taxArr[i].label)
				if (this.form.taxArr[i].value == this.form.selectedCodeInfo.taxId) {
					this.selectTax = (this.form.taxArr[i].label)
				}

			}
			// for (var i = 0 ; i < this.form.taxArr.length ; i++){
			// 	this.scaleUnitButtons.push(this.form.taxArr[i].label)
			// }
			this.$refs.loading.hideLoading() // 隐藏
		},
		methods: {
			scaleclick() {
				if (this.scaleUnitButtons.length <= 0) {
					uni.showModal({
						title: "提示",
						content: "请先选择含量单位",
						showCancel: false,
					})
				}
			},
			sizeUnitButtonsChange: function(e) {
				this.index1 = e.target.value
				this.selectedCodeInfo.sizeUnit = this.sizeUnitButtons[this.index1]
				var sizeUnit = this.selectedCodeInfo.sizeUnit;
				getSupnuevoScaleInfoListMobile({
					sizeUnit: this.selectedCodeInfo.sizeUnit,
					merchantId: this.merchantId
				}).then(res => {
					for (var i = 0; i < res.scaleArr.length; i++) {
						this.scaleArr.push(res.scaleArr[i])
					}
					this.selectedCodeInfo.scaleUnit = '';
					for (var i = 0; i < this.scaleArr.length; i++) {
						this.scaleUnitButtons.push(this.scaleArr[i].label)
					}
				})
			},
			scaleUnitButtonsChange: function(e) {
				this.index2 = e.target.value
				this.selectedCodeInfo.scaleUnit = this.scaleUnitButtons[this.index2]
			},
			taxButtonsChange: function(e) {
				this.index3 = e.target.value
				this.selectTax = this.taxButtons[this.index3]
			},
			MaintainSubmit() {
				if (this.selectedCodeInfo != undefined && this.selectedCodeInfo != null) {
					if (this.selectedCodeInfo.codigo === null || this.selectedCodeInfo.codigo === undefined || this.selectedCodeInfo.codigo ===
						'') {
						uni.showModal({
							title: "提示",
							content: "商品条码不能为空",
							showCancel: false,
						})
						return false;
					}
					// if (this.state.selectedCodeInfo.taxId === null || this.state.selectedCodeInfo.taxId === undefined || this.state.selectedCodeInfo.taxId === '') {
					//     alert("商品税类不能为空");
					//     return false;
					// }
					if (this.selectedCodeInfo.nombre === null || this.selectedCodeInfo.nombre === undefined || this.selectedCodeInfo.nombre ===
						'') {

						uni.showModal({
							title: "提示",
							content: "商品名称不能为空",
							showCancel: false,
						})
						return false;
					}
					if (this.selectedCodeInfo.nombre !== null || this.selectedCodeInfo.nombre !== undefined || this.selectedCodeInfo.nombre !==
						'') {
						if (this.selectedCodeInfo.nombre.length < 10) {
							uni.showModal({
								title: "提示",
								content: "商品名称不能少于10位",
								showCancel: false,
							})
							return false;
						}
					}

					if (this.selectedCodeInfo.setSizeValue === null || this.selectedCodeInfo.setSizeValue === undefined || this.selectedCodeInfo
						.setSizeValue === '') {
						uni.showModal({
							title: "提示",
							content: "商品含量不能为空",
							showCancel: false,
						})
						return false;
					}
					if (this.selectedCodeInfo.sizeUnit === null || this.selectedCodeInfo.sizeUnit === undefined || this.selectedCodeInfo
						.sizeUnit === '') {
						uni.showModal({
							title: "提示",
							content: "含量单位不能为空",
							showCancel: false,
						})
						return false;
					}
					if (this.selectedCodeInfo.scaleUnit === null || this.selectedCodeInfo.scaleUnit === undefined || this.selectedCodeInfo
						.scaleUnit === '') {
						uni.showModal({
							title: "提示",
							content: "比价单位不能为空",
							showCancel: false,
						})
						return false;
					}
					var selectTax = parseInt(this.selectTax)
					this.selectedCodeInfo.setSizeValue = this.selectedCodeInfo.setSizeValue + ''
					saveOrUpdateSupnuevoCommonCommodityMobile({
						taxId: selectTax,
						supnuevoMerchantId: this.merchantId,
						codigo: this.selectedCodeInfo.codigo,
						commodityName: this.selectedCodeInfo.commodityName,
						nombre: this.selectedCodeInfo.nombre.toUpperCase(),
						sizeValue: this.selectedCodeInfo.setSizeValue,
						sizeUnited: this.selectedCodeInfo.sizeUnit,
						scaleUnited: this.selectedCodeInfo.scaleUnit
					}).then(res => {
						var errorMsg = res.errorMsg;
						var message = res.message;
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
								success: function() {
									uni.navigateBack({
										delta: 1
									})
								},
								showCancel: false,
							})

						}

					})
				}
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
					codigo: this.selectedCodeInfo.codigo,
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
						fileName: that.selectedCodeInfo.codigo + '/' + flag + ".jpg",
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
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
	}
</script>

<style>
	.InGood2image {
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
		flex: 5.5;
	}

	.uni-input {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.icon-right {
		width: 27px;
		height: 27px;
	}

	.GoodInfo {
		height: 45px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #AAAAAA;
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
		flex: 5.5;
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

	.uni-common-mt {
		margin-top: 30rpx;
	}

	.uni-padding-wrap {
		width: 100%;
		padding: 0 30rpx;
	}


	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.uni-bg-red {
		background: #F76260;
		color: #FFF;
	}

	.uni-bg-green {
		background: #09BB07;
		color: #FFF;
	}

	.uni-bg-blue {
		background: #007AFF;
		color: #FFF;
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
