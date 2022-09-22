<template>
	<view class="follow">
		
		<!-- <topbar bg_color="#ED4149">
			<text style="color: #fff;"></text>
			<text style="color: #fff;">{{options.title}}</text>
			<text style="color: #fff;"></text>
		</topbar> -->
		<web-view v-if="web_url" :src="web_url"></web-view>
		<view v-else class="data_null">
			正在开发中
		</view>
		<!-- 关注我 -->
		<tab-list pageurl="/pages/follow/follow" :weburl="web_url"></tab-list>
		
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
				options:'',
				web_url:''
			}
		},
		onLoad(e) {
			that=this
			that.options=e||{}
			console.log(e)
			console.log(e.weburl)
			that.web_url=decodeURIComponent(e.weburl)
			uni.setNavigationBarTitle({
				title:e.title
			})
			// that.getdata()
		},
		methods: {
			
		}
	}
</script>

<style>
.follow{
	
}
</style>
