<template>
	<el-container>
		<el-aside width="200px">
			<el-row class="tac">
				<el-col :span="24">
					<el-menu style="height: 95%;" default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
						<el-menu-item index="1">
							<i class="el-icon-menu"></i>
							<span slot="title">权限设置</span>
						</el-menu-item>
						<el-menu-item index="2">
							<i class="el-icon-document"></i>
							<span slot="title">防作弊设置</span>
						</el-menu-item>
						<el-menu-item index="3">
							<i class="el-icon-setting"></i>
							<span slot="title">评卷设置</span>
						</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</el-aside>
		<el-main>
			<!-- 权限设置 -->
			<el-col :span="24" v-show="activeIndex == 1">
				<el-form ref="form" :model="invigilate" label-width="160px" label-position="left">
					<el-form-item label="是否限时开放">
						<el-col :span="2">
							<el-switch v-model="invigilate.isOpenForever">
							</el-switch>
						</el-col>
						<el-col :span="20" v-show="!invigilate.isOpenForever">
							<el-date-picker v-model="scope" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期"
							 :default-time="['12:00:00', '08:00:00']">
							</el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="考试是否限时" style="width: 20%;">
						<el-switch v-model="invigilate.delivery"></el-switch>
					</el-form-item>
					<el-form-item label="设置考试时长" v-show="invigilate.delivery" style="width: 45%;">
						<el-autocomplete class="inline-input" v-model="invigilate.duration" :fetch-suggestions="querySearch" placeholder="请输入一个时长"
						 clearable></el-autocomplete>
					</el-form-item>
					<el-form-item label="交卷限制" style="width: 20%;">
						<el-radio v-model="invigilate.submit" label="1">允许随时交卷</el-radio>
						<el-radio v-model="invigilate.submit" label="2">完成所有试题后交卷</el-radio>
					</el-form-item>
					<el-form-item label="允许考试次数">
						<el-col :span="8">
							<el-input-number size="medium" v-model="invigilate.join" :min="1" :max="100"></el-input-number>
						</el-col>
					</el-form-item>
				</el-form>
			</el-col>
			<!-- 反作弊设置 -->
			<el-col :span="24" v-show="activeIndex == 2">
				<el-form ref="form" :model="invigilate" label-width="160px" label-position="left">
					<el-form-item label="允许切屏次数">
						<el-col :span="8">
							<el-input-number size="medium" v-model="invigilate.page" :min="0" :max="100"></el-input-number>
						</el-col>
					</el-form-item>
					<el-form-item label="禁止复制试卷内容">
						<el-col :span="3">
							<el-switch v-model="invigilate.isCopy"></el-switch>
						</el-col>
					</el-form-item>
					<el-form-item label="禁止试卷内粘贴内容">
						<el-col :span="3">
							<el-switch v-model="invigilate.isPaste"></el-switch>
						</el-col>
					</el-form-item>
					<el-form-item>
						<template slot="label">
							<span style="font-size: 12px;">仅允许实名考生参加</span>&nbsp;&nbsp;&nbsp;<i class="el-icon-info" @click="dialogHint('isRname')"></i>
						</template>
						<el-col :span="3">
							<el-switch v-model="invigilate.isRname"></el-switch>
						</el-col>
					</el-form-item>
					<el-form-item v-show="invigilate.isRname">
						<template slot="label">
							<span>考前进行人脸识别</span>&nbsp;&nbsp;&nbsp;<i class="el-icon-info" @click="dialogHint('isRname')"></i>
						</template>
						<el-col :span="3">
							<el-switch v-model="invigilate.isDoRame"></el-switch>
						</el-col>
					</el-form-item>
					<el-form-item>
						<template slot="label">
							启用摄像头监考&nbsp;&nbsp;&nbsp;<i class="el-icon-info"></i>
						</template>
						<el-col :span="3">
							<el-switch v-model="invigilate.isCamera"></el-switch>
						</el-col>
					</el-form-item>
					<el-form-item label="允许离开摄像头次数" v-show="invigilate.isCamera">
						<el-col :span="8">
							<el-input-number v-model="invigilate.leave" :min="1" :max="10"></el-input-number>
							</el-input>
						</el-col>
					</el-form-item>
				</el-form>
			</el-col>
			<!-- 评卷设置 -->
			<el-col :span="24" v-show="activeIndex == 3">
				<el-form ref="form" :model="invigilate" label-width="160px" label-position="left">
					<el-form-item label="对及格考生的评语">
						<el-input type="textarea" placeholder="请输入内容" v-model="invigilate.passMark" maxlength="200" show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="对不及格考生的评语">
						<el-input type="textarea" placeholder="请输入内容" v-model="invigilate.noMark" maxlength="200" show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="考试结果显示" style="width: 20%;">
						<el-radio v-model="invigilate.isShowResult" label="1">考试结束后立即显示</el-radio>
						<el-radio v-model="invigilate.isShowResult" label="2">试卷开放时间结束后发布</el-radio>
					</el-form-item>
				</el-form>
			</el-col>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'Invigilate',
		mounted() {
			this.restaurants = this.loadAll();
		},
		data() {
			return {
				activeIndex: 1,
				scope: null, //试卷时间范围
				invigilate: {
					isOpenForever: true, //是否永久开放
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
				restaurants: null,
			}
		},
		methods: {
			getInvigolateDate() { //此方法用于处理本页面的数据 ， 并反馈到父组件
				let data = this.invigilate
				let scope = this.scope
				if (!data.isOpenForever && scope == null) { //选择了限时 但没选择时间范围
					this.hint("请选择一个试卷开放的时间范围", 'warning')
					return
				}
				//如果选择了限时开放 对起始时间做格式处理
				if (!data.isOpenForever) {
					let start = new Date(scope[0])
					let end = new Date(scope[1])
					data.start = start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDay() + "-" + start.getHours() +
						"-" + start.getMinutes() + "-" + start.getSeconds()
					data.end = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDay() + "-" + end.getHours() + "-" + end.getMinutes() +
						"-" + end.getSeconds()
				}
				//如果选择了限时考试 对考试时间做格式判断
				if (data.delivery) {
					let duration = data.duration
					duration = duration.replace("分钟", "")
					var re = /^[0-9]+$/;
					if (re.test(duration)) {
						//单场考试时间不超过24小时
						if (duration > 1440) {
							this.hint("试卷考试时长过长", 'warning')
							return
						}
					} else {
						this.hint("考试时长格式错误", 'error')
						return
					}
					data.duration = duration
				}
				return data
			},
			handleSelect(key, keyPath) { //导航菜单被选中时触发
				this.activeIndex = key
			},
			loadAll() {
				return [{
						"value": "30分钟",
					},
					{
						"value": "60分钟",
					},
					{
						"value": "90分钟",
					},
					{
						"value": "120分钟",
					},
					{
						"value": "150分钟",
					},
				];
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
		}
	}
</script>

<style>
</style>
