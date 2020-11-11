<template>
	<view class="">
		<view class="">
			<view class="fontstyle">
				<text>商品条码: &nbsp;&nbsp;{{form.codigo}}</text>
			</view>
			<view class="fontstyle">
				<text>商品名称:&nbsp;&nbsp;{{form.nombre}}</text>
			</view>
			<view class="fontstyle">
				<text>商品类型:&nbsp;&nbsp;{{form.taxName}}</text>
			</view>
			<view class="fontstyle">
				<text>含量数值:&nbsp;&nbsp;{{form.sizeValue}}</text>
			</view>
			<view class="fontstyle">
				<text>含量单位:&nbsp;&nbsp;{{form.sizeUnit}}</text>
			</view>
			<view class="fontstyle">
				<text>比价单位:&nbsp;&nbsp;{{form.scaleUnit}}</text>
			</view>
			<view class="fontstyle">
				<text>商品基础价:&nbsp;&nbsp;{{form.basePrice}}</text>
			</view>
			<view class="fontstyle">
				<text>商品比例:&nbsp;&nbsp;{{form.ratio}}</text>
			</view>
			<view class="" v-if="unionMemberType === 2" style="display: flex;flex-direction: row; justify-content: center;align-items: center;margin-top: 15px;">
				<view style="display: flex;" class="fontstyle">
					<text>比例1：</text>
				</view>
				<view class="" style="display: flex;border-bottom: 1px solid;">
					<input type="text" v-model="ratioOnly" style="width: 60px;text-align: center;"/>
				</view>
				<view class="fontstyle" style="display: flex;margin-right: 25px;">
					<text>%</text>
				</view>
				<view class="" style="display: flex;">
					<button type="primary" @click="updateSupnuevoBuyerUnionPriceRatio1()" 
					style="flex: 1.5; background-color: #007AFF;border-radius: 9px;margin-right: 10px;font-size: 13px;">保存</button>
				</view>
			</view>
			<view class="" v-if="unionMemberType !== 2">
				<view class="fontstyle">
					<text>比例1:&nbsp;&nbsp;{{ratioOnly}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		updateSupnuevoBuyerUnionPriceRatio1
	} from '@/api/MyInfor.js'
	export default {
		data() {
			return {
				form:{},
				unionMemberType:'',
				ratioOnly: 0,
			};
		},
		onLoad(option) {
			this.form = JSON.parse(decodeURIComponent(option.form));
			uni.setNavigationBarTitle({
			    title: "商品-"+ this.form.nombre
			});
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.ratioOnly = this.form.ratio1*100;
		},
		methods:{
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			updateSupnuevoBuyerUnionPriceRatio1(){
				console.log(this.ratioOnly)
				updateSupnuevoBuyerUnionPriceRatio1({
					unionId: this.form.unionId,
					priceId:this.form.priceId,
					ratio1:this.ratioOnly,
				}).then(res => {
					if (res.re === 1){
						uni.showModal({
							title: "提示",
							content: "修改成功",
							showCancel: false,
						})
					}
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
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
		font-size: 19px;
		margin: 8px;
	}
</style>
