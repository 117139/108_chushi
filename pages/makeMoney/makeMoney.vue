<template>
	<view class="makeMoney bottom-of-page">
		<!-- 我要赚钱 -->
		<view class="word_text area" v-html="wordText"></view>
		
		<view class="btn_bottom bottom-button" @click="$service.jump" :data-url="'/pagesMy/shenqing/shenqing'">
			立即申请
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wordText:``,
			}
		},
		onLoad() {
			this.getCate()
		},
		methods: {
			getCate() { //判断显示静态页 还是 数据页
				if (this.$sjuNav.appVn == 0) {
					this.wordText=`这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置，
					这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置…
					<br/>
					<br/>
					这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置，
					这里是说明规则的介绍文案，后台配置…这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置
					,这里是说明规则的介绍文案，后台配置，这里是说明规则的介绍文案，后台配置…`
					
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.makeMoney{
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding-top: 60rpx;
	.word_text{
		line-height: 42rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.btn_bottom{
		width: 694rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: #ED4149;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		position: fixed;
		bottom: 16rpx;
		left: 50%;
		transform: translate(-50%,0);
	}
}
</style>
