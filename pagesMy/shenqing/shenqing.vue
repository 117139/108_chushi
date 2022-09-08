<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="from_tit">
			请填写您的信息
		</view>
		<view class="from_li">
			<view class="from_l">
				<text>*</text>姓名
			</view>
			<!-- <view class="from_r"> </view> -->
			<input class="from_r flex_1" type="text" placeholder="请填写您的姓名" v-model="m_name">
		</view>
		<!-- <region-picker v-if="areaJson"  style="width: 100%;" mode="region" :jsonData="areaJson" @change="bindRegionChange" :value="region"> -->
		<!-- #ifdef H5 -->
		<region-picker style="width: 100%;" mode="region" @change="bindRegionChange" :value="region">
			<view class="from_li">
				<view class="from_l">
					<text>*</text>所在城市
				</view>
				<view class="from_r flex_1">{{region.join(' ')}}</view>
				<!-- <input class="from_r flex_1" type="text" placeholder="请填写您的姓名" v-model="m_name"> -->
			</view>
		</region-picker>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<picker @change="bindPickerChange" mode="region" :value="value">
			<view class="from_li">
				<view class="from_l ">
					<text>*</text>所在城市
				</view>
				<view class="uni-input">{{value[0]}}{{value[1]}}{{value[2]}}</view>
			</view>
		</picker>
		<!-- #endif -->
		<view class="from_li">
			<view class="from_l">
				<text>*</text>手机号
			</view>
			<!-- <view class="from_r"> </view> -->
			<input class="from_r flex_1" type="number" placeholder="请填写您的手机号" v-model="m_tel">
		</view>
		<view class="from_li">
			<view class="from_l">
				<text>*</text>微信号
			</view>
			<!-- <view class="from_r"> </view> -->
			<input class="from_r flex_1" type="text" placeholder="请填写您的微信号" v-model="m_wx">
		</view>
		<view class="sub_btn" @click="sub_fuc">
			提交
		</view>
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				options: '',
				datas: '',
				m_name: '',
				region_id: [1, 35, 36],
				region: ['北京市', '北京', '东城区'],
				value:'请选择所在城市',//微信小程序 选择城市
				m_tel: '',
				m_wx: '',
			}
		},
		// computed: {
		// ...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','nowtime']),
		// },
		onLoad(e) {
			that = this
			that.options = e || {}
			console.log(e)

			// that.getdata()
		},
		onShow() {

		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test() {},
			sub_fuc() {
				if (!that.m_name) {
					uni.showToast({
						icon: 'none',
						title: '请填写您的姓名'
					})
					return
				}
				if (!that.m_tel) {
					uni.showToast({
						icon: 'none',
						title: '请填写您的手机号'
					})
					return
				}
				if (!(/^1\d{10}$/.test(that.m_tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!that.m_wx) {
					uni.showToast({
						icon: 'none',
						title: '请填写您的微信号'
					})
					return
				}
				uni.showToast({
					icon: 'none',
					title: '提交成功'
				})
				
				var address=that.region.join('')
				var jkurl='/mine/m_money'
				var datas={
					name:that.m_name,
					address:address,
					phone:that.m_tel,
					wx_code:that.m_wx,
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
							title: '提交成功'
						})
						setTimeout(function(){
							// uni.redirectTo({
							// 	url:'/pages/index/index'
							// })
							uni.navigateBack()
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
			//选择地区
			bindRegionChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail)
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.region = e.detail.value
				this.region_id = e.detail.code
				this.region = this.region
				this.region_id = this.region_id
			},
			bindPickerChange(e) {//小程序 选择城市
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.value = e.detail.value
			},
			getdata() {

				var datas = {
					key: that.options.type
				}
				var jkurl = '/info'

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
						that.datas = datas.info.content
						if (datas.info.title) {
							uni.setNavigationBarTitle({
								title: datas.info.title
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
			getimg(img) {
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
			goback() {
				uni.navigateBack()
			},
			func() {
				// that.$store.commit('setSystem',datas.system)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap_box {
		width: 100%;
		// padding: 30rpx;
		min-height: 100vh;
		// #ifdef H5
		min-height: calc(100vh - 44px);
		// #endif
		background: #fff;
		padding: 28rpx;
	}

	.from_tit {
		padding-top: 70rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		padding-bottom: 30rpx;
	}

	.from_li {
		width: 100%;
		height: 95rpx;
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.from_l {
			width: 160rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			text {
				color: #ED4149;
			}
		}

		.from_r {
			text-align: right;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}

	.sub_btn {
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
</style>
