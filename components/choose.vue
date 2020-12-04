<template>
    <view>
        <view class="feedback-body feedback-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files" >
                        <view class="uni-uploader__input-box" @click="uploadFoodImg" style="margin: 0 auto;">
                            <view class="uni-uploader__input" ></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>
<script type="text/javascript">
	import {
		uploadAttachData,
		getSupnuevoBuyerUnionRegulationInfo
	} from '@/api/MyInfor.js'
    export default {
        name: 'image-choose',
        props: {

            imgList: {
                //接收的图片列表[{src:12.jpg}]
                type: Array,
                default: function() {
                    return []
                }
            },
            quality: {
                //质量
                type: Number,
                default: 1
            },
            count: {
                //最多数量
                type: Number,
                default: 5
            },
            changes: {
                //监听变化
                type: Function,
                default: null
            }
        },

        data() {
            return {

            }
        },
        watch: {

            // imgList: {
            //     handler(val, oldval) {
            //         this.$emit("changes", val);
            //         // console.log(val)
            //     },
            //     deep: true
            // }
        },

        methods: {
            uploadFoodImg() {
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
            			// 		that.uploadImg(base64)
            			// 	}
            			// })
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
            	uploadAttachData({
            		ownerId: this.unionId,
            		fileData: base64,
            		folder:"supnuevo/union/logo",
            		beanName:"supnuevoBuyerUnionProcessRmi",
            		fileName:this.unionId+".jpg",
            		attachType:"93",
            		imageWidth:120,
            		imageHeight:120,
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
            				content: "ok",
            				showCancel: false,
            			})
            			this.getUnionRegulation();
            		}
            	}).catch((err) => {
            		uni.showModal({
            			title: "提示",
            			content: err,
            			showCancel: false,
            		})
            	});	
            },
			getUnionRegulation(){
				getSupnuevoBuyerUnionRegulationInfo({
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if(res.re == 1){
					this.orderMinLimit = res.data.orderMinLimit;
					this.discountScale = res.data.discountScale;
					this.regulation = res.data.regulation;
					this.attachId=res.data.attachId;
					this.attachDataUrl=res.data.attachDataUrl;
				}}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			},
            close(e) {
                var imgList = this.imgList;
                imgList.splice(e, 1);
                this.$emit("changes", imgList);

            },
            setCapital(i, name) {
                var imgList=this.imgList;
                imgList[0]= imgList.splice(i,1,imgList[0])[0];
                this.$emit("changes", imgList);
            },

        }
    }
</script>
<style scoped>
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
