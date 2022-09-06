<template>
	<view class="announcement">
		<!-- 平台公告 -->
		<view v-if="datas.length==0" class="data_null">
			暂无数据
		</view>
		<view class="list_content area2" v-for="(item,index) in datas" :key="index" @tap="$service.jump" :data-url="'/pages/details/details?id='+item.id">
			<view class="list_text">
				{{item.title}}
			</view>
			<view class="list_time">
				{{item.create_time}}
			</view>
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
				datas:[],
				page:1
			}
		},
		onLoad() {
			that=this
			this.onRetry()
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
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
				var jkurl='/index/notice'
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
			
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.list=[
						{
							text:"这里是平台公告的简要描述性文案每日动态的简要描述性文案描述文案",
							time:"2022-02-16 12:36:52"
						},
						{
							text:"这里是平台公告的简要描述性文案每日动态的简要描述性文案描述文案这里是平台公告的简要描述性文案每日动态的简要描述性文案描述文案这里是平台公告的简要描述性文案每日动态的简要描述性文案描述文案",
							time:"2022-02-16 12:36:52"
						},
						{
							text:"这里是平台公告的简要描述性文案每日动态的简要描述性文案描述文案",
							time:"2022-02-16 12:36:52"
						},
						{
							text:"这里是平台公告的简要描述性文案每日动态的简要描述性文案描述文案",
							time:"2022-02-16 12:36:52"
						}
					]
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.announcement{
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding: 32rpx 0 40rpx 0;
	
	.list_content{
		height: auto;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		padding: 30rpx 28rpx;
		.list_text{
			line-height: 40rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #646566;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.list_time{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #969799;
			margin-top: 16rpx;
		}
	}
}
</style>
