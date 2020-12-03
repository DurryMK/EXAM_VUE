<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
	import Mock from 'mockjs'
	//使用mockjs模拟数据
	Mock.mock("https://www.mytesttests.com/initPage", {
		"E_BACKSTATUS": "0", 
	});
	Mock.mock("https://www.mytesttests.com/home/initPage", {
		"E_BACKSTATUS": "0", 
		user: {
			username: "@name",
			imgUrl: "./img/yy3.jpg",
		}
	});
	Mock.mock("https://www.mytesttests.com/personal/initPage", {
		"E_BACKSTATUS": "0", 
		user: {
			username: "@name",
			imgUrl: "./img/yy3.jpg",
			rname:"@name",
			mobile: "159****6596",
			qq:"310286339",
			isRname:'@boolean',
			school:'北京瞎扯大学',
			major:'好自为之专业',
		}
	});
	export default {
		name: 'app',
		components: {
		},
		data() {
			return {
				isLogin: false,
			}
		},
		mounted() {
			this.$axios.defaults.withCredentials = true
			this.$router.push("/Loading")
			this.initPage()
		},
		methods: {
			initPage() {
				this.$axios({
					url: this.baseUrl + "/initPage",
					method: "GET",
				}).then(res => {
					console.log("App.vue:"+res)
					if (res.data.E_BACKSTATUS == '0') {
						//已有登录状态  直接跳转个人页面
						this.$router.push("/EXAM")
						this.isLogin = true
					} else {
						//未登录 解析Cookie进行自动登录
						this.cookieLogin()
					}
				}).catch(e => {
					console.log("网络异常")
					this.$router.push("/EXAM")
				})
			},
			cookieLogin() {
				var login_token = this.$cookie.get("EXAM_USER")
				if (login_token == '' || login_token == undefined || login_token == null) {
					this.$router.push("/Login")
					return
				}
				axios({
					url: this.baseUrl + "/AutoLogin",
					method: "POST",
					params: {
						token: login_token,
					}
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//成功登录
						this.$router.push("/Home")
					} else {
						//登录失败 跳转到登录界面
						this.$router.push("/Login")
					}
				}).catch(e => {
					console.log("连接异常")
					this.$router.push("/Login")
				})
			},
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
