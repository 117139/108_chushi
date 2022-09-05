<template>
	<view class="selectAddress">
		<!-- 选择城市 -->
		<view class="header_tit">
			当前位置
		</view>
		<view class="location_address flex_bet">
			<view class="address_word">
				{{address}}
			</view>
			<view class="location_r flex_ali">
				<view class="icon icon-dizhi address_icon"></view>
				<view class="">
					重新定位
				</view>
			</view>
		</view>
		<view class="sele_address flex_bet">
			<view class="flex_ali">
				<view class="address_sele">
					选择地址
				</view>
				<view class="address_text">
					{{seleAddress}}
				</view>
			</view>
			<view class="icon icon-youjiantou icon_r"></view>
		</view>
		
		<view class="btn_bottom area2">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:'',//当前定位
				seleAddress:"",//选择地址
			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.address = "北京市东城区王府井大街105号王府井大街105号"
					this.seleAddress="北京市-东城区"
					return
				}
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
				width: 420rpx;
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
