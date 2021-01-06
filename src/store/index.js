import Vue from 'vue'
import Vuex from 'vuex'
import consts from './const'
//引入Vuex 项目的全局数据管理中心
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
	state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
		publicKey: "",
		make: {
			step: 0, //记录创建试卷进行的步骤
			setting: { //基础设置 用于Setting组件
				title: '',
				type: '0',
				remark: '',
				level: 2,
				code: null, //试卷编码
			},
			invigilate: { //属性设置 用于invigilate组件
				activeIndex: 1,
				isOpenForever: false, //是否永久开放
				scope: null, //试卷时间范围
				start: null, //试卷开放时间
				end: null, //试卷开放结束时间
				join: 1, //允许考试次数
				delivery: false, //考试是否限时
				duration: null, //限时时长
				submit: '1', //是否允许随时交卷

				isRname: false, //仅允许实名考生参加
				isDoRame: false, //考前进行人脸识别
				isCopy: false, //是否允许复制试卷内容
				isPaste: false, //是否允许在试卷粘贴
				isCamera: false, //是否开启摄像头监考
				page: 0, //允许切屏次数
				leave: 0, //允许离开摄像头界面的次数

				passMark: '恭喜过关，再接再厉', //试卷评语
				noMark: '别灰心，下次加油', //试卷评语
				isShowResult: '1',
			},
		},
	},
	mutations: {
		// 保存密钥
		savePrivateKey(state, data) {
			state.publicKey = data;
		},
		// 初始化当前make的信息
		initMakeInfo(state) {
			state.make = consts.make;
		},
		//保存当前新建试卷的基础设置
		saveCurrSetting(state, data) {
			state.make.setting = data;
		},
		//保存当前新建试卷的属性设置
		saveCurrinvigilate(state, data) {
			state.make.invigilate = data;
		},
		// 保存当前新建试卷的步骤
		saveMakeStep(state, data) {
			state.make.step = data;
		},
	},
	getters:{
		getInvigilate(state){
			return state.make.invigilate
		}
	}

})

export default store
