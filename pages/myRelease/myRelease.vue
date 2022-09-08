<template>
	<view class="myRelease">
		<!-- 我的发布 -->
		<view class="tabs_wrap flex_aro">
			<view :class="current==index?'tabs_active':'tabs'" v-for="(item,index) in tabs" :key="index"
				@tap="setcur(index)">
				{{item.title}}
			</view>
		</view>
		<view class="no_release" v-if="datas.length==0">
			暂无数据
		</view>

		<view class="list_box" v-else v-for="(item,index) in datas" :key="index"
			@tap="go_jump(item)">
			<view class="list_header flex_bet">
				<view v-if="item.user" class="list_header_l flex_ali">
					<image :src="$service.getimg(item.user.img)" mode="aspectFill"></image>
					<view class="list_header_text">
						<view class="">
							{{item.user.nick}}
						</view>
						<view class="list_header_time">
							{{item.update_time}}
						</view>
					</view>
				</view>
				<view class="istop" v-if="item.is_top==1">
					置顶
				</view>
			</view>
			<view class="words_text">
				<view >{{item.content}}</view>
			</view>

			<view class="img_list flex">
				<view  class="img_li" v-for="(item1,index2) in item.img_arr" :key="index2">
					<image :src="$service.getimg(item1)" mode="aspectFill"></image>
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
				<view class="idle" v-if="item.is_examine==1">
					审核中>
				</view>
				<view class="idle2" v-if="item.is_examine==2">
					已发布
				</view>
				<view class="idle3" v-if="item.is_examine==3">
					审核失败
				</view>
				<view class=" flex_ali">
					<view class="edit_wrap flex_ali" @click.stop="$service.jump" :data-url="'/pagesMy/fabu_edit/fabu_edit?id='+item.id">
						<text class="icon icon-bianjisekuai"></text>
						<view class="">
							编辑
						</view>
					</view>
					<view class="edit_wrap left_edit flex_ali" @click.stop="del_fuc(item)">
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
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that = null
	export default {
		data() {
			return {
				// tabs: [],
				list: [],
				tabs: [
					{
						title:'全部',
						id:''
					},
					{
						title:'已发布',
						id:2
					},
					{
						title:'审核中',
						id:1
					},
				], //审核状态
				current: 0,
				datas:[]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list','my_address','basedata']),
		},
		onLoad() {
			that=this
		},
		onShow() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdatas()
		},
		methods: {
			setcur(index){
				that.current=index
				that.onRetry()
			},
			go_jump(item){
				// $sjuNav.navTo(`/pages/orderDetails/orderDetails`)
				//1、未审核 2、审核成功 3、审核失败
				if(item.is_examine==1){
					uni.navigateTo({
						url:'/pages/status/status?num=0'
					})
				}
				if(item.is_examine==2){
					uni.navigateTo({
						url:'/pages/orderDetails/orderDetails?id='+item.id
					})
				}
				if(item.is_examine==3){
					uni.navigateTo({
						url:'/pagesMy/fabu_edit/fabu_edit?id='+item.id
					})
				}
			},
			del_fuc(item){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该信息',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										var jkurl='/mine/sub_del'
										var datas={
											id:item.id
											// address_id:''
										}
										var header={
											'content-type': 'application/json',
										}
										// that.$service.P_post(jkurl, datas,header).then(res => {
										that.$service.P_post(jkurl, datas).then(res => {
											that.btnkg = 0
											console.log(res)
											if (res.code == 1){
												that.htmlReset = 0
												var datas = res.data
												console.log(typeof datas)
										
												if (typeof datas == 'string') {
													datas = JSON.parse(datas)
												}
												console.log(res)
												
												uni.showToast({
													icon:'none',
													title:'删除成功'
												})
												// that.datas.splice(index,1)
												setTimeout(()=>{
													that.onRetry()
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
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
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
				var jkurl='/mine/sub'
				var datas={
					page:that.page,
					is_examine:that.tabs[that.current].id
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
				max-height: 80rpx;
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
				// height: 160rpx;

				.img_li{
					width: 25%;
					padding: 6rpx;
					height: 162rpx;
					image {
						width: 100%;
						height: 100%;
					
						// &:nth-last-child() {
						// 	margin-right: 0;
						// }
					}
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
