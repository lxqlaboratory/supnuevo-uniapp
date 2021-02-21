<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view class="" v-for="(item,index) in advertisements" :key="index" v-if="unionMemberType == 2">
			<view class="" style="background-color: #1CBBB4;">
				<text style="margin-right: 0px;">{{item.advertisementNum}}</text>
			</view>
			<view class="" style="display: flex;flex-direction: row;margin-top: 10px;margin-bottom: 10px;">
				<view class="" style="display: flex;flex: 8;justify-content: center;align-items: center;" v-if="item.urlAddress != null && item.urlAddress !='' && item.urlAddress != undefined" @click="uploadFoodImg(item.advertisementId,item.advertisementNum)">
					<image :src="head+item.urlAddress" mode="" style="height: 100px;width: 100px;"></image>
				</view>
				<view class="feedback-body feedback-uploader" v-if="item.urlAddress == null || item.urlAddress =='' || item.urlAddress == undefined" style="display: flex;flex: 8;justify-content: center;align-items: center;">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<view class="uni-uploader__input-box"  style="margin: 0 auto;" @click="uploadFoodImg(item.advertisementId,item.advertisementNum)">
									<view class="uni-uploader__input" ></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="" v-if="item.urlAddress != null && item.urlAddress !='' && item.urlAddress != undefined" style="flex: 1;display: flex;justify-content: center;align-items: center;"  @click="deleteAdvertisement(item.advertisementId)">
					<icon type="cancel" size="26"/>
				</view> 
			</view>
		</view>
		
		<view class="" v-for="(item,index) in advertisements" :key="index" v-if="unionMemberType != 2">
			<view class="" style="background-color: #1CBBB4;">
				<text style="margin-right: 0px;">{{item.advertisementNum}}</text>
			</view>
			<view class="" style="display: flex;flex-direction: row;margin-top: 10px;margin-bottom: 10px;">
				<view class="" style="display: flex;flex: 8;justify-content: center;align-items: center;" v-if="item.urlAddress != null && item.urlAddress !='' && item.urlAddress != undefined">
					<image :src="head+item.urlAddress" mode="" style="height: 100px;width: 100px;"></image>
				</view>
				<view class="" style="display: flex;flex: 8;justify-content: center;align-items: center;" v-if="item.urlAddress == null || item.urlAddress =='' || item.urlAddress == undefined">
					<image src="../../static/image/images/timg.png" mode="" style="height: 100px;width: 100px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionAdvertisementFormList,
		deleteSupnuevoBuyerUnionAdvertisement,
		createSupnuevoBuyerUnionAdvertisement,
		uploadAttachData
	} from '@/api/MyInfor.js'
	import taogewanComboxRemote from '@/components/taogewan-combox-remote/taogewan-combox-remote.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				unionMemberType: '',
				unionId: '',
				advertisements: [],
				head:"https://supnuevo.s3.sa-east-1.amazonaws.com/",
			}
		},
		components: {
				taogewanComboxRemote,
				wybLoading,
		},
		onShow() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.unionId = getApp().globalData.unionId;
			this.getSupnuevoBuyerUnionAdvertisementFormList();
		},
		methods: {
			uploadFoodImg(advertisementId,advertisementNum) {
				let base64 = null;
				var that = this;
				uni.chooseImage({
					success(res) {
						console.log(res.tempFilePaths[0]);
						// uni.request({
						// 	url: res.tempFilePaths[0],
						// 	method: 'GET',
						// 	responseType: 'arraybuffer',
						// 	success: ress => {
						// 		console.log(ress.data)
						// 		base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						// 		// base64 = 'data:image/jpeg;base64,' + base64; 
						// 		//不加上这串字符，在页面无法显示的哦
								// if (advertisementId!==null && advertisementId!==undefined && advertisementId!=='')
								// 	that.uploadImg(base64,advertisementId,advertisementNum)
								// else 
								// 	that.uploadImg1(base64,advertisementNum)
						// 	}
						// })
						that.$refs.loading.showLoading()
						uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: res => { //成功的回调
							console.log(res);
								if (advertisementId!==null && advertisementId!==undefined && advertisementId!=='')
									that.uploadImg(res.data,advertisementId,advertisementNum)
								else 
									that.uploadImg1(res.data,advertisementNum)
							},fail: (e) => {
								console.log("图片转换失败");
							}
						})
			// 			res.tempFilePaths.forEach(item => {
			// 				// 正式环境下调用此方法上传图片
			// 				// that.uploadImg(item).then(result => {
			// 				// 	that.photoArr.push(result.data);
			// 				// });
			// 				that.photoArr.push(item);
			
			// 			});
					}
				});
			},
			uploadImg1(base64,advertisementNum){
				console.log("我没ID")
				createSupnuevoBuyerUnionAdvertisement({
					unionId: this.unionId,
					advertisementNum: advertisementNum
				}).then(res => {
					 this.uploadImg(base64,res.data.advertisementId,advertisementNum);
				})
			},
			uploadImg(base64,advertisementId,advertisementNum){
				console.log("我youID")
				uploadAttachData({
					ownerId: advertisementId,
					fileData: base64,
					folder:"supnuevo/union/advertisement",
					beanName:"supnuevoBuyerUnionAdvertisementProcessRmi",
					fileName:this.unionId+'/'+advertisementNum+".jpg",
					remark:"supnuevo",
					attachType:"97",
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
							content: "上传成功",
							showCancel: false,
						})
						this.getSupnuevoBuyerUnionAdvertisementFormList();
						this.$refs.loading.hideLoading() // 隐藏
					}
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			},
			deleteAdvertisement(advertisementId){
				var that = this;
				uni.showModal({
					title: "提示",
					content: "是否删除该广告",
					success:function(res){
						if (res.confirm){
								deleteSupnuevoBuyerUnionAdvertisement({
									unionId: that.unionId,
									advertisementId: advertisementId
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
										that.getSupnuevoBuyerUnionAdvertisementFormList()
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
			getSupnuevoBuyerUnionAdvertisementFormList(){
				getSupnuevoBuyerUnionAdvertisementFormList({
					unionId: this.unionId,
				}).then(res => {
					console.log(res)
					if (res.re === 1)
						this.advertisements = res.data
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			},
		},
	}
</script>

<style>
	.set-capital {
	    text-align: center;
	    line-height: 30px;
	    height: 30px;
	    padding: 0 5px;
	    right: 0;
	    /* width: 30px; */
	    background: #1AAD19;
	    color: #FFFFFF;
	    position: absolute;
	    bottom: 0px;
	    font-size: 12px;
	}
	
	.close-view {
	    text-align: center;
	    line-height: 14px;
	    height: 16px;
	    width: 16px;
	    border-radius: 50%;
	    background: #FF5053;
	    color: #FFFFFF;
	    position: absolute;
	    top: -6px;
	    right: -4px;
	    font-size: 12px;
	}
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}
	.uni-uploader-body {
		margin-top: 16rpx;
	}
	.feedback-body {
		background: #fff;
	}
	.feedback-uploader {
		padding: 22rpx 20rpx;
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
