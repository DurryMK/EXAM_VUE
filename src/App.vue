<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
	import Mock from 'mockjs'
	//使用mockjs模拟数据
	Mock.mock("https://www.mytesttests.com/app/initPage", {
		"E_BACKSTATUS": "0", 
	});
	Mock.mock("https://www.mytesttests.com/home/initPage", {
		"E_BACKSTATUS": "0", 
		user: {
			username: "@name",
			imgUrl: "./img/yy3.jpg",
			isRname:"1"
		}
	});
	Mock.mock("https://www.mytesttests.com/home/personal/initPage", {
		"E_BACKSTATUS": "0", 
		E_BACKINFO: {
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
	Mock.mock("https://www.mytesttests.com/home/realName", {
		"E_BACKSTATUS": "-1", 
		E_BACKINFO: {
			rname:"吹*皮",
			idCard: "43*********1252X",
			mobile: "159****6596",
			rTime:"2020-12-09"
		}
	});
	export default {
		name: 'app',
		components: {},
		data() {
			return {
			}
		},
		mounted() {
			this.$router.push("/Loading")
			console.log(this.$cookie.get(this.cookieKey))
			this.initPage()
		},
		methods: {
			initPage() {
				this.$axios({
					url: "/app/initPage",
					method: "GET",
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//1.已有登录状态  直接跳转个人页面
						this.$router.push("/EXAM")
					} else {
						//2.未登录 解析Cookie进行自动登录
						this.autoLogin()
					}
				}).catch(e => {
					this.$router.push("/Login")
				})
			},
			autoLogin() {
				var login_token = this.$cookie.get(this.cookieKey)
				console.log("SessionID:"+this.$cookie.get("JSESSIONID"))
				if (login_token == '' || login_token == undefined || login_token == null) {
					//3.没有登录Token 跳转到登录界面
					this.$router.push("/Login")
					return
				}
				axios({
					url: "/access/autoLogin",
					method: "POST",
					params: {
						token: login_token,
					}
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//成功登录
						this.$router.push("/Home")
					} else {
						//自动登录失败 跳转到登录界面
						this.$router.push("/Login")
					}
				}).catch(e => {
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
