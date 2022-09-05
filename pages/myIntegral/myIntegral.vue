<template>
	<view class="myIntegral">
		<!-- 我的积分 -->
		<view class="img_wrap">
			<image src="@/static/images/jfbj.png" mode="aspectFill"></image>
		</view>

		<view class="pages_wrap">
			<view class="integral_box flex_dir">
				<view class="integral_num">
					{{num}}
				</view>
				<view class="integral_text" @tap="$sjuNav.navTo(`/pages/gainIntegral/gainIntegral`)">
					获取积分
				</view>
			</view>

			<view class="record_wrap area2">
				<view class="record_tit flex_ali">
					<view class="line"></view>
					<view class="">积分记录</view>
				</view>
				<view class="">
					<view class="record_list flex_ali" v-for="(item,index) in recordList" :key="index">
						<view style="width: 100%;">
							<view class="one_line flex_bet">
								<view class="">
									{{item.way}}
								</view>
								<view :class="item.add === 0 ? 'add' : 'no_add' ">
									{{ item.add === 0 ? '+' : '-' }}{{item.num}}
								</view>
							</view>
							<view class="time_wrap">
								{{item.time}}
							</view>
						</view>
					
					</view>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '', //积分数
				recordList: [], //积分记录
			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.num = "2680"
					this.recordList = [{
							way: "邀请好友",
							num: '20',
							add: 0, //0加,1减 积分
							time: "2022-03-10  13:28:56"
						},
						{
							way: "发布信息",
							num: '10',
							add: 1,
							time: "2022-03-10  13:28:56"
						},
						{
							way: "邀请好友",
							num: '20',
							add: 0,
							time: "2022-03-10  13:28:56"
						},
						{
							way: "浏览广告",
							num: '10',
							add: 0,
							time: "2022-03-10  13:28:56"
						},
					]
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.myIntegral {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		position: relative;
		padding-bottom: 40rpx;

		.img_wrap {
			width: 100%;
			height: 416rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.pages_wrap {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;

			.integral_box {
				width: 100%;
				height: 324rpx;

				.integral_num {
					font-size: 72rpx;
					font-family: Arial;
					font-weight: bold;
					color: #FFFFFF;
				}

				.integral_text {
					width: 278rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border: 2rpx solid #FFFFFF;
					border-radius: 40rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: 32rpx;
				}
			}
		}

		.record_wrap {
			height: auto;
			min-height: 238rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding-top: 24rpx;

			.record_tit {
				width: 100%;
				height: 60rpx;
				padding-left: 30rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}

		.record_list {
			width: 100%;
			height: 158rpx;
			flex-wrap: wrap;
			padding: 0 28rpx 0 34rpx;
			border-bottom: 1px solid #eeeeee;

			.one_line {
				width: 100%;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
			.time_wrap{
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-top: 20rpx;
			}
		}
	}
	.record_list:last-child{
		border-bottom: none;
	}

	.line {
		width: 6rpx;
		height: 32rpx;
		background: #ED4149;
		border-radius: 6rpx;
		margin-right: 16rpx;
	}

	.add {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFA547;
	}

	.no_add {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #50A838;
	}
</style>
