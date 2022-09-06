<template>
	<view class="details">
		<!-- 详情 -->
		<view class="header_tit area2">
			发布时间：{{datas.create_time}}
		</view>
		<!-- <view class="img_wrap area2">
			<image :src="imgUrl" mode="aspectFill"></image>
		</view> -->
		
		<view class="words_text">
			 <!-- <uParse v-if="datas.content" :content="datas.content"></uParse> -->
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
				time:'',//发布时间
				imgUrl:"/static/images/ch.png",
				wordsText:`上万优秀厨师分布全城，专业厨师服务团队，让所有顾客体验舌尖的舒适，家人省心，营养的美食，让你摆脱各种烦恼！
				<br/>
				<br/>
				这里是平台公告的详细描述性文案，平台公告的详细描述性文案。
				<br/>
				<br/>
				上万优秀厨师分布全城，专业厨师服务团队，让所有顾客体验舌尖的舒适，家人省心，营养的美食，让你摆脱各种烦恼！
				<br/>
				<br/>
				这里是平台公告的详细描述性文案，平台公告的详细描述性文案。`,
				options:'',
				datas:''
			}
		},
		onLoad(e) {
			that=this
			that.options=e
			this.getnotice()
		},
		methods: {
			//公告
			getnotice(){
				var jkurl='/index/notice_detail'
				var datas={
					id:that.options.id
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
						
						that.datas=datas
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
					this.time="2022-02-20 12:36:56"
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.details{
	width: 100%;
	height: 100%;
	min-height: 100vh;
	.header_tit{
		height: 98rpx;
		line-height: 98rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #969799;
	}
	.img_wrap{
		height: 320rpx;
		border-radius: 10rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.words_text{
		padding: 34rpx 28rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #646566;
	}
}
</style>
