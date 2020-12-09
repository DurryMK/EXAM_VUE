// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来

import App from '../App.vue'
const Personal = () => import("@/components/Personal")
const Loading = () => import("@/components/Loading")
const Home = () => import("@/components/Home")
const Welcome = () => import("@/components/Welcome")
const List = () => import("@/components/Testlist")
const Login = () => import("@/components/Login")
const Make = () => import("@/components/Make")
const QuestionList = () =>import("@/components/QuestionList")
Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
// 2. 定义路由
// 每个路由应该映射一个组件。

const routes = [{
		path: '/',
		name: 'App', //页面入口
		component: App //对应的组件模板
	},
	{
		path: '/Login',
		name: 'Login', //登录组件，
		component: Login //对应的组件模板
	},
	{
		path: '/Loading',
		name: 'Loading', //过渡组件，
		component: Loading //对应的组件模板
	}, {
		path: '/EXAM',
		name: 'Home', //主页面，
		component: Home, //对应的组件模板
		children: [{
				path: '/List',
				name: 'List', //试卷列表，
				component: List //对应的组件模板
			}, {
				path: '/make',
				name: 'Make', //创建试卷，
				component: Make //对应的组件模板
			},
			{
				path: '/Welcome',
				name: 'Welcome', //欢迎页面，
				component: Welcome //对应的组件模板
			},
			{
				path: '/Personal',
				name: 'Personal', //个人页面，
				component: Personal //对应的组件模板
			}, {
				path: '/List',
				name: 'List', //题目列表，
				component: List //对应的组件模板
			},
			{
				path: '/QuestionList',
				name: 'QuestionList', //题目列表，
				component: QuestionList //对应的组件模板
			}
		]
	}
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
	routes
})

export default router
