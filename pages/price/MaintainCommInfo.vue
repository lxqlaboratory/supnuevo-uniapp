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
							<text>{{selectedCodeInfo.codigo}}</text>
						</view>
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>商品简称：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="selectedCodeInfo.nombre" style="background-color: white;height: 30px;"/>
						</view>
					</view>
					<view class="GoodInfo" v-if="root">
						<view class="InGood1">
							<text>商品全名：</text>
						</view>
						<view class="InGood2">
							<input type="text" v-model="selectedCodeInfo.commodityName" style="background-color: white;height: 30px;"/>
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
							<input type="text" v-model="selectedCodeInfo.setSizeValue" style="background-color: white;height: 30px;" />
						</view>
						
					</view>
					<view class="GoodInfo">
						<view class="InGood1">
							<text>含量单位：</text>
						</view>
						<view class="InGood2image">
							 <picker @change="sizeUnitButtonsChange" :value="index1" :range="sizeUnitButtons">
									<view class="uni-input">{{selectedCodeInfo.sizeUnit}}</view>
									<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
							 </picker>
						</view>
						 
					</view>
					
					<view class="GoodInfo">
						<view class="InGood1">
							<text>比价单位：</text>
						</view>
						<view class="InGood2image">
							<view  v-if="scaleUnitButtons.length<=0"  @click="scaleclick">
								<view class="uni-input">{{selectedCodeInfo.scaleUnit}}</view>
								<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
							</view>
							 <picker @change="scaleUnitButtonsChange" v-if="scaleUnitButtons.length>0" :value="index2" :range="scaleUnitButtons">
									<view class="uni-input">{{selectedCodeInfo.scaleUnit}}</view> 
									<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
							 </picker>
						</view>	 
					</view>
					
					<view class="GoodInfo" v-if="root">
						<view class="InGood1">
							<text>商品税类：</text>
						</view>
						<view class="InGood2">
							 <picker @change="taxButtonsChange" :value="index3" :range="taxButtons">
									<view class="uni-input">{{selectTax}}</view> 
									<image src="../../static/image/images/under.png" mode="widthFix" class="icon-right"></image>
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
					
					<view class="" style="height: 280px;border: 1px solid #AAAAAA ;background-color: #CCE6FF;" v-if="bigPicUrl === null || bigPicUrl === '' ">
							<view class="" style="padding-top: 10px;text-align: center;">
								<text style="font-size: 20px;">商品图像</text>
							</view>
							 <image src="../../static/image/images/timg.jpg" mode="aspectFit" style="height: 200px;"></image>
					</view>
					
					<view class="" style="background-color: #CCE6FF; border: 1px solid #AAAAAA ;background-color: #CCE6FF;height: 280px;" v-else-if="bigPicUrl != null && bigPicUrl != '' ">
							<view class="" style="padding-top: 10px;text-align: center;">
								<text style="font-size: 20px;">商品图像</text>
							</view>
							<view class="" >
								<image :src="head + bigPicUrl" mode="aspectFit" style="height: 200px;width: 100%;margin-top: 10px;"></image>
							</view>	 
					</view>
					
					<view class="" style="background-color: #CCE6FF; border: 1px solid #AAAAAA ;background-color: #CCE6FF;height: 280px;">
						<view class="" style="padding-top: 10px;text-align: center;">
							<text style="font-size: 15px; ">备选图像</text>
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
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import {
		getSupnuevoScaleInfoListMobile,
		saveOrUpdateSupnuevoCommonCommodityMobile
	} from '@/api/change.js'
	export default {
		components: {
		        wybLoading
		    },
		data() {
			return {
				root:'',
				scaleArr:[],
				taxButtons:[],
				selectTax:'',
				sizeUnitButtons:[],
				scaleUnitButtons:[], 
				 index1: 0,
				 index2: 0,
				  index3: 0,
				bigPicUrl:'',
				head : "https://supnuevo.s3.sa-east-1.amazonaws.com/",
				picUrl1:'',
				picUrl2:'',
				picUrl3:'',
				picUrl4:'',
				form:{
				},
				title:'',
				merchantId:'',
				selectedCodeInfo:{},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad(option){
			 this.$refs.loading.showLoading()
			 this.root = getApp().globalData.root
			 this.form = JSON.parse(decodeURIComponent(option.form));
			 console.log(this.form)
			 console.log(this.root)
			 this.bigPicUrl = this.form.attachDataUrl1
			 this.picUrl1 = this.form.attachDataUrl1
			 this.picUrl2 = this.form.attachDataUrl2
			 this.picUrl3 = this.form.attachDataUrl3
			 this.picUrl4 = this.form.attachDataUrl4
			 this.selectedCodeInfo = this.form.selectedCodeInfo
			 this.merchantId = this.form.merchantId
			 for (var i = 0 ; i < this.form.sizeArr.length ; i++){
				this.sizeUnitButtons.push(this.form.sizeArr[i].label)
			 }
			 for (var i = 0 ; i < this.form.taxArr.length ; i++){
			 	this.taxButtons.push(this.form.taxArr[i].label)
				if (this.form.taxArr[i].value == this.form.selectedCodeInfo.taxId){
					 this.selectTax = (this.form.taxArr[i].label)
				}
					
			 }
			 // for (var i = 0 ; i < this.form.taxArr.length ; i++){
			 // 	this.scaleUnitButtons.push(this.form.taxArr[i].label)
			 // }
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
			 sizeUnitButtonsChange: function(e) {
			    this.index1 = e.target.value
				this.selectedCodeInfo.sizeUnit = this.sizeUnitButtons[this.index1]
				 var sizeUnit = this.selectedCodeInfo.sizeUnit;
				 getSupnuevoScaleInfoListMobile({
					  sizeUnit: this.selectedCodeInfo.sizeUnit,
					  merchantId: this.merchantId
				 }).then(res => {
					  for (var i = 0 ; i < res.scaleArr.length ; i++){
							this.scaleArr.push(res.scaleArr[i])
					  }
					  this.selectedCodeInfo.scaleUnit = '';
					  for (var i = 0 ; i < this.scaleArr.length ; i++){
					  		this.scaleUnitButtons.push(this.scaleArr[i].label)
					  }
				 })
			        },
			scaleUnitButtonsChange:  function(e) {
				this.index2 = e.target.value
				this.selectedCodeInfo.scaleUnit = this.scaleUnitButtons[this.index2]
				},
			taxButtonsChange:  function(e){
				this.index3 = e.target.value
				this.selectTax = this.taxButtons[this.index3]
			},
			MaintainSubmit(){
				console.log(98765431)
				 if (this.selectedCodeInfo != undefined && this.selectedCodeInfo != null) {
					if (this.selectedCodeInfo.codigo === null || this.selectedCodeInfo.codigo === undefined || this.selectedCodeInfo.codigo === '') {
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
					if (this.selectedCodeInfo.nombre === null || this.selectedCodeInfo.nombre === undefined || this.selectedCodeInfo.nombre === '') {
					
						uni.showModal({
							title: "提示",
							content: "商品名称不能为空",
							showCancel: false,
						})
						return false;
					}
					if (this.selectedCodeInfo.nombre !== null || this.selectedCodeInfo.nombre !== undefined || this.selectedCodeInfo.nombre !== '') {
						if (this.selectedCodeInfo.nombre.length < 10) {
							uni.showModal({
								title: "提示",
								content: "商品名称不能少于10位",
								showCancel: false,
							})
							return false;
						}
					}
		
					if (this.selectedCodeInfo.setSizeValue === null || this.selectedCodeInfo.setSizeValue === undefined || this.selectedCodeInfo.setSizeValue === '') {
						uni.showModal({
							title: "提示",
							content: "商品含量不能为空",
							showCancel: false,
						})
						return false;
					}
					if (this.selectedCodeInfo.sizeUnit === null || this.selectedCodeInfo.sizeUnit === undefined || this.selectedCodeInfo.sizeUnit === '') {
						uni.showModal({
							title: "提示",
							content: "含量单位不能为空",
							showCancel: false,
						})
						return false;
					}
					if (this.selectedCodeInfo.scaleUnit === null || this.selectedCodeInfo.scaleUnit === undefined || this.selectedCodeInfo.scaleUnit === '') {
						uni.showModal({
							title: "提示",
							content: "比价单位不能为空",
							showCancel: false,
						})
						return false;
					}
					var selectTax = parseInt(this.selectTax)
					this.selectedCodeInfo.setSizeValue = this.selectedCodeInfo.setSizeValue+''
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
									success:function(){
										uni.navigateBack({
											delta:1
										})
									},
									showCancel: false,
								})
								
							}
							
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
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
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
		flex: 5.5;
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
