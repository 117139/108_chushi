import Vue from 'vue'
import {
	mapState,
	mapMutations
} from 'vuex'

// let videoAd = null
let interstitialAd = null
var _this
export default {
	data() {
		return {
			ad_kg:false,
			my_tk_adkey:'',
			my_purl:''
		};
	},
	onLoad() {
		var _this=this
		// #ifdef MP-WEIXIN
		
		// / 在页面onLoad回调事件中创建插屏广告实例
		if(_this.basedata.key_3){
			
			if (wx.createInterstitialAd) {
				if(interstitialAd==null){
					
				}else{
					interstitialAd.destroy()
				}
			  interstitialAd = wx.createInterstitialAd({
			    adUnitId: _this.basedata.key_3||'adunit-36230cef4dced8b5'
			  })
			  interstitialAd.onLoad(() => {})
			  interstitialAd.onError((err) => {})
			  interstitialAd.onClose((res) => {
					var adurl_list=uni.getStorageSync('adurl_list')||[]
					adurl_list.push(_this.my_purl)
					uni.setStorageSync('adurl_list',adurl_list)
			  	_this.getjf1()
			  })
				
			}
		}
		this.getadvert()
		// #endif
	},
	computed: {
	...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','basedata']),
	},
	methods: {
		// 弹框广告
		setad_tk(){
			var _that=this
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
			// 在适合的场景显示插屏广告
			console.log('在适合的场景显示插屏广告')
			console.log(interstitialAd)
			if (interstitialAd) {
			  interstitialAd.show().catch((err) => {
			    console.error(err)
			  })
			}else{
				if(_that.my_tk_adkey){
					
					if (wx.createInterstitialAd) {
						if(interstitialAd==null){
							
						}else{
							interstitialAd.destroy()
						}
					  interstitialAd = wx.createInterstitialAd({
					    adUnitId: _that.my_tk_adkey||'adunit-36230cef4dced8b5'
					  })
					  interstitialAd.onLoad(() => {})
					  interstitialAd.onError((err) => {})
					  interstitialAd.onClose(() => {
							var adurl_list=uni.getStorageSync('adurl_list')||[]
							adurl_list.push(_that.my_purl)
							uni.setStorageSync('adurl_list',adurl_list)
							_that.getjf1()
						})
					}
					if (interstitialAd) {
					  interstitialAd.show().catch((err) => {
					    console.error(err)
					  })
					}
				}
			}
			/* #endif */
		},
		
		getadvert(url){
			var that=this
			if(!url){
				let curPage = getCurrentPages();
				let route = curPage[curPage.length - 1].route; //获取当前页面的路由
				url=route
				that.my_purl=route
				console.log(url)
				// return
			}
			var see_type=false //是否看过 true 是
			var adurl_list=uni.getStorageSync('adurl_list')||[]
			if(adurl_list.length>0){
				for (var i = 0; i < adurl_list.length; i++) {
					if(adurl_list[i]==url){
						see_type=true
					}
				}
			}
			if(see_type){
				console.log('已看过广告')
				return
			}
			var jkurl='/index/advert_validate'
			var datas={
				url:url
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
					if(datas.show==1){
						that.my_tk_adkey=datas.key
						that.setad_tk()
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
		getjf(res){
			console.log('广告-------------------------》')
			
			console.log(res)
			if(res.isEnded){
				this.getjf_fuc()
			}
		},
		getjf1(){
			
			this.getjf_fuc()
		},
		getjf_fuc(){
			var that =this
			var jkurl='/index/advert_notice'
			var datas={
				// pid:url
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
					uni.showToast({
						icon: 'none',
						title: '获取积分成功'
					})
					uni.$emit('login_fuc', {
						title: ' 刷新信息 ',
						content: 'item.id'
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
		},
		
		getsharejf_fuc(){
			var that =this
			var jkurl='/index/share_notice'
			var datas={
				// pid:url
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
					uni.showToast({
						icon: 'none',
						title: '获取积分成功'
					})
					uni.$emit('login_fuc', {
						title: ' 刷新信息 ',
						content: 'item.id'
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
		}
	},
};
