<template>
	<view class="" >
		<wyb-loading ref="loading"/>
		<hans-tabber :list="list" style="position:fixed;bottom:0;width:100%;left:0;right:0;" @tabChange="tabChange"></hans-tabber>
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
				unionList: [],
				list: [{
						"pagePath": "../pages/price/modifyPrice",
						"iconPath": "../../static/image/tabBar/tab-cate.png",
						"selectedIconPath": "../../static/image/tabBar/tab-cate-current.png",
						"text": "改价"
					},
					{
						"pagePath": "../pages/sale/sale",
						"iconPath": "../../static/image/tabBar/news.png",
						"selectedIconPath": "../../static/image/tabBar/newsactive.png",
						"text": "收银"
					},
					{
						"pagePath": "../pages/stock/stock",
						"iconPath": "../../static/image/tabBar/news.png",
						"selectedIconPath": "../../static/image/tabBar/newsactive.png",
						"text": "进货"
					},
					{
						"pagePath": "../pages/my/my",
						"iconPath": "../../static/image/tabBar/me.png",
						"selectedIconPath": "../../static/image/tabBar/meactive.png",
						"text": "我的"
					},
					{
						"pagePath": "../pages/notice/notice",
						"iconPath": "../../static/image/tabBar/me.png",
						"selectedIconPath": "../../static/image/tabBar/meactive.png",
						"text": "公告"
					}
				]
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
			loginAfterOtherServerAuthed({
				loginName: username,
				password: password,
				motherServerSessionId: sessionId,
			}).then(res => {
				console.log(res)
				getAllVentasInfoFormNew().then(res => {
					console.log(res)
				})
			})
				
			
		},
		methods:{
			
		},
	}
</script>

<style>
</style>
