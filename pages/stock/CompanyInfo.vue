<template>
	<view>
		<view style="height: 30px;border: 1px solid #eee;text-align: center;">
			<text style="color: #949494;font-size: 16px;">商家登记商品及价格</text>
		</view>
		<view class="" v-for="(item,index) in memberList" :key="index" style="display: flex;flex-direction: row;" @click="navigatorToComodityInfo(head+item.urlAddress)">
			<view class="" style="flex: 8;margin-left: 10px;border-bottom: 1px solid #1CBBB4;">
				<view class="" style="margin-top: 10px;">
					<text>商户名:&nbsp;&nbsp;{{item.nickName}}</text>
				</view>
				<view class="" style="margin-top: 10px;">
					<text>商户地址:&nbsp;&nbsp;{{item.direccion}}</text> 
				</view>
			</view>
			<view class="" style="flex: 2;" >
				<image :src="head+item.urlAddress" mode="" style="width: 100px;height: 100px;"></image>
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
				unionId:'',
				memberList:[],
				head: "https://supnuevo.s3.sa-east-1.amazonaws.com/",
			}
		},
		methods: {
			onShow(){
				this.unionId = getApp().globalData.unionId;
				
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
					console.log(this.memberList)
			},
			navigatorToComodityInfo(url){
				uni.navigateTo({
					url: 'CommodityInfo?url='+url+''
				})
			}
		}
	}
</script>

<style>

</style>
