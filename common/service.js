import Vue from 'vue'
import store from '../store/index.js'
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const map_key = "7FEBZ-WLWK2-PMGUE-C4BFT-EKXB6-BFFNR"
const appVN=0
const baseurl = "https://bhqh.a.800123456.vip/"
// const baseurl = "http://192.168.0.120:8000/"
let imgurl = baseurl
var  IPurl = baseurl + 'api/'

const limit=20
// if(appVN==0){
// 	imgurl='https://www.wanbonet.com/suxin/106_dianshang/'
// }else{
// 	IPurl = imgurl + 'api/'
// }

// const IPurl=process.env.NODE_ENV === 'production' ? imgurl + 'api/' : 'http://192.168.0.100/api/'

// #ifdef H5
// const IPurl ='http://92.168.0.113:808/api/'
// #endif
const share_title='羊羊当家'
const share_summary='羊羊当家'
const share_img='/static/logo1.png'
/**
 * 请求头
 */
var header= {
		'content-type': 'application/x-www-form-urlencoded',
		// 'token':uni.getStorageSync('token')||'',
		// 'userId':uni.getStorageSync('userId')||''
	}


/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
	console.log("请求参数:", params)
	return params;
}



const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}


const jump = function(e) {
	// console.log(e.currentTarget.dataset.type)
	var datas = e.currentTarget.dataset
	console.log(datas.login == true)
	console.log(store.state.hasLogin)
	if (datas.login == true) {
		if (!store.state.hasLogin) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
			return
		}
	}
	if (datas.type == 'sp') {
		console.log(datas.spurl)
		store.commit('spurl_fuc', datas.spurl)
		uni.navigateTo({
			url: datas.url
		})
		return
	}
	if (datas.type == 'web') {
		console.log(datas.url)
		store.commit('web_url', datas.url)
		uni.navigateTo({
			url: '/pages/web_html/web_html'
		})
		return
	}
	if (datas.type == 2) {
		uni.switchTab({
			url: datas.url
		})
	} else if (datas.type == 3) {
		uni.redirectTo({
			url: datas.url
		})
	} else {
		console.log(datas)
		uni.navigateTo({
			url: datas.url
		})
	}
}
const pveimg = function(e) {
	var current = e.currentTarget.dataset.src
	var urls = e.currentTarget.dataset.array

	let urls1 = []
	if (urls) {
		urls1 = urls

	} else {
		urls1[0] = current
	}
	// console.log(urls1)
	uni.previewImage({
		current: current, // 当前显示图片的http链接
		urls: urls1 // 需要预览的图片http链接列表
	})

}
// // 单个请求
// service.P_get('/cate/list').then(res => {
// 	console.log(res)
// }).catch(e => {
// 	console.log(e)
// })

// // 一个页面多个请求
// Promise.all([
//   service.P_get('/cate/list'),
//   service.P_get(`detail/${id}`)
// ]).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })
const getimg = function(img,type) {
	// return img



	if (!img) return
	if (!type) {
		type = ','
	}
	if(type!='arr'){
		
		img = img.split(type)
	}
	// console.log(imgurl+img)
	if (img[0].indexOf('://') == -1) {
		img = imgurl + img[0]
	}else{
		img = img[0]
	}
	return img
}
const back=function(str,type){
	uni.navigateBack({
		delta:1
	})
}
export default {
	imgurl,
	jump,
	appVN
}
