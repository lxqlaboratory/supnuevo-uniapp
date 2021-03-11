<template>
	<view 
	 class="uni-list-item" @click="onClick">
		<view class="uni-list-item__container" :class="{'uni-list-item--first':false}">
			<view class="uni-list-item__content">
				<text class="uni-list-item__content-title">{{ title }}</text>
				<!-- <text v-if="note" class="uni-list-item__content-note">{{ note }}</text> -->
			</view>
			<view class="uni-list-item__extra">
				<image src="../../static/image/images/delete.png" mode="" style="width: 26px;height: 26px;" @click="deleteSubCodigo(mapId)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	import uniBadge from '../uni-badge/uni-badge.vue'
	import {
		deleteSupnuevoCommodityCodigoMapSub
	} from '@/api/MyInfor.js'
	export default {
		name: 'UniListItem',
		components: {
			uniIcons,
			uniBadge
		},
		props: {
			title: {
				type: String,
				default: ''
			}, // 列表标题
			mapId: {
				type: Number,
				default: ''
			},
			note: {
				type: String,
				default: ''
			}, // 列表描述
			disabled: {
				// 是否禁用
				type: [Boolean, String],
				default: false
			},
			showArrow: {
				// 是否显示箭头
				type: [Boolean, String],
				default: true
			},
			showBadge: {
				// 是否显示数字角标
				type: [Boolean, String],
				default: false
			},
			showSwitch: {
				// 是否显示Switch
				type: [Boolean, String],
				default: false
			},
			switchChecked: {
				// Switch是否被选中
				type: [Boolean, String],
				default: false
			},
			badgeText: {
				// badge内容
				type: String,
				default: ''
			},
			badgeType: {
				// badge类型
				type: String,
				default: 'success'
			},
			thumb: {
				// 缩略图
				type: String,
				default: ''
			},
			showExtraIcon: {
				// 是否显示扩展图标
				type: [Boolean, String],
				default: false
			},
			extraIcon: {
				type: Object,
				default () {
					return {
						type: 'contact',
						color: '#000000',
						size: 20
					}
				}
			}
		},
		inject: ['list'],
		data() {
			return {
				isFirstChild: false
			}
		},
		mounted() {
			if (!this.list.firstChildAppend) {
				this.list.firstChildAppend = true
				this.isFirstChild = true
			}
		},
		methods: {
			deleteSubCodigo(mapId){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该条码',
				    success: function (res) {
				        if (res.confirm) {
				           deleteSupnuevoCommodityCodigoMapSub({
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
				this.$emit('click')
			},
			onSwitchChange(e) {
				this.$emit('switchChange', e.detail)
			}
		}
	}
</script>

<style>
	

	.uni-list-item {
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10px;
	}

	.uni-list-item__container {
		display: flex;
		flex-direction: row;
		padding: 10px;
		padding-left: 0;
		flex: 1;
		position: relative;
		justify-content: space-between;
		align-items: center;
		border-top-color: #c8c7cc;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-list-item--first {
		border-top-width: 0px;
	}

	.uni-list-item__content {
		display: flex;
		flex: 1;
		overflow: hidden;
		flex-direction: column;
		color: #3b4144;

	}

	.uni-list-item__content-title {
		font-size: 28rpx;
		color: #3b4144;
		overflow: hidden;
	}


	.uni-list-item__extra {
		width: 25%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.uni-list-item__icon {
		margin-right: 18rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

</style>
