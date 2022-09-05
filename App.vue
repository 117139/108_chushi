<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// @import "@/uni_modules/uview-ui/index.scss";
	@import "@/static/font/iconfont.css";
	
	uni-page-body,
	html,
	body {
		margin: 0;
		font-family: PingFang SC, DINCond-Bold, '微软雅黑';
		background-color: #F8F8F8;
		box-sizing: border-box;
	}
	
	*,
	view,
	text,
	image,
	input {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		letter-spacing: 1rpx;
	}
	
	button {
		margin: 0;
		padding: 0;
	}
	
	button::after {
		border: none;
		margin: 0;
		padding: 0;
	}
	
	.flex {
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
	}
	.flex_ali{//水平居中
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		align-items: center;
	}
	.flex_cen{//居中对齐
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		align-items: center;
		justify-content: center;
	}
	.flex_dir{//中轴线为 y 居中
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.flex_bet{//两端对齐
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		justify-content: space-between;
		align-items: center;
	}
	.flex_aro{//平均分布
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		justify-content: space-around;
		align-items: center;
	}
	
	
	.area {
		width: 100%;
		padding: 0 28rpx;
	}
	.area2 {
		width: 694rpx;
		margin: 0 auto;
	}
	
	.bottom-of-page {
		position: relative;
		padding-bottom: 120rpx;
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
	
	.bottom-button {//底部按钮
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.bottom-button2::after{
		content: '';
		display: block;
		clear: both;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.uni-input {
		color: #333333;
		font-size: 26rpx;
	}
	
	
	.dis_flex {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: row;
	}
		
	.dis_flex_c {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: column;
	}
		
	.fww {
		flex-wrap: wrap;
	}
		
	.aic {
		align-items: center;
	}
		
	.ais {
		align-items: stretch !important;
	}
		
	.aift {
		align-items: flex-start!important;
	}
		
	.aife {
		align-items: flex-end;
	}
		
	.ju_a {
		justify-content: space-around;
	}
		
	.ju_b {
		justify-content: space-between;
	}
		
	.ju_c {
		justify-content: center;
	}
		
	.flex_1 {
		flex: 1;
	}
		
	.flex_0 {
		flex: none;
	}
		
	.oh1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		// text-align: center;
	}
		
	.oh2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
	}
</style>
