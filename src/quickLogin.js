function mobileVerify(mobile) {
	let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/
	if (mobile == "" || mobile == null) {
		return false
	}
	if (!phoneCodeVerification.test(mobile)) {
		return false
	}
	return true
}

function alertHint(msg) {
	var obj = {
		type: "showSweetAlert",
		title: "登录提示",
		content: msg,
		btn: ["确认", ""]
	};
	method.msg_layer(obj);
}

/**默认的cookie键*/
const tokenKey = "EXMA_JWKLSQOPSUECOME"
/**默认的cookie过期时间 3天*/
const expireTimes = 60 * 60 * 24 * 3
var loginVm = new Vue({
	el: "#loginApp",
	data: {
		mobile: "15974076596", // 手机号/邮箱/用户名
		token: "", //登录凭证
		isSend: false,
		isLogin: false,
		vcodepla: "点击获取验证码",
		sendvcodepla: "输入验证码",
		cdtime: 10,
		timeId: null,
		/**当前浏览器的Coookie对象*/
		cookies: this.$cookies,
	},
	created() {
		axios.defaults.withCredentials = true
		this.initPage()
	},
	methods: {
		initPage() {
			axios({
				url: baseUrl + "/initPage",
				method: "GET",
			}).then(res => {
				console.log(res)
				var data = res.data
				if (data.E_BACKSTATUS == "0") {
					loginVm.isLogin = true
				} else {
					loginVm.isLogin = false
					alertHint(data.E_BACKINFO)
				}
			})
		},
		subLogin() {
			//登录信息验证
			if (!this.verfiyLogin()) {
				return
			}
			var user = this.mobile
			//登录凭证加密
			var token = aesMinEncrypt(this.token)
			console.log("token:" + token)
			axios({
				url: baseUrl + "/serviceLogin",
				method: "POST",
				params: {
					user: user,
					token: token,
					loginType: 1,
				}
			}).then(res => {
				console.log(res)
				var data = res.data
				if (data.E_BACKSTATUS == "0") {
					loginVm.isLogin = true
					window.location.hash = "#loginButton"
					//保存登录记录到cookie 默认3天
					this.cookies.set(tokenKey, res.msg,expireTimes)
					alertHint("登录成功!")
				} else {
					alertHint(data.E_BACKINFO)
				}
			})
		},
		/**
		 * 发送验证码
		 * */
		sendVerifyCode() {
			var mobile = this.mobile
			var vcodepla = this.vcodepla
			if (vcodepla == "号码格式有误,点击重试" || vcodepla == "验证码发送失败,点击重试") {
				this.vcodepla = "点击获取验证码"
				return
			}
			if (vcodepla == "正在发送验证码" || vcodepla != "点击获取验证码") {
				return
			}

			if (!mobileVerify(mobile)) {
				this.vcodepla = "号码格式有误,点击重试"
				return
			}
			this.vcodepla = "正在发送验证码"
			axios({
				url: baseUrl + "/sendVcode",
				method: "POST",
				params: {
					mobile: aesMinEncrypt(mobile), //手机号加密
				}
			}).then(res => {
				if (res.data.E_BACKSTATUS == "0") {
					loginVm.vcodepla = "重新获取验证码" + "(" + loginVm.cdtime + "s)"
					loginVm.isSend = true
					loginVm.starttime()
					console.log(res)
				} else {
					loginVm.vcodepla = "验证码发送失败,点击重试"
				}
			})
		},
		/**
		 * 登录验证
		 * */
		verfiyLogin() {
			var mobile = this.mobile
			var token = this.token
			/**
			 * 0 手机号+验证码 = 登录/注册
			 * 1 手机号+密码 = 登录
			 * */

			if (mobile == "" || mobile == null) {
				alertHint("请先填写手机号")
				return false
			}
			if (!mobileVerify(mobile)) {
				alertHint("请检查手机号是否正确")
				return false
			}
			if (token == "" || token == null) {
				alertHint("请先填写验证码")
				return false
			}
			if (token.length != 6) {
				alertHint("验证码错误")
				return false
			}
			return true
		},
		starttime() {
			this.timeId = self.setInterval(function() {
				if (loginVm.cdtime == 0) {
					clearInterval(loginVm.timeId)
					loginVm.vcodepla = "点击获取验证码"
					loginVm.cdtime = 10
					return
				}
				loginVm.cdtime--
				loginVm.vcodepla = "重新获取验证码" + "(" + loginVm.cdtime + "s)"
			}, 1000);
		},
	}
})
