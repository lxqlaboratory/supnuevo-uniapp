<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<luPopupWrapper ref="luPopupWrapper"
			:type="type"
			:transition="transition"
			:backgroundColor="backgroundColor"
			:active="active"
			:height="height"
			:width="width"
			:popupId="popupId"
			:maskShow="maskShow"
			:maskClick="maskClick"
			:closeCallback="closeCallback"
			>
			<view class="mycontent">
				<view style="background-color: #18B4ED;height: 40px;width: 100%;display: flex;align-items: center;">
					<uni-icons type="close" size="30" color="white" style="margin-left: 5px;" @click="close()"></uni-icons>
					<view style="font-size: 18px;color: white;margin-left: 110px;">
						<text>选择条形码</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 680px">
					<view class="uni-common-mt">
						<view class="uni-form-item uni-column">
							<checkbox-group class="uni-list" >
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in searchListFinal" :key="index" @click="onCodigoSelect(index,item)">
									<view>
										{{item.value}}
									</view>
								</label>
							</checkbox-group>
						</view>
					</view>
				</scroll-view>
				
			</view>
		</luPopupWrapper>
		<view class="" style="height: 190px;border: 1px solid #555555;width: 80%;margin: 0 auto;margin-top: 20px;border-radius:25px;">
			<view class="Inrow">
				<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
					<text>选中</text>
				</view>
				<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
					<text>层级</text>
				</view>
				<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
					<text>商品数</text>
				</view>
			</view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll" v-if="unionMemberType == 2">
				<view class="Inrow" v-for="(item,index) in priceClassList" :key="index" @click="setUnionCurrentMerchantCount(item.priceCount)">
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						  <image src="../../static/image/images/yes.png" mode="" v-if="item.select == 1" style="height: 26px;width: 26px;"></image>
						  <image src="../../static/image/images/no.png" mode="" v-if="item.select != 1" style="height: 26px;width: 26px;"></image>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.priceCount}}</text>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.count}}</text>
					</view>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll" v-if="unionMemberType != 2">
				<view class="Inrow" v-for="(item,index) in priceClassList" :key="index">
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <image src="../../static/image/images/yes.png" mode="" v-if="item.select == 1" style="height: 26px;width: 26px;"></image>
						 <image src="../../static/image/images/no.png" mode="" v-if="item.select != 1" style="height: 26px;width: 26px;"></image>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.priceCount}}</text>
					</view>
					<view class="" style="display: flex;flex: 3;justify-content: center;align-items: center;">
						 <text>{{item.count}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="priceinput">
			<!-- <taogewan-combox-remote class="input1" :placeholder="goods.codeNum"  emptyTips=" " :candidates="searchListFinal" @input="changecode" @select="onCodigoSelect"/> -->
			<input class="input1" type="number" v-model="goods.codeNum" placeholder="请输入商品条码尾数" placeholder-style="color:#aaa;" />
			<button type="primary" class="priceButton" @click="selectNum" style="background-color: #3D4145;border-radius: 8px;">查询</button>
			<button type="primary" class="priceButton" @click="startCamera" style="background-color: #3D4145;border-radius: 8px;">扫码</button>
		</view>
		
		<view class="" style="margin-top: 10px;justify-content: center;align-items: center;display:flex;" v-if="unionMemberType == 2">
			<button type="primary" size="mini" style="border-radius: 10px;background-color: #007AFF;" @click="setAllCommodityIsAlive">全部置为可用</button>
		</view>
		
		<view class="list" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" v-if="unionMemberType == 2&&goodsList.length>=1900" style="margin-top: 10px;border-top: 1px solid #ddd;">
			<sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn">
				<block class="" slot="sibScrollList">
					<!-- <scroll-view scroll-y="true" style="height: 435px;border-top: 1px solid #1CBBB4;margin-top: 10px;" @scroll="scroll"  > -->
						<view class="Inrow1" v-for="(item,index) in list" :key="index" @click="checkAlive(item.isAlive,item.commodityId)">
							<view class="" style="flex: 8;">
								<view class="" style="margin-left: 10px;">
									<text>{{index+1}}、codigo:&nbsp;&nbsp;{{item.codigo}}</text>
								</view>
								<view class="" style="margin-left: 10px;">
									<text>descripcion:&nbsp;&nbsp;{{item.nombre}}</text>
								</view>
							</view>
							<view class="" style="flex: 1;">
								<image src="../../static/image/images/yes.png" mode="" v-if="item.isAlive == 1" style="height: 26px;width: 26px;"></image>
								<image src="../../static/image/images/no.png" mode="" v-if="item.isAlive != 1" style="height: 26px;width: 26px;"></image>
							</view>
						</view>
					<!-- </scroll-view> -->
				</block>
			</sib-list>
		</view>
		
		
		<scroll-view scroll-y="true" style="height: 435px;border-top: 1px solid #ddd;margin-top: 10px;" @scroll="scroll"  v-if="unionMemberType == 2&&goodsList.length<1900" :scroll-into-view="flag">
			<view class="Inrow1" v-for="(item,index) in goodsList" :key="index" @click="checkAlive(item.isAlive,item.commodityId)"  :id='"text"+index'>
				<view class="" style="flex: 8;">
					<view class="" style="margin-left: 10px;">
						<text>{{index+1}}、codigo:&nbsp;&nbsp;{{item.codigo}}</text>
					</view>
					<view class="" style="margin-left: 10px;">
						<text>descripcion:&nbsp;&nbsp;{{item.nombre}}</text>
					</view>
				</view>
				<view class="" style="flex: 1;">
					<image src="../../static/image/images/yes.png" mode="" v-if="item.isAlive == 1" style="height: 26px;width: 26px;"></image>
					<image src="../../static/image/images/no.png" mode="" v-if="item.isAlive != 1" style="height: 26px;width: 26px;"></image>
				</view>
			</view>
		</scroll-view>
				
		
		
		<scroll-view  scroll-y="true" style="height: 435px;border-top: 1px solid #ddd;margin-top: 10px;" @scroll="scroll" v-if="unionMemberType != 2&&goodsList.length<1900" :scroll-into-view="flag">
			<view class="Inrow1" v-for="(item,index) in goodsList" :key="index" :id='"text"+index'>
				<view class="" style="flex: 8;">
					<view class="" style="margin-left: 10px;">
						<text>codigo:&nbsp;&nbsp;{{item.codigo}}</text>
					</view>
					<view class="" style="margin-left: 10px;">
						<text>descripcion:&nbsp;&nbsp;{{item.nombre}}</text>
					</view>
				</view>
				<view class="" style="flex: 1;">
					<image src="../../static/image/images/yes.png" mode="" v-if="item.isAlive == 1" style="height: 26px;width: 26px;"></image>
					<image src="../../static/image/images/no.png" mode="" v-if="item.isAlive != 1" style="height: 26px;width: 26px;"></image>
				</view>
			</view>
		</scroll-view>
		
		<view class="list" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" v-if="unionMemberType != 2&&goodsList.length>=1900" style="margin-top: 10px;border-top: 1px solid #ddd;">
			<sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn">
				<block class="" slot="sibScrollList">
					<!-- <scroll-view  scroll-y="true" style="height: 435px;border-top: 1px solid #1CBBB4;margin-top: 10px;" @scroll="scroll" v-if="unionMemberType != 2&&goodsList.length<1900" :scroll-into-view="flag"> -->
						<view class="Inrow1" v-for="(item,index) in list" :key="index" :id='"text"+index'>
							<view class="" style="flex: 8;">
								<view class="" style="margin-left: 10px;">
									<text>codigo:&nbsp;&nbsp;{{item.codigo}}</text>
								</view>
								<view class="" style="margin-left: 10px;">
									<text>descripcion:&nbsp;&nbsp;{{item.nombre}}</text>
								</view>
							</view>
							<view class="" style="flex: 1;">
								<image src="../../static/image/images/yes.png" mode="" v-if="item.isAlive == 1" style="height: 26px;width: 26px;"></image>
								<image src="../../static/image/images/no.png" mode="" v-if="item.isAlive != 1" style="height: 26px;width: 26px;"></image>
							</view>
						</view>
					<!-- </scroll-view> -->
				</block>
			</sib-list>
		</view>
	</view>
</template>

<script>
	import {
		getSupnuevoBuyerUnionPriceClassList,
		setUnionCurrentMerchantCount,
		getSupnuevoBuyerUnionPriceListByPriceCount,
		setAllCommodityIsAlive,
		setSupnuevoBuyerUnionCommodityIsAlive,
		getUnionQueryDataListByInputString,
		getSupnuevoBuyerUnionPriceByCommodityId
	} from '@/api/MyInfor.js'
	import sibList from '@/components/sib-list/sib-list1.vue'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	export default {
		data() {
			return {
				unionMemberType:'',
				unionId:'',
				priceClassList:[],
				// 扫码搜索
				goods: [],
				goodsList: [],
				wait: false,
				codesModalVisible: false,
				codigo: null,
				commodityId:null,
				camera: {},
				cameraModalVisible: false,
				openFlash: false,
				isAlive:true,
				commodityList:[true],
				selected:null,
				// selectedIdx:this.props.selectedIdx,
				selectedIdx:null,
				currentRow:0,
				goods: {
					codeNum: ''
				},
				searchListFinal: [],
				codigo:'',
				flag: '',
				index: 50,
				list: [],
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"100%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
			};
		},
		components: {
				wybLoading,
				sibList,
				luPopupWrapper
		},
		onShow(){
			this.unionId = getApp().globalData.unionId;
			this.unionMemberType = getApp().globalData.unionMemberType;
			this.getSupnuevoBuyerUnionPriceClassList();
		},
		methods:{
			fade: function() {
				this.width ="100%";
				this.height ="100%";
				this.transition = "fade";
				this.type = "bottom";
				this.show();
				let that = this;
			},
			show: function() {
				this.$refs.luPopupWrapper.show();
			},
			close: function() {
				this.$refs.luPopupWrapper.close();
			},
			closeCallback:function() {
				console.log("关闭后回调");
			},
			scroll: function(e) {
				console.log(e)
			},
			checkAlive(isAlive,commodityId){
				if(isAlive === 1){
					this.setCommodityIsAlive(commodityId,0);
				}
				if(isAlive === 0){
					this.setCommodityIsAlive(commodityId,1);
				}
			},
			setCommodityIsAlive(commodityId,AliveState){
				setSupnuevoBuyerUnionCommodityIsAlive({
					unionId: this.unionId,
					commodityId: commodityId,
					isAlive: AliveState
				}).then(res => {
					var errorMsg = res.errorMsg;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errorMsg,
							showCancel: false,
						})
					} else {
						uni.showModal({
							title: "提示",
							content: "设置成功",
							showCancel: false,
						})
						this.getSupnuevoBuyerUnionPriceListByPriceCount(this.selectedIdx);
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			setAllCommodityIsAlive(){
				setAllCommodityIsAlive({
					unionId: this.unionId
				}).then(res => {
					var errorMsg = res.errorMsg;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errorMsg,
							showCancel: false,
						})
					} else {
						uni.showModal({
							title: "提示",
							content: "设置成功",
							showCancel: false,
						})
						this.getSupnuevoBuyerUnionPriceListByPriceCount(this.selectedIdx);
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			checkSelect(){
				for(var i = 0; i < this.priceClassList.length; i++){
					if (this.priceClassList[i].select === 1){
						this.selectedIdx = this.priceClassList[i].priceCount 
						this.getSupnuevoBuyerUnionPriceListByPriceCount(this.selectedIdx)
					}
				}
			},
			getSupnuevoBuyerUnionPriceListByPriceCount(priceCount){
				this.$refs.loading.showLoading()
				getSupnuevoBuyerUnionPriceListByPriceCount({
					unionId: this.unionId,
					priceCount: priceCount
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.goodsList = res.data
						for(var i = 0; i < this.index ;i++)
							this.list[i] = this.goodsList[i]
					}
					this.$refs.loading.hideLoading() // 隐藏
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
			});	
			},
			getSupnuevoBuyerUnionPriceClassList(){
				getSupnuevoBuyerUnionPriceClassList({
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if(res.re === 1){
						this.priceClassList = res.data
					}
					if(this.priceClassList.length > 0){
						this.checkSelect()
					}
				}).catch((err) => {
					uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
				});	
			},
			setUnionCurrentMerchantCount(merchantCount){
				var that = this;
				uni.showModal({
					title: "提示",
					content: "是否更改维护种类",
					 success: function (res) {
					        if (res.confirm) {
									that.$refs.loading.showLoading()
					            	that.selectedIdx = merchantCount;
					            	setUnionCurrentMerchantCount({
					            		unionId: that.unionId,
					            		merchantCount: merchantCount
					            	}).then(res => {
					            		if (res.re === 1){
					            			uni.showModal({
					            				title: "提示",
					            				content: "设置成功",
					            				showCancel: false,
					            			})
					            		 that.getSupnuevoBuyerUnionPriceListByPriceCount(merchantCount);//去掉？
					            		 that.getSupnuevoBuyerUnionPriceClassList();
					            		}
					            	}).catch((err) => {
					            	uni.showModal({
					            		title: "提示",
					            		content: err,
					            		showCancel: false,
					            	})
					            });	
					        } else if (res.cancel) {
					            return;
					        }
					    }
				})
			},
			changecode (keyword){
				var codeNum = keyword
				this.goods.codeNum = codeNum;
				if (codeNum.length >= 4 )
				this.queryGoodsCode(codeNum.toString());
			},
			onCodigoSelect(key, item){
				console.log(item.commodityId)
				const merchantId = getApp().globalData.merchantId;
				var codigo = item.value;
				getSupnuevoBuyerUnionPriceByCommodityId({
					codigo: codigo,
					commodityId: item.commodityId,
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if(res.re == -2){
					    uni.navigateTo({
					    	url:'../index/index'
					    })
					}
					this.close();
					if (res.re === 1) {
						if(this.goodsList.length<1900){
								for (var i = 0;i < this.goodsList.length ; i++)
									if(this.goodsList[i].codigo === codigo){
										this.$nextTick(()=> {
											this.flag = "text" + i
											console.log(this.flag)
										});
										this.flag=''  //不清空再次跳到锚点位置会不起作用
										return;
									}
									console.log("没有找到")
							}else{
								for (var i = 0;i < this.goodsList.length; i++){													
									if(this.goodsList[i].codigo == codigo){
										var goodsList = [];
										goodsList[0] = this.goodsList[i]
										this.goodsList = goodsList;
									}
								}
							}
					}else 
					return;
				}).catch((err) => {
				});	
			},
			 queryGoodsCode (codeNum) {
					if (codeNum.length>=4){
					this.$refs.loading.showLoading()
					var merchantId = getApp().globalData.merchantId;
					this.searchListFinal = [];
			        getUnionQueryDataListByInputString({
						codigo: codeNum,
						merchantId: merchantId,
						merchantCount:this.selectedIdx,
						unionId: this.unionId
					}).then(res => {
						console.log(res)
			            if(res.re == -2){
							uni.navigateTo({
								url:'../index/index'
							})
			            }
			            var errorMsg = res.message;
			            if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							uni.showModal({
								title: "提示",
								content: errorMsg,
								showCancel: false,
							})
			            } else {
			                if (res.array !== undefined && res.array !== null && res.array.length > 1) {
								for (var i=0 ; i < res.array.length ; i++){
									var searchItem={key:null,value:'',commodityId:''}
									searchItem.key = i
									searchItem.value = res.array[i].codigo
									searchItem.commodityId = res.array[i].commodityId
									this.searchListFinal.push(searchItem)
								}
								this.show()
			                }
			                else  {
								var merchantId = getApp().globalData.merchantId
								getSupnuevoBuyerUnionPriceByCommodityId({
									codigo: res.array[0].codigo,
									commodityId:res.array[0].commodityId,
									unionId: this.unionId
								}).then(res => {
									var codigo = res.data.codigo;
									console.log(res)
									if(res.re == -2){
									    uni.navigateTo({
									    	url:'../index/index'
									    })
									}
									if (res.re === 1) {
										if(this.goodsList.length<1900){
												for (var i = 0;i < this.goodsList.length ; i++)
													if(this.goodsList[i].codigo === codigo){
														this.$nextTick(()=> {
															this.flag = "text" + i
															console.log(this.flag)
														});
														this.flag=''  //不清空再次跳到锚点位置会不起作用
														return;
													}
													console.log("没有找到")
											}else{
												for (var i = 0;i < this.goodsList.length; i++){													
													if(this.goodsList[i].codigo == codigo){
														var goodsList = [];
														goodsList[0] = this.goodsList[i]
														this.goodsList = goodsList;
													}
												}
											}
										}else 
										return;
								}).catch((err) => {
								});	
			                }
			            }
			        }).catch((err) => {
						uni.showModal({
						title: "提示",
						content: err,
						showCancel: false,
					})
					});	}
					 this.$refs.loading.hideLoading() // 隐藏
			    },
				selectNum (){
					if (this.goods.codeNum !== undefined && this.goods.codeNum !== null){
						var codeNum = this.goods.codeNum;
						if (codeNum.toString().length >= 4 && codeNum.toString().length <= 13) {
							this.queryGoodsCode(this.goods.codeNum.toString());
						}else {
							uni.showModal({
								title: "提示",
								content: '请输入4-13位的商品条码进行查询',
								showCancel: false,
							})
						}
					}else {
						uni.showModal({
							title: "提示",
							content: '请输入4-13位的商品条码进行查询',
							showCancel: false,
						})
					}
				},
				startCamera(){
					var that = this;
					uni.scanCode({
						success:function(res){
							that.goods.codeNum = res.result;
							console.log('条码内容：' + that.goods.codeNum);
							uni.showModal({
								title: "提示",
								content: "扫码成功！！",
								showCancel: false,
							})
						},
						fail:function(res){
							uni.showModal({
								title: "提示",
								content: "扫码失败！！",
								showCancel: false,
							})
						},
					})
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
						for(var i = 0; i < 50 ;i++)
							_this.list[i] = _this.goodsList[i]
						// 刷新结束调用
						this.$refs.sibList.endAfter()
					}, 1000)
				},
				scrolltolowerFn: function() {
					if(this.index == this.goodsList.length)
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
						for(var i=0 ;i <= 50; i++){
							newData[i] = this.goodsList[this.index++]
							if (this.index == this.goodsList.length)
								return;
						}
							
						_this.list = _this.list.concat(newData)
						uni.hideLoading()
					}, 1000)
				},
		},
	}
