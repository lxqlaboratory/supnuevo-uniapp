<template>
	<view class="container">
		<form class="form1 row-form" @submit="" @reset="">
		 <view class="weui-form weui-cell"> 
		  <radio-group class="weui-form-item" @change="changename_990338"> 
		   <label v-for="(item, index) in radioItems3" class=""> 
		    <radio :value="item.value" class="weui-form-checkbox" />
		    <view class="weui-form-label"> 
		     <icon class="weui-icon-radio checked" v-if="item.checked"></icon> 
		     <icon class="weui-icon-radio" v-if="!item.checked"></icon> 
		     <view class="weui-form-text">
		      {{item.label}}
		     </view> 
		    </view> </label> 
		  </radio-group> 
		 </view>      
		</form>   
		
		<view class="" style="margin-top: 20px;">
			<text style="font-size: 20px;color: #1CBBB4;">IVA乘数：</text>
		</view>
		
		<view class="price" v-if="pricedicount.doubleORper == 1">
			<view class="priceNum" >
				<text>{{pricedicount.IVAprice1}}</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.IVAprice2}}</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.IVAprice3}}</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.IVAprice4}}</text>
			</view>
		</view>
		<view class="price" v-else-if="pricedicount.doubleORper == 2">
			<view class="priceNum" >
				<text>{{pricedicount.IVAprice1}}%</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.IVAprice2}}%</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.IVAprice3}}%</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.IVAprice4}}%</text>
			</view>
		</view>
		
		<view class="" style="margin-top: 20px;">
			<text style="font-size: 20px;color: #1CBBB4;">利润乘数:</text>
		</view>
		
		<view class="price" v-if="pricedicount.doubleORper == 1">
			<view class="priceNum">
				<text>{{pricedicount.profitprice1}}</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.profitprice2}}</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.profitprice3}}</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.profitprice4}}</text>
			</view>
		</view>
		<view class="price" v-else-if="pricedicount.doubleORper == 2">
			<view class="priceNum">
				<text>{{pricedicount.profitprice1}}%</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.profitprice2}}%</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.profitprice3}}%</text>
			</view>
			<view class="priceNum">
				<text>{{pricedicount.profitprice4}}%</text>
			</view>
		</view>
		
		
		<view class="savePrice" @click="savePrice">
			<text>确认存储</text>
		</view>
	</view>
</template>

<script>
	import {
		setCalculationStorageMobile
	} from '@/api/change.js'
