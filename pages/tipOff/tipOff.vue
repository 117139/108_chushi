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
				placeholder-style="font-size: 28rpx;color: #DDDDDD;" maxlength="200" auto-height v-model="content"></textarea>
		</view>
		
		<view class="voucher_wrap">
			<view class="voucher_tit">
				相关凭证 
			</view>
			<view class="upload_wrap flex">
				<!-- <view class="upload_img_box" v-for="(item,index) in uploadImg" :key="index"> -->
				<view class="upload_img_box" v-for="(item,index) in img_arr" :key="index">
					<image class="upload_img" :src="$service.getimg(item)" mode="aspectFill"></image>
					<!-- <view class="cut_out" @tap="cutOut(index)"> -->
					<view class="cut_out" @click="delimg_fuc"  data-type="0" :data-idx="index" data-idx1="1">
						x
					</view>
				</view>
				<!-- <view class="no_img" @tap="uploadTo"> -->
				<view class="no_img"  @click="upimg_fuc" data-type="0"  data-idx1="1">
					+
				</view>
			</view>
		</view>
		<view class="submit_btn area2" @click="sub_fuc">
			提交
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
	export default {
		data() {
			return {
				uploadImg: [], //上传
				content:'',
				img_arr:[],
				options:''
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata']),
		},
		onLoad(e) {
			that=this
			that.options=e
		},
		methods: {
			sub_fuc(){
				
				if(!that.content){
					uni.showToast({
						icon: 'none',
						title: '请输入发布信息'
					})
					return
				}
				
				var img_arr= that.img_arr.join(',')
				var jkurl='/index/report'
				var datas={
					pid:that.options.id||'',
					title:that.content,
					img_arr:img_arr,
					
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
							title: '提交成功'
						})
						setTimeout(function(){
							uni.navigateBack()
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