</script>

<style>
	.Inrow {
		display: flex;
		justify-content: center;
		flex-direction: row; 
		align-items: center;
		height: 35px;
		border-bottom: 1px solid #333333;
	}
	.Inrow1 {
		display: flex;
		justify-content: center;
		flex-direction: row; 
		align-items: center;
		height: 70px;
		border-bottom: 1px solid #ddd;
	}
	.scroll-Y{
		height: 155px;
	}
	.priceinput {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-width: 3px;
		border: 1px solid ;
		border-color: #999999;
	}
	.priceButton {
		margin-top: 4px;
		margin-bottom: 4px;
		margin-right: 8px;
		height: 35px;
		font-size: 14px;
		width: 56px;
	}
	.input1 {
		display: flex;
		flex: 8;
		height: 35px;
		padding-left: 10;
		padding-right: 10;
		padding-top: 6;
		padding-bottom: 6;
		background-color: #FFFFFF;
		color: #333333;
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
		font-size: 20px;
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
	.uni-list-cell {
		justify-content: flex-start;
		position: relative;
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
		align-items: center;
		
	}
	
	.uni-list .label-3 {
		padding: 0;
	}
	
	.label-2-text {
	    flex: 1;
	}
	.mycontent{
		height: 100%;
		width: 100%;
	}
</style>
