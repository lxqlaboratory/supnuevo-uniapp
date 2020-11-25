<template>
	<view class="">
		<view class="" style="width: 90%;border: 2px solid #007AFF;border-radius: 10px;margin: auto;margin-top: 20px;">
			<view class="" style="text-align: center;padding: 5px;border-bottom: 2px solid #0081FF;">
				<text>订单商品详情</text>
			</view>
			<view class="Infororder">
				<view class="noorderno" v-if="form.imageUrl !== null && form.imageUrl !== '' && form.imageUrl !== undefined">
					<image :src="imageuri" mode="" style="height: 100px;width: 100px;"></image>
				</view>
				<view class="noorderno" v-else>
					<image src="../../static/image/images/timg.jpg" mode="" style="height: 100px;width: 100px;"></image>
				</view>
			</view>
			<view class="Infororder1">
				<view class="">
					<text>商品条码：&nbsp;&nbsp;&nbsp;{{form.codigo}}</text>
				</view>
			</view>
			<view class="Infororder1">
				<view class="">
					<text>商品简称：&nbsp;&nbsp;&nbsp;{{form.nombre}}</text>
				</view>
			</view>
			<view class="Infororder1">
				<view class="">
					<text>商品全称：&nbsp;&nbsp;&nbsp;{{form.commodityName}}</text>
				</view>
			</view>
			<view class="Infororder2">
				<view class="">
					<text>配货数量：&nbsp;&nbsp;&nbsp;{{form.amount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{},
				head: "https://supnuevo.s3.sa-east-1.amazonaws.com/",
				imageuri: '',
				codigo: '',
			}
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.form));
			this.imageuri = this.head+this.form.imageUrl;
			console.log(this.form)
		}
	}
</script>

<style>
	.noorderno {
		 flex: 1;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 border-radius: 50px;
	}
	.Infororder {
		 display: flex;
		 flex-direction: row;
		 justify-content: center;
		 align-items: center;
		 padding: 10px;
		 border-bottom: 2px solid #0081FF;
	}
	.Infororder1 {
		padding: 10px;
		border-bottom: 2px solid #0081FF;
	}
	.Infororder2 {
		padding: 10px;
	}
</style>
