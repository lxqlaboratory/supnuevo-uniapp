<template>
	<view class="">
		<wyb-loading ref="loading"/>
		
			<uni-collapse>
				<uni-collapse-item v-for="(item, index) in codigoList" :key="index"   :title="item.codigo" :mapId="item.mapId">
					<uni-list>
						<view v-for="(list, listIndex) in item.codigoSubList" :key="listIndex" >
							<uni-list-item :title="list.codigoSub" :mapId="list.mapId"/>
						</view>
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
		
		<!-- <uni-collapse>
			<uni-collapse-item title="标题文字" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
				<text class="content">折叠内容主体，可自定义内容及样式</text>
			</uni-collapse-item>
			<uni-collapse-item title="标题文字" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png">
				<text class="content">折叠内容主体，可自定义内容及样式</text>
			</uni-collapse-item>
		</uni-collapse> -->
		<!-- <view class="countcomm">
			<image src="../../static/image/images/up.png" mode="" style="width: 64px;height: 64px;" class="countcomm" @click="confirmDialog"></image>
		</view> -->
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="请输入条码"  placeholder="请输入条码" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue' 
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		getSupnuevoCommodityCodigoMapCodigoList,
		addSupnuevoCommodityCodigoMap,
		deleteSupnuevoCommodityCodigoMapSub
	} from '@/api/MyInfor.js'
	export default {
		data() {
			return {
				unionId: '',
				codigoList: [],
			}
		},
		onNavigationBarButtonTap(){
			 this.confirmDialog();
		},
		onShow() {
			this.unionId = getApp().globalData.unionId;
			this.getSupnuevoCodigoList();
			console.log(this.codigoList)
		},
		onLoad() {
			this.unionId = getApp().globalData.unionId;
			this.getSupnuevoCodigoList();
			console.log(this.codigoList)
		},
		components: {
			uniCollapse,
			uniCollapseItem,
			uniList,
			uniListItem,
			wybLoading,
		},
		methods:{
			getSupnuevoCodigoList(){
				getSupnuevoCommodityCodigoMapCodigoList({
					unionId:this.unionId
				}).then(res =>{
					console.log(res)
					// this.codigoList = [];
					if (res.re === 1)
						this.codigoList = res.data
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			confirmDialog(){
				this.$refs.dialogInput.open()
			},
			dialogInputConfirm(done, val) {
				console.log(val);
				var that = this;
				var codigo = val;
				if (codigo !== '' && codigo !== null){
					addSupnuevoCommodityCodigoMap({
						codigo: codigo
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
										that.getSupnuevoCodigoList()
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
		},
	}
</script>

<style lang="scss" scoped>
	.countcomm {
		left: 10px;
		bottom: 10px;
		z-index: 1;
		position: fixed;
	}
	@import '~@/uni.scss';
	
	$list-item-pd: $uni-spacing-col-lg $uni-spacing-row-lg;
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
	.uni-list-item {
		font-size: $uni-font-size-lg;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		padding-left: $uni-spacing-row-lg;
	}
	
	.uni-list-item--disabled {
		opacity: 0.3;
	}
	
	.uni-list-item--hover {
		background-color: $uni-bg-color-hover;
	}
	
	.uni-list-item__container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: $list-item-pd;
		padding-left: 0;
		flex: 1;
		position: relative;
		justify-content: space-between;
		align-items: center;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}
	
	.uni-list-item--first {
		border-top-width: 0px;
	}
	
	.uni-list-item__content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		overflow: hidden;
		flex-direction: column;
		color: #3b4144;
	
	}
	
	.uni-list-item__content-title {
		font-size: $uni-font-size-base;
		color: #3b4144;
		overflow: hidden;
	}
	
	.uni-list-item__content-note {
		margin-top: 6rpx;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
		overflow: hidden;
	}
	
	.uni-list-item__extra {
		// width: 25%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
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
	
	.uni-list-item__icon-img {
		height: $uni-img-size-base;
		width: $uni-img-size-base;
	}
</style>
