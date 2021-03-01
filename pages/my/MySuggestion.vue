<template>
	<view>
		<view class="Suggestion">
			<textarea class="SuggestionTex" v-model="placeholder" placeholder="如果您想要得到回复，请留下QQ"/>
		</view>
		<view class="" style="margin-top: 10px;justify-content: center;align-items: center;display:flex;" >
			<button type="primary" style="border-radius: 4px;background-color: #CAE1FF;width: 70px;font-size: 15px;color: black;" @click="subsuggestion">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		submitSupnuevoMerchantQuestionInfoMobile
	} from '@/api/login.js'
	export default {
		data() {
			return {
				 placeholder: '',
			}
		},
		methods: {
			subsuggestion(){
				var sugg = this.placeholder;
				if (sugg != '' && sugg != undefined){
					submitSupnuevoMerchantQuestionInfoMobile({
						 content: sugg
					}).then(res => {
						var errorMsg = res.message;
						if (errorMsg !== null && errorMsg !== undefined && errorMsg !== "") {
							uni.showModal({
								title: "提示",
								content: errMessage,
								showCancel: false,
							})
						}
						else {
							uni.showModal({
								title: "提示",
								content: "提交成功",
								showCancel: false,
								success: function (res) {
									if (res.confirm) {
										uni.navigateBack({
										    delta: 1
										});
									} 
								}
							})
							
						}
					}).catch(err => {
						uni.showModal({
							title: "提示",
							content: err,
							showCancel: false,
						})
					})
				}else {
					uni.showModal({
						title: "提示",
						content: "您没有填写任何信息",
						showCancel: false,
					})
				}
			}
		}
	}
</script>

<style>
	.Suggestion{
		margin-top: 30px;
		margin-left: 10px;
		margin-right: 10px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 6px;
		padding-bottom: 6px;
	}
	.SuggestionTex{
		margin: auto;
		height: 150px;
		font-size: 20px;
		border: #aaa 1px solid;
	}
</style>
