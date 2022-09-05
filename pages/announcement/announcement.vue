<template>
	<view class="announcement">
		<!-- 平台公告 -->
		<view class="list_content area2" v-for="(item,index) in list" :key="index" @tap="$sjuNav.navTo(`/pages/details/details`)">
			<view class="list_text">
				{{item.text}}
			</view>
			<view class="list_time">
				{{item.time}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
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
