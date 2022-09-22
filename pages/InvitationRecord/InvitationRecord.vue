<template>
	<view class="InvitationRecord bottom-of-page">
		<!-- 邀请记录 -->
		<view v-if="basedata.statement_3" class="rule_text area2" v-html="basedata.statement_3"></view>

		<view class=" flex_aro">
			<view class="settlement_btn" @click="sub_fuc" data-url="/pages/status/status">
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
		<view class="data_null" v-if="datas.length==0">
			暂无数据
		</view>
		<view class="invitation_line area2 flex_bet" v-for="(item,index) in datas" :key="index">
			<view v-if="item.user" class="line_l_wrap flex_ali">
				<image :src="$service.getimg(item.user.img)" mode="aspectFill"></image>
				<view class="">
					{{item.user.nick}}
				</view>
			</view>
			<view class="line_r_wrap">
				<view class="">
					邀请成功
				</view>
				<view class="r_time">
					{{item.create_time}}
				</view>
			</view>
		</view>

		<view class="botm_btn flex_aro">
			
			<!-- #ifdef H5 -->
			<view class="btn_one" @tap="$service.copy_fuc">
				立即邀请
			</view>
			<view class="btn_two" @tap="codeClick">
				生成专属二维码
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="btn_one">
					<button open-type="share" class="share_wrap_btn"></button>
				立即邀请
			</view>
			<view class="btn_two" @tap="codeClick">
				生成专属二维码
			</view>
			<!-- #endif -->
		</view>

		<view class="pop_box" v-if="isShow" @tap="codeClick">
			<view class="pop_wrap" @tap.stop>
				<!-- <image src="@/static/images/sczsewm.jpg" mode="aspectFill"></image> -->
				<image :src="img_src" mode="widthFix" class="posterImage1"></image>
				
				<!-- #ifdef H5 -->
				<view class="keep_img" >
					截图或长按保存图片
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="keep_img" @click="saveImage">
					保存图片，分享到厨师群
				</view>
				<!-- #endif -->
				<view class="cut_out" @tap="codeClick">
					x
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
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	import _app from '../../utils/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../utils/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				ruleText: '', //规则介绍
				tabs: [//1、当日 2、当月 3、总和
				{
						num: 0,
						tit: "今日邀请",
						id:1
					},
					{
						num: 0,
						tit: "本月邀请",
						id:2
					},
					{
						num: 0,
						tit: "累计邀请",
						id:3
					}
				],
				current: 0,
				invitationStatus: ['邀请成功', '邀请失败'],
				list: [],
				isShow: false, //生成专属二维码
				datas:[],
				
				
				
				width: 1587,
				height: 2245,
				sheetshow: true,
				xdxy_type: 1,
				poster: {
					width: 1587,
					height: 2245,
					backgroundColor:'#fff',
					finalPath:''
				},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				count: 0,
				img_src:'',
				
				yq_code:'123456'
			}
		},
		
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata','loginDatas']),
		},
		onShareAppMessage() {
			var up_id=that.loginDatas.id||''
			return {
				title: '招厨师群',
				imageUrl:that.basedata.share_index,
				path: '/pages/index/index?up_id='+up_id
			}
		},
		onLoad() {
			that=this
			this.onRetry()
			// that.yq_code=that.loginDatas.identification_id
			// #ifdef MP-WEIXIN
			if(that.loginDatas.code_img){
				that.img_src=that.loginDatas.code_img
			}else{
				this.shareFc();
			}
			// #endif
			// #ifdef H5
			// that.img_src=that.loginDatas.code_img
			if(that.loginDatas.synthesis_img){
				that.img_src=that.loginDatas.synthesis_img
			}else{
				this.shareFc();
			}
			// #endif
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			sub_fuc(){
				///mine/invitation_save
				var jkurl='/mine/invitation_save'
				var datas={
				}
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.navigateTo({
							url:'/pages/status/status?num=1'
						})
						
					} else {
					
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			tabsClick(index) { //今日邀请
				this.current = index
				this.onRetry()
			},
			onRetry(){
				that.page=1
				that.datas=[]
				that.getdatas()
				
			},
			
			getdatas(){
				// return
				uni.showLoading({
						mask:true,
						title:'正在获取数据'
				})
				var jkurl='/mine/invitation'
				var datas={
					page:that.page,
					type:that.tabs[that.current].id||1
				}
				var nowpage=that.page
				var header={
					'content-type': 'application/json',
				}
				that.$service.P_post(jkurl, datas,header).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						that.tabs[0].num=datas.count_1
						that.tabs[1].num=datas.count_2
						that.tabs[2].num=datas.count_3
						if(nowpage==1){
							that.datas=datas.data
						}else{
							that.datas=that.datas.concat(datas.data)
						}
						if(datas.data.length==0){
							return
						}
						that.page++
					} else {
					
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			
			
			async shareFc(num) {
				let _this = this;
				console.log(that.basedata.code)
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10,
							backgroundColor:'#fff'
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [
								{
									type: 'image',
									id: 'productImage',
									url: that.basedata.code,
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .3;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										width=1587
										height=2245
										addHeight=404
										setBgObj({
											width,
											// height: height + addHeight,
											height: height,
											backgroundColor:'#fff'
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									// type: 'qrcode',
									// text: '123456',
									// serialNum: 4,
									
									type: 'image',
									id: 'productImage_code',
									// #ifdef MP-WEIXIN
									url: that.$service.imgurl+that.$store.state.loginDatas.invite_img,
									// #endif
									// #ifdef H5
									url: that.$service.imgurl+that.$store.state.loginDatas.web_img,
									// #endif
									
									dx:554,
									dy:1725,
									serialNum: 0,
									// circleSet:true,
									infoCallBack(imageInfo) {
										let width;
										let height;
										
										width=480
										height=480
										
										return {
											dWidth: width,
											dHeight: height
										}
									}
									
								}
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					that.poster.finalPath = d.poster.tempFilePath;
					that.qrShow = true;
					that.img_src = d.poster.tempFilePath
					that.up_ewm(num)
					// uni.showToast({
					// 	title:that.src
					// })
					return
					// #ifdef APP
					wx.uploadFile({
						url: that.$service.IPurl + '/upload/streamImg', //仅为示例，非真实的接口地址
						filePath: d.poster.tempFilePath,
						name: 'file',
						formData: {
							'type': 1,
						},
						success(res) {
							console.log(res.data)
							var ndata = JSON.parse(res.data)
							if (ndata.code == 1) {
								// console.log(imgs[i], i,ndata.msg)
								// var newdata = that.imgb
								// console.log(i)
								// newdata.push(ndata.msg)
								that.img_src = that.$service.imgurl+ndata.msg
								var finalPath= that.$service.imgurl+ndata.msg
								Vue.$set(that.poster,'finalPath',finalPath)
									console.log(that.poster.finalPath)
									
								// wx.showToast({
								// 	icon: "none",
								// 	title: "上传成功"
								// })
							} else {
								wx.showToast({
									icon: "none",
									title: "上传失败"
								})
							}
						}
					})
					// #endif
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				var that = this;
				if(!this.img_src){
					return
				}
				// #ifdef MP-WEIXIN
				uni.downloadFile({
					url: this.img_src, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success(res) {
									console.log(res)
									uni.showToast({
										icon:'none',
										title:'保存成功'
									})
								}
							})
							
						}
					}
				});
				
				return
				// #endif
				// #ifdef H5
				uni.saveImageToPhotosAlbum({
					// filePath: this.poster.finalPath,
					filePath: this.img_src,
					success(res) {
						_app.showToast('已保存至本地，快去分享吧');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('操作成功');
				setTimeout(function() {
					that.hideQr();
				}, 1000)
				// #endif
			},
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
			up_ewm(num){
				
				that.$service.wx_upload(that.img_src).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						// var datas = res.data
						that.img_src=that.$service.getimg(res.data)
						var jkurl='/login/upload_code'
						// #ifdef H5
						jkurl='/login/upload_img'
						// #endif
						var datas={
							img:res.data
						}
						var nowpage=that.page
						var header={
							'content-type': 'application/json',
						}
						that.$service.P_post(jkurl, datas,header).then(res => {
							that.btnkg = 0
							console.log(res)
							if (res.code == 1) {
								that.htmlReset = 0
								var datas = res.data
								console.log(typeof datas)
						
								// if (typeof datas == 'string') {
								// 	datas = JSON.parse(datas)
								// }
								console.log(res)
								if(num==1){
									that.isShow = !that.isShow
								}
							} else {
							
								if (res.msg) {
									uni.showToast({
										icon: 'none',
										title: res.msg
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: '获取数据失败'
									})
								}
							}
						}).catch(e => {
							that.htmlReset = 1
							that.btnkg = 0
							// that.$refs.htmlLoading.htmlReset_fuc(1)
							console.log(e)
							uni.showToast({
								icon: 'none',
								title: '获取数据失败，请检查您的网络连接'
							})
						})
						
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			codeClick() { //生成二维码
				// this.shareFc(1)
				// return
				if(!this.img_src){
					this.shareFc(1)
					return
				}
				this.isShow = !this.isShow
			},
			promptly(){//立即邀请
				uni.showToast({
					title:"邀请链接已复制",
					icon:"none"
				})
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
		padding-top: 24rpx;
		.rule_text {
			// min-height: 110rpx;
			background: #BBBBBB;
			border-radius: 10rpx;
			margin-top: 22rpx;
			margin-bottom: 26rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 32rpx;
			padding:24rpx;
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
				position: relative;
				&.btn_one1{
					width: 676rpx;
				}
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
				padding-bottom:100rpx;
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
				// bottom: -76rpx;
				bottom: 10rpx;
				left: 50%;
				transform: translate(-50%,0);
			}
		}
	}
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
</style>
