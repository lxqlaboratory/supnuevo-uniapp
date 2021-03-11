<template>
	<view class="container" >
		<view>
			<wyb-loading ref="loading"/>
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(it, index) in ventasInfoList" :key="index">
					<view class="venimg"  @click="navigatorCompanyInfo(it,$event)">
						<image :src="it.img" style="height: 100px;background-color: white;border-style:ridge;" mode="aspectFit"></image>
					</view>
					<template v-slot:right>
						<view class="slot-button" @click="navigatorVentasDetail(it)">
							<view>
								<text class="slot-button-text" >详</text>
							</view>
							<view>
								<text class="slot-button-text" >情</text>
							</view>
						</view>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<hans-tabber :list="list" style="position:fixed;bottom:0;width:100%;left:0;right:0;"></hans-tabber>
		</view>
	</view>
</template>

<script>
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	import hansTabber from '../../components/hans-tabbar/hans-tabbar.vue'
	import {
		getSupnuevoBuyerUnionList,
		loginAfterOtherServerAuthed,
		getAllVentasInfoFormNew
	} from '@/api/stock.js'
	export default {
		data(){
			return{
				ventasInfoList: [
					{
						img: "../../static/image/images/kele.jpg",
					},
					{
						img: "../../static/image/images/xuebi.jpg",
					},
					{
						img: "../../static/image/images/tiantianquan.jpg",
					},
					{
						img: "../../static/image/images/shuiguo.jpg",
					}
					],
				list: [{
				"pagePath": "../../pages/price/modifyPrice",
				"iconPath": "../../static/image/tabBar/chang1.png",
				"selectedIconPath": "../../static/image/tabBar/chang2.png",
				"text": "改价"
			},
			{
				"pagePath": "../../pages/sale/sale",
				"iconPath": "../../static/image/tabBar/price2.png",
				"selectedIconPath": "../../static/image/tabBar/price1.png",
				"text": "收银"
			},
			{
				"pagePath": "../../pages/stock/stock",
				"iconPath": "../../static/image/tabBar/stock1.png",
				"selectedIconPath": "../../static/image/tabBar/stock2.png",
				"text": "进货"
			},
			{
				"pagePath": "../../pages/my/my",
				"iconPath": "../../static/image/tabBar/my1.png",
				"selectedIconPath": "../../static/image/tabBar/my2.png",
				"text": "我的"
			},
			{
				"pagePath": "../../pages/notice/notice",
				"iconPath": "../../static/image/tabBar/notice1.png",
				"selectedIconPath": "../../static/image/tabBar/notice2.png",
				"text": "公告" 
			}
			],
			}
		},
		components:{
				hansTabber,
				wybLoading
		        },
		onShow() {
			uni.setNavigationBarTitle({
				title: "已登录的供应商"
			});
			let sessionId = getApp().globalData.vueSessionId;
			let password = getApp().globalData.password;
			let username = getApp().globalData.username;
			//服务器出现问题
			// loginAfterOtherServerAuthed({
			// 	loginName: username,
			// 	password: password,
			// 	motherServerSessionId: sessionId,
			// }).then(res => {
			// 	console.log(res)
			// 	if (res.re == 1){
			// 		getAllVentasInfoFormNew().then(res => {
			// 			console.log(res)
			// 			if (res.message !== null && res.message !== undefined && res.message!== '') {
			// 			     uni.showModal({
			// 			     	title: "提示",
			// 			     	content: "没有数据",
			// 			     	showCancel: false,
			// 			     }) 
			// 				 return;
			// 			}else {
			// 				  if (res.listVentas !== undefined && res.listVentas !== null) {
			// 						if (res.listVentas === []) {
			// 							setTimeout(()=> {
			// 								uni.showModal({
			// 									title: "提示",
			// 									content: "no data",
			// 									showCancel: false,
			// 								}) 
			// 							},1000)
			// 							return;
			// 						}
			// 						this.ventasInfoList = res.listVentas;
			// 					}
			// 			}
			// 		})
			// 	}
			// })
			
		},
		methods:{
			navigatorVentasDetail(item){
				uni.navigateTo({
					 url: 'VentasDetail?item='+item+''
				})
			},
			navigatorCompanyInfo(it,e){
				console.log(123)
				let form = {
					ventasInfo: it,
					username: this.username,
					sessionId: this.sessionId,
					password: this.password,
				}
				uni.navigateTo({
					url: 'CompanyInfo'
				})
			},
		},
	}
</script>

<style>
	.container {
		position: fixed;
		height: 100%;
		bottom: 0;
		width: 100%;
		background-size: cover;
		background-position: center;
		background-color: #f0f0f0;
	}
	.venimg {
		display: flex;
		margin: 0 auto;
		padding: 15px;
		justify-content: center;
		align-items: center;
		height: 100px;
		margin-top: 15px;
	}
	.slot-button {
		background-color: #ff5a5f;
		height: 100px;
		font-size: 18px;
		color: white;
		margin-top: 15px;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		width: 40px;
	}
</style>
