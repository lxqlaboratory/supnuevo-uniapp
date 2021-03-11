<template>
	<view>
		<view style="align-items: center;justify-content: center;display: flex;" @click="Lookimg">
			<image :src="img"  mode=""></image>
		</view>
		<view class="">
			<text>商品条码：7792180001641</text>
		</view>
		<view class="">
			<text>商品名称：ACEITE CANUELAS GIRASOL 900ML</text>
		</view>
		<view class="">
			<text>商品价格：51.15</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: ''
			}
		},
		methods: {
			onLoad(Option){
				console.log(Option)
				this.img = Option.url
			},
			Lookimg(){
				 var images = [];
				 images.push(this.img);
				uni.previewImage({
					urls: images,
					longPressActions: {  //长按保存图片到相册
					itemList: ['保存图片'],
					success: (data)=> {
						console.log(data);
						uni.saveImageToPhotosAlbum({ //保存图片到相册
							filePath: images,
							success: function () {
								uni.showToast({icon:'success',title:'保存成功'})
							},
							fail: (err) => {
								uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
							}
						});
					},
					fail: (err)=> {
						console.log(err.errMsg);
					}
				}
				});
			},
			
		}
	}
</script>

<style>

</style>
