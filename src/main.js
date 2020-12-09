import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import VueCookies from 'vue-cookies'
import Qs from 'qs'

Vue.use(VueCookies)
Vue.prototype.$cookie = VueCookies
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)

//请求默认地址
axios.defaults.baseURL = "http://127.0.0.1:8763/exam_du"
//设置cross跨域 并设置访问权限 允许跨域携带cookie信息 解决Session不一致的问题 
axios.defaults.withCredentials=true
axios.defaults.crossDomain = true
// Vue.prototype.baseUrl = "https://www.mytesttests.com"//测试地址
Vue.prototype.cookieKey = "EXMA_USER"

Vue.prototype.getUUID = function() { //一个生成唯一id的函数  挂载到Vue上
	var s = [];
	var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] = "4"
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
	s[8] = s[13] = s[18] = s[23] = "-"
	let uuid = s.join("")
	return uuid
}
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
