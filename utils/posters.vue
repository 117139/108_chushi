<template>
	<view class="content">
		<!-- 说明 -->
		<!-- 生成海报 -->
		<!-- <button type="primary" @tap="shareFc()">生成海报</button> -->
		<!-- 图片展示由自己实现 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<!-- <button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button> -->
					<button type="primary" size="mini">长按图片保存到手机</button>
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
				</view>
			</view>
		</view>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	var that;
	import _app from '@/util/app.js';
	import {
		getSharePoster
	} from '@/util/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId'
			}
		},
		props:['postersData'],
		created() {
			that = this;
			this.shareFc();
		},
		methods: {
			async shareFc() {
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: this.canvasId,	//canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 500,
							height: 750,
							backgroundColor:"#fff"
						},
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([
									{
										type: 'text',
										fontStyle: 'normal',
										text: '分享给你一个商品',
										size: fontSize,
										color: 'black',
										alpha: .6,
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 0,
										id: 'tag1',	//自定义标识
										dx:80,
										dy:40
									},
									{ //游湖头像
										type: 'image',
										url: this.postersData.userAvt,
										alpha: 1,
										dx:10,
										dy:10,
										dWidth:60,
										dHeight:60
									},
									{ //产品图片
										type: 'image',
										url: this.postersData.shopAvt,
										alpha: 1,
										dx:10,
										dy:90,
										dWidth:480,
										dHeight:480
									},
									{ //商品名称
										type: 'text',
										fontStyle: 'normal',
										text: this.postersData.shopName,
										size: 24,
										color: '#333',
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 0,
										id: 'tag1',	//自定义标识
										dx:10,
										dy:630
									},
									{ //商品价格
										type: 'text',
										fontStyle: 'normal',
										text:  this.postersData.shopPrice,
										size: 32,
										color: '#ea4c41',
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 0,
										id: 'tag1',	//自定义标识
										dx:10,
										dy:690
									},
									{ //商品价格
										type: 'text',
										fontStyle: 'normal',
										text: '长按识别二维码访问',
										size: 24,
										color: '#999',
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 0,
										id: 'tag1',	//自定义标识
										dx:10,
										dy:730
									},
									{
										type: 'qrcode',
										text: this.postersData.url,
										size: 150,
										dx: 340,
										dy: 590
									}
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				var that = this;
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('操作成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('操作成功');
				setTimeout(function() {
					that.hideQr();
				},1000)
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				// this.qrShow = false;
				that.$emit('hideQr');
			}
		}
	}
</script>

<style>
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
