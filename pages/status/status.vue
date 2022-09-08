<template>
	<view class="status">
		<!-- 发布订单状态 -->
		<view class="page_all">
			<view class="pages_content flex_dir">
				<icon :type="iconType[value]" size="58" :color="colorList[value]"/>
				<view class="status_list">
					{{statusList[value]}}
				</view>
				<!-- <view class="ascertain" @tap="$sjuNav.switchTab(`/pages/index/index`)"> -->
				<view class="ascertain" @tap="$service.back">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:0,//0审核中，1提交成功
				colorList:['#FF9900','#58BE6C'],
				iconType:['waiting','success'],
				statusList:['审核中','提交成功'],
			}
		},
		onLoad(e) {
			that.value=e.num
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.status{
	width: 100%;
	height: 100vh;
	
	.page_all{
		width: 100%;
		height: 100%;
	}
	.pages_content{
		margin-top: 112rpx;
		.status_list{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 26rpx;
		}
	}
	.ascertain{
		width: 388rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border: 1px solid #ED4149;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #ED4149;
		margin-top: 100rpx;
	}
}
</style>
