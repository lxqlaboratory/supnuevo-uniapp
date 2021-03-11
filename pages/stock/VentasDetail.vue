<template>
	<view>
		<view class="Venview">
			<view class="Venmid">
				<text>名称：</text>
				<text class="textInfo">xuebi</text>
			</view>
			<view class="Venmid">
				<text>别名：</text>
				<text class="textInfo">xuebi</text>
			</view>
			<view class="Venmid">
				<text>地址：</text>
				<text class="textInfo">Crisologo Larralde 2869</text>
			</view>
			<view class="Venmid">
				<text>联系人：</text>
				<text class="textInfo">Yorbi Managua</text>
			</view>
			<view class="Venmid">
				<text>电话：</text>
				<image src="../../static/image/images/phone.png" mode="aspectFit" style="width: 20px;height: 20px;"></image>
				<text class="textInfo" style="color: blue;" @click="callPhone">17865598726</text>
			</view>
			<view class="Venmid">
				<text>经营范围：</text>
				<view style="width: 300px;height: 60px;border: 1px solid black;margin-top: 10px;border-radius: 10px;">
					<text >AlMACEN BEBIDAS CON ALCOHOL BEBIDAS SIN ALCOHOL</text>
				</view>
				
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
		methods: {
			onLoad(option){
				console.log(option)
			},
			callPhone(){
				uni.makePhoneCall({
				    phoneNumber: '17865598726' //仅为示例
				});
			}
		}
	}
</script>

<style>
	.Venview {
		padding: 10px;
	}
	.Venmid {
		margin: 10px;
	}
	.textInfo {
		text-decoration:underline;
		font-weight: bold;
	}
</style>
