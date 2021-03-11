<template>
	<view class="">
		<image src="../../static/2.jpg" mode="" style="width: 370px;height: 723px;" @click="chumen"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			chumen(){
				uni.navigateTo({
					url:'./chumen'
				})
			}
		}
	}
</script>

<style>
</style>
