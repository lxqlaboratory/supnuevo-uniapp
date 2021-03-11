<template>
	<view>
		<view class="Inrow">
			<view class="" style="display: flex;flex: 3;justify-content: space-around;align-items: center;font-size: 20px;color: #444;">
				<text>关联用户</text>
			</view>
			<view class="" style="display: flex;flex: 3;justify-content: space-around;align-items: center;font-size: 20px;color: #444;">
				<text>状态</text>
			</view>
		</view>
		<!-- <view class="message-list" v-if="maskShow">
		  <wkiwi-swipe-action :options="options" :messagesList="merdate" :key="merdate" :updateMerchant="updateMerchant" :getRelMerchantgetRelMerchant="getRelMerchant"></wkiwi-swipe-action>
		</view> -->
		<view v-if="maskShow">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(it, index) in merdate" :key="index" :right-options="it.options"  @click="bindClick(index,$event)">
						<view style="flex-direction: row;display: flex;width: 100%;border-bottom: 1px solid #9999;">
							<view class="item-middle">
								<text class="title">用户名：{{it.nickName}}</text>
								<text class="title">备注：{{it.note}}</text>
							</view>
							<view class="item-right">
								<view class="mark" v-if="it.state == 1" style="color: green;">已联通</view>
								<view class="mark" v-else style="color: red;">未联通</view>
								<view class="time" v-if="it.priceMerchantDeleteMark == 1">对方已删除</view>
								<view class="time" v-else-if="it.priceMerchantAgreeMark == 0">对方未联通</view>
								<view class="time" v-else-if="it.merchantAgreeMark == 0">您未联通</view>
								<view class="time" v-else ></view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</scroll-view>
		</view>
		<!-- <view class="countcomm">
			<image src="../../static/image/images/up.png" mode="" class="countcomm" @tap="fade()"></image>
		</view> -->
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
				<view style="margin-top: 30px;margin-bottom: 15px;display: flex;align-items: center;justify-content: center;">
					<text style="font-size: 20px;color: #444;">
						请输入要关联的用户：
					</text>
				</view>
				<view style="display: flex;height: 50px;border-top: 1px #aaa solid;border-bottom: 1px #aaa solid;align-items: center;justify-content: center;flex-direction: row;">
					<view style="flex: 3;disalign-items: center;justify-content: center;display: flex;">
						<text style="font-size: 16px;color: #444;">
							用户名：
						</text>
					</view>
					<view style="flex: 6;">
						<input type="text" v-model="username" placeholder="在此输入用户名" placeholder-style="color:#aaa"/>
					</view>
				</view>
				<view style="display: flex;height: 50px;border-top: 1px #aaa solid;border-bottom: 1px #aaa solid;align-items: center;justify-content: center;flex-direction: row;">
					<view style="flex: 3;disalign-items: center;justify-content: center;display: flex;">
						<text style="font-size: 16px;color: #444;">
							备注：
						</text>
					</view>
					<view style="flex: 6;">
						<input type="text" v-model="note" placeholder="在此输入说明" placeholder-style="color:#aaa"/>
					</view>
				</view>
				<view class="">
					<button type="default" @click="addRelMerchant" style="height: 50px;width: 200px;margin-top: 15px;border-radius: 4px;font-size: 16px;color: #fff;background-color: #387ef5;line-height: 50px;">添加</button>
				</view>
				<view class="">
					<button type="default" @click="close" style="height: 50px;width: 200px;margin-top: 15px;border-radius: 4px;font-size: 16px;color: #fff;background-color: #387ef5;line-height: 50px;">关闭</button>
				</view>
			</view>
		</luPopupWrapper>
	</view>
</template>

