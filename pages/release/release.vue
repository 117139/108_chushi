<template>
	<view class="release">
		<topbar bg_color="#ED4149">
			<text style="color: #fff;"></text>
			<text style="color: #fff;">发布</text>
			<text style="color: #fff;"></text>
		</topbar>
		<!-- 发布 -->
		<view class="header_top area">
			<view v-if="basedata.statement_2" class="words_box area2">{{basedata.statement_2}}</view>

			<view class="sort_tit flex_ali">
				<text>*</text>选择分类
			</view>
			<view class="sort_wrap flex">
				<view :class="current==index?'sort_active':'sort'" v-for="(item,index) in sortList" :key="index"
					@tap="current=index">
					{{item.title}}
				</view>
			</view>

			<view class="sort_tit flex_ali">
				<text>*</text>信息详情
			</view>

			<view class="textarea_box area2">
				<textarea class="textarea" placeholder-style="font-size: 28rpx;color: #DDDDDD;"
					placeholder="请填写发布的详细信息~" :maxlength="maxlength" auto-height confirm-type="done" v-model="content"
				></textarea>
				<view class="statistic_num">
					{{content.length}}/{{maxlength}}
				</view>
			</view>

			<view class="upload_wrap flex">
				<view class="upload_img_box" v-for="(item,index) in img_arr" :key="index">
					<image class="upload_img" :src="$service.getimg(item)" mode="aspectFill"></image>
					<view class="cut_out" @click="delimg_fuc"  data-type="0" :data-idx="index" data-idx1="1">
						x
					</view>
				</view>
				<view class="upload_img_box" @click="upimg_fuc" data-type="0"  data-idx1="1">
					<image class="upload_img" src="@/static/images/sc.png" mode="aspectFit"></image>
				</view>
				
			</view>
		</view>

		<view class="user_news_wrap area">
			<view class="user_news_line border_botm area2 flex_bet" @tap="chooseLocation">
				<view class="sort_tit flex_ali">
					<text>*</text>发布地址
				</view>
				<view class=" flex_ali">
					<view class=" flex_ali_add oh1">
						{{address?address.address:'请选择地址'}}
					</view>
					<text class="icon icon-dizhi address_icon"></text>
				</view>
			</view>
			<view class="user_news_line border_botm area2 flex_bet" >
				<view class="sort_tit flex_ali">
					<text>*</text>手机号码
				</view>
				<!-- <view class="">
					{{phone}}
				</view> -->
				<input class="user_tel" type="number" v-model="phone" placeholder="请输入手机号">
			</view>
			<view class="user_news_line area2 flex_bet">
				<view class="sort_tit flex_ali">
					信息置顶
				</view>
				<switch :checked="checked" color="#ED4149" style="transform:scale(0.7)" @change="checkedChange" />
			</view>
			<view class="deduction flex_bet" v-show="checked">
				<view class="">
					扣除积分
				</view>
				<view class="deduction_num">
					{{basedata.top||'0'}}积分
				</view>
			</view>
		</view>

		<!-- <view class="btn_bottom area2" @tap="$sjuNav.navTo(`/pages/status/status`)"> -->
		<view class="btn_bottom area2" @tap="sub_fuc">
			确认发布
		</view>
		<tab-list pageurl="/pages/release/release"></tab-list>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		data() {
			return {
				wordsText: `免责声明:平台仅提供信息展示发布服务，所有信息与平台无关，
				用户需自行承担使用本平台可能产生的风险，如有异议请自行退出平台，谢谢配合。`,
				sortList: [],
				current: -1,
				remnant: "0",
				maxlength: 500,
				value: '',
				uploadImg: [], //上传
				address: '', //发布地址
				phone: '', //手机号码
				checked: false, //信息置顶 开关选择器 是否被选中
				num: 10, //扣除积分
				
				content:'',
				img_arr:[]
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata']),
		},
		onLoad() {
			that=this
			uni.$emit('getbasedata', {
				title: ' 刷新信息 ',
				content: 'item.id'
			});
			this.getCate()
		},
		methods: {
			sub_fuc(){
				if(that.current==-1){
					uni.showToast({
						icon: 'none',
						title: '请选择分类'
					})
					return
				}
				
				// if(!that.content){
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入发布信息'
				// 	})
				// 	return
				// }
				// if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
				// 	wx.showToast({
				// 		icon: 'none',
				// 		title: '手机号有误'
				// 	})
				// 	return
				// }
				var img_arr= that.img_arr.join(',')
				var jkurl='/index/sub'
				var datas={
					pid:that.sortList[that.current].id||'',
					phone:that.phone,
					is_top:that.checked?1:2,
					content:that.content,
					img_arr:img_arr,
					address:that.address.address,
					lng:that.address.longitude,
					lat:that.address.latitude,
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
						
						uni.showToast({
							icon: 'none',
							title: '发布成功'
						})
						setTimeout(function(){
							uni.redirectTo({
								url:'/pages/index/index'
							})
						},1000)
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
			getCate() { //判断显示静态页 还是 数据页
				// if (this.$sjuNav.appVn == 0) {
				// 	this.sortList = ['招聘信息求职信息求职信息', '求职信息', '其他信息', '其他信息']
				// 	this.address = "北京市东城区王府井大街108号"
				// 	this.phone = '15112345678'
				// 	return
				// }
				var jkurl='/index/sub_classify'
				var datas={}
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
						
						that.sortList=datas
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
			upimg_fuc(e){
				uni.showActionSheet({
					itemList: ['拍照', '相册选择'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						// var len=that.img_arr
						uni.chooseImage({
							count: 9,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths
								
								// const imglen = that.img_list.length
								
								that.upimg(tempFilePaths, 0,e)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			upimg(imgs, i,e) {
			  
				var edatas=e.currentTarget.dataset
				
				that.$service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						that.img_arr.push(datas)
						if ( i<imgs.length-1) {
						  i++
						  that.upimg(imgs, i,e)
						}else{
							// that.sethd()
						}
						// if(type==1){
						// 	// that.member_avatar=datas
						// }else{
						// 	var newdata = that.img_list
						// 	// var new_img={
						// 	// 	url:datas,
						// 	// 	title:''
						// 	// }
						// 	newdata.push(datas)
							
						// 	that.img_list= newdata
						// 	var news1 = that.img_list.length
						// 	if (news1 < 9&& i<imgs.length-1) {
						// 	  i++
						// 	  that.upimg(imgs, i,type)
						// 	}
						// }
						
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
			delimg_fuc(e){
				console.log(e.currentTarget.dataset.idx)
				var datas=e.currentTarget.dataset
				wx.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(datas.idx1==1){
								that.img_arr.splice(datas.idx,1)
							}else{
								that.datas.img2_arr.splice(datas.idx,1)
							}
							// that.sethd()
							// that.img_list=that.img_list
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			
			descInput(e) { //多行文本 监听输入了多少个字
				this.remnant = e.detail.cursor
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
			checkedChange(e) { //开关选择器checked的改变
				this.checked = e.detail.value
			},
			chooseLocation(e) {//发布地址
				console.log(e);
				uni.chooseLocation({
					success: res => {
						console.log(res)
						this.address = res
					}
				})

			},
			call(e) {
				uni.makePhoneCall({
					phoneNumber: e
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release {
		padding-bottom: 58rpx;

		.header_top {
			height: auto;
			background-color: #fff;
			padding-bottom: 24rpx;
			padding-top: 20rpx;
			.words_box {
				height: auto;
				line-height: 40rpx;
				background: #BBBBBB;
				border-radius: 10rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				padding: 14rpx 28rpx;
				// margin-top: 20rpx;
			}

			.sort_wrap {
				height: auto;
				margin: 8rpx 0;
				flex-wrap: wrap;

				.sort {
					min-width: 200rpx;
					max-width: 100%;
					height: 72rpx;
					line-height: 72rpx;
					text-align: center;
					padding: 0 12rpx;
					background: #F5F5F5;
					border-radius: 10rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #BBBBBB;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 20rpx;
					margin-bottom: 20rpx;

					&:nth-child(3n) {
						// background-color: red;
					}
				}

				.sort_active {
					min-width: 200rpx;
					max-width: 100%;
					height: 72rpx;
					line-height: 72rpx;
					text-align: center;
					padding: 0 12rpx;
					background: #ED4149;
					border-radius: 10rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
				}
			}

			.textarea_box {
				min-height: 338rpx;
				height: auto;
				background: #F5F5F5;
				border-radius: 10rpx;
				font-size: 26rpx;
				padding: 20rpx;

				textarea {
					width: 100%;
					min-height: 300rpx;
				}

				.statistic_num {
					width: 100%;
					height: 40rpx;
					text-align: right;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #DDDDDD;
				}
			}

			.upload_wrap {
				margin-top: 20rpx;
				flex-wrap: wrap;

				.no_img {
					width: 160rpx;
					height: 160rpx;
					background: #F5F5F5;
					border-radius: 10rpx;
					margin-right: 12rpx;
					margin-bottom: 20rpx;
				}

				.upload_img_box {
					// width: 160rpx;
					width: 25%;
					height: 170rpx;
					position: relative;
					border-radius: 10rpx;
					// margin-right: 12rpx;
					// margin-bottom: 20rpx;
					overflow: hidden;
					padding: 10rpx;
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
						top: 10rpx;
						right: 10rpx;
					}
				}
			}
		}

		.sort_tit {
			width: 230rpx;
			height: 82rpx;
			line-height: 82rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			text {
				color: #ED4149;
			}
		}
		.flex_ali_add{
			width: 400rpx;		
			text-align: right;
		}
		.user_news_wrap {
			margin-top: 20rpx;
			background-color: #fff;

			.user_news_line {
				height: 94rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.address_icon {
					font-size: 34rpx;
					color: #ED4149;
					margin-left: 10rpx;
				}
			}

			.border_botm {
				border-bottom: 1px solid #EEEEEE;
			}
		}

		.btn_bottom {
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #ED4149;
			border-radius: 10rpx;
			margin-top: 46rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #F5F5F5;
		}

		.deduction {
			width: 100%;
			height: 94rpx;

			.deduction_num {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF6000;
			}
		}
	}

	::v-deep .uni-switch-input {
		margin-right: 0;
	}
	.user_tel{
		flex: 1;
		text-align: right;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
</style>
