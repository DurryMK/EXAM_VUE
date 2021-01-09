<template>
	<div id="app">
		<router-view></router-view>
		<!-- <test></test> -->
	</div>
</template>
<script>
	import test from './components/test.vue'
	export default {
		name: 'app',
		components: {
			test,
		},
		data() {
			return {}
		},
		mounted() {
			this.$router.push("/Loading")
			//初始化页面  调用登录方法
			this.initPage()
			//页面刷新时，将store保存到本地仓库 避免刷新页面后数据重置
			window.addEventListener('unload', this.saveState)
		},
		methods: {
			saveState() {
				sessionStorage.setItem('state', JSON.stringify(this.$store.state))
			},
			initPage() {
				this.$axios({
					url: "/app/initPage",
					method: "GET",
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//公钥保存到store
						this.$store.commit('savePrivateKey', res.data.E_BACKINFO)
						//1.已有登录状态  直接跳转个人页面
						this.$router.push("/INTELLIE")
					} else {
						//2.未登录 解析Cookie进行自动登录
						this.autoLogin()
					}
				}).catch(e => {
					this.hint("网络异常","error")
					this.$router.push("/Error")
				})
			},
			autoLogin() {
				this.$axios({
					url: "/access/autoLogin",
					method: "GET",
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//公钥保存到store
						this.$store.commit('savePrivateKey', res.data.E_BACKINFO)
						//成功登录
						this.$router.push("/INTELLIE")
					} else {
						//自动登录失败 跳转到登录界面
						this.$router.push("/Login")
					}
				}).catch(e => {
					this.hint("网络异常","error")
					this.$router.push("/Error")
				})
			},
		}
	}

	// import Mock from 'mockjs'
	// var url = "https://www.mytesttests.com"
	// //使用mockjs  为各个请求提供假数据
	// Mock.mock(url + "/app/initPage", {
	// 	"E_BACKSTATUS": "0",
	// });
	// Mock.mock(url + "/home/initPage", {
	// 	"E_BACKSTATUS": "0",
	// 	E_BACKINFO: {
	// 		username: "@name",
	// 		imgUrl: "./img/yy3.jpg",
	// 		isRname: "1"
	// 	}
	// });
	// Mock.mock(url + "/home/personal/initPage", {
	// 	"E_BACKSTATUS": "0",
	// 	E_BACKINFO: {
	// 		username: "@name",
	// 		imgUrl: "./img/yy3.jpg",
	// 		rname: "@name",
	// 		mobile: "159****6596",
	// 		qq: "310286339",
	// 		isRname: '@boolean',
	// 		school: '北京瞎扯大学',
	// 		major: '好自为之专业',
	// 	}
	// });
	// Mock.mock(url + "/home/realName", {
	// 	"E_BACKSTATUS": "-1",
	// 	E_BACKINFO: {
	// 		rname: "吹*皮",
	// 		idCard: "43*********1252X",
	// 		mobile: "159****6596",
	// 		rTime: "2020-12-09"
	// 	}
	// });
	// Mock.mock(RegExp(url + "/make/makeFirstStep.*"), "post", {
	// 	E_BACKSTATUS: "0",
	// 	E_BACKINFO: "试卷已保存"
	// });
	// Mock.mock(RegExp(url + "/make/setting/getUserTypeList.*"), "get", {
	// 	E_BACKSTATUS: "0",
	// 	E_BACKINFO: [{
	// 		key: '0',
	// 		value: '默认'
	// 	}, {
	// 		key: '1010',
	// 		value: '科技'
	// 	}, {
	// 		key: '1001',
	// 		value: '算法'
	// 	}, {
	// 		key: '1111',
	// 		value: '文学'
	// 	}, {
	// 		key: '1112',
	// 		value: '历史'
	// 	}]
	// });
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
