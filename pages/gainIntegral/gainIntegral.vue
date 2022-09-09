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
				<view class="content_text" @click="setad">
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
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata','loginDatas']),
		},
		
		onShareAppMessage() {
			var up_id=that.loginDatas.id||''
			
			if(up_id){
				that.getsharejf_fuc()
			}
			return {
				title: '招厨师群',
				imageUrl:that.basedata.share_index,
				path: '/pages/index/index?up_id='+up_id
			}
		},
		onLoad() {
			that=this
			// this.getCate()
			// #ifdef MP-WEIXIN
			if(that.basedata.key_2){
				if (wx.createRewardedVideoAd) {
					videoAd = wx.createRewardedVideoAd({
					  // adUnitId: 'adunit-06d5a767981630e7'
					  adUnitId: that.basedata.key_2||'adunit-06d5a767981630e7'
					})
					videoAd.onLoad(() => {})
					videoAd.onError((err) => {})
					videoAd.onClose((res) => {
						uni.hideLoading()
						that.getjf(res)
					})
				}
			  
			}
			// #endif
		},
		methods: {
			// 激励广告
			setad(){
				var that=this
				// 在页面中定义激励视频广告
				// 在页面onLoad回调事件中创建激励视频广告实例
				/* #ifdef MP-WEIXIN */
				
				
				
				uni.showLoading({
					mask:true,
					title:'正在加载广告'
				})
				setTimeout(function(){
					
						uni.hideLoading()
				},2000)
				// // 用户触发广告后，显示激励视频广告
				if (videoAd) {
				  videoAd.show().catch(() => {
				    // 失败重试
				    videoAd.load()
				      .then(() => videoAd.show())
				      .catch(err => {
								uni.hideLoading()
				        console.log('激励视频 广告显示失败')
				      })
				  })
				}else{
					if(that.basedata.key_2){
						if (wx.createRewardedVideoAd) {
							videoAd = wx.createRewardedVideoAd({
							  // adUnitId: 'adunit-06d5a767981630e7'
							  adUnitId: that.basedata.key_2||'adunit-06d5a767981630e7'
							})
							videoAd.onLoad(() => {})
							videoAd.onError((err) => {})
							videoAd.onClose((res) => {
								uni.hideLoading()
								that.getjf(res)
							})
						}
					  if (videoAd) {
					    videoAd.show().catch(() => {
					      // 失败重试
					      videoAd.load()
					        .then(() => videoAd.show())
					        .catch(err => {
					          console.log('激励视频 广告显示失败')
					        })
					    })
					  }
					}
					
				}
				/* #endif */
			},
			
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
