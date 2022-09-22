<template>
	<view class="content " :style="'padding-top: calc(100rpx + '+CustomBar+'px)'">
		<!-- 搜索框 -->
		<view v-if="is_black==1" class="header_search">
			<topbar bg_color="#ED4149">
				<text style="color: #fff;"></text>
				<text style="color: #fff;"></text>
				<text style="color: #fff;"></text>
			</topbar>
		</view>
		<block v-else>
			<!-- 搜索框 -->
			<view class="header_search">
				<topbar bg_color="#ED4149">
					<text style="color: #fff;"></text>
					<text style="color: #fff;">{{basedata.index_title||'厨师招聘'}}</text>
					<text style="color: #fff;"></text>
				</topbar>
				<view class="top_box  area flex_bet">
					<view class="header_address  oh1" @tap="$sjuNav.navTo(`/pages/selectAddress/selectAddress`)">
						<text class="icon icon-dizhi address_icon"></text>
						<text class="">{{my_address?my_address.city:'选择城市'}}</text>
					</view>
					<view class="input_wrap flex">
						<input class="uni-input" type="text" placeholder="请输入您要搜索的内容"
							placeholder-style="font-size: 28rpx;color: #CCCCCC;" v-model="value" @confirm="onRetry">
						<view class="icon icon-ic_search24px search_icon" @click="onRetry"></view>
					</view>
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
			<!-- #ifdef H5 -->
			<view class="swiper_box" style="margin-top: 20rpx;">
				<!-- <u-swiper :list="bannerList" keyName="img" indicator indicatorActiveColor="#F5574B" indicatorInactiveColor="#FFFFFF"
					indicatorMode="dot" circular interval="5000" imgMode="aspectFill" height="318rpx"></u-swiper> -->
					<swiper class="swiper_banner" :autoplay="true" :interval="3000" :duration="1000" circular :indicator-dots="true" indicator 
						indicator-active-color="#F5574B" indicator-color="#FFFFFF">
						<swiper-item v-for="(item,index) in bannerList" :key="index">
							<image @click="go_url(item)" :src="$service.getimg(item.img)" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="basedata.key_1" class="advertisement_wrap area2">
				<ad class="advertisement_wrap area2" :unit-id="basedata.key_1"></ad>
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
						@tap="set_list(index)">
						{{item.title}}
					</view>
				</view>
				<view class="data_null" v-if="datas.length==0">
					暂无数据
				</view>
				<block  v-for="(item,index) in datas" :key="index">
				<view class="list_box"  @click="$service.jump" :data-url="'/pages/orderDetails/orderDetails?id='+item.id">
					<view class="list_header flex_bet">
						<view class="list_header_l flex_ali">
							<image v-if="item.user" :src="$service.getimg(item.user.img)" mode="aspectFill"></image>
							<view class="list_header_text">
								<view v-if="item.user" class="">
									{{item.user.nick}}
								</view>
								<view class="list_header_time">
									{{item.update_time}}
								</view>
							</view>
						</view>
						<view class="istop" v-if="item.is_top==1">
							置顶
						</view>
					</view>
					<view class="words_text oh2">
						{{$service.LNum(item.content,35)}}
						<!-- <text class="detailed_text ">详情</text> -->
						<view class="detailed_text ">
							详情<text class="icon icon-youjiantou detailed_icon"></text>
						</view>
					</view>

					<view v-if="item.img_arr.length>0" class="img_list flex">
						<view class="img_li" v-for="(item1,index2) in item.img_arr" :key="index2">
							<image lazy-load="true" :src="$service.getimg(item1)" mode="aspectFill"></image>
						</view>
					</view>
					<view class="list_botm flex_bet">
						<view class=" flex_ali">
							<text class="icon icon-dizhi add_icon"></text>
							<view class="add_box oh1">
								{{item.address}}
							</view>
						</view>
						<view class="range">
							距离{{$service.getKm(item.distance)}}
						</view>
					</view>
					
					
					
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<block  v-if="basedata.key_1">
					<view class="advertisement_wrap2" v-if="index>0 && index%basedata.banner_interval==0	">
						<ad class="advertisement_wrap area2" :unit-id="basedata.key_1"></ad>
					</view>
				</block>
				<!-- #endif -->
				</block>
				<!-- <view class="advertisement_wrap2">
					<image :src="imgUrl2" mode="aspectFill"></image>
					<view class="advertisement_text">
						广告
					</view>
				</view> -->
			</view>
			<view class="botm_img flex_dir">
				<!-- #ifdef H5 -->
				<image v-if="basedata.is_yaoqing==1" @click="$service.copy_fuc" src="/static/images/hb.png" mode="aspectFit"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view v-if="basedata.is_yaoqing==1" class="" style="position: relative;">
					<button open-type="share" class="share_wrap_btn"></button>
					<image src="/static/images/hb.png" mode="aspectFit"></image>
				</view>
				<image  v-if="basedata.key_2" src="/static/images/hqjf.png" mode="aspectFit" @click="setad"></image>
				<!-- #endif -->
			</view>
			<view class="botm_img1 flex_dir">
				<image v-if="basedata.is_zuanqian==1" src="/static/images/wyzq2.png" mode="aspectFit" @click="jump_fuc('/pages/makeMoney/makeMoney')"></image>
				<!-- #ifdef MP-WEIXIN -->
				<!-- <image src="/static/images/sj.png" mode="aspectFit" @click="setad"></image> -->
				<view class="f_ad" v-if="basedata.key_4">
					<ad-custom  class="f_ad_ad" :unit-id="basedata.key_4" style="width: 140rpx;min-height: 130rpx;"  ></ad-custom>
				</view>
				<!-- #endif -->
			</view>
			<tab-list pageurl="/pages/index/index"></tab-list>
		</block>
		
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
				CustomBar: this.CustomBar,
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
				page:1,
				is_black:1,
				bannerList:[]

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
				title: that.basedata.index_title||'厨师群',
				imageUrl:that.basedata.share_index,
				path: '/pages/index/index?up_id='+up_id
			}
		},
		
		onLoad(e) {
			that=this
			if(e.pid){
				console.log('e.pid------------------')
				console.log(e.pid)
				uni.setStorageSync('up_id',e.pid)
			}
			if(e.up_id){
				console.log('e.pid------------------------------------')
				console.log(e.up_id)
				uni.setStorageSync('up_id',e.up_id)
			}
			// e.scene='pid%3D5'
			if(e.scene){
				const scene = decodeURIComponent(e.scene)
				console.log(scene)
				var arr=scene.split('=')
				console.log(scene)
				var obj = {};
				obj[arr[0]] = arr[1]
				// this.uid = obj.user_id
				uni.setStorageSync('up_id',obj.pid)
			}
			
			// that.getadvert()
			that.getnotice()
			that.gettype()
			
			
			uni.$emit('getbasedata', {
				title: ' 刷新信息 ',
				content: 'item.id'
			});
			uni.$on('set_index_add', (data) => {
					that.onRetry()
			})
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
						that.getjf(res)
					})
				}
			  
			}
			// #endif
		},
		onshow(){
			if(that.basedata.index_title){
				uni.setNavigationBarTitle({
					title:that.basedata.index_title
				})
			}
			
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			go_url(item){
				if(item.is_link==1){
					if(item.link_url){
						
						window.open(item.link_url)
					}
				}
			},
			set_list(index){
				that.current=index
				that.onRetry()
			},
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
			//banner
			getbanner(){
				var jkurl='/index/banner'
				var datas={}
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					// console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// console.log(res)
						
						that.bannerList=datas
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
			
			//公告
			getnotice(){
				var jkurl='/index/notice'
				var datas={}
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					// console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// console.log(res)
						
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
					// console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// console.log(res)
						that.is_black=res.black
						if(res.black==1){
							return
						}
						that.getbanner()
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
					title:that.value,
					pid:that.tabs[that.current].id||'',
					lat:that.my_address.latitude||'',
					lng:that.my_address.longitude||''
				}
				var nowpage=that.page
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					// console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// console.log(res)
						
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
			background-color: #ED4149;
			font-size: 28rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 900;

			.top_box{
				width: 100%;
				padding: 0 28rpx;
				height: 100rpx;
				box-sizing: border-box;
				.header_address {
					min-width: 180rpx;
					// min-width: 180rpx;
					max-width: 250rpx;
					color: #ffffff;
					line-height: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
					.address_icon {
						font-size: 34rpx;
						margin-right: 10rpx;
					}
				}
				
				.input_wrap {
					// width: 540rpx;
					flex:1;
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
			// max-height: 286rpx;
			min-height: 100rpx;
			// min-height: 100rpx;
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
			// height: 266rpx;
			// height: 286rpx;
			min-height: 100rpx;
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
					max-height: 80rpx;
					line-height: 40rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					// margin: 20rpx 0;
					margin-top: 20rpx;
					// overflow: hidden;
					position: relative;
					text{
						font-size: 30rpx;
						color: #0099FF;
					}
					.detailed_text{
						height: 40rpx;
						font-size: 30rpx;
						color: #0099FF;
						position: absolute;
						bottom: 0;
						right: 0;
						background: #fff;
					}
				}

				.img_list {
					width: 100%;
					// height: 156rpx;
					flex-wrap: wrap;
					margin-top: 20rpx;
					.img_li{
						width: 25%;
						padding: 6rpx;
						height: 162rpx;
						image {
							width: 100%;
							height: 100%;
						
							// &:nth-last-child() {
							// 	margin-right: 0;
							// }
						}
					}
					
				}
				.list_botm{
					width: 100%;
					padding: 20rpx 0;
					// height: 78rpx;
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
					.add_box{
						width: 400rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 36rpx;
						height: 36rpx;
					}
				}
				
				
			}
		}
		
		.botm_img{
			position: fixed;
			// bottom: 32rpx;
			bottom: calc(var(--window-bottom) + 202rpx);
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
			bottom: calc(var(--window-bottom) + 202rpx);
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
			.f_ad{
				width: 116rpx;
				min-height: 130rpx;
				margin-top: 20rpx;
				// .f_ad_ad{
				// 	width: 116rpx!important;
				// 	height: 130rpx!important;
				// }
			}
		}
	}
	.swiper_box{
		width: 100%;
		padding:10rpx 30rpx;
		.swiper_banner{
			width: 100%;
			height: 300rpx;
			image{
				width: 100%;
				height: 300rpx;
			}
		}
	}
</style>
