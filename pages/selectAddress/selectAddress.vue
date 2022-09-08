<template>
	<view class="selectAddress">
		<!-- 选择城市 -->
		<view class="header_tit">
			当前位置
		</view>
		<view class="location_address flex_bet" @tap="chooseLocation">
			<view class="address_word">
				{{address?address.address:'请选择地址'}}
			</view>
			<view class="location_r flex_ali">
				<view class="icon icon-dizhi address_icon"></view>
				<view class="">
					重新定位
				</view>
			</view>
		</view>
		<!-- <view class="sele_address flex_bet">
			<view class="flex_ali">
				<view class="address_sele">
					选择地址
				</view>
				<view class="address_text">
					{{seleAddress}}
				</view>
			</view>
			<view class="icon icon-youjiantou icon_r"></view>
		</view> -->
		
		<view class="btn_bottom area2" @tap="back">
			确定
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
				address:'',//当前定位
				seleAddress:"",//选择地址
			}
		},
		
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata','loginDatas']),
		},
		onLoad() {
			that=this
			// this.getCate()
			that.address=that.my_address
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$service.appVN == 0) {
					this.address = "北京市东城区王府井大街105号王府井大街105号"
					this.seleAddress="北京市-东城区"
					return
				}
			},
			chooseLocation(e) {//重新定位
				console.log(e);
				uni.chooseLocation({
				// uni.choosePoi({
					success: res => {
						
						// uni.getLocation({
						// 	type: 'gcj02',
						// 	altitude: true,
						// 	geocode: true,
						// 	success: function(res) {
						// 		console.log(res.longitude);
						// 		console.log(res.latitude);
						// 	}
						// })
						console.log(res)
						// this.address = res.name
						this.address = res
						that.$store.commit('set_my_address',res)
					}
				})
			},
			back(){//确定
				///login/weizhi
				var jkurl='/login/weizhi'
				var datas={
					lat:this.address.latitude,
					lng:this.address.longitude,
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
						// var addressComponent=datas.regeocode.addressComponent
						var city=datas.result.address_component.city||''
						// if(city==[]){
						// 	city=addressComponent.province
						// }
						var address={
							city:city,
							...that.address
						}
						that.$store.commit('set_my_address',address)
						uni.navigateBack({
							delta:1
						})
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
		}
	}
</script>

<style lang="scss" scoped>
	.selectAddress {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		.header_tit {
			width: 100%;
			height: 74rpx;
			line-height: 74rpx;
			padding-left: 24rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.location_address{
			width: 100%;
			height: 110rpx;
			line-height: 110rpx;
			background: #FFFFFF;
			padding: 0 28rpx;
			.address_word{
				width: 500rpx;
				height: 100%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.location_r{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ED4149;
				.address_icon{
					font-size: 34rpx;
					color: #ED4149;
					margin-right: 10rpx;
				}
			}
		}
		.sele_address{
			width: 100%;
			height: 110rpx;
			line-height: 110rpx;
			padding: 0 28rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			background-color: #fff;
			margin-top: 58rpx;
			.address_sele{
				margin-right: 20rpx;
			}
			.address_text{
				text-align: center;
				margin-left: 70rpx;
			}
			.icon_r{
				font-size: 18rpx;
				color: #BBBBBB;
			}
		}
		.btn_bottom{
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			background: #ED4149;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 32rpx;
		}
	}
</style>
