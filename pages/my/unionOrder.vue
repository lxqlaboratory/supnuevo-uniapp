<template>
	<view class="">
		<wyb-loading ref="loading"/>
		<view class="">
			<view class="" style="display: flex;flex-direction: row;">
				<view class="styleselect" v-if="select == 1" style="background-color: #39c7c8;color: #fff;" @click="getOrderRobList">
					<text>可抢订单</text>
				</view>
				<view class="styleselect" @click="changeselect(1)" v-if="select != 1">
					<text>可抢订单</text>
				</view>
				<view class="styleselect" v-if="select == 2" style="background-color: #39c7c8;color: #fff;border-left: 2px solid #9e9ca3;" @click="getOrderListOfDate(null,0,1)">
					<text>未确认订单</text>
				</view>
				<view class="styleselect" @click="changeselect(2)" v-if="select != 2" style="border-left: 2px solid #9e9ca3;">
					<text>未确认订单</text>
				</view>
				<view class="styleselect" v-if="select == 3" style="background-color: #39c7c8;color: #fff;border-left: 2px solid #9e9ca3;" @click="getOrderListOfDate(null,1,2)">
					<text>已确认订单</text>
				</view>
				<view class="styleselect" @click="changeselect(3)" v-if="select != 3" style="border-left: 2px solid #9e9ca3;">
					<text>已确认订单</text>
				</view>
				<view class="styleselect" v-if="select == 4" style="background-color: #39c7c8;color: #fff;border-left: 2px solid #9e9ca3;" @click="getOrderListOfDate(this.orderDate,2,3)">
					<text>已完成订单</text>
				</view>
				<view class="styleselect" @click="changeselect(4)" v-if="select != 4" style="border-left: 2px solid #9e9ca3;">
					<text>已完成订单</text>
				</view>
			</view>
			
			<view class="" v-if="select == 1">
				<view class="" v-if="robList.length == 0" style="margin-top: 15px;font-size: 18px;font-weight: bold;text-align: center;">
					<text>暂无相关订单</text>
				</view>
				<view class="" v-else v-for="(item,index) in robList" :key="index">
					<view class="" style="padding: 5px;background-color: #18B4ED;">
						<text>订单编号:&nbsp;&nbsp;{{item.orderNum}}</text>
					</view>
					<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
						<text>送货地址&nbsp;&nbsp;&nbsp;&nbsp;{{item.receiverAddr}}</text>
					</view>
					<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;margin-bottom: 20px;">
						<text>订单总价&nbsp;&nbsp;&nbsp;&nbsp;{{item.totalFeeFinal}}</text>
					</view>
					<view class="" style="border-bottom: 3px solid #04BE02;">
						<button type="primary" style="width: 200px;border-radius: 15px;background-color: #007AFF;margin-bottom: 15px;" @click="affirmCustomerOrder(item.orderId)">抢单</button>
					</view>
				</view>
			</view>
			
			<view class="" v-if="select == 2" style="margin-top: 5px;">
				<view class="" style="margin: auto;width: 350px;display: flex;flex-direction: row;border: 2px solid #5E00FF;border-radius: 50px;height: 45px;">
					<view class="noorder" v-if="deliver == 0" @click="getOrderListOfDate(null,0,1)">
						<text>自提订单</text>
					</view>
					<view class="noorderno" @click="changedeliver(0)" v-else>
						<text>自提订单</text>
					</view>
					<view class="noorder" v-if="deliver == 1" @click="getOrderListOfDate(null,0,1)">
						<text>配送订单</text>
					</view>
					<view class="noorderno" @click="changedeliver(1)" v-else>
						<text>配送订单</text>
					</view>
				</view>
				
				<view class="" v-if="notDealList.length == 0" style="margin-top: 15px;font-size: 18px;font-weight: bold;text-align: center;">
					<text>暂无相关订单</text>
				</view>
				
				<view class="" v-for="(item,index) in notDealList" :key="index" v-if="deliver == 0">
					<view class="" v-if="item.order.deliveryType == 1">
						<view class="" style="padding: 5px;background-color: #18B4ED;margin-top: 5px;">
							<text>订单编号:&nbsp;&nbsp;{{item.order.orderNum}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>提货时间&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.wiseSaleTime}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;margin-bottom: 20px;">
							<text>订单总价&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.totalFeeFinal}}</text>
						</view>
						<view class="" style="border-bottom: 3px solid #04BE02;">
							<button type="primary" style="width: 200px;border-radius: 15px;background-color: #007AFF;margin-bottom: 15px;" @click="affirmCustomerOrder(item.order.orderId)">接单</button>
						</view>
					</view>
				</view>
				
				<view class="" v-for="(item,index) in notDealList" :key="index" v-if="deliver == 1">
					<view class="" v-if="item.order.deliveryType == 0">
						<view class="" style="padding: 5px;background-color: #18B4ED;margin-top: 5px;">
							<text>订单编号:&nbsp;&nbsp;{{item.order.orderNum}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>送货地址&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverAddr}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;margin-bottom: 20px;">
							<text>订单总价&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.totalFeeFinal}}</text>
						</view>
						<view class="" style="border-bottom: 3px solid #04BE02;">
							<button type="primary" style="width: 200px;border-radius: 15px;background-color: #007AFF;margin-bottom: 15px;" @click="affirmCustomerOrder(item.order.orderId)">接单</button>
						</view>
					</view>
				</view>
			</view>
			
			<view class="" v-if="select == 3">
				<view class="" v-if="dealList.length == 0" style="margin-top: 15px;font-size: 18px;font-weight: bold;text-align: center;">
					<text>暂无相关订单</text>
				</view>
				<view class="" v-for="(item,index) in dealList" :key="index" v-else>
					<view class="" v-if="item.order.deliveryType == 0">
						<view class="" style="padding: 5px;background-color: #18B4ED;margin-top: 5px;">
							<text>订单编号:&nbsp;&nbsp;{{item.order.orderNum}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>客户手机号码&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobilePhone}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>订单类型&nbsp;&nbsp;&nbsp;&nbsp;商家送货</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>送货地址&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverAddr}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>接货人电话&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverPhone}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>接货人&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverName}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;margin-bottom: 15px;">
							<text>送货时间&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.wiseSaleTime}}</text>
						</view>
						<view class="" style="width: 90%;border: 1px solid #007AFF;border-radius: 10px;margin: auto;margin-top: 5px;">
							<view class="" style="text-align: center;padding: 5px;">
								<text>订单内容</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品名称</text>
								</view>
								<view class="Infororder1">
									<text>数量</text>
								</view>
								<view class="Infororder1">
									<text>价格</text>
								</view>
								<view class="Infororder1">
									<text>小计</text>
								</view>
							</view>
							<view class="Infororder" v-for="(item1,index1) in item.order.itemList" :key="index1"  @click="navigatorToDetail(item1)">
								<view class="Infororder1">
									<text>{{item1.nombre}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.amount}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.price}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.total}}</text>
								</view>
							</view>
							<view class="" style="text-align: center;padding: 5px;border: 2px solid #007AFF;">
								<text>账单小结</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品总数：{{item.order.totalAmount}}</text>
								</view>
								<view class="Infororder1">
									<text>优惠前总价：{{item.order.totalFee}}</text>
								</view>
							</view>
							<view class="" style="display: flex;flex-direction: row;padding: 5px;">
								<view class="Infororder1">
									<text>优惠金额：{{item.order.discountFee}}</text>
								</view>
								<view class="Infororder1">
									<text>应付款：{{item.order.totalFeeFinal}}</text>
								</view>
							</view>
						</view>

						<view class="" style="border-bottom: 3px solid #04BE02;margin-top: 10px;">
							<button type="primary" style="width: 200px;border-radius: 15px;background-color: #007AFF;margin-bottom: 15px;" @click="finishCustomerOrder(item.order.orderId)">结束订单</button>
						</view>
					</view>
					
					<view class="" v-if="item.order.deliveryType == 1">
						<view class="" style="padding: 5px;background-color: #18B4ED;margin-top: 5px;">
							<text>订单编号:&nbsp;&nbsp;{{item.order.orderNum}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>客户手机号码&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobilePhone}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>订单类型&nbsp;&nbsp;&nbsp;&nbsp;自提</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;margin-bottom: 20px;">
							<text>提货时间&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.wiseSaleTime}}</text>
						</view>
						<view class="" style="width: 90%;border: 1px solid #007AFF;border-radius: 10px;margin: auto;margin-top: 5px;">
							<view class="" style="text-align: center;padding: 5px;">
								<text>订单内容</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品名称</text>
								</view>
								<view class="Infororder1">
									<text>数量</text>
								</view>
								<view class="Infororder1">
									<text>价格</text>
								</view>
								<view class="Infororder1">
									<text>小计</text>
								</view>
							</view>
							<view class="Infororder" v-for="(item1,index1) in item.order.itemList" :key="index1"  @click="navigatorToDetail(item1)">
								<view class="Infororder1">
									<text>{{item1.nombre}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.amount}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.price}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.total}}</text>
								</view>
							</view>
							<view class="" style="text-align: center;padding: 5px;border: 2px solid #007AFF;">
								<text>账单小结</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品总数：{{item.order.totalAmount}}</text>
								</view>
								<view class="Infororder1">
									<text>优惠前总价：{{item.order.totalFee}}</text>
								</view>
							</view>
							<view class="" style="display: flex;flex-direction: row;padding: 5px;">
								<view class="Infororder1">
									<text>优惠金额：{{item.order.discountFee}}</text>
								</view>
								<view class="Infororder1">
									<text>应付款：{{item.order.totalFeeFinal}}</text>
								</view>
							</view>
						</view>
						<view class="" style="border-bottom: 3px solid #04BE02;margin-top: 10px;">
							<button type="primary" style="width: 200px;border-radius: 15px;background-color: #007AFF;margin-bottom: 15px;" @click="finishCustomerOrder(item.order.orderId)">结束订单</button>
						</view>
					</view>
				</view>
			</view>
			
			<view class="" v-if="select == 4">
				<view class="calendar-content" v-if="showCalendar">
					<view class="noorderno" @click="open">
						<image src="../../static/image/images/calendar.jpg" mode="" style="height: 50px;width: 50px;"></image>
					</view>
					<uni-calendar ref="calendar" :clear-date="true" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate" :range="info.range" @confirm="confirm" @close="close" />
				</view>
				<view class="" v-if="finishedList.length == 0" style="margin-top: 15px;font-size: 18px;font-weight: bold;text-align: center;">
					<text>暂无相关订单</text>
				</view>
				
				<view class="" v-for="(item,index) in finishedList" :key="index" v-else>
					<view class="" v-if="item.order.deliveryType == 0">
						<view class="" style="padding: 5px;background-color: #18B4ED;margin-top: 5px;">
							<text>订单编号:&nbsp;&nbsp;{{item.order.orderNum}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>客户手机号码&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobilePhone}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>订单类型&nbsp;&nbsp;&nbsp;&nbsp;商家送货</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>送货地址&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverAddr}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>接货人电话&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverPhone}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>接货人&nbsp;&nbsp;&nbsp;&nbsp;{{item.order.receiverName}}</text>
						</view>
						<view class="" style="width: 90%;border: 1px solid #007AFF;border-radius: 10px;margin: auto;margin-top: 5px;">
							<view class="" style="text-align: center;padding: 5px;">
								<text>订单内容</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品名称</text>
								</view>
								<view class="Infororder1">
									<text>数量</text>
								</view>
								<view class="Infororder1">
									<text>价格</text>
								</view>
								<view class="Infororder1">
									<text>小计</text>
								</view>
							</view>
							<view class="Infororder" v-for="(item1,index1) in item.order.itemList" :key="index1"  @click="navigatorToDetail(item1)">
								<view class="Infororder1">
									<text>{{item1.nombre}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.amount}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.price}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.total}}</text>
								</view>
							</view>
							<view class="" style="text-align: center;padding: 5px;border: 2px solid #007AFF;">
								<text>账单小结</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品总数：{{item.order.totalAmount}}</text>
								</view>
								<view class="Infororder1">
									<text>优惠前总价：{{item.order.totalFee}}</text>
								</view>
							</view>
							<view class="" style="display: flex;flex-direction: row;padding: 5px;">
								<view class="Infororder1">
									<text>优惠金额：{{item.order.discountFee}}</text>
								</view>
								<view class="Infororder1">
									<text>应付款：{{item.order.totalFeeFinal}}</text>
								</view>
							</view>
						</view>
					</view>
				
					<view class="" v-if="item.order.deliveryType == 1">
						<view class="" style="padding: 5px;background-color: #18B4ED;margin-top: 5px;">
							<text>订单编号:&nbsp;&nbsp;{{item.order.orderNum}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>客户手机号码&nbsp;&nbsp;&nbsp;&nbsp;{{item.mobilePhone}}</text>
						</view>
						<view class="" style="padding: 10px;border-bottom: 1px solid #BBBBBB;">
							<text>订单类型&nbsp;&nbsp;&nbsp;&nbsp;自提</text>
						</view>
						<view class="" style="width: 90%;border: 1px solid #007AFF;border-radius: 10px;margin: auto;margin-top: 5px;">
							<view class="" style="text-align: center;padding: 5px;">
								<text>订单内容</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品名称</text>
								</view>
								<view class="Infororder1">
									<text>数量</text>
								</view>
								<view class="Infororder1">
									<text>价格</text>
								</view>
								<view class="Infororder1">
									<text>小计</text>
								</view>
							</view>
							<view class="Infororder" v-for="(item1,index1) in item.order.itemList" :key="index1"  @click="navigatorToDetail(item1)">
								<view class="Infororder1">
									<text>{{item1.nombre}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.amount}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.price}}</text>
								</view>
								<view class="Infororder1">
									<text>{{item1.total}}</text>
								</view>
							</view>
							<view class="" style="text-align: center;padding: 5px;border: 2px solid #007AFF;">
								<text>账单小结</text>
							</view>
							<view class="Infororder">
								<view class="Infororder1">
									<text>商品总数：{{item.order.totalAmount}}</text>
								</view>
								<view class="Infororder1">
									<text>优惠前总价：{{item.order.totalFee}}</text>
								</view>
							</view>
							<view class="" style="display: flex;flex-direction: row;padding: 5px;">
								<view class="Infororder1">
									<text>优惠金额：{{item.order.discountFee}}</text>
								</view>
								<view class="Infororder1">
									<text>应付款：{{item.order.totalFeeFinal}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)
	
		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
	
		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	import {
		getSupnuevoCustomerOrderListOfDateByUnion,
		getSupnuevoCustomerOrderListOfUnionCanGrab,
		affirmCustomerOrder,
		finishCustomerOrder
	} from '@/api/MyInfor.js'
	import wybLoading from '@/components/wyb-loading/wyb-loading.vue'
	export default {
		data() {
			return {
				select: 1,
				robList: [],
				notDealList: [],
				dealList: [],
				finishedList: [],
				deliver: 0,
				unionId: '',
				merchantId: '',
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				orderDate: null,
			};
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), 0).fullDate
				this.info.startDate = getDate(new Date(), -2000).fullDate
				this.info.endDate = getDate(new Date(), 200).fullDate
				this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已打卡'
					}
				]
			}, 2000)
		},
		components: {
				wybLoading
		},
		onLoad() {
			// this.unionMemberType = getApp().globalData.unionMemberType;
			// this.root = getApp().globalData.root;
			this.unionId = getApp().globalData.unionId;
			this.merchantId = getApp().globalData.merchantId
			this.getOrderRobList();
			this.getOrderListOfDate(null,0,1);
		},
		methods:{
			changeselect(index){
				this.select = index;
				if (index === 1)
					this.getOrderRobList();
				else if (index === 2){
					 this.getOrderListOfDate(null,0,1);
				}else if (index === 3){
					 this.getOrderListOfDate(null,1,2);
				}else if (index === 4) {
					 this.getOrderListOfDate(this.orderDate,2,3);
				}
			},
			changedeliver(index){
				this.deliver = index;
				if (index === 0){
					 this.getOrderListOfDate(null,0,1);
				}else 
					this.getOrderListOfDate(null,0,1);
			},
			navigatorToDetail(form){
				uni.navigateTo({
					url: './OrderDetail?form='+encodeURIComponent(JSON.stringify(form))
				})
			},
			finishCustomerOrder(orderId){
				finishCustomerOrder({
					 orderId:orderId,
					 merchantId:this.merchantId,
				}).then(res => {
					if(res.re === 1){
						uni.showModal({
							title: "提示",
							content: "订单已完成",
							showCancel: false,
						})
					}
					this.getOrderListOfDate(null,1,2);
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
			},
			getOrderListOfDate(orderDate,orderState,orderType){
				this.$refs.loading.showLoading()
				getSupnuevoCustomerOrderListOfDateByUnion({
					orderDate: orderDate,
					unionId: this.unionId,
					orderState:orderState,
					merchantId:this.merchantId,
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						if (orderType === 1)
							this.notDealList = res.data;
						else if (orderType === 2)
							this.dealList = res.data;
						else this.finishedList = res.data
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
					this.$refs.loading.hideLoading() // 隐藏
			},
			getOrderRobList(){
				this.$refs.loading.showLoading()
				getSupnuevoCustomerOrderListOfUnionCanGrab({
					unionId: this.unionId
				}).then(res => {
					console.log(res)
					if (res.re === 1){
						this.robList = res.data
					}
				}).catch((err) => {
				uni.showModal({
					title: "提示",
					content: err,
					showCancel: false,
				})
				});	
				this.$refs.loading.hideLoading() // 隐藏
			},
			affirmCustomerOrder(orderId){
				var that = this;
				affirmCustomerOrder({
					orderId: orderId,
					merchantId: that.merchantId
				}).then(res => {
					if (res.re === 1){
						if (that.deliver === 1){
							uni.showModal({
								title: "提示",
								content: "抢单成功",
								showCancel: false,
								success:function(res){
									if (res.confirm){
										that.getOrderRobList();
										that.getOrderListOfDate(null,0,1);
									}
								}
							})
						}else {
							uni.showModal({
								title: "提示",
								content: "确认自提订单成功",
								showCancel: false,
								success:function(res){
									if (res.confirm)
									that.getOrderListOfDate(null,0,1);
								}
							})
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
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			confirm(e) {
				console.log('confirm 返回:', e)
				this.orderDate = e.fulldate;
				this.getOrderListOfDate(this.orderDate,2);
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
		},
	}
</script>

<style>
 .styleselect{
	 display: flex;
	 flex: 1;
	 justify-content: center;
	 align-items: center;
	 height: 45px;
	 border-bottom: 2px solid #9e9ca3;
	 border-top: 2px solid #9e9ca3;
	 font-size: 13px;
	 color: #9e9ca3;
 }
 .noorder {
	 flex: 1;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 border-radius: 50px;
	 background-color: #5E00FF;
	 color: white;
 }
 .noorderno {
	 flex: 1;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 border-radius: 50px;
 }
 .Infororder {
	 display: flex;
	 flex-direction: row;
	 justify-content: center;
	 align-items: center;
	 padding: 5px;
	 border-bottom: 1px solid #0081FF;
 }
 .Infororder1 {
	 display: flex;
	 flex: 1;
	 justify-content: center;
	 align-items: center;
 }
</style>