export default {
	data(){
		return{
			username:'',
			check: true,
		pricedicount : {
			IVAprice1: '',
			IVAprice2: '',
			IVAprice3: '',
			IVAprice4: '',
			doubleORper: '',//1是浮点制，2是百分制
			profitprice1: '',
			profitprice2: '',
			profitprice3: '',
			profitprice4: ''
		},
		 radioItems3:[{"checked":true,"label":"使用浮点制 例：1.05         100*1.05=105","value":"1"},{"checked":false,"label":"使用百分制 例：5%            100+100*5%=105","value":"2"}],
		}
		},
	onLoad(){
		this.pricedicount.IVAprice1 = getApp().globalData.IVAprice1
		this.pricedicount.IVAprice2 = getApp().globalData.IVAprice2
		this.pricedicount.IVAprice3 = getApp().globalData.IVAprice3 
		this.pricedicount.IVAprice4 = getApp().globalData.IVAprice4
		this.pricedicount.doubleORper = getApp().globalData.doubleORper
		this.pricedicount.profitprice1 = getApp().globalData.profitprice1
		this.pricedicount.profitprice2 = getApp().globalData.profitprice2
		this.pricedicount.profitprice3 = getApp().globalData.profitprice3
		this.pricedicount.profitprice4 = getApp().globalData.profitprice4
		if (this.pricedicount.doubleORper == 1){
			this.radioItems3[0].checked = true;
			this.radioItems3[1].checked = false;
		}else {
			this.radioItems3[1].checked = true;
			this.radioItems3[0].checked = false;
		}
		this.username = getApp().globalData.username
		uni.setNavigationBarTitle({
		    title: 'supnuevo-'+this.username
		});
	},
	methods: {
		changename_990338: function (value) {
			if(value.detail){
				value = value.detail.value
			}
		    var radioItems3 = this.radioItems3;
		    for (var i = 0, len = radioItems3.length; i < len; ++i) {
		        radioItems3[i].checked = radioItems3[i].value == value;
				console.log(radioItems3[i].checked)
		    }
			if (this.pricedicount.doubleORper === 1){
				 this.pricedicount.doubleORper = 2;
				 this.pricedicount.IVAprice1 = ((this.pricedicount.IVAprice1 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.IVAprice2 = ((this.pricedicount.IVAprice2 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.IVAprice3 = ((this.pricedicount.IVAprice3 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.IVAprice4 = ((this.pricedicount.IVAprice4 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.profitprice1 = ((this.pricedicount.profitprice1 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.profitprice2 = ((this.pricedicount.profitprice2 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.profitprice3 = ((this.pricedicount.profitprice3 * 1000).toFixed(0) - 1000 )/ 10;
				this.pricedicount.profitprice4 = ((this.pricedicount.profitprice4 * 1000).toFixed(0) - 1000 )/ 10;
			}
				
			else {
				this.pricedicount.doubleORper = 1;
				this.pricedicount.IVAprice1 = (this.pricedicount.IVAprice1*10 + 1000) / 1000;
				this.pricedicount.IVAprice2 = (this.pricedicount.IVAprice2*10 + 1000) / 1000;
				this.pricedicount.IVAprice3 = (this.pricedicount.IVAprice3*10 + 1000) / 1000;
				this.pricedicount.IVAprice4 = (this.pricedicount.IVAprice4*10 + 1000) / 1000;
				this.pricedicount.profitprice1 = (this.pricedicount.profitprice1*10 + 1000) / 1000;
				this.pricedicount.profitprice2 = (this.pricedicount.profitprice2*10 + 1000) / 1000;
				this.pricedicount.profitprice3 = (this.pricedicount.profitprice3*10 + 1000) / 1000;
				this.pricedicount.profitprice4 =(this.pricedicount.profitprice4*10 + 1000) / 1000;
				
			}
		},
		changePrice1: function (value) {
			this.check = !this.check
			console.log(value.detail.value)
			this.pricedicount.doubleORper = value.detail.value
		},
		changePrice2: function (value) {
			this.check = !this.check
			console.log(value.detail.value)
			this.pricedicount.doubleORper = value.detail.value
		},
		savePrice (){
			setCalculationStorageMobile({
				doubleORper: this.pricedicount.doubleORper,
				IVAprice1: this.pricedicount.IVAprice1 + " ",
				IVAprice2: this.pricedicount.IVAprice2 + " ",
				IVAprice3: this.pricedicount.IVAprice3 + " ",
				IVAprice4: this.pricedicount.IVAprice4 + " ",
				profitprice1: this.pricedicount.profitprice1 + " ",
				profitprice2: this.pricedicount.profitprice2 + " ",
				profitprice3: this.pricedicount.profitprice3 + " ",
				profitprice4: this.pricedicount.profitprice4 + " ",
			}).then( res => {
				 var errorMsg = res.errorMsg;
				  if (errorMsg !== null && errorMsg !== undefined && errorMsg !== ""){
					  uni.showModal({
					  	title: "提示",
					  	content: errorMsg,
					  	showCancel: false,
					  })
				  }else {
					   if (res.message !== undefined && res.message !== null && res.message == "OK"){
						   getApp().globalData.IVAprice1 = this.pricedicount.IVAprice1
						   getApp().globalData.IVAprice2 = this.pricedicount.IVAprice2
						   getApp().globalData.IVAprice3 = this.pricedicount.IVAprice3
						   getApp().globalData.IVAprice4 = this.pricedicount.IVAprice4
						   getApp().globalData.doubleORper = this.pricedicount.doubleORper
						   getApp().globalData.profitprice1 = this.pricedicount.profitprice1
						   getApp().globalData.profitprice2 = this.pricedicount.profitprice2
						   getApp().globalData.profitprice3 = this.pricedicount.profitprice3
						   getApp().globalData.profitprice4 = this.pricedicount.profitprice4
						   uni.showModal({
						   	title: "提示",
						   	content: "存储成功",
						   	showCancel: false,
						   })
					   }
					
				  }
			}).catch(err => {
                 	
                 })				
		}
	}
	 
}
</script>

<style>
	.price {
		margin-top: 7px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 45px;
	}
	.priceNum {
		flex: 1;
		border: solid 1px;
		background-color: #007AFF;
		border-radius: 8px;
		margin-right: 10px;
		margin-left: 10px;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: white;
		display: flex;
	}
	.savePrice {
		width: 80%;
		margin: auto;
		height: 45px;
		font-size: 18px;
		color: white;
		margin-top: 30px;
		border-radius: 8px;
		background-color: #007AFF;
		align-items: center;
		display: flex;
		justify-content: center;
	}
</style>
