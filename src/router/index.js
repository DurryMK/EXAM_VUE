// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来

import App from '../App.vue'
//核心组件  考试面板
const Core = () =>import("@/components/core/Core")
//加载页
const Loading = () => import("@/components/Loading")
//个人中心面板
const Home = () => import("@/components/home/Home")
//登录页
const Login = () => import("@/components/login/Login")
//创建试卷面板
const Make = () => import("@/components/home/make/Make")
//个人信息面板
const Personal = () => import("@/components/home/Personal")
//欢迎页
const Welcome = () => import("@/components/Welcome")
//试卷列表面板
const PaperList = () => import("@/components/home/PaperList")
//系统题库列表
const QuestionList = () =>import("@/components/home/QuestionList")
//实名认证面板
const RealName = () =>import("@/components/home/RealName")
//个人题库面板
const PersonalQue = () =>import("@/components/home/PersonalQue")
//数据分析面板
const Analysis = () =>import("@/components/home/Analysis")
//成员列表面板
const Memeber = () =>import("@/components/home/Memeber")
//查看成绩面板
const ScoreView = () =>import("@/components/home/ScoreView")

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
// 2.定义路由
// 每个路由映射一个组件。
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
		path: '/Core',
		name: 'Core', //核心组件，考试面板
		component: Core //对应的组件模板
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
				path: '/PaperList',
				name: 'PaperList', //试卷列表，
				component: PaperList //对应的组件模板
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
			}, 
			{
				path: '/QuestionList',
				name: 'QuestionList', //题目列表，
				component: QuestionList //对应的组件模板
			},
			{
				path: '/RealName',
				name: 'RealName', //实名认证界面，
				component: RealName //对应的组件模板
			},
			{
				path: '/PersonalQue',
				name: 'PersonalQue', //个人题库界面，
				component: PersonalQue //对应的组件模板
			},
			{
				path: '/Analysis',
				name: 'Analysis', //数据分析界面，
				component: Analysis //对应的组件模板
			},
			{
				path: '/Memeber',
				name: 'Memeber', //数据分析界面，
				component: Memeber //对应的组件模板
			},
			{
				path: '/ScoreView',
				name: 'ScoreView', //查看成绩界面，
				component: ScoreView //对应的组件模板
			},
		]
	}
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
	routes
})

export default router
