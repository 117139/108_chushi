<template>
	<view class="tipOff">
		<!-- 举报 -->
		<view class="title ">
			填写详细资料有助于我们更快地帮您解决
		</view>
		<view class="cause_wrap area">
			<view class="cause_of">
				举报原因<text>*</text>
			</view>
			<textarea class="textarea_uni" id="" placeholder="请填写您举报的原因（字数200字以内）"
				placeholder-style="font-size: 28rpx;color: #DDDDDD;" maxlength="200" auto-height></textarea>
		</view>
		
		<view class="voucher_wrap">
			<view class="voucher_tit">
				相关凭证 
			</view>
			<view class="upload_wrap flex">
				<view class="upload_img_box" v-for="(item,index) in uploadImg" :key="index">
					<image class="upload_img" :src="item" mode="aspectFill"></image>
					<view class="cut_out" @tap="cutOut(index)">
						x
					</view>
				</view>
				<view class="no_img" @tap="uploadTo">
					+
				</view>
			</view>
		</view>
		<view class="submit_btn area2">
			提交
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadImg: [], //上传
			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {

					return
				}
			},
			uploadTo() { //图片上传
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						for (var i = 0; i < tempFilePaths.length; i++) {
							this.uploadImg.push(tempFilePaths[i])
						}
					}
				});
			},
			cutOut(index) { //删除图片
				this.uploadImg.splice(index, 1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tipOff {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		padding-bottom: 40rpx;
		.title {
			width: 100%;
			height: 72rpx;
			line-height: 72rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			padding-left: 28rpx;
		}
		.cause_wrap {
			height: auto;
			min-height: 298rpx;
			background: #FFFFFF;
			padding: 20rpx 28rpx 30rpx 28rpx;

			.cause_of {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 16rpx;

				text {
					color: #ED4149;
				}
			}

			.textarea_uni {
				width: 100%;
				height: auto;
				font-size: 26rpx;
				color: #333333;
			}
		}
		.voucher_wrap{
			height: auto;
			min-height: 350rpx;
			background: #FFFFFF;
			margin-top: 14rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			padding-bottom: 16rpx;
			.voucher_tit{
				height: 90rpx;
				line-height: 90rpx;
				padding-left: 28rpx;
			}
			.upload_wrap {
				width: 100%;
				height: auto;
				margin-top: 20rpx;
				flex-wrap: wrap;
				padding: 0 12rpx;
			
				.no_img {
					width: 228rpx;
					height: 228rpx;
					line-height: 228rpx;
					text-align: center;
					border: 2px dashed #DDDDDD;
					font-size: 110rpx;
					font-weight: 200;
					color: #DDDDDD;
					margin-left: 6rpx;
				}
			
				.upload_img_box {
					width: 228rpx;
					height: 228rpx;
					position: relative;
					border-radius: 10rpx;
					margin: 0 6rpx 20rpx 6rpx;
			
					.upload_img {
						width: 100%;
						height: 100%;
						background: #F5F5F5;
						border-radius: 10rpx;
					}
			
					.cut_out {
						width: 32rpx;
						height: 30rpx;
						line-height: 16rpx;
						text-align: right;
						padding: 0 6rpx;
						font-size: 22rpx;
						background-color: #ED4149;
						color: #ffffff;
						border-radius: 0 0 0 90%;
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}
		}
		.submit_btn{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #ED4149;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 32rpx;
		}
	}
</style>
