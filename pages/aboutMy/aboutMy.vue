<template>
	<view class="aboutMy">
		<!-- 关于我们 -->
		<view class="words_text">
			 <uParse v-if="basedata.gywm" :content="basedata.gywm"></uParse>
		</view>
		<!-- <view class="img_wrap area2">
			<image src="@/static/images/cszp.png" mode="aspectFilla"></image>
		</view>
		
		<view class="words_text area2" v-html="wordsText"></view>
		
		<view class="line_tit area2 flex_ali">
			<view class="line"></view>
			<view class="">联系方式</view>
		</view>
		
		<view class="contact_wrap area2">
			邮箱：{{email}}
		</view>
		<view class="contact_wrap area2">
			电话：{{tell}}
		</view>
		<view class="contact_wrap area2">
			手机：{{phone}}
		</view> -->
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
				wordsText:'',//文字
				email:'',
				tell:'',//电话
				phone:'',//手机
				
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','basedata']),
		},
		onLoad() {
			// this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.wordsText='高薪厨师招聘信息，专业厨师招聘平台，海量职位信息，求职者与招聘者可快速拨打面试电话进行咨询，轻松祝您找到心仪工作。'
					this.email='gwykaoshi@163.com'
					this.tell='010-12345678'
					this.phone='15123456789'
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.aboutMy{
	width: 100%;
	height: 100%;
	min-height: 100vh;
	 .img_wrap{
		 height: 220rpx;
		 border-radius: 20rpx;
		 margin-top: 28rpx;
		 image{
			 width: 100%;
			 height: 100%;
			 border-radius: 20rpx;
		 }
	 }
	 .words_text{
		 height: auto;
		 min-height: 100vh;
		 // line-height: 40rpx;
		 font-size: 30rpx;
		 font-family: PingFang SC;
		 font-weight: 400;
		 color: #333333;
		 background: #fff;
		 // margin-top: 56rpx;
		 // margin-bottom: 80rpx;
		 padding: 30rpx;
	 }
	 .line_tit{
		 line-height: 60rpx;
		 font-size: 32rpx;
		 font-family: PingFang SC;
		 font-weight: 500;
		 color: #333333;
		 margin-bottom: 6rpx;
		 .line{
			 width: 6rpx;
			 height: 30rpx;
			 background: #ED4149;
			 border-radius: 6rpx;
			 margin-right: 14rpx;
		 }
	 }
	 .contact_wrap{
		 line-height: 56rpx;
		 font-size: 30rpx;
		 font-family: PingFang SC;
		 font-weight: 400;
		 color: #333333;
	 }
}
</style>
