<template>
	<view class="">
		<view class="uni-common-mt" v-if="unionMemberType == 2 || unionMemberType == 1">
			<view class="uni-form-item uni-column">
				<checkbox-group class="uni-list" >
					<label class="uni-list-cell uni-list-cell-pd" @click="navigatemyinfo">
						<view>本联盟规定</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigateCommodityCategory">
						<view>我们的商品种类</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigateCommodityPrice">
						<view>我们的商品价格</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigatePricePromotion">
						<view>我们的促销策略</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigatePricePublicity">
						<view>我们的促销宣传单</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigateMemberList">
						<view>我们的成员</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigateUnionOrder">
						<view>我的超市联盟订单</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" @click="navigateLackCommodity">
						<view>缺货商品</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" v-if="unionMemberType == 2" @click="navigateIncompleteCommodity">
						<view>信息不完整商品</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" v-if="unionMemberType == 2" @click="navigateCodigoRelation">
						<view>条码级联</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd"  v-if="root" @click="navigateModifyTime">
						<view>商品改价时间</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" v-if="unionMemberType === 2" @click="updatePriceList">
						<view>更新价格表</view>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		updateSupnuevoBuyerUnionAllPriceInfo
	} from '@/api/MyInfor.js'
	export default {
		data() {
			return {
				showProgress:false,
				unionMemberType:'',
				root:'',
				unionId:'',
			};
		},
		onLoad() {
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.root = getApp().globalData.root;
			this.unionId = getApp().globalData.unionId;
		},
		methods:{
			navigatemyinfo(){
				uni.navigateTo({
					url: './unionRule'
				})
			},
			navigateCommodityCategory(){
				uni.navigateTo({
					url: './commodityCategory'
				})
			},
			navigateCommodityPrice(){
				uni.navigateTo({
					url: './commodityPrice'
				})
			},
			navigatePricePromotion(){
				uni.navigateTo({
					url: './pricePromotion'
				})
			},
			navigatePricePublicity(){
				uni.navigateTo({
					url: './PricePublicity'
				})
			},
			navigateMemberList(){
				uni.navigateTo({
					url: './MemberList'
				})
			},
			navigateUnionOrder(){
				uni.navigateTo({
					url: './unionOrder'
				})
			},
			navigateLackCommodity(){
				uni.navigateTo({
					url: './LackCommodity'
				})
			},
			navigateIncompleteCommodity(){
				uni.navigateTo({
					url: './IncompleteCommodity'
				})
			},
			navigateCodigoRelation(){
				uni.navigateTo({
					url: './CodigoRelation'
				})
			},
			navigateModifyTime(){
				uni.navigateTo({
					url: './ModifyTime'
				})
			},
			updatePriceList(){
				updateSupnuevoBuyerUnionAllPriceInfo({
					unionId: this.unionId
				}).then(res => {
					if (res.re == 1)
						uni.showModal({
							title: "提示",
							content: "更新成功",
							showCancel: false,
						})
				}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
				})	
			},
		}
	}
</script>
	
<style>
	 .p-list {
		background-color: rgba(9, 9, 9, 0.3);
		bottom: 0rpx;
		width: 100%;
		height: 140rpx;
		display: flex;
	} 
	.l-item {
		margin-left: 7rpx;
		color: #ff0000;
		height: 160rpx;
		width: 118rpx;
	}
	.i-img {
		margin-top: 20rpx;
		width: 80px;
		height: 100px;
	}
	.i-icon {
		position: relative;
		top: -110rpx;
		left: 80rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.uni-list-cell {
		justify-content: flex-start;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list .label-3 {
		padding: 0;
	}
	
	.label-2-text {
	    flex: 1;
	}
	.uni-common-mt{
		margin-top:30rpx;
	}
	.uni-form-item{
		display:flex;
		width:100%;
		padding:10rpx 0;
	}
	.uni-column {
		flex-direction: column;
	}
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}
	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
</style>
