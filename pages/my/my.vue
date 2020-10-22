<template>
	<view class="">
		<view class="" style="display: flex;">
			<view class="" style="flex: 1;">
				1234
			</view>
			<view class="" style="flex: 1;">
				1234
			</view>
		</view>
		<view class="">
			<button type="default" @click="uploadFoodImg">上传</button>
		</view>
		<cover-view class="p-list">
			<cover-view class="l-item" v-for="(item, index) in photoArr" :key="index">
				<cover-image class="i-img" :src="item" mode="scaleToFill"></cover-image>
				<cover-image @click="deletePhoto(index)" class="i-icon" src="../../static/image/images/delete.png" mode="scaleToFill"></cover-image>
			</cover-view>
		</cover-view>
	</view>
	
</template>

<script>
	var that = null;
	export default {
		data() {
			return {
				photoArr: [],
				photoArrCapacity: 6
			};
		},
		onLoad(parameters) {
			that = this;
			// uni.showLoading({
			// 	mask: true,
			// 	title: '相机加载中……'
			// });
		},
		methods:{
			deletePhoto(index) {
				that.photoArr.splice(index, 1);
			},
			uploadFoodImg() {
				if (that.photoArr.length > that.photoArrCapacity) {
					that.tips('超出限制咯~');
					return 0;
				}
				uni.chooseImage({
					count: that.photoArrCapacity - that.photoArr.length,
					success(res) {
						console.log('res ==>', res);
						res.tempFilePaths.forEach(item => {
							// 正式环境下调用此方法上传图片
							// that.uploadImg(item).then(result => {
							// 	that.photoArr.push(result.data);
							// });
							that.photoArr.push(item);
						});
					}
				});
			}
			
		}
	}
</script>
	
<style>
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
</style>
