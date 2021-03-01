<template>
	<view>
		<view style="padding: 10px;text-align: center;">
			<text>{{announcement}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				announcement: {},
			}
		},
		onShow() {
			this.announcement = getApp().globalData.announcement;
			console.log(this.announcement)
		},
	}
</script>

<style>
</style>
