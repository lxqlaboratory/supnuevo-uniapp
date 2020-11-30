<template>
	<view class="">
		 <view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers" show-compass="true">
				</map>
			</view>
		</view>
		
		<view class="" v-for="(item,index) in memberList" :key="index" style="display: flex;flex-direction: row;">
			<view class="" style="flex: 2;" v-if="item.urlAddress != null && item.urlAddress != '' && item.urlAddress != undefined">
				<image :src="head+item.urlAddress" mode="" style="width: 100px;height: 100px;"></image>
			</view>
			<view class="" v-else>
				<image src="../../static/image/images/timg.jpg" mode="" style="width: 100px;height: 100px;"></image>
			</view>
			<view class="" style="flex: 8;margin-left: 10px;border-bottom: 1px solid #1CBBB4;">
				<view class="" style="margin-top: 10px;">
					<text>商户名:&nbsp;&nbsp;{{item.nickName}}</text>
				</view>
				<view class="" style="margin-top: 10px;">
					<text>商户地址:&nbsp;&nbsp;{{item.direccion}}</text> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionMemberFormList
	} from '@/api/MyInfor.js'
	export default {
	    data() {
	        return {
				id:0, // 使用 marker点击事件 需要填写id
	            title: 'map',
	            latitude: 39.909,
	            longitude: 116.39742,
	            covers: [{
	                latitude: 39.909,
	                longitude: 116.39742,
	                iconPath: '../../../static/location.png'
	            }, {
	                latitude: 39.90,
	                longitude: 116.39,
	                iconPath: '../../../static/location.png'
	            }],
				memberList: [],
				head: "https://supnuevo.s3.sa-east-1.amazonaws.com/",
				unionId: '',
	        }
	    },
	    methods: {
				getSupnuevoBuyerUnionMemberFormList(){
					getSupnuevoBuyerUnionMemberFormList({
						unionId: this.unionId
					}).then(res => {
						console.log(res)
						if (res.re === 1)
							this.memberList = res.data
					}).catch((err) => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
					});	
				},
	    },
		onShow() {
			this.unionId = getApp().globalData.unionId;
			this.getSupnuevoBuyerUnionMemberFormList();
		},
	}
</script>

<style>
</style>
