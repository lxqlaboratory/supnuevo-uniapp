<template>
	<view class="" >
		<view class="" v-for="(item,index) in unionList" :key="index">
			<view class="" @click="navigateVentas(item.unionId,item.unionNum)" style="padding: 10px;color: #428BCA;font-size: 20px;border-bottom: 2px solid #7C7C7C;width: 90%;margin: auto;">
				<text>|&nbsp;&nbsp;&nbsp;{{item.unionName}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionList 
	} from '@/api/stock.js'
	export default {
		data(){
			return{
				unionList: [],
			}
		},
		onShow() {
			this.getSupnuevoBuyerUnionList();
			
		},
		methods:{
			getSupnuevoBuyerUnionList(){
				getSupnuevoBuyerUnionList().then(res => {
					console.log(res)
					if (res.re === 1){
						this.unionList = res.data
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			navigateVentas(unionId,unionNum){
				getApp().globalData.unionId = unionId;
				getApp().globalData.unionNum = unionNum;
				uni.navigateBack({
					delta:1
				})
				console.log(getApp().globalData.unionId)
				console.log(getApp().globalData.unionMemberType)
			},
		},
	}
</script>

<style>
</style>
