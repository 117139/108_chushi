import App from './App'

import service from "@/common/service.js"
Vue.prototype.$service = service;
import store from 'store'
Vue.prototype.$store = store;
Vue.prototype.$Store = store;

 //页面跳转
import sjuNav from './common/sju.nav.js'
Vue.prototype.$sjuNav = sjuNav


import topbar from './components/top_bar/top_bar.vue'
Vue.component('topbar',topbar)
import tabList from '@/components/tab-list/tab-list.vue'
Vue.component('tab-list',tabList)



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif