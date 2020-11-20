<template>
	<view class="content">
		<view class="">
			<view class="">
				<button type="primary" @click="navigateToCommodityDiscount" style="font-size: 20px;width: 80%;height: 55px;background-color: #007AFF;border-radius: 20px;margin-top: 50px;vertical-align: middle;text-align: center;line-height: 55px;">免量折扣</button>
			</view>
			<view class="">
				<button type="primary" @click="navigateToOrderDiscount" style="font-size: 20px;width: 80%;height: 55px;background-color: #007AFF;border-radius: 20px;margin-top: 50px;vertical-align: middle;text-align: center;line-height: 55px;">总量百分比折扣</button>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			navigateToCommodityDiscount(){
				uni.navigateTo({
					url: './FreeDiscount'
				})
			},
			navigateToOrderDiscount(){
				uni.navigateTo({
					url: './OrderDiscount'
				})
			},
		}
	}
</script>

<style>
	
</style>