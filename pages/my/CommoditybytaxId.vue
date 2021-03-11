<template>
	<view class="">
		<view class="uni-padding-wrap">
		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
				<view class="" v-for="(item,index) in allTaxCommodity" :key="index" 
				@click="navigatorDetail(item.priceId,item.codigo,item.nombre,item.taxName,item.sizeValue,item.sizeUnit,item.scaleUnit,item.basePrice,item.ratio,item.ratio1)" 
				style="margin-top: 10px;height: 140px;border-bottom: 1px solid #1CBBB4;">
					<view class="fontstyle">
						<text style="margin-right: 10px;">商品条码:</text>
						<text>{{item.codigo}}</text>
					</view>
					<view class="fontstyle">
						<text style="margin-right: 10px;">商品名称:</text>
						<text>{{item.nombre}}</text>
					</view>
					<view class="fontstyle">
						<text style="margin-right: 10px;">商品基础价:</text>
						<text>{{item.basePrice}}</text>
					</view>
					<view class="fontstyle">
						<text style="margin-right: 10px;">比例:</text>
						<text>{{item.ratio}}</text>
					</view>
					<view class="fontstyle">
						<text style="margin-right: 10px;">比例一:</text>
						<text>{{item.ratio1}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		</view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionPriceFormListByTaxId
	} from '@/api/MyInfor.js'
	export default {
		data() {
			return {
				username:'',
				allTaxCommodity:[],
				ratio:null,
				taxId:'',
				unionId:'',
				ratio:'',
			};
		},
		onLoad(option) {
			this.username = getApp().globalData.username
			uni.setNavigationBarTitle({
			    title: 'supnuevo-'+this.username
			});
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.root = getApp().globalData.root;
			this.unionId = getApp().globalData.unionId;
			this.form = JSON.parse(decodeURIComponent(option.form));
			this.taxId = this.form.taxId
			this.ratio = this.form.ratio
			this.taxName =  this.form.taxName
			getSupnuevoBuyerUnionPriceFormListByTaxId({
				unionId: this.unionId,
				taxId: this.taxId
			}).then(res => {
				console.log(res)
				if (res.re === 1)
					this.allTaxCommodity = res.data;
			})
		},
		onShow(){
			getSupnuevoBuyerUnionPriceFormListByTaxId({
				unionId: this.unionId,
				taxId: this.taxId
			}).then(res => {
				console.log(res)
				if (res.re === 1)
					this.allTaxCommodity = res.data;
			})
		},
		methods:{
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			navigatorDetail(priceId,codigo,nombre,taxName,sizeValue,sizeUnit,scaleUnit,basePrice,ratio,ratio1){
				let form ={
					priceId:priceId,
					codigo:codigo,
					nombre:nombre,
					taxName:taxName,
					sizeValue:sizeValue,
					sizeUnit:sizeUnit,
					scaleUnit:scaleUnit,
					basePrice:basePrice,
					ratio:ratio,
					ratio1:ratio1,
				}
				uni.navigateTo({
					url: './CommodityDetail?form='+encodeURIComponent(JSON.stringify(form))
				})
			},
		},
	}
</script>

<style>
	.uni-padding-wrap{
		width:100%;
		padding:0 30rpx;
	}
	.scroll-Y{
		height: 724px;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.fontstyle{
		font-size: 16px;
		margin: 5px;
	}
</style>
