import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import axios from 'axios'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import VueCookies from 'vue-cookie'
import Qs from 'qs'
import VueClipboard from 'vue-clipboard2'
import consts from './store/const'
Vue.use(ElementUI)
Vue.use(router) //路由
Vue.use(VueClipboard) //用于操作剪切板
Vue.use(VueCookies)

Vue.prototype.$axios = axios //异步请求
Vue.prototype.$qs = Qs //json数据格式转化
Vue.config.productionTip = false

//设置cross跨域 并设置访问权限 允许跨域携带cookie信息 解决Session不一致的问题 谷歌除外
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

//请求默认地址
axios.defaults.baseURL = "http://127.0.0.1:8763/exam_du"

Vue.prototype.upLoad = "http://127.0.0.1:8763/exam_du/upload"
//配置统一的请求头 添加Authorization参数
axios.interceptors.request.use(function(config) {
		var key = store.state.publicKey
		if (key == '' || key == null || key == undefined)
			key = 'xxxx'
		config.headers['Authorization'] = getAuthorization(key);
		return config;
	},
	function(err) {
		return Promise.reject(err);
	})

//登录Cookie的key
Vue.prototype.cookieKey = "EXMA_USER"

//生成API访问标识符
function getAuthorization(key) {
	var s = [];
	var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] = "4"
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
	s[8] = s[13] = s[18] = s[23] = "-"
	let uuid = s.join("")
	var author = new Date().getTime() + ";" + uuid
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(key);
	var encrypted = encrypt.encrypt(JSON.stringify(author));
	return encrypted
}

//在界面上弹出提示信息的函数  挂载到Vue上 msg:提示信息  type:弹出框的样式 success/warning/info/error	
Vue.prototype.hint = function(msg, type) {
	this.$message({
		message: msg,
		type: type,
		duration: 900,
		offset: 25
	});
}

//生成唯一编号的函数  挂载到Vue上
Vue.prototype.getUUID = function() {
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
	store,
	render: h => h(App),
}).$mount('#app')
