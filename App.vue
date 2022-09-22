<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		onLaunch: function() {
			that=this
			var adurl_list=[]
			uni.setStorageSync('adurl_list',adurl_list)
			console.log('App Launch')
			var token =uni.getStorageSync('token')
			if(token){
				that.$service.wxlogin('token')
			}
			// that.getadd()
			that.gettabs()
			that.getbasedata()
			uni.$on('login_fuc', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' + data.content)
					that.getbasedata()
					that.$service.wxlogin('token')
			})
			uni.$on('getbasedata', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' + data.content)
						that.getbasedata()
			})
			uni.getSystemInfo({
				success: function(e) {
					that.$store.commit('setplatform', e.platform)
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		methods:{
			gettabs(){
				var datas={}
				var jkurl='/index/tab'
				
				that.$service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
					// console.log(res)
					if (res.code == 1) {
						// that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// console.log(res)
						that.$store.commit('set_tab_list',res.data)
						// that.getdata_tz()
						// if(datas.title){
						// 	uni.setNavigationBarTitle({
						// 		title:datas.title
						// 	})
						// }
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
					// that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			getadd(){
				var datas={}
				var jkurl='/login/weizhi'
				
				that.$service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
					// console.log(res)
					if (res.code == 1) {
						// that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						var city=datas.city
						if(city==[]){
							city=datas.province
						}
						var rectangle=datas.rectangle
						if(rectangle){
							rectangle=rectangle.split(';')
							rectangle=rectangle[0]
							rectangle=rectangle.split(',')
						}
						var address={
							city:city,
							address:city,
							longitude:rectangle[0]||'',
							latitude:rectangle[1]||'',
						}
						that.$store.commit('set_my_address',address)
						// that.$store.commit('set_basedata',res.data)
						// that.getdata_tz()
						// if(datas.title){
						// 	uni.setNavigationBarTitle({
						// 		title:datas.title
						// 	})
						// }
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
					// that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			getbasedata(){
				var datas={}
				var jkurl='/index/system'
				
				that.$service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
					// console.log(res)
					if (res.code == 1) {
						// that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// console.log(res)
						that.$store.commit('set_basedata',res.data)
						
						// that.getdata_tz()
						// if(datas.title){
						// 	uni.setNavigationBarTitle({
						// 		title:datas.title
						// 	})
						// }
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
					// that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	// @import "@/uni_modules/uview-ui/index.scss";
	@import "@/static/font/iconfont.css";
	
	uni-page-body,
	html,
	body {
		margin: 0;
		font-family: PingFang SC, DINCond-Bold, '微软雅黑';
		background-color: #F8F8F8;
		box-sizing: border-box;
	}
	
	*,
	view,
	text,
	image,
	input {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		letter-spacing: 1rpx;
	}
	
	button {
		margin: 0;
		padding: 0;
	}
	
	button::after {
		border: none;
		margin: 0;
		padding: 0;
	}
	
	.flex {
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
	}
	.flex_ali{//水平居中
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		align-items: center;
	}
	.flex_cen{//居中对齐
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		align-items: center;
		justify-content: center;
	}
	.flex_dir{//中轴线为 y 居中
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.flex_bet{//两端对齐
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		justify-content: space-between;
		align-items: center;
	}
	.flex_aro{//平均分布
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		justify-content: space-around;
		align-items: center;
	}
	
	
	.area {
		width: 100%;
		padding: 0 28rpx;
	}
	.area2 {
		width: 694rpx;
		margin: 0 auto;
	}
	
	.bottom-of-page {
		position: relative;
		padding-bottom: 120rpx;
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
	
	.bottom-button {//底部按钮
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.bottom-button2::after{
		content: '';
		display: block;
		clear: both;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.uni-input {
		color: #333333;
		font-size: 26rpx;
	}
	
	
	.dis_flex {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: row;
	}
		
	.dis_flex_c {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: column;
	}
		
	.fww {
		flex-wrap: wrap;
	}
		
	.aic {
		align-items: center;
	}
		
	.ais {
		align-items: stretch !important;
	}
		
	.aift {
		align-items: flex-start!important;
	}
		
	.aife {
		align-items: flex-end;
	}
		
	.ju_a {
		justify-content: space-around;
	}
		
	.ju_b {
		justify-content: space-between;
	}
		
	.ju_c {
		justify-content: center;
	}
		
	.flex_1 {
		flex: 1;
	}
		
	.flex_0 {
		flex: none;
	}
		
	.oh1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		// text-align: center;
	}
		
	.oh2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
	}
	.my_tabbar_box{
		padding-bottom: 100rpx;
		padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}
	.my_tabbar{
		width: 100%;
		position: fixed;
		bottom: 0;
		// bottom: 100rpx;
		left: 0;
		right: 0;
		z-index: 900;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background: #fff;
		display: flex;
		align-items: stretch;
		justify-content: space-around;
		.my_tabbar_li{
			height: 100rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width: 48rpx;
				height: 48rpx;
			}
			text{
				margin-top: 6rpx;
				text-align: center;
				font-size: 20rpx;
				line-height: normal;
				color: #bbb;
				&.active{
					color: #ed4149;
				}
			}
		}
	}
	.data_null{
		width: 100%;
		height: 150rpx;
		color: #666;
		text-align: center;
		font-size: 32rpx;
		line-height: 150rpx;
	}
	.share_wrap_btn{
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 950;
	}
</style>
