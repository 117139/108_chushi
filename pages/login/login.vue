<template>
	<view class="wrap_box">
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
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','nowtime']),
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
					//弃用 1、手机号 2、微信 3、手机号密码 4、token 5、apple
					// 1：小程序授权登录   2：手机号验证码登录    3：账号密码登录   4:token登录  5:微信授权登录  6:苹果登录
					datas={
						type:2,
						phone:that.tel,
						code:that.yzm,
					}
				// }
				console.log(datas)
				var jkurl='/login'
				
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
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						that.$store.commit('login',datas)
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
				uni.showToast({
					icon: 'none',
					title: '发送成功'
				})
				that.codetime()
				that.btnkg = 0
				return
				var jkurl = '/sendCode'
				//type：1：注册  2：忘记密码   3：验证码登录   4：修改绑定手机  5：修改密码
				//页面 0注册 1账号密码登录 2手机号登录 3忘记密码
				var data = {
					// type:that.login_type==0?2:that.login_type==2?1:1,
					type:that.v_type==0?1:that.v_type==2?3:2,
					phone: that.tel
				}
				that.$service.P_get(jkurl, data).then(res => {
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
</style>
