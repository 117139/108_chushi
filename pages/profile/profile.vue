<template>
	
	<view class="">
		<topbar bg_color="#ED4149">
			<text style="color: #fff;"></text>
			<text style="color: #fff;">我的</text>
			<text style="color: #fff;"></text>
		</topbar>
		<view class="profile">
			
			<!-- 我的 -->
			<view class="header_img_backImg">
				<image src="/static/images/wdbj.png" mode="aspectFill"></image>
			</view>
			<view class="content_wrap">
				<view class="content_wrap_header flex_ali">
					<image v-if="hasLogin" :src="$service.getimg(loginDatas.img)" mode="aspectFill"></image>
					<image v-else :src="$service.getimg('/static/images/tx.jpg')" mode="aspectFill"></image>
					<view v-if="hasLogin" class="">
						{{loginDatas.nick}}
					</view>
					<view v-else class="" @click="$service.jump" data-url="/pages/login/login">
						未登录
					</view>
				</view>
				<view class="content_card area2">
					<view class="card_each border_botm flex_bet" @tap="$service.jump" data-url="/pages/myIntegral/myIntegral" :data-login="true">
						<view class=" flex_ali">
							<image class="li_img" src="@/static/images/wdjf.png" mode="aspectFit"></image>
							<view class="">
								我的积分
							</view>
						</view>
						<view class=" flex_ali">
							<view class="integral_num">
								{{loginDatas.point||'0'}}
							</view>
							<view class="icon icon-youjiantou icon_r"></view>
						</view>
					</view>
					<view class="card_each flex_bet" @tap="$service.jump" data-url="/pages/myRelease/myRelease" :data-login="true">
						<view class=" flex_ali">
							<image class="li_img" src="@/static/images/wdfb.png" mode="aspectFit"></image>
							<view class="">
								我的发布
							</view>
						</view>
						<view class="icon icon-youjiantou icon_r"></view>
					</view>
				</view>
				
				<view class="content_card area2">
					<view v-if="basedata.is_zuanqian==1" class="card_each  flex_bet" @tap="$service.jump" data-url="/pages/makeMoney/makeMoney" :data-login="true">
						<view class=" flex_ali">
							<image class="li_img" src="@/static/images/wyzq.png" mode="aspectFit"></image>
							<view class="">
								我要赚钱
							</view>
						</view>
						<view class=" flex_ali">
							<view class="icon icon-youjiantou icon_r"></view>
						</view>
					</view>
					<view v-if="basedata.is_yaoqing==1&&loginDatas.invi==1" class="card_each flex_bet" @tap="$service.jump" data-url="/pages/InvitationRecord/InvitationRecord" :data-login="true">
						<view class=" flex_ali">
							<image class="li_img" src="@/static/images/yqjl.png" mode="aspectFit"></image>
							<view class="">
								邀请记录
							</view>
						</view>
						<view class="icon icon-youjiantou icon_r"></view>
					</view>
				</view>
		
				<view class="content_card area2">
					<view class="card_each border_botm flex_bet" @tap="call(basedata.phone)">
						<view class=" flex_ali">
							<image class="li_img" src="@/static/images/lxkf.png" mode="aspectFit"></image>
							<view class="">
								联系客服
							</view>
						</view>
						<view class="phone_num">
							{{basedata.phone||''}}
						</view>
					</view>
					<view class="card_each flex_bet" @tap="$sjuNav.navTo(`/pages/aboutMy/aboutMy`)">
						<view class=" flex_ali">
							<image class="li_img" src="@/static/images/gywm.png" mode="aspectFit"></image>
							<view class="">
								关于我们
							</view>
						</view>
						<view class="icon icon-youjiantou icon_r"></view>
					</view>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view v-if="hasLogin" class="logout_btn" @click="out_fuc">
				<text>退出</text>
			</view>
			<!-- #endif -->
			<tab-list pageurl="/pages/profile/profile"></tab-list>
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
	var that 
	export default {
		data() {
			return {
				
				phone: "", //联系客服
				isShow: true, //弹窗广告
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','basedata']),
		},
		onLoad() {
			// this.getCate()
			that=this
			if(that.hasLogin){
				
				uni.$emit('login_fuc', {
					title: ' 刷新信息 ',
					content: 'item.id'
				});
			}
		},
		methods: {
			...mapMutations(['logout']),
			out_fuc(){
				uni.showModal({
				    title: '提示',
				    content: '是否退出当前账号',
				    success: function (res) {
				        if (res.confirm) {
				            that.logout()
										uni.showToast({
											title:'退出成功',
											icon:'none'
										})
										setTimeout(function(){
											uni.navigateTo({
												url:'/pages/login/login'
											})
										},1000)
				           
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.userImg = '/static/images/tx.jpg'
					this.userName = 'ZP056789'
					this.integral = "100"
					this.phone = "16612345678"
					return
				}
			},
			call(e){
				if(!e){
					return
				}
				uni.makePhoneCall({
					phoneNumber: e+''
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.profile {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		position: relative;

		.header_img_backImg {
			width: 100%;
			height: 354rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content_wrap {
			width: 100%;
			height: 100%;
			position: relative;
			// top: 0;
			// left: 0;
			z-index: 9;

			.content_wrap_header {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				padding-left: 28rpx;
				// margin-top: 34rpx;
				padding-top: 34rpx;
				margin-bottom: 26rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					border: 1px solid #ffffff;
					margin-right: 30rpx;
				}
			}

			.content_card {
				// height: 200rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-top: 20rpx;
				
				.card_each {
					width: 100%;
					height: 100rpx;
					padding: 0 24rpx;
					&+.card_each{
						border-top: 1px solid #EEEEEE;
					}
					.li_img {
						width: 36rpx;
						height: 36rpx;
						margin-right: 22rpx;
					}

					// .img2 {
					// 	width: 30rpx;
					// 	height: 34rpx;
					// 	margin-right: 26rpx;
					// }
					// .img3{
					// 	width: 32rpx;
					// 	height: 34rpx;
					// 	margin-right: 24rpx;
					// }
					// .img4{
					// 	width: 38rpx;
					// 	height: 38rpx;
					// 	margin-right: 20rpx;
					// }
					// .img5{
					// 	width: 38rpx;
					// 	height: 38rpx;
					// 	margin-right: 20rpx;
					// }
					// .img6{
					// 	width: 34rpx;
					// 	height: 36rpx;
					// 	margin-right: 20rpx;
					// }
				}

				.integral_num {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FF6000;
					margin-right: 12rpx;
				}
				.phone_num{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-right: 26rpx;
				}
			}
		}

		.icon_r {
			font-size: 18rpx;
			color: #DDDDDD;
		}

		.border_botm {
			// border-bottom: 1px solid #EEEEEE;
		}
	}
	.logout_btn{
		width: 690rpx;
		height: 80rpx;
		margin: 30rpx auto;
		display: flex;
		align-content: center;
		justify-content: center;
		background: #ED4149;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #F5F5F5;
		line-height: 80rpx;
		
	}
</style>
