<template>
	<view>
		<image :src="head+goodList.imageUrl" mode=""></image>
		
		<uni-list>
			<!-- <view v-for="(list, listIndex) in item.codigoSubList" :key="listIndex" > -->
				<!-- <uni-list-item :title="list.codigoSub" :mapId="list.mapId"/> -->
				<view v-for="(list, listIndex) in item.codigoSubList" :key="listIndex">
					<view class="uni-list-item">
						<view class="uni-list-item__container" >
							<view class="uni-list-item__content">
								<text class="uni-list-item__content-title">{{ list.codigoSub }}</text>
							</view>
						<view class="uni-list-item__extra">
							<image src="../../static/image/images/delete.png" mode="" style="width: 26px;height: 26px;" @click="deleteSubCodigo(mapId)"></image>
						</view>
						</view>
					</view>
				</view>
				
			<!-- </view> -->
		</uni-list>
	</view>
</template>

<script>
	
	export default {
		components: {
		       
		    } ,
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.form));
			console.log(this.form)
			this.discountCode = this.form.discountCode
			this.goodList = this.form.goods
		},
		data() {
			return {
				form: {},
				goodList: [],
				discountCode:'',
				head:"https://supnuevo.s3.sa-east-1.amazonaws.com/"
			}
		},
		methods: {
			takeToImage(){
				
			}
		}
	}
</script>

<style>

</style>