<script>
	import {
		addSupnuevoMerchantPriceOperRel,
		getRelMerchantListOfMerchantMobile,
		updateSupnuevoMerchantPriceOperRel
	} from '@/api/login.js'
	import wkiwiSwipeAction from "../../components/wkiwi-swipe-action.vue";
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	export default {
		onShow() {
			this.getRelMerchant();
		},
		components: {
			luPopupWrapper,
			wkiwiSwipeAction
		},
		onNavigationBarButtonTap(){
			 this.fade();
		},
		data() {
			return {
				type:"bottom",// left right top bottom center
				transition:"slider",//none slider fade
				backgroundColor:'#FFF',
				active:false,
				height:"100%",
				width:"100%",
				popupId:1,
				maskShow:true,
				maskClick:true,
				modal_qr: false,
				merdate: [{}],
				username: '',
				password: '',
				wait: false,
				note: '',
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					},
					{
						text: '联通',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '断开',
						style: {
							backgroundColor: '#444'
						}
					},
				],
			}
		},
		methods: {
			bindClick(index,e) {
				if (e.content.text == "联通"){
					this.updateMerchant(this.merdate[index].relId,1);
				}else if (e.content.text == "断开"){
					this.updateMerchant(this.merdate[index].relId,2);
				}else {
					this.updateMerchant(this.merdate[index].relId,0);
				}
			},
			fade: function() {
				this.width ="100%";
				this.height ="80%";
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
			addRelMerchant(){
				if (this.username === ''){
					uni.showModal({
						title: "提示",
						content: "请填写账号密码",
						showCancel: false,
					})
				}else{
					addSupnuevoMerchantPriceOperRel({
						 nickName: this.username,
						 type: 1,
						 note: this.note,
					}).then(res => {
						var that = this;
						console.log("第一个")
						console.log(res)
						var errMessage = res.errMassage;
						if (errMessage !== null && errMessage !== undefined && errMessage !== "") {
							uni.showModal({
								title: "提示",
								content: errMessage,
								showCancel: false,
								 success: function (res) {
								        if (res.confirm) {
								            that.close();
											that.username = '';
											that.note = '';
								        }
								    }
							})
						}
						else {
							 that.getRelMerchant();
							 that.close();
							 that.username = '';
							 that.note = '';
						}
					})
				}
			},
			getRelMerchant(){
				getRelMerchantListOfMerchantMobile({
					type: 1
				}).then(res => {
					var that = this;
					console.log("第二个")
					console.log(res)
					var errMessage = res.errMassage;
					if (errMessage !== null && errMessage !== undefined && errMessage !== "")
						uni.showModal({
							title: "提示",
							content: errMessage,
							showCancel: false,
							 success: function (res) {
							        if (res.confirm) {
							            that.close();
										that.username = '';
										that.note = '';
							        }
							    }
						})
					else {
						if (res.ArrayList.length !== 0) {
							that.merdate = [{}];
							that.maskShow = true;
							that.merdate = res.ArrayList;
							for (var i = 0; i < that.merdate.length; i++){
								that.merdate[i].state = 0;
								that.merdate[i].disabled = false
								if(that.merdate[i].priceMerchantAgreeMark == 0)
									that.merdate[i].state = 0;
								else if (that.merdate[i].merchantAgreeMark == 0){
									that.merdate[i].state = 0;
								} else that.merdate[i].state = 1;
							}
							console.log(that.merdate)
							that.close();
							that.username = '';
							that.note = '';
					}
					else {
						that.merdate = [{}];
						that.maskShow = false;
						that.close();
						that.username = '';
						that.note = '';
						uni.showModal({
							title: "提示",
							content: "商户的相关商户为空",
							showCancel: false,
							 success: function (res) {
							        if (res.confirm) {
							            that.close();
										that.username = '';
										that.note = '';
							        }
							    }
						})
					}
					}
					for(var i = 0; i < that.merdate.length; i++){
						that.merdate[i].options = [];
						that.merdate[i].options[0] = {
								text: '删除',
								style: {
									backgroundColor: '#dd524d'
								}
							}
						if (that.merdate[i].merchantAgreeMark == 0){
							that.merdate[i].options[1] = {
									text: '联通',
									style: {
										backgroundColor: '#007aff'
									}
								}
						}else {
							that.merdate[i].options[1] = {
									text: '断开',
									style: {
										backgroundColor: '#444'
									}
								}
						}
					}
				})
			},
			updateMerchant(relId, state){
				updateSupnuevoMerchantPriceOperRel({
					type: 1,
					relId: relId,
					state: state,
				}).then(res => {
					this.messageIndex = -1;
					var errorMsg = res.message;
					if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
						uni.showModal({
							title: "提示",
							content: errMessage,
							showCancel: false,
						})
					}else {
						console.log(123456)
						this.getRelMerchant();
					} 
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
	.slot-button1 {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: #ff5a5f;
	}
	.slot-button2 {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 20px;
		background-color: green;
	}
	.slot-button-text {
		color: #ffffff;
		font-size: 14px;
	}
	.Inrow {
		display: flex;
		justify-content: space-around;
		flex-direction: row; 
		align-items: center;
		height: 45px;
		border-bottom: 1px solid #9999;
	}
	.countcomm {
		left: 10px;
		bottom: 10px;
		z-index: 1;
		position: fixed;
		width: 64px;
		height: 64px;
	}
	.mycontent{
		height: 100%;
		width: 100%;
	}
	.item-middle {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		margin-left: 15upx;
		overflow: hidden;
	}
	.title {
			width: 100%;
		  font-family: "微软雅黑";
		  font-weight: 400;
		  font-size: 16px;
			height: 50upx;
		  line-height:60upx;
		  overflow: hidden; /*自动隐藏文字*/
		  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
			white-space: nowrap; /**强制不换行*/
		}
	.item-right {
		  overflow: hidden;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		}
		.time {
		  font-size: 14px;
			height:50upx;
			line-height: 60upx;
			color: #666;
		}
		.mark {
		  line-height: 60upx;
			text-align: center;
		  font-size: 18px;
		  min-width: 35upx;
		  min-height: 35upx;
		  height: 50upx;
		}
</style>
