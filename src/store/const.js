const consts = {
	make:{
			step: 0,//记录创建试卷进行的步骤
			setting: { //基础设置 用于Setting组件
				title: '',
				type: '0',
				remark: '',
				level: 2,
				code: null, //试卷编码
			},
			invigilate: { //属性设置 用于invigilate组件
				activeIndex: 1,
				isOpenForever: true, //是否永久开放
				scope: null, //试卷时间范围
				start: null, //试卷开放时间
				end: null, //试卷开放结束时间
				join: 1, //允许考试次数
				delivery: false, //考试是否限时
				duration: null, //限时时长
				submit: '1', //是否允许随时交卷
				presonal:false,//是否公开试卷

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
		}
}
export default consts;
