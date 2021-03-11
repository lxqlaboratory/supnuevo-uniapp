<script>
	export default {
		globalData: {
			FlashFrequency:'',
			root:'',
			username:'',
			unionMemberType:'',
			vueSessionId: '',
			unionId:'',
			unionNum:'',
			userType: '',
			personId: '',
			canAchievement: '',
			merchantId: '',
			priceModifyState: '',
			announcement: '',
			weightService: {},
			commodityClassList: [],
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
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "static/colorui/weui-extend.css";
	@import "static/colorui/icon.css";
	/* @import "static/colorui/uni.css"; */
</style>
