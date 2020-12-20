import Vue from 'vue'
import Vuex from 'vuex'

//引入Vuex 项目的全局数据管理中心
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
	state: {
		setting: { //基础设置 用于Setting组件
			title: '',
			type: '0',
			remark: '',
			level: 2,
			code: null, //试卷编码
		},
	},
	mutations: {
		//保存当前新建试卷的基础设置
		saveCurrSetting(state, data) {
			state.setting = data;
		},
		// 保存所有数据源
		saveDbSource(state, DbSource) {
			state.DbSource = DbSource;
		}
	}

})

export default store
