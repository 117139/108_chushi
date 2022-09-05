import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import Http from '../common/js/http.js'

const store = new Vuex.Store({
	state: {
		loginDatas:'',//登录返回信息
		hasLogin:false,
		loginDatas_user:'', //系统用户信息
		token:'',
		loginPage:'',
		userDatas:'', //微信用户信息
		
		
		cityList:'',
		basedata:'',
		
		
		
		isLogin: false,
		isSDKReady: false, // TIM SDK 是否 ready
		conversationActive: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		conversationList: [], //会话列表
		currentMessageList: [], //消息列表
		
		
		
		Storedatas:'', //店长信息
	},
	mutations: {
		
		set_basedata(state, basedata) {
			state.basedata = basedata||[]
		},
		setplatform(state, platform) {
			state.platform = platform
		},
		login(state, loginDatas) {
			state.hasLogin = true
			state.loginDatas = loginDatas
			console.log('loginDatas---->')
			console.log(state.loginDatas)
			uni.setStorageSync('loginDatas', loginDatas)
			
			console.log('token',uni.getStorageSync('token'))
			
			
			// setTimeout(()=>{
			// 	uni.$emit('login_call', {
			// 		title: ' 登录了 ',
			// 		content: ''
			// 	});
			// },1000)
		},
		
		logout(state) {
			console.log('logout')
			state.loginDatas = ''
			state.token = ''
			// uni.removeStorageSync('token')
			state.hasLogin = false
		},
	
		setbasedata(state, basedata) {
			state.basedata = basedata
		},
		
		
		
		
	},
	
})
export default store
