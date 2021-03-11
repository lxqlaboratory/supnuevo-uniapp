<template>
	<view :class="{  'uni-collapse-cell--open': isOpen,'uni-collapse-cell--hide':!isOpen }"
	 class="uni-collapse-cell">
		<view class="uni-collapse-cell__title">
			<uni-icons :class="{ 'uni-collapse-cell__title-arrow-active': isOpen, 'uni-collapse-cell--animation':  true }"
			 class="uni-collapse-cell__title-arrow" color="#bbb" size="26" type="arrowdown"  @click="onClick"/>
			<text class="uni-collapse-cell__title-text">{{ title }}</text>
			<image src="../../static/image/images/up.png" mode="" style="width: 26px;height: 26px;" @click="confirmDialog"></image>
			<image src="../../static/image/images/down.png" mode="" style="width: 26px;height: 26px;" @click="deletemethod(title,mapId)"></image>
		</view>
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="请输入条码"  placeholder="请输入条码" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<view :class="{'uni-collapse-cell__content--hide':!isOpen}" class="uni-collapse-cell__content">
			<view :class="{ 'uni-collapse-cell--animation': true }" class="uni-collapse-cell__wrapper" :style="{'transform':isOpen?'translateY(0)':'translateY(-50%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-50%)'}">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniIcons from '../uni-icons/uni-icons.vue'
	import {
		deleteSupnuevoCommodityCodigoMap,
		addSupnuevoCommodityCodigoMapSub
	} from '@/api/MyInfor.js'
	export default {
		name: 'UniCollapseItem',
		components: {
			uniIcons,
			uniPopupDialog
		},
		props: {
			mapId: {
				type: Number,
				default: ''
			},
			title: {
				// 列表标题
				type: String,
				default: ''
			},
			name: {
				// 唯一标识符
				type: [Number, String],
				default: 0
			},
			disabled: {
				// 是否禁用
				type: Boolean,
				default: false
			},
			showAnimation: {
				// 是否显示动画
				type: Boolean,
				default: true
			},
			open: {
				// 是否展开
				type: Boolean,
				default: false
			},
			thumb: {
				// 缩略图
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpen: false
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
			}
		},
		inject: ['collapse'],
		created() {
			this.isOpen = this.open
			this.nameSync = this.name ? this.name : this.collapse.childrens.length
			this.collapse.childrens.push(this)
			if (String(this.collapse.accordion) === 'true') {
				if (this.isOpen) {
					let lastEl = this.collapse.childrens[this.collapse.childrens.length - 2]
					if (lastEl) {
						this.collapse.childrens[this.collapse.childrens.length - 2].isOpen = false
					}
				}
			}
		},
		methods: {
			dialogInputConfirm(done, val) {
				console.log(val);
				var codigoSub = val;
				if (codigoSub !== '' && codigoSub !== null){
					addSupnuevoCommodityCodigoMapSub({
						codigo: this.title,
						codigoSub: codigoSub
					}).then(res => {
						uni.hideLoading()
						done()
						if (res.re === 1){
							uni.showModal({
								title: "提示",
								content: "添加成功",
								showCancel: false,
								success:function(res){
									if (res.confirm){
										uni.redirectTo({
										    url: '../../pages/my/CodigoRelation'
										});
									}
								}
							})
						}else {
							uni.showModal({
								title: "提示",
								content: res.data,
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
				}
			},
			confirmDialog(){
				this.$refs.dialogInput.open()
			},
			deletemethod(codigo,mapId){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该条码',
				    success: function (res) {
				        if (res.confirm) {
				           deleteSupnuevoCommodityCodigoMap({
				           	codigo: codigo,
				           	mapId: mapId
				           }).then(res => {
				           	console.log(res)
				           	if (res.re === 1)
								uni.showModal({
									title: "提示",
									content: "删除成功",
									showCancel: false,
									success:function(res){
										if (res.confirm){
											uni.redirectTo({
											    url: '../../pages/my/CodigoRelation'
											});
										}
									}
								})
							
				           }).catch((err) => {
				           uni.showModal({
				           	title: "提示",
				           	content: err,
				           	showCancel: false,
				           })
				           });	
				        } 
				    }
				});
			},
			onClick() {
				if (this.disabled) {
					return
				}
				if (String(this.collapse.accordion) === 'true') {
					this.collapse.childrens.forEach(vm => {
						if (vm === this) {
							return
						}
						vm.isOpen = false
					})
				}
				this.isOpen = !this.isOpen
				this.collapse.onChange && this.collapse.onChange()
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/uni.scss';

	.uni-collapse-cell {
		flex-direction: column;
		border-color: $uni-border-color;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}


	.uni-collapse-cell--hover {
		background-color: $uni-bg-color-hover;
	}

	.uni-collapse-cell--open {
		background-color: $uni-bg-color-hover;
	}

	.uni-collapse-cell--disabled {
		background-color: $uni-bg-color-hover;
		// opacity: 0.3;
	}


	.uni-collapse-cell--hide {
		height: 48px;
	}

	.uni-collapse-cell--animation {
		// transition: transform 0.3s ease;
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: ease;
	}

	.uni-collapse-cell__title {
		padding: 12px 12px;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		height: 48px;
		line-height: 24px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-collapse-cell__title:active {
		background-color: $uni-bg-color-hover;
	}

	.uni-collapse-cell__title-img {
		height: $uni-img-size-base;
		width: $uni-img-size-base;
		margin-right: 10px;
	}

	.uni-collapse-cell__title-arrow {
		width: 20px;
		height: 20px;
		transform: rotate(0deg);
		transform-origin: center center;
		margin-right: 10px;
	}

	.uni-collapse-cell__title-arrow-active {
		transform: rotate(180deg);
	}

	.uni-collapse-cell__title-text {
		flex: 1;
		font-size: 20px;
		font-weight: bold;
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		color: inherit;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.uni-collapse-cell__content {
		overflow: hidden;
	}

	.uni-collapse-cell__wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-collapse-cell__content--hide {
		height: 0px;
		line-height: 0px;
	}
</style>
