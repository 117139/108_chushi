<template>
	<view class="">
		<view v-if="datas" class="orderDetails bottom-of-page">
			<!-- 订单 的 详情 -->
			<view class="list_header area2 flex_bet">
				<view v-if="datas.user" class="list_header_l flex_ali">
					<image :src="$service.getimg(datas.user.img)" mode="aspectFill"></image>
					<view class="list_header_text">
						<view class="">
							{{datas.user.nick}}
						</view>
						<view class="list_header_time">
							{{datas.update_time}}
						</view>
					</view>
				</view>
				<view class="istop" v-if="datas.is_top==1">
					置顶
				</view>
			</view>
			<view class="two_line area flex_bet">
				<view class=" flex_ali">
					<text class="icon icon-dizhi address_icon"></text>
					<view class="add_box oh1">
						{{datas.address}}
					</view>
				</view>
				<view class="range_num">
					距离{{$service.getKm(datas.distance)}}
				</view>
			</view>

			<view class="content_text area">{{datas.content}}</view>
			<view class="img_wrap flex">
				<view class="img_li" v-for="(item,index) in datas.img_arr" :key="index">
					<image :src="$service.getimg(item)" mode="aspectFill" @tap="imgClick(item,index)" lazy-load="true"></image>
				</view>
				
			</view>

			<view class="report_text flex_ali" @tap="$service.jump" :data-url="'/pages/tipOff/tipOff?id='+options.id">
				<text class="icon icon-jubao2"></text>
				<view>举报</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="basedata.key_1" class="advertisement_wrap area2">
				<!-- <image :src="imgUrl2" mode="aspectFill"></image>
				<view class="advertisement_text">
					广告
				</view> -->
				<ad class="advertisement_wrap area2" :unit-id="basedata.key_1"></ad>
			</view>
			<!-- #endif -->
			<view class="botm_btn bottom-button flex_aro">
				<!-- #ifdef MP-WEIXIN -->
				<view class="share_wrap flex_cen">
					<button open-type="share" class="share_wrap_btn"></button>
					<text class="icon icon-fenxiang"></text>
					<view class="">
						分享好友
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="share_wrap flex_cen" @click="$service.copy_fuc">
					<text class="icon icon-fenxiang"></text>
					<view class="">
						分享好友
					</view>
				</view>
				<!-- #endif -->
				<!-- <view class="dial_wrap flex_cen" @tap="$service.call" :data-tel="datas.phone"> -->
				<view class="dial_wrap flex_cen" @tap="call" :data-tel="datas.phone">
					<text class="icon icon-dianhua"></text>
					<view class="">
						拨打电话
					</view>
				</view>
			</view>

			<!-- <popUp :isShow="isShow" v-model="isShow"></popUp> -->
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that = null
	export default {
		data() {
			return {
				userImg: '',
				// userName: "",
				time: "",
				address: "", //定位地址
				rangeNum: '', //距离
				contentText: ``,
				imgUrl: [], //展示图片
				imgUrl2: "", //广告图片
				phone: '12345678901',
				isShow: true, //弹窗广告
				
				options:'',
				datas:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userinfo','tab_list','my_address','basedata','loginDatas']),
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
		onLoad(e) {
			that=this
			that.options=e
			
		},
		onShow() {
			this.getdatas()
		},
		methods: {
			
			getdatas(){
				var jkurl='/index/detail'
				var datas={
					id:that.options.id,
					lat:that.my_address.latitude||'',
					lng:that.my_address.longitude||''
				}
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
						
						that.datas=datas
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
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.userImg = "/static/images/tx.jpg"
					this.userName = 'ZP056789'
					this.time = '2022-08-02 22:14'
					this.address = '北京市东城区王府井大街'
					this.rangeNum = '1.3'
					this.contentText = `急招烧烤师傅合作！地址在北京市王府井街道，地段繁华，
					有100平门店，停车方便 ，人流旺，急招师傅1名，男女不限，年龄50岁以下，
					做事勤快服从安排，有意请拨打电话具体联系
					</br>
					</br>
					急招烧烤师傅合作！地址在北京市王府井街道，地段繁华，有100平门店，
					停车方便 ，人流旺，急招师傅1名，男女不限，年龄50岁以下，做事勤快
					服从安排，有意请拨打电话具体联系`
					this.imgUrl = ['/static/images/tp.png', '/static/images/tp2.png', '/static/images/tp3.png',
						'/static/images/tp4.png'
					]
					this.imgUrl2 = "/static/images/ggt.png"

					return
				}
			},
			call(e) { //打电话
				var tiptext='本次拨打扣除'+that.basedata.phone_point+'积分'
				if(that.datas.show_phone==1){
					tiptext='是否拨打' + that.datas.phone + '?'
				}
				uni.showModal({
					content: tiptext,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if(that.datas.show_phone==1){
								uni.makePhoneCall({
									phoneNumber: that.datas.phone
								});
							}
							var jkurl='/index/call_phone'
							var datas={
								id:that.options.id
							}
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
							
									// if (typeof datas == 'string') {
									// 	datas = JSON.parse(datas)
									// }
									console.log(res)
									
									uni.makePhoneCall({
										phoneNumber: datas
									});
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
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			imgClick(item,index){//图片预览
				uni.previewImage({
					current:index,
					urls:that.$service.getimgarr(that.datas.img_arr,'arr')
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.orderDetails {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		background-color: #ffffff;

		.list_header {
			height: auto;
			position: relative;
			margin-bottom: 14rpx;
			padding: 34rpx 0 20rpx 0;

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
				top: 34rpx;
				right: 0;
			}
		}

		.two_line {
			height: auto;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			border-bottom: 1px solid #EEEEEE;
			padding-bottom: 26rpx;
			margin-top: 10rpx;
			.address_icon {
				font-size: 28rpx;
				color: #DDDDDD;
				margin-right: 10rpx;
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
			.range_num {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF6600;
			}
		}

		.content_text {
			height: auto;
			line-height: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			padding: 28rpx;
		}

		.img_wrap {
			width: 100%;
			height: auto;
			flex-wrap: wrap;
			padding: 0 19rpx;
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
			// image {
			// 	width: 160rpx;
			// 	height: 160rpx;
			// 	border-radius: 4rpx;
			// 	margin: 0 9rpx 20rpx 9rpx;
			// }
		}

		.report_text {
			width: 100%;
			height: 50rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			padding-right: 28rpx;
			margin-top: 12rpx;
			justify-content: flex-end;

			text {
				font-size: 24rpx;
				margin-right: 8rpx;
			}
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

		.share_wrap {
			width: 338rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #FF6000;
			border-radius: 10rpx;
			// margin-top: 52rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			position: relative;
			text {
				font-size: 40rpx;
				margin-right: 12rpx;
			}
		}
		
		.dial_wrap {
			width: 338rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #ED4149;
			border-radius: 10rpx;
			// margin-top: 52rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;

			text {
				font-size: 28rpx;
				margin-right: 12rpx;
			}
		}
		.botm_btn{
			width: 100%;
			min-height: 100rpx;
			background-color: #fff;
			padding: 10rpx 0;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 10rpx 0;
		}
	}
</style>
