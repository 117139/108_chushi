<template>
	<view class="gainIntegral">
		<!-- 获取积分 -->
		<view class="list_wrap area2">
			<image src="/static/images/hqjfbj.png" mode="aspectFill"></image>
			<view class="list_content flex_bet">
				<view class="">
					邀请好友送积分
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="content_text">
					<button open-type="share" class="share_wrap_btn"></button>
					去邀请
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="content_text" @click="$service.copy_fuc">
					去邀请
				</view>
				<!-- #endif -->
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="list_wrap area2">
			<image src="/static/images/hqjfbj.png" mode="aspectFill"></image>
			<view class="list_content flex_bet">
				<view class="">
					看视频送积分
				</view>
				<view class="content_text">
					去观看
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that = null
	let videoAd = null
	export default {
		data() {
			return {
				list:[],
			}
		},
		
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata']),
		},
		
		onShareAppMessage() {
			var up_id=that.loginDatas.id||''
			return {
				title: '招厨师群',
				path: '/pages/index/index?up_id='+up_id
			}
		},
		onLoad() {
			that=this
			// this.getCate()
		},
		methods: {
			// copy_fuc(){
			// 	uni.setClipboardData({
			// 		data: that.$service.share_H5,
			// 		success: function () {
			// 			console.log('success');
			// 			uni.showToast({
			// 				icon:'none',
			// 				title:'分享链接已复制到剪切板，快去分享'
			// 			})
			// 		}
			// 	});
			// },
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.list=[
						{
							mode:"邀请好友送积分",
							text:"去邀请"
						},
						{
							mode:"看视频送积分",
							text:"去观看"
						}
					]
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.gainIntegral{
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding-top: 52rpx;
	padding-bottom: 40rpx;
	.list_wrap{
		height: 146rpx;
		background: #ED4149;
		border-radius: 10rpx;
		margin-bottom: 40rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;
		}
		.list_content{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			padding: 0 22rpx 0 46rpx;
		}
		.content_text{
			min-width: 180rpx;
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
			background: #FFFFFF;
			border-radius: 34rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ED4149;
			position: relative;
		}
	}
}
</style>
