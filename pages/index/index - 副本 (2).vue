<template>
	<view class="content ">
		<!-- 搜索框 -->
		<view class="header_search area flex_bet">
			<view class="header_address flex_cen" @tap="$sjuNav.navTo(`/pages/selectAddress/selectAddress`)">
				<text class="icon icon-dizhi address_icon"></text>
				<view class="">{{address}}</view>
			</view>
			<view class="input_wrap flex">
				<input class="uni-input" type="text" placeholder="请输入您要搜索的内容"
					placeholder-style="font-size: 28rpx;color: #CCCCCC;" v-model="value">
				<view class="icon icon-ic_search24px search_icon"></view>
			</view>
		</view>

		<!-- 主体内容 -->
		<view v-if="basedata.statement_1" class="words_box area2">{{basedata.statement_1}}</view>

		<!-- <view class="advertisement_wrap area2">
			<image :src="imgUrl" mode="aspectFill"></image>
			<view class="advertisement_text">
				广告
			</view>
		</view> -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="advertisement_wrap area2">
			<ad class="advertisement_wrap area2" unit-id="adunit-5c7042d2485a2640"></ad>
		</view>
		<!-- #endif -->
		<!-- ad -->
		<view class="notice area2 flex_bet" @tap="$sjuNav.navTo(`/pages/announcement/announcement`)">
			<image src="/static/images/ptgg.png" mode="aspectFit"></image>
			<swiper class="swiper_wrap" :autoplay="true" :interval="3000" :duration="1000" circular vertical>
				<swiper-item v-for="(item,index) in noticeText" :key="index">
					<view class="swiper-item">{{item.title}}</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="big_box area2">
			<view class="tabs_wrap flex">
				<view :class="current==index?'tabs_active':'tabs'" v-for="(item,index) in tabs" :key="index"
					@tap="current=index">
					{{item.title}}
				</view>
			</view>

			<view class="list_box" v-for="(item,index) in datas" :key="index"  @tap="$sjuNav.navTo(`/pages/orderDetails/orderDetails`)">
				<view class="list_header flex_bet">
					<view class="list_header_l flex_ali">
						<image v-if="item.img_arr.length>0" :src="item.img_arr" mode="aspectFill"></image>
						<view class="list_header_text">
							<view class="">
								{{item.userName}}
							</view>
							<view class="list_header_time">
								{{item.time}}
							</view>
						</view>
					</view>
					<view class="istop">
						置顶
					</view>
				</view>
				<view class="words_text">
					<view v-html="item.contentText"></view>
					<view class="detailed_text flex_cen">
						详情<text class="icon icon-youjiantou detailed_icon"></text>
					</view>
				</view>

				<view class="img_list flex">
					<view class=" " v-for="(item,index2) in item.imgUrl" :key="index2">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="list_botm flex_bet">
					<view class=" flex_ali">
						<text class="icon icon-dizhi add_icon"></text>
						<view class="">
							{{item.address}}
						</view>
					</view>
					<view class="range">
						距离{{item.rangeNum}}km
					</view>
				</view>
				
				<!-- #ifdef MP-WEIXIN -->
				<view class="advertisement_wrap area2" v-if="index>0 && index%banner_interval==0	">
					<!-- <ad class="advertisement_wrap area2" unit-id="adunit-5c7042d2485a2640"></ad> -->
				</view>
				<!-- #endif -->
				
			</view>
			<!-- <view class="advertisement_wrap2">
				<image :src="imgUrl2" mode="aspectFill"></image>
				<view class="advertisement_text">
					广告
				</view>
			</view> -->
		</view>
		<view class="botm_img flex_dir">
			<image src="/static/images/hb.png" mode="aspectFit"></image>
			<!-- #ifdef MP-WEIXIN -->
			<image src="/static/images/hqjf.png" mode="aspectFit" @click="setad"></image>
			<!-- #endif -->
		</view>
		<view class="botm_img1 flex_dir">
			<image src="/static/images/wyzq2.png" mode="aspectFit" @click="jump_fuc('/pages/makeMoney/makeMoney')"></image>
			<!-- #ifdef MP-WEIXIN -->
			<image src="/static/images/sj.png" mode="aspectFit" @click="setad"></image>
			<!-- #endif -->
		</view>
		<tab-list pageurl="/pages/index/index"></tab-list>
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
				address: "北京市", //定位地址
				value: '', //头部搜索框
				wordsText: ``,
				imgUrl: "/static/images/ggt.png", //广告图片
				imgUrl2: "/static/images/jhs.png", //广告图片
				noticeText: [ //平台公告
					
				],
				list: [],
				
				
				tabs: [],
				current: 0,
				datas:[],
				page:1

			}
		},
		
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata']),
		},
		onLoad() {
			that=this
			that.getnotice()
			that.gettype()
			// #ifdef MP-WEIXIN
			if (wx.createRewardedVideoAd) {
			  videoAd = wx.createRewardedVideoAd({
			    adUnitId: 'adunit-06d5a767981630e7'
			  })
			  videoAd.onLoad(() => {})
			  videoAd.onError((err) => {})
			  videoAd.onClose((res) => {})
			}
			// #endif
			
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			setad(){
				// 在页面中定义激励视频广告
				// 在页面onLoad回调事件中创建激励视频广告实例
				/* #ifdef MP-WEIXIN */
				
				
				// // 用户触发广告后，显示激励视频广告
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
				/* #endif */
			},
			//公告
			getnotice(){
				var jkurl='/index/notice'
				var datas={}
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						
						that.noticeText=datas.data
					} else {
					
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			
			//分类
			gettype(){
				var jkurl='/index/sub_classify'
				var datas={}
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						
						that.tabs=datas
						that.onRetry()
					} else {
					
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			onRetry(){
				that.page=1
				that.datas=[]
				that.getdatas()
				
			},
			
			getdatas(){
				// return
				uni.showLoading({
						mask:true,
						title:'正在获取数据'
				})
				var jkurl='/index/lists'
				var datas={
					page:that.page,
					pid:that.tabs[that.current].id||'',
					lat:that.my_address.lat||'',
					lng:that.my_address.lng||''
				}
				var nowpage=that.page
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						
						if(nowpage==1){
							that.datas=datas.data
						}else{
							that.datas=that.datas.concat(datas.data)
						}
						if(datas.data.length==0){
							return
						}
						that.page++
					} else {
					
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			jump_fuc(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		padding-top: 100rpx;
		padding-bottom: 40rpx;
		position: relative;

		.header_search {
			height: 100rpx;
			background-color: #ED4149;
			font-size: 28rpx;
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 9;

			.header_address {
				color: #ffffff;

				.address_icon {
					font-size: 34rpx;
					margin-right: 10rpx;
				}
			}

			.input_wrap {
				width: 540rpx;
				height: 64rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				padding: 0 20rpx;
				align-items: center;

				input {
					width: 100%;
					height: 100%;
				}

				.search_icon {
					font-size: 36rpx;
					color: #BBBBBB;
					margin-left: 10rpx;
				}
			}
		}

		.words_box {
			height: auto;
			line-height: 40rpx;
			background: #BBBBBB;
			border-radius: 10rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			padding: 14rpx 28rpx;
			margin-top: 20rpx;
		}

		.advertisement_wrap {
			height: 286rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}

			.advertisement_text {
				width: 70rpx;
				height: 38rpx;
				line-height: 38rpx;
				text-align: center;
				background: #000000;
				background-color: rgba(0, 0, 0, 0.4);
				border-radius: 10rpx 0px 10rpx 0px;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(225, 225, 225, 0.7);
				position: absolute;
				top: 0;
				left: 0;

			}
		}
		.advertisement_wrap2 {
			width: 646rpx;
			height: 266rpx;
			border-radius: 10rpx;
			margin: 28rpx auto;
			position: relative;
		
			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		
			.advertisement_text {
				width: 70rpx;
				height: 38rpx;
				line-height: 38rpx;
				text-align: center;
				background: #000000;
				background-color: rgba(0, 0, 0, 0.4);
				border-radius: 10rpx 0px 10rpx 0px;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(225, 225, 225, 0.7);
				position: absolute;
				top: 0;
				left: 0;
		
			}
		}
		// 平台公告
		.notice {
			// min-height: 68rpx;
			// height: auto;
			height: 68rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 0 22rpx;
			margin-top: 20rpx;

			image {
				width: 112rpx;
				height: 28rpx;
			}

			.swiper_wrap {
				width: 100%;
				height: 100%;
				overflow: hidden;
				margin-left: 22rpx;
			}

			.swiper-item {
				line-height: 68rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				// text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.big_box {
			height: auto;
			background-color: #fff;
			border-radius: 10rpx;
			margin-top: 22rpx;
			overflow: hidden;

			.tabs_wrap {
				width: 100%;
				height: 74rpx;
				border-bottom: 1px solid #EEEEEE;
				align-items: center;
				padding: 0 22rpx;

				.tabs {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-right: 68rpx;
				}

				.tabs_active {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ED4149;
					margin-right: 68rpx;
					position: relative;

					&::after {
						content: '';
						width: 108rpx;
						height: 6rpx;
						background: #ED4149;
						border-radius: 4rpx;
						position: absolute;
						bottom: -14rpx;
						left: 50%;
						transform: translate(-50%, 0);
					}
				}
			}

			.list_box {
				border-bottom: 1px solid #EEEEEE;
				padding: 28rpx 24rpx 0 24rpx;

				// &:last-child {
				// 	border-bottom: none;
				// }

				.list_header {
					width: 100%;
					height: 72rpx;
					position: relative;
					margin-bottom: 14rpx;
				}

				.list_header_l {
					image {
						width: 72rpx;
						height: 72rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}

					.list_header_text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;

						.list_header_time {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-top: 8rpx;
						}
					}
				}

				.istop {
					width: 70rpx;
					height: 36rpx;
					line-height: 36rpx;
					text-align: center;
					background: #FF6000;
					border-radius: 6rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					top: 0;
					right: 0;
				}

				.words_text {
					width: 100%;
					height: 80rpx;
					line-height: 40rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin: 20rpx 0;
					overflow: hidden;
					position: relative;

					.detailed_text {
						width: 98rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 30rpx;
						color: #0099FF;
						position: absolute;
						bottom: 0;
						right: 0;
						background-color: #fff;

						.detailed_icon {
							font-size: 12rpx;
						}
					}
				}

				.img_list {
					width: 100%;
					height: 156rpx;

					image {
						width: 156rpx;
						height: 156rpx;
						margin-right: 6rpx;

						// &:nth-last-child() {
						// 	margin-right: 0;
						// }
					}
				}
				.list_botm{
					width: 100%;
					height: 78rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					.add_icon{
						color: #DDDDDD;
						font-size: 34rpx;
						margin-right: 10rpx;
					}
					.range{
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FF6600;
						opacity: .8;
					}
				}
				
				
			}
		}
		
		.botm_img{
			position: fixed;
			// bottom: 32rpx;
			bottom: calc(var(--window-bottom) + 132rpx);
			right: 10rpx;
			image:nth-child(1){
				width: 102rpx;
				height: 124rpx;
			}
			image:nth-child(2){
				width: 124rpx;
				height: 110rpx;
			}
		}
		.botm_img1{
			position: fixed;
			// bottom: 32rpx;
			bottom: calc(var(--window-bottom) + 132rpx);
			left: 10rpx;
			image:nth-child(1){
				width: 138rpx;
				height: 120rpx;
			}
			image:nth-child(2){
				width: 116rpx;
				height: 130rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
