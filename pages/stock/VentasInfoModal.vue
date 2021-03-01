<template>
	<view class="" >
		1111111111
		
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
			uni.setNavigationBarTitle({
				title: "已登录的供应商"
			});
			
		},
		methods:{
			
		},
	}
</script>

<style>
</style>
