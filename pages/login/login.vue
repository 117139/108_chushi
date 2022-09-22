<template>
	<view class="wrap_box">
		<!-- #ifdef H5 -->
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="login_li">
			<view class="login_l">
				手机号
			</view>
			<input class="login_r" type="number" v-model="tel" placeholder="请输入手机号">
		</view>
		<view class="login_li">
			<view class="login_l">
				验证码
			</view>
			<input class="login_r" type="number" v-model="yzm" placeholder="请输入验证码">
			<view v-if="yzm_time==60" @click="getCode" class="login_yzm">获取验证码</view>
			<view v-else class="login_yzm">{{yzm_time}}s</view>
		</view>
		
		<view class="sub_btn" @click="login_fuc">登录</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="login_box">
			<image class="my_logo" src="/static/images/tx.jpg" mode="aspectFit"></image>
			<view class="my_name">
				{{basedata.index_title||''}}
			</view>
			<!-- <view class="my_xieyi">
				<view class="my_xieyi_box" :class="{active:active}" @click="active=!active">
					<text class="icon-duigou"></text>
				</view>
				请仔细阅读<text @click="$service.jump" data-url="/pages_my/about/about?type=yhxy">《用户须知》</text>相关协议
			</view>
			<view class="my_tip">申请获取以下权限</view>
			<view class="my_tip1">获得你的公开信息(昵称，头像等)</view> -->
			
			<button class='login_btn' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
				绑定手机号
			</button>
			
			<view class="dis_flex aic ju_c goback_btn" @tap="goback()">返回</view>
		</view>
		<!-- #endif -->
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
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
				options:'',
				datas:'',
				tel:'',
				yzm:'',
				yzm_time:60,
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','nowtime','basedata']),
		},
		onLoad(e) {
			that=this
			that.options=e||{}
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			// 登录
			login_fuc(){
				
				
				if(that.$service.appVN==0){
					uni.showToast({
						icon: 'none',
						title: '登录成功'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					return
				}
				// 1账号密码登录 2手机号登录
				var datas
				// if(that.v_type==2){
					if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
						wx.showToast({
							icon: 'none',
							title: '手机号有误'
						})
						return
					}
					if (!that.yzm) {
						wx.showToast({
							icon: 'none',
							title: '请输入验证码'
						})
						return
					}
					var pid=uni.getStorageSync('up_id')||''
					//1、web 2、小程序 3、token
					datas={
						type:1,
						phone:that.tel,
						code:that.yzm,
						pid:pid
					}
				// }
				console.log(datas)
				var jkurl='/login/sign'
				
				that.$service.P_post(jkurl, datas).then(res => {
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
						if(res.msg=='该用户为黑名单用户'){
							uni.setStorageSync('up_id','')
							that.$store.commit('login',datas)
							uni.reLaunch({
								url:'/pages/index/index'
							})
							return
						}
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						uni.setStorageSync('up_id','')
						that.$store.commit('login',datas)
						// return
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
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
			getCode() {
				let that = this
			
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '发送成功'
				// })
				// that.codetime()
				// that.btnkg = 0
				// return
				var jkurl = '/login/send'
				//type：1：注册  2：忘记密码   3：验证码登录   4：修改绑定手机  5：修改密码
				//页面 0注册 1账号密码登录 2手机号登录 3忘记密码
				var data = {
					// type:that.login_type==0?2:that.login_type==2?1:1,
					// type:that.v_type==0?1:that.v_type==2?3:2,
					phone: that.tel
				}
				that.$service.P_post(jkurl, data).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.showToast({
							icon: 'none',
							title: '发送成功'
						})
						console.log(res)
						// that.verification_key = res.data.data.key
						that.codetime()
				
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			
			},
			codetime() {
				let that = this
				let time =that.yzm_time
				let code_type=that.v_type
				let st = setInterval(function() {
					if(code_type!=that.v_type){
						clearInterval(st);
						that.yzm_time=60
						return
					}
					if (time == 0) {
						// that.yzm_type = 0
						clearInterval(st);
						that.yzm_time=60
					} else {
						let news = time--;
						// console.log(news)
						// that.yzm_type = 1
						that.yzm_time = news
			
					}
				}, 1000);
			},
			getdata(){
				
				var datas={
					key: that.options.type
				}
				var jkurl='/info'
				
				that.$service.P_post(jkurl, datas).then(res => {
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
						that.datas=datas.info.content
						if(datas.info.title){
							uni.setNavigationBarTitle({
								title:datas.info.title
							})
						}
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
			onGetPhoneNumber(e){
				var that =this
					if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
				
							//拒绝授权后弹出一些提示  
							
					}else{      //允许授权  
							console.log(e.detail.encryptedData)  
							//e.detail.encryptedData      //加密的用户信息  
							//e.detail.iv     //加密算法的初始向量  时要用到  
							
							var pid=uni.getStorageSync('up_id')||''
							var datas = {
								code:e.detail.code,
								pid:pid
								// token:token,
							}
							var jkurl = '/login/getphone'
							that.$service.P_post(jkurl, datas).then(res => {
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
									if(res.msg=='该用户为黑名单用户'){
										uni.setStorageSync('up_id','')
										that.$store.commit('login',datas)
										uni.reLaunch({
											url:'/pages/index/index'
										})
										return
									}
									uni.showToast({
										icon: 'none',
										title: '登录成功'
									})
									uni.setStorageSync('up_id','')
									that.$store.commit('login',datas)
									// return
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1000)
									
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
							return
							 wx.login({  
									success: (res) => {  
											if (res.code) {         //微信登录成功 已拿到code  
													// ...doSomething  
													var token=uni.getStorageSync('token')
													// 旧版
													// var datas = {
													// 	encryptedData:e.detail.encryptedData,
													// 	iv:e.detail.iv,
													// 	code:res.code,
													// 	token:token,
													// 	type:2
													// }
													// 新版
													var datas = {
														code:e.detail.code,
														// token:token,
													}
													//selectSaraylDetailByUserCard
													var jkurl = '/login/getphone'
													that.$service.P_post(jkurl, datas).then(res => {
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
															
															that.$store.commit('login',datas)
															// return
															setTimeout(()=>{
																uni.navigateBack({
																	delta:1
																})
															},1000)
															
															// uni.$emit('login_fuc', {
															// 	title: ' 刷新信息 ',
															// 	content: 'item.id'
															// });
															// setTimeout(()=>{
															// 	uni.navigateBack({
															// 		delta:1
															// 	})
															// },1000)
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
											} else {  
													console.log('登录失败！' + res.errMsg)  
											}  
									}  
							})  
					}  
			},
			
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				var that = this
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 2000)
				}
				console.log(e.currentTarget.dataset.type)
				service.jump(e)
			},
			goback(){
			  uni.navigateBack()
			},
			func(){
				// that.$store.commit('setSystem',datas.system)
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap_box{
	width: 100%;
	// padding: 30rpx;
	min-height: 100vh;
	// #ifdef H5
	min-height: calc(100vh - 44px);
	// #endif
	background: #fff;
	padding: 55rpx;
}
.sub_btn{
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	width: 100%;
	height: 90rpx;
	background: #ED4149;
	border-radius: 10rpx;
	margin-top: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.login_li{
	width: 100%;
	height: 95rpx;
	border-bottom: 1px solid #EEEEEE;
	display: flex;
	align-items: center;
	.login_l{
		width: 148rpx;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #323233;
	}
	.login_r{
		flex:1;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #323233;
	}
	.login_yzm{
		width: 150rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FC7578;
	}
}

.login_box{
	padding: 140rpx 80rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	.my_logo{
		width: 150rpx;
		height: 150rpx;
		margin-bottom: 26rpx;
	}
	.my_name{
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		// margin-bottom: 93rpx;
	}
	.my_xieyi{
		width: 100%;
		padding-bottom: 42rpx;
		border-bottom: 1px solid #EEEEEE;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		display: flex;
		align-items: center;
		margin-bottom: 45rpx;
		.my_xieyi_box{
			width: 30rpx;
			height: 30rpx;
			background: #F4F4F4;
			border: 1px solid #DCDCDC;
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 10rpx;
			text{
				color: #F4F4F4;
				font-size: 22rpx;
			}
			&.active{
				background: #ff0000;
				border: 1px solid #ff0000;
				text{
					color: #fff;
				}
			}
		}
	}
}
.my_tip{
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	line-height: 40rpx;
	width: 100%;
}
.my_tip1{
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
	line-height: 40rpx;
	width: 100%;
	margin-bottom: 50rpx;
}

.login_btn{
	margin-top: 100rpx;
	width: 100%;
	height: 78rpx;
	background: #58BE6B;
	border-radius: 10rpx;
	color: #fff;
	line-height: 78rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
}
.goback_btn{
	width: 100%;
	height: 78rpx;
	background: #F4F4F4;
	border: 1px solid #DCDCDC;
	border-radius: 10rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #000000;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 29rpx;
}
</style>
