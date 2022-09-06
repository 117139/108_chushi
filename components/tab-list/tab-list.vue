<template>
	<view>
		
		<view class="my_tabbar_box"></view>
		<view class="my_tabbar dis_flex ais">
			<view class="my_tabbar_li" v-for="(item,index) in tab_list" @click="go_url(item)" :key="index">
				<block  v-if="item.is_link==2&&item.applet_url==pageurl||item.is_link==1&&item.web_url==weburl">
					<image :src="$service.getimg(item.select_icon)" mode="aspectFit"></image>
					<text class="active">{{item.title}}</text>
				</block>
				<block  v-else>
					<image :src="$service.getimg(item.icon)" mode="aspectFit"></image>
					<text>{{item.title}}</text>
				</block>
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
	export default {
		name:"tab-list",
		props: {
			pageurl:{ type:String, default: null },
			weburl:{ type:String, default: null },
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','tab_list']),
		},
		methods: {
			go_url(item){
				if(item.is_link==2){
					uni.redirectTo({
						url:item.applet_url
					})
				}else{
					var web_url=item.web_url
					if(item.applet_ur){
						uni.navigateTo({
							url:item.applet_url+'?weburl='+web_url
						})
					}else{
						uni.navigateTo({
							url:'/pages/follow/follow?title='+item.title+'&weburl='+web_url
						})
					}
				}
				
			}
		}
	}
</script>

<style>

</style>