<template>
	<view class="">
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
			<view class="mycontent">
				<ayQrcode ref="qrcode" :modal="modal_qr" :url="url" @hideQrcode="hideQrcode" />
			</view>
		</luPopupWrapper>
		<view class="">
			<view class="">
				<image src="../../static/image/cart.png" mode="aspectFit" style="width: 100%"></image>
			</view>	
		</view>
		<view class="uni-common-mt" v-if="unionMemberType == 2 || unionMemberType == 1">
			<view class="uni-form-item uni-column">
				<checkbox-group class="uni-list" >
					<label class="uni-list-cell uni-list-cell-pd" @click="navigatemyinfo">
						<view>我的信息</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @tap="fade()">
						<view>我的二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="startCamera">
						<view>扫一扫商家二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我的建议</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我替他们改价</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>他们替我改价</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigateMyUnion">
						<view>我的超市联盟</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="uni-common-mt" v-else>
			<view class="uni-form-item uni-column">
				<checkbox-group class="uni-list" >
					<label class="uni-list-cell uni-list-cell-pd" @click="navigatemyinfo">
						<view>我的信息</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @tap="fade()">
						<view>我的二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="startCamera">
						<view>扫一扫商家二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我的建议</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我的二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我替他们改价</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>他们替我改价</view>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		setMerchantVisibleEachOtherMobile
	} from '@/api/login.js'
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	export default {
		components: {
			ayQrcode,
			luPopupWrapper
		},
		data() {
			return {
				unionMemberType:'',
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"100%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
				modal_qr: false,
				url: '', // 要生成的二维码值
				scanId: '',
			};
		},
		onLoad() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.merchantId = getApp().globalData.merchantId
			this.url = this.merchantId
		},
		methods:{
			navigateMyUnion(){
				uni.navigateTo({
					url: './myUnion'
				})
			},
			navigatemyinfo(){
				uni.navigateTo({
					url: './Myinfo'
				})
			},
			fade: function() {
				this.width ="100%";
				this.height ="80%";
				this.transition = "fade";
				this.type = "bottom";
				this.show();
				let that = this;
				that.showQrcode();//一加载生成二维码
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
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 50)
			},
			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
			startCamera(){
				var that = this;
				uni.scanCode({
					success:function(res){
						console.log('条码内容：' + res.result);
						that.scanId = parseInt(res.result);
						setMerchantVisibleEachOtherMobile({
							scanId: that.scanId,
						}).then(res => {
							var errMessage = res.errMessage;
							    if (errMessage !== null && errMessage !== undefined && errMessage !== "") {
									uni.showModal({
										title: "提示",
										content: errMessage,
										showCancel: false,
									})
								}else{
									uni.showModal({
										title: "提示",
										content: "已设置成功",
										showCancel: false,
									})
								}
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
		}
	}
</script>
	
<style>
	.mycontent{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: scroll;
	}
	 .p-list {
		background-color: rgba(9, 9, 9, 0.3);
		bottom: 0rpx;
		width: 100%;
		height: 140rpx;
		display: flex;
	} 
	.l-item {
		margin-left: 7rpx;
		color: #ff0000;
		height: 160rpx;
		width: 118rpx;
	}
	.i-img {
		margin-top: 20rpx;
		width: 80px;
		height: 100px;
	}
	.i-icon {
		position: relative;
		top: -110rpx;
		left: 80rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.uni-list-cell {
		justify-content: flex-start;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list .label-3 {
		padding: 0;
	}
	
	.label-2-text {
	    flex: 1;
	}
	.uni-common-mt{
		margin-top:30rpx;
	}
	.uni-form-item{
		display:flex;
		width:100%;
		padding:10rpx 0;
	}
	.uni-column {
		flex-direction: column;
	}
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}
	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
</style>
