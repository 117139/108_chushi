<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="data_null" v-if="datas.length==0">
			暂无数据
		</view>
		<view class="js_li" v-for="(item,index) in datas">
			<view class="js_li_tit">
				{{item.title}}
			</view>
			<view class="js_li_time">
				{{item.create_time}}
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
			
			that.onRetry()
		},
		onShow() {
			
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
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
				var jkurl='/mine/invitation_history'
				var datas={
					page:that.page,
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
