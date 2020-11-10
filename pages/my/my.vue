<template>
	<view class="">
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
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我的二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
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
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我的信息</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>我的二维码</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
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
	export default {
		data() {
			return {
				unionMemberType:'',
			};
		},
		onLoad() {
			this.unionMemberType = getApp().globalData.unionMemberType;
		},
		methods:{
			navigateMyUnion(){
				uni.navigateTo({
					url: './myUnion'
				})
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
