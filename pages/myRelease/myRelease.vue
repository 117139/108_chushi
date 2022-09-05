<template>
	<view class="myRelease">
		<!-- 我的发布 -->
		<view class="tabs_wrap flex_aro">
			<view :class="current==index?'tabs_active':'tabs'" v-for="(item,index) in tabs" :key="index"
				@tap="current=index">
				{{item}}
			</view>
		</view>
		<view class="no_release" v-if="list.length==0">
			暂无发布
		</view>

		<view class="list_box" v-else v-for="(item,index) in list" :key="index"
			@tap="$sjuNav.navTo(`/pages/orderDetails/orderDetails`)">
			<view class="list_header flex_bet">
				<view class="list_header_l flex_ali">
					<image :src="item.userImg" mode="aspectFill"></image>
					<view class="list_header_text">
						<view class="">
							{{item.userName}}
						</view>
						<view class="list_header_time">
							{{item.time}}
						</view>
					</view>
				</view>
				<view class="istop">
					置顶
				</view>
			</view>
			<view class="words_text">
				<view v-html="item.contentText"></view>
			</view>

			<view class="img_list flex">
				<view v-for="(item,index2) in item.imgUrl" :key="index2">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list_botm flex_bet">
				<view class=" flex_ali">
					<text class="icon icon-dizhi add_icon"></text>
					<view class="">
						{{item.address}}
					</view>
				</view>
			</view>
			<view class="phone_wrap flex_ali">
				<text class="icon icon-dianhuatianchong"></text>
				<view class="">
					{{item.phone}}
				</view>
			</view>
			<view class="list_btom area flex_bet">
				<view :class="{idle:item.state==0,idle2:item.state==1,idle3:item.state==2}">
					{{staute[item.state]}}
				</view>
				<view class=" flex_ali">
					<view class="edit_wrap flex_ali">
						<text class="icon icon-bianjisekuai"></text>
						<view class="">
							编辑
						</view>
					</view>
					<view class="edit_wrap left_edit flex_ali">
						<text class="icon icon-shanchu"></text>
						<view class="">
							删除
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
				tabs: [],
				current: 0,
				list: [],
				staute: ['审核中', '已发布', '未通过'], //审核状态

			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.tabs = ['全部', '已发布', '审核中']
					this.list = [{
							userImg: '/static/images/tx.jpg',
							userName: "ZP056789",
							time: "2022-08-02 22:14",
							contentText: `急招烧烤师傅合作！地址在北京市王府井街道，
						地段繁华，有100平门店，人流旺停车方便 `,
							imgUrl: ['/static/images/tp.png', '/static/images/tp2.png', '/static/images/tp3.png',
								'/static/images/tp4.png',
							],
							address: "北京市东城区王府井大街", //定位地址
							phone: '16612345678',
							state: 0, //0审核中 1已发布 2未通过
						},
						{
							userImg: '/static/images/tx.jpg',
							userName: "ZP056789",
							time: "2022-08-02 22:14",
							contentText: `急招烧烤师傅合作！地址在北京市王府井街道，
						地段繁华，有100平门店，人流旺停车方便 `,
							imgUrl: ['/static/images/tp.png', '/static/images/tp2.png', '/static/images/tp3.png',
								'/static/images/tp4.png',
							],
							address: "北京市东城区王府井大街", //定位地址
							phone: '16612345678',
							state: 1, //0审核中 1已发布 2未通过
						},
						{
							userImg: '/static/images/tx.jpg',
							userName: "ZP056789",
							time: "2022-08-02 22:14",
							contentText: `急招烧烤师傅合作！地址在北京市王府井街道，
						地段繁华，有100平门店，人流旺停车方便 `,
							imgUrl: ['/static/images/tp.png', '/static/images/tp2.png', '/static/images/tp3.png',
								'/static/images/tp4.png',
							],
							address: "北京市东城区王府井大街", //定位地址
							phone: '16612345678',
							state: 2, //0审核中 1已发布 2未通过
						}
					]
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.myRelease {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		padding-top: 84rpx;
		position: relative;

		.tabs_wrap {
			width: 100%;
			height: 84rpx;
			background: #FFFFFF;
			border-bottom: 1px solid #eeeeee;
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 9;
		}

		.tabs {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.tabs_active {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ED4149;
			position: relative;

			&::after {
				content: '';
				width: 54rpx;
				height: 6rpx;
				background: #ED4149;
				border-radius: 4rpx;
				position: absolute;
				bottom: -14rpx;
				left: 50%;
				transform: translate(-50%, 0);
			}
		}

		.list_box {
			background-color: #fff;
			margin-bottom: 20rpx;
			padding: 28rpx 24rpx 0 24rpx;

			.list_header {
				width: 100%;
				height: 72rpx;
				position: relative;
				margin-bottom: 14rpx;
			}

			.list_header_l {
				image {
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}

				.list_header_text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					.list_header_time {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-top: 8rpx;
					}
				}
			}

			.istop {
				width: 70rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				background: #FF6000;
				border-radius: 6rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				top: 0;
				right: 0;
			}

			.words_text {
				width: 100%;
				min-height: 80rpx;
				line-height: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin: 20rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				position: relative;
			}

			.img_list {
				width: 100%;
				height: 160rpx;

				image {
					width: 160rpx;
					height: 160rpx;
					margin-right: 18rpx;
				}

				&:last-child {
					margin-right: 0;
				}
			}

			.list_botm {
				width: 100%;
				height: 78rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;

				.add_icon {
					color: #DDDDDD;
					font-size: 34rpx;
					margin-right: 10rpx;
				}
			}
		}

		.phone_wrap {
			width: 100%;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #EEEEEE;
			padding-left: 8rpx;

			text {
				font-size: 22rpx;
				color: #DDDDDD;
				margin-right: 10rpx;
			}
		}

		.list_btom {
			height: 90rpx;

			.idle {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF6000;
			}

			.idle2 {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #DDDDDD;
			}

			.idle3 {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ED4149;
			}

			.edit_wrap {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				text {
					font-size: 24rpx;
					color: #ED4149;
					margin-right: 8rpx;
				}
			}

			.left_edit {
				margin-left: 62rpx;
			}
		}

		.no_release {
			font-size: 26rpx;
			color: #999999;
			text-align: center;
			margin-top: 200rpx;
		}
	}
</style>
