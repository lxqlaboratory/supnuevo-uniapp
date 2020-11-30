<template>
	<view>
		进货
	</view>
</template>

<script>
	export default {
		data(){
			return{
				unionId: '',
			}
		},
		onShow() {
			this.unionId = getApp().globalData.unionId;
			if(this.unionId === '' || this.unionId === null || this.unionId === undefined){
				uni.navigateTo({
					url: './Unionlist'
				})
			}
			
		},
		methods:{
			
		},
	}
</script>

<style>
</style>
