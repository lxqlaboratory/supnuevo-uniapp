<template>
	<view class="message-list">
		<block v-for="(it,i) of messagesList" :key="i">
			<view class="uni-swipe-action">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" >
					<view class="uni-swipe-action__content ">
						<view class="item">
							<block>
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
							</block>
						</view>
					</view>
					<view class="uni-swipe-action__btn-group" :id="elId">
						<div class="uni-swipe-action--btn" style="background-color: red;font-size: 28upx;"
						 @click="bindClickBtn(it.relId,0)">
							删除
						</div>
						<div class="uni-swipe-action--btn" style="background-color: green;font-size: 28upx;"
						 @click="bindClickBtn(it.relId,1)" v-if="it.merchantAgreeMark == 0">
							联通
						</div>
						<div class="uni-swipe-action--btn" style="background-color: #444;font-size: 28upx;"
						 @click="bindClickBtn(it.relId,2)" v-else>
							断开
						</div>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		updateSupnuevoMerchantPriceOperRel,
		getRelMerchantListOfMerchantMobile
	} from '@/api/login.js'
	export default {
		name: 'wkiwi-swipe-action',
		props: {
			options: Array,
			messagesList:Array,
			updateMerchant: Function,
			getRelMerchant: Function
		},
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId: elId,
				transformX: 'translateX(0px)',
				messageIndex: -1,
			}
		},
		created() {
			this.direction = ''
			this.startX = 0
			this.startY = 0
			this.btnGroupWidth = 0
			this.isMoving = false
		},
		// #ifdef H5
		mounted() {
			this.getSize()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.getSize()
		},
		// #endif
		methods: {
			getSize() {
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					this.btnGroupWidth = ret[0].width;
				});
			},
			bindClickBtn(item, index) {
				this.messageIndex = -1;
				
				var that = this;
				switch (index) {
					case 0:{
						that.messagesList.splice(index, 1);
							console.log('message第'+ index+ '项');
							console.log(that.messagesList)
						break;
					}
					case 1:
						
						break;
				}
			
			},
			touchStart(event) {
				if(event.currentTarget.dataset.disabled === true){
					return;
				}
				this.startX = event.touches[0].pageX;
				this.startY = event.touches[0].pageY;
			},
			touchMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				var moveY = event.touches[0].pageY - this.startY,
						moveX = event.touches[0].pageX - this.startX;
				if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX) || Math.abs(moveY) > 100 || Math.abs(moveX) < 50) { //纵向滑动//参数100与50可调节侧滑灵敏度
					this.direction = 'Y';
					return;
				}
				this.direction = moveX > 0 ? 'right' : 'left';
				this.messageIndex = moveX < 0 ? event.currentTarget.dataset.index : -1;
				this.isMoving = true;
			},
			touchEnd(event) {
				this.isMoving = false;
				if (this.direction !== 'right' && this.direction !== 'left') {
					this.direction = '';
					return;
				}
				if (this.direction == 'right') {
					this.messageIndex = -1;
				} 
				this.endMove(event)
			},
			endMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				if (this.messageIndex !== -1) {
					this.transformX = `translateX(${-this.btnGroupWidth}px)`;
					this.$emit('opened');
				} else {
					this.transformX = 'translateX(0px)';
					this.$emit('closed');
				}
				this.direction = '';
			}
		}
	}
</script>

<style lang="scss">
	.slot-button {
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
	
	.slot-button-text {
		color: #ffffff;
		font-size: 14px;
	}
	.uni-swipe-action {
		width: 100%;
		overflow: hidden;
		&__container {
			background-color: #FFFFFF;
			width: 200%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
		}
		&__content {
			width: 50%;
		}
		&__btn-group {
			display: flex;
			flex-direction: row;
		}
		&--btn {
			padding: 0 32upx;
			color: #FFFFFF;
			background-color: #C7C6CD;
			font-size: 28upx;
			display: inline-flex;
			text-align: center;
			flex-direction: row;
			align-items: center;
		}
	}
	.item {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  padding: 10upx 16upx;
	  background-color: #fff;
		border-bottom:1px solid rgb(243,243,243);
		&.stick{
			background-color: rgba(243, 236, 221,.5);
		}
		.item-left {
		  text-align: center;
			.image {
			  width: 100upx;
			  height: 100upx;
			  border-radius: 50upx;
			  background-color: #eee;
			}
			.avator{
				width: 100upx;
				height: 100upx;
				text-align: center;
				line-height: 100upx;
				background: #4191ea;
				border-radius: 50%;
				overflow: hidden;
				.iconfont{
					width: 100upx;
					height: 100upx;
					text-align: center;
					line-height: 100upx;
					color: #fff;
					font-size: 40upx;
				}
			}
		}
		.item-middle {
			display: flex;
		  flex: 1;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
		  margin-left: 15upx;
		  overflow: hidden;
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
			.message {
				width: 100%;
			  font-family: "微软雅黑";
			  color: #808080;
				height: 50upx;
			  line-height: 40upx;
			  font-size: 24upx;
			  overflow: hidden; /**自动隐藏文字*/
			  text-overflow: ellipsis; /**文字隐藏后添加省略号*/
			  white-space: nowrap; /**强制不换行*/
			}
		}
		.item-right {
		  overflow: hidden;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
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
		}
	}
</style>