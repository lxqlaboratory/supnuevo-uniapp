<template>
	<view>
		<wyb-loading ref="loading"/>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>昵称：</text>
						</view>
						<view class="InGood2">
							<text>{{info.nickName}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商户名称：</text>
						</view>
						<view class="InGood2">
							<text>{{info.nubre}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>超市招牌：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="shopName" style="background-color: white;height: 30px;" />
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>税号：</text>
						</view>
						<view class="InGood2">
							<text>{{info.cuit}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>地址：</text>
						</view>
						<view class="InGood2">
							<text>{{info.direccion}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>telephone：</text>
						</view>
						<view class="InGood2">
							<text>{{info.nomroDeTelePhono}}</text>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;align-items: center;border: 1px solid #aaa;">
						<view style="height: 100%;padding-left: 10px;align-items: center;display: flex;flex: 3.5;font-size: 16px;">
							<text>商户LOGO：</text>
						</view>
						<view class="">
							
						</view>
						<view class="feedback-body feedback-uploader" v-if="attachDataUrl == null || attachDataUrl == undefined || attachDataUrl == ''">
							<view class="uni-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<view class="uni-uploader__input-box"  style="margin: 0 auto;" @click="uploadFoodImg()">
											<view class="uni-uploader__input" ></view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="InGood2" v-else>
							<view class="">
								<image :src="imgurl" mode="" style="height: 100px;width: 100px;margin-top: 5px;" @click="uploadFoodImg()"></image>
							</view>
						</view>
					</view>

					<view class="" style="margin-top: 10px;justify-content: center;align-items: center;display:flex;" >
						<button type="primary" size="mini" style="border-radius: 10px;background-color: #007AFF;width: 200px;" @click="updateInfo">修改</button>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import {
		getSupnuevoMerchantInfoMobile,
		updateMerchantShopNameMobile
	} from '@/api/login.js'
	import {
		uploadAttachData
	} from '@/api/MyInfor.js'
	var that = null;
	export default {
		data() {
			return {
				username:'',
				merchantId:'',
				info:{},
				attachDataUrl:'',
				isLoading: true,
				shopName: '',
				imgurl: '',
			}
		},
		components: {
		        wybLoading
		    },
		onShow() {
			getSupnuevoMerchantInfoMobile({
					 merchantId:this.merchantId,
				}).then(res => {
					console.log(res); 
					var errMessage = res.errMessage;
					if (errMessage !== null && errMessage !== undefined && errMessage !== "") {
						uni.showModal({
							title: "提示",
							content: errMessage,
							showCancel: false,
						})
					}
					else {
						var nickName = res.nickName;
						var shopName = res.shopName;
						var attachDataUrl = res.urlAddress;
						console.log(attachDataUrl)
						var nubre = res.nubre;
						var cuit = res.cuit;
						var direccion = res.direccion;
						var nomroDeTelePhono = res.nomroDeTelePhono;
						var info = {
							nickName: nickName,
							shopName: shopName,
							nubre: nubre,
							cuit: cuit,
							direccion: direccion,
							nomroDeTelePhono: nomroDeTelePhono,
						};
						this.info = info;
						this.attachDataUrl = attachDataUrl;
						if (attachDataUrl !== null && attachDataUrl !==undefined)
						this.imgurl = "https://supnuevo.s3.sa-east-1.amazonaws.com/" + this.attachDataUrl;
						this.isLoading = false;
						this.shopName = shopName;
					}
			})
		},
		onLoad() {
			this.username = getApp().globalData.username
			this.merchantId = getApp().globalData.merchantId
			uni.setNavigationBarTitle({
			    title: this.username
			});
		},
		methods: {
			uploadFoodImg() {
				this.$refs.loading.showLoading()
				let base64 = null;
				var that = this;
				uni.chooseImage({
					success(res) {
						console.log(res.tempFilePaths[0]);
						uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: res => { //成功的回调
							console.log(res);
								that.uploadImg(res.data)
							},fail: (e) => {
								console.log("图片转换失败");
							}
						})
					}
				});
			},
			uploadImg(base64){
					uploadAttachData({
						ownerId: this.merchantId,
						fileData: base64,
						folder:"supnuevo/merchant/logo",
						beanName:"supnuevoMerchantProcessRmi",
						fileName:this.merchantId+".jpg",
						// remark:"",
						attachType:"91",
						imageWidth:480,
						imageHeight:640,
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
								content: "头像上传成功",
								showCancel: false,
							})
							this.$refs.loading.hideLoading() // 隐藏
						}
					}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
					})
				},
			updateInfo(){
				this.$refs.loading.showLoading()
				updateMerchantShopNameMobile({
					ownerId: this.merchantId,
					shopName:this.shopName
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
							content: "修改成功",
							showCancel: false,
						})
						this.$refs.loading.hideLoading() // 隐藏
					}
				}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
					})
			},
		}
	}
</script>

<style>
	.uni-common-mt{
		margin-top:30rpx;
	}
	.uni-padding-wrap{
		width:100%;
		padding:0 30rpx;
	}
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
		height: 65px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	 	border: 1px solid #aaa; 
	}

	.InGood1 {
		height: 100%;
		/* justify-content: center; */
		padding-left: 10px;
		align-items: center;
		display: flex;
		flex: 3.5;
		font-size: 16px;
	}

	.InGood2 {
		height: 100%;
		justify-content: center;
		align-items: center;
		display: flex;
		flex: 5.5;
		font-size: 16px;
	}

	.feedback-body {
		background: #fff;
	}
	.feedback-uploader {
		padding: 22rpx 20rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex: 5.5;
		font-size: 16px;
	}
	.uni-uploader__input-box {
		position: relative;
		margin:10rpx;
		width: 208rpx;
		height: 208rpx;
		border: 2rpx solid #D9D9D9;
	}
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}
	.uni-uploader__input-box:before {
		width: 4rpx;
		height: 79rpx;
	}
	.uni-uploader__input-box:after {
		width: 79rpx;
		height: 4rpx;
	}
	.uni-uploader__input-box:active {
		border-color: #999999;
	}
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}
</style>
