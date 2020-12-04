<template>
	<view class="">
		<view class="" style="border-top: solid #BEBEBE;margin-top: 20px;border-bottom: solid #BEBEBE;">
			<view class="" style="text-align: center;margin-top: 10px;">
				<text style="font-size: 20px;">本店最低最终最小购买量为：</text>
			</view>
			
			<view class="page-title">
			    <view class="page-title__wrapper">
					<input type="text" v-model="orderMinLimit" class="page-title__text"/>
			    </view>
				<text style="font-weight: bold;font-size: 20px;">peso</text>
			</view>
		</view>
		
		<view class="" style="margin-top: 20px;border-bottom: solid #BEBEBE;">
			<view class="" style="text-align: center;margin-top: 10px;">
				<text style="font-size: 20px;">本店折扣商品占总购买量的百分比为：</text>
			</view>
			
			<view class="page-title">
			    <view class="page-title__wrapper">
					<input type="text" v-model="discountScale" class="page-title__text"/>
			    </view>
				<text style="font-weight: bold;font-size: 20px;">%</text>
			</view>
		</view>
		
		<view class="" style="margin-top: 20px;border-bottom: solid #BEBEBE;">
			<view class="" style="text-align: center;margin-top: 10px;">
				<text style="font-size: 20px;">本店其他关于购买及送货的文字说明为（西语）:</text>
			</view>
			<view class="" style="width: 300px;height: 280px;border: 1px solid;margin: auto;margin-bottom: 20px;margin-top: 10px;">
				<textarea :value="regulation" placeholder="" />
			</view>
		</view>
		
		<view class="" style="margin-top: 20px;" v-if="unionMemberType == 2">
			<view class="" style="text-align: center;margin-top: 10px;">
				<text style="font-size: 20px;">联盟头像</text>
			</view>
			<view class="" style="margin-top: 10px;width: 100%;display: flex;justify-content: center;align-items: center;" v-if="imgList[0] !== null &&imgList[0] !== undefined &&imgList[0] !== ''" @click="uploadFoodImg" >
				<image :src="imgList[0]" style="width: 104px;height: 104px;"></image>
			</view>
			<view style="margin-top: 10px;width: 100%;display: flex;justify-content: center;align-items: center;">
				<choose :imgList="imgList" v-if="imgList[0] === null || imgList[0] === undefined || imgList[0] === ''"></choose>
			</view>
			<view class="" style="border-top: solid #BEBEBE;margin-top: 10px;margin-bottom: 10px;">
				<button type="primary" @click="updateSupnuevoBuyerUnion" style="margin-top: 10px;">保存修改</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		uploadAttachData,
		getSupnuevoBuyerUnionRegulationInfo,
		updateSupnuevoBuyerUnion 
	} from '@/api/MyInfor.js'
	import choose from "../../components/choose.vue"
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	var that = null;
	export default {
		data() {
			return {
				unionMemberType:'',
				root:'',
				unionId:'',
				orderMinLimit: 0,
				discountScale: 0,
				regulation: "说明文字",
				imgList: [],
				attachDataUrl:null,
				attachId:null,
			};
		},
		components:{
			choose, 
			wybLoading
		},
		onLoad() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.root = getApp().globalData.root;
			this.unionId = getApp().globalData.unionId;
			getSupnuevoBuyerUnionRegulationInfo({
				unionId:this.unionId
			}).then(res => {
				if (res.re == 1){
					console.log(res)
					this.orderMinLimit = res.data.orderMinLimit
					this.discountScale = res.data.discountScale
					this.attachDataUrl = res.data.attachDataUrl
					this.regulation = res.data.regulation
					this.attachId = res.data.attachId
					if (this.attachDataUrl !== null && this.attachDataUrl !== undefined && this.attachDataUrl !== ''){
						var ts = new Date().getTime();
						this.imgList[0] = "https://supnuevo.s3.sa-east-1.amazonaws.com/"+ this.attachDataUrl+"?"+ts;
					}
				}
			})
		},
		methods:{
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
						// 	success: (ress) => {
						// 		console.log(ress.data)
						// 		base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						// 		// base64 = 'data:image/jpeg;base64,' + base64; 
						// 		//不加上这串字符，在页面无法显示的哦
						// 		console.log(1234)
						// 		console.log(base64)
						// 		// that.uploadImg(base64)
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
					var ts = new Date().getTime();
					this.imgList[0] = "https://supnuevo.s3.sa-east-1.amazonaws.com/"+ this.attachDataUrl+"?"+ts;
				}}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			},
			updateSupnuevoBuyerUnion(){
				updateSupnuevoBuyerUnion({
					unionId: this.unionId,
					orderMinLimit: parseFloat(this.orderMinLimit),
					discountScale:parseFloat(this.discountScale),
					regulation: this.regulation
				}).then(res => {
					if (res.re === 1){
						uni.showModal({
							title: "提示",
							content: "修改成功",
							showCancel: false,
						})
					}
					this.getUnionRegulation();
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			}
		},
	}
</script>

<style>
	.page-title {
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: row;
	    justify-content: center;
	    align-items: center;
	    padding: 35rpx;
	}
	
	.page-title__wrapper {
	    padding: 0px 20px;
		border-bottom: 1px solid #D8D8D8;
	}
	
	.page-title__text {
	    font-size: 20px;
	    height: 48px;
	    line-height: 48px;
	    color: #428BCA;
		width: 80px;
	}
</style>
