<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="js_li" v-for="(item,index) in datas">
			<view class="js_li_tit">
				邀请50人已结算
			</view>
			<view class="js_li_time">
				2022-03-10  13:28:56
			</view>
		</view>
		
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
				datas:[]
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','nowtime']),
		},
		onLoad(e) {
			that=this
			that.options=e||{}
			console.log(e)
			
			that.getdata()
		},
		onShow() {
			
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			getdata(){
				if(that.$service.appVN==0){
					that.datas=[1,1,1,1,1,1,1,1]
					return
				}
				var datas={
					key: that.options.type
				}
				var jkurl='/info'
				
				// that.$service.P_post(jkurl, datas).then(res => {
				// 	that.btnkg = 0
				// 	console.log(res)
				// 	if (res.code == 1) {
				// 		that.htmlReset = 0
				// 		var datas = res.data
				// 		console.log(typeof datas)
				
				// 		if (typeof datas == 'string') {
				// 			datas = JSON.parse(datas)
				// 		}
				// 		console.log(res)
				// 		that.datas=datas.info.content
				// 		if(datas.info.title){
				// 			uni.setNavigationBarTitle({
				// 				title:datas.info.title
				// 			})
				// 		}
				// 	} else {
					
				// 		if (res.msg) {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.msg
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: '获取数据失败'
				// 			})
				// 		}
				// 	}
				// }).catch(e => {
				// 	that.htmlReset = 1
				// 	that.btnkg = 0
				// 	// that.$refs.htmlLoading.htmlReset_fuc(1)
				// 	console.log(e)
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '获取数据失败，请检查您的网络连接'
				// 	})
				// })
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
	padding: 0 28rpx;
}
.js_li{
	width: 100%;
	height: 130rpx;
	padding: 20rpx 0;
	border-bottom: 1px solid #eee;
	.js_li_tit{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 48rpx;
	}
	.js_li_time{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 48rpx;
	}
}
</style>
