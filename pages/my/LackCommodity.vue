<template>
	<view class="">
		<wyb-loading ref="loading"/>
			<view class="" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
				<sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn">
					<block class="" slot="sibScrollList">
						<view class="" v-for="(item,index) in list" :key="index">
							<view class="" style="padding: 10px;border-bottom: 2px solid #9e9ca3;width: 90%;margin: auto;">
								<view class="">
									<text>|&nbsp;&nbsp;{{item.codigo}}</text>
								</view>
								<view class="">
									<text>|&nbsp;&nbsp;{{item.commoditName}}</text>
								</view>
								<view class="">
									<text>|&nbsp;&nbsp;${{item.price}}</text>
								</view>
							</view>
						</view>
					</block>
				</sib-list>
			</view>
	</view>
</template>

<script>
	import sibList from '@/components/sib-list/sib-list.vue'
	import {
		getHashNotUnionCommodityListOfMerchant
	} from '@/api/MyInfor.js'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data(){
			return {
				unionId: '',
				merchantId: '',
				commodityList: [],
				list: [],
				index: 20,
			}
		},
		components: {
				wybLoading,
				sibList
		},
		onShow() {
			this.$refs.loading.showLoading()
			this.unionId = getApp().globalData.unionId;
			this.merchantId = getApp().globalData.merchantId;
			this.getSupnuevoLackCommodityList();
			this.$refs.loading.hideLoading() // 隐藏
		},
		methods: {
			getSupnuevoLackCommodityList(){
				getHashNotUnionCommodityListOfMerchant({
					unionId: this.unionId,
					merchantId: this.merchantId
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.commodityList = res.data
						if (res.data.length >=20 )
						for(var i = 0; i < this.index ;i++)
							this.list[i] = this.commodityList[i]
						else {
							this.list = res.data
						}
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			touchstart: function(e) {
				this.$refs.sibList.refreshStart(e);
			},
			touchmove: function(e) {
				this.$refs.sibList.refreshMove(e);
			},
			touchend: function(e) {
				this.$refs.sibList.refreshEnd(e);
			},
			isRefresh: function() {
				const _this = this
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功,数据恢复初始值'
					})
					for(var i = 0; i < 20 ;i++)
						_this.list[i] = _this.commodityList[i]
					// 刷新结束调用
					this.$refs.sibList.endAfter()
				}, 1000)
			},
			scrolltolowerFn: function() {
				if(this.index == this.commodityList.length)
					return;
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				// 模拟请求
				const _this = this
				setTimeout(() => {
					// 请求成功
					const newData = []
					for(var i=0 ;i <= 20; i++){
						newData[i] = this.commodityList[this.index++]
						if (this.index == this.commodityList.length)
							return;
					}
						
					_this.list = _this.list.concat(newData)
					uni.hideLoading()
				}, 1000)
			},
		}
	}
</script>

<style>
</style>
