<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view>
			<uni-collapse ref="add" class="warp">
				<uni-collapse-item v-for="(item, index) in codigoList" :key="index" :open="item.open" :show-animation="true" :disabled="item.disabled" :title="item.codigo" :mapId="item.mapId">
					<uni-list>
						<view v-for="(list, listIndex) in item.codigoSubList" :key="listIndex" >
							<uni-list-item :title="list.codigoSub" :mapId="list.mapId"/>
						</view>
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="countcomm">
			<image src="../../static/image/images/up.png" mode="" style="width: 64px;height: 64px;" class="countcomm" @click="confirmDialog"></image>
		</view>
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
		addSupnuevoCommodityCodigoMap
	} from '@/api/MyInfor.js'
	export default {
		data() {
			return {
				unionId: '',
				codigoList: [],
			}
		},
		onShow() {
			this.$refs.loading.showLoading()
			this.unionId = getApp().globalData.unionId;	
			this.getSupnuevoCodigoList();
			this.$refs.loading.hideLoading() // 隐藏
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

<style>
	.countcomm {
		left: 10px;
		bottom: 10px;
		z-index: 1;
		position: fixed;
	}
</style>
