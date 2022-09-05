<template>
	<view class="InvitationRecord bottom-of-page">
		<!-- 邀请记录 -->
		<view class="rule_text area2" v-html="ruleText"></view>

		<view class=" flex_aro">
			<view class="settlement_btn" @click="$service.jump" data-url="/pages/status/status">
				我要结算
			</view>
			<view class="settlement_btn2" @click="$service.jump" data-url="/pagesMy/js_list/js_list">
				已结算
			</view>
		</view>

		<view class="three_line flex_aro">
			<view :class="current==index?'tabs_active flex_dir':'tabs flex_dir'" v-for="(item,index) in tabs"
				:key="index" @tap="tabsClick(index)">
				<view :class="current==index?'words_active':'words'">
					{{item.num}}
				</view>
				<view class="">
					{{item.tit}}
				</view>
			</view>
		</view>
		<view class="invitation_line area2 flex_bet" v-for="(item,index) in list" :key="index">
			<view class="line_l_wrap flex_ali">
				<image :src="item.imgUrl" mode="aspectFill"></image>
				<view class="">
					{{item.userName}}
				</view>
			</view>
			<view class="line_r_wrap">
				<view class="">
					{{invitationStatus[item.status]}}
				</view>
				<view class="r_time">
					{{item.time}}
				</view>
			</view>
		</view>

		<view class="botm_btn flex_aro">
			<view class="btn_one">
				立即邀请
			</view>
			<view class="btn_two" @tap="codeClick">
				生成专属二维码
			</view>
		</view>

		<view class="pop_box" v-if="isShow" @tap="codeClick">
			<view class="pop_wrap" @tap.stop>
				<image src="@/static/images/sczsewm.jpg" mode="aspectFill"></image>
				<view class="keep_img">
					保存图片，分享到厨师群
				</view>
			</view>
			<view class="cut_out">
				x
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ruleText: '', //规则介绍
				tabs: [],
				current: 0,
				invitationStatus: ['邀请成功', '邀请失败'],
				list: [{
						imgUrl: '/static/images/tx.png',
						userName: "Aangle",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					},
					{
						imgUrl: '/static/images/tx.png',
						userName: "果粒多",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					},
					{
						imgUrl: '/static/images/tx.png',
						userName: "阿狸",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					},
					{
						imgUrl: '/static/images/tx.png',
						userName: "易烊千玺",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					},
					{
						imgUrl: '/static/images/tx.png',
						userName: "Aangle",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					},
					{
						imgUrl: '/static/images/tx.png',
						userName: "果粒多",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					},
					{
						imgUrl: '/static/images/tx.png',
						userName: "阿狸",
						status: 0, //0邀请成功，1邀请失败
						time: "2022-02-12  16:57:29"
					}
				],
				isShow: false, //生成专属二维码

			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.ruleText = `这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置…`
					this.tabs = [{
							num: 9,
							tit: "今日邀请"
						},
						{
							num: 26,
							tit: "本月邀请"
						},
						{
							num: 64,
							tit: "累计邀请"
						}
					]
					return
				}
			},
			tabsClick(index) { //今日邀请
				this.current = index
			},
			codeClick() { //生成二维码
				this.isShow = !this.isShow
			},
		}
	}
</script>

<style lang="scss" scoped>
	.InvitationRecord {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		padding-bottom: 120rpx;
		position: relative;

		.rule_text {
			min-height: 110rpx;
			background: #BBBBBB;
			border-radius: 10rpx;
			margin-top: 22rpx;
			margin-bottom: 26rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 32rpx;
			padding: 24rpx;
		}

		.settlement_btn {
			width: 334rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: #FF6C35;
			border-radius: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.settlement_btn2 {
			width: 334rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: #ED4149;
			border-radius: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.three_line {
			margin-top: 36rpx;
		}

		.tabs {
			width: 250rpx;
			height: 120rpx;
			line-height: 44rpx;
			background: #F5F5F5;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.tabs_active {
			width: 250rpx;
			height: 120rpx;
			line-height: 44rpx;
			background: #ED4149;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.words {
			font-size: 30rpx;
			font-family: DINPro;
			font-weight: bold;
			color: #999999;
		}

		.words_active {
			font-size: 30rpx;
			font-family: DINPro;
			font-weight: bold;
			color: #FFFFFF;
		}

		.invitation_line {
			height: 140rpx;
			border-bottom: 1px solid #eeeeee;

			.line_l_wrap {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					margin-right: 12rpx;
				}
			}

			.line_r_wrap {
				text-align: right;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF940A;

				.r_time {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-top: 18rpx;
				}
			}
		}

		.botm_btn {
			width: 100%;
			min-height: 98rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 10rpx 0;

			.btn_one {
				width: 338rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				background: #ED4149;
				border-radius: 10rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}

			.btn_two {
				width: 338rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				background: #FF6B34;
				border-radius: 10rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.pop_box {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.pop_wrap {
				width: 692rpx;
				height: auto;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				image {
					width: 100%;
					height: 980rpx;
					border-radius: 10rpx 10rpx 0 0;
					font-size: 0;
					display: block;
				}

				.keep_img {
					width: 100%;
					height: 96rpx;
					line-height: 96rpx;
					text-align: center;
					background: #0F4C9F;
					border-radius: 0 0 10rpx 10rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
				}
			}

			.cut_out {
				width: 54rpx;
				height: 54rpx;
				line-height: 46rpx;
				text-align: center;
				font-size: 40rpx;
				font-weight: 200;
				color: #ffffff;
				border-radius: 50%;
				border: 1px solid #ffffff;
				position: absolute;
				bottom: 40rpx;
				left: 50%;
			}
		}
	}
</style>
