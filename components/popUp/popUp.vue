<template>
	<view class="popUp flex_cen" @tap="wrapClick" v-show="isShow">
		<view class="pop_up_wrap flex_dir" @tap.stop>
			<view class="img_wrap ">
				<image src="../../static/images/ggt.png" mode="aspectFill"></image>
				<view class="advertisement_text">
					广告
				</view>
			</view>
			<view class="" v-html="textWords"></view>
			<view class="btn" @tap="btnClick">
				点击查看
			</view>
			<view class="cut_out" @tap="wrapClick">
				x
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"popUp",
		data() {
			return {
				textWords:"这里是广告文案",
			};
		},
		props:{
			isShow:{
				type:Boolean,
				default:false
			},
		},
		methods:{
			wrapClick(){//背景点击
				this.$emit('input',!this.isShow)
			},
			btnClick(){//点击查看
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.popUp{
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0,0.4);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
	.pop_up_wrap{
		width: 654rpx;
		min-height: 776rpx;
		border-radius: 18rpx;
		background-color: #fff;
		justify-content: space-between;
		position: relative;
	}
	.img_wrap{
		width: 100%;
		height: 368rpx;
		border-radius: 18rpx 18rpx 0px 0px;
		position: relative;
		.advertisement_text{
			width: 66rpx;
			height: 28rpx;
			line-height: 28rpx;
			text-align: center;
			background: rgba(225, 225, 225, .3);
			border-radius: 4rpx;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			position: absolute;
			top: 20rpx;
			left: 16rpx;
			opacity: 0.6;
		}
	}
	
	image{
		width: 100%;
		height: 100%;
		border-radius: 18rpx 18rpx 0px 0px;
	}
	.textWords{
		width: 100%;
		height: auto;
		padding: 16rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.btn{
		width: 368rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #58BE6B;
		border-radius: 10rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-bottom: 56rpx;
	}
	.cut_out{
		width: 72rpx;
		height: 72rpx;
		line-height: 60rpx;
		background: rgba(0, 0, 0, 0.3);
		border: 2rpx solid #DDDDDD;
		border-radius: 50%;
		font-size: 60rpx;
		font-weight: 200;
		text-align: center;
		border: 1px solid #FFFFFF;
		color: #FFFFFF;
		position: absolute;
		right: 0;
		top: -88rpx;
	}
}
</style>