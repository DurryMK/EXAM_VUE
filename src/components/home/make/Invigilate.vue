<template>
	<el-container>
		<el-aside width="200px">
			<el-row class="tac">
				<el-col :span="24">
					<el-menu style="height: 95%;" default-active="invigilate.activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
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
			<el-col :span="24" v-show="invigilate.activeIndex == 1">
				<el-form ref="form" :model="invigilate" label-width="160px" label-position="left">
					<el-form-item label="是否永久开放">
						<el-col :span="1">
							<el-switch v-model="invigilate.isOpenForever">
							</el-switch>
						</el-col>
						<el-col :offset="2" :span="15" v-show="!invigilate.isOpenForever">
							<el-date-picker v-model="invigilate.scope" type="datetimerange" align="right" start-placeholder="开始日期"
							 end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']">
							</el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="是否允许所有人查看" style="width: 20%;">
						<el-switch v-model="invigilate.presonal"></el-switch>
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
			<el-col :span="24" v-show="invigilate.activeIndex == 2">
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
			<el-col :span="24" v-show="invigilate.activeIndex == 3">
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
	import jutils from 'jutils-src'
	import {mapState} from 'vuex'
	export default {
		name: 'Invigilate',
		mounted() {
			this.restaurants = this.loadAll();
		},
		data() {
			return {
				restaurants: null,
			}
		},
		computed:{
			...mapState({
				invigilate:state=>state.make.invigilate
			})
		},
		methods: {
			getInvigolateDate() { //此方法用于处理本页面的数据 ， 并反馈到父组件
				let data = this.invigilate
				let scope = this.invigilate.scope
				if (!data.isOpenForever && (scope == null || scope == '')) { //选择了限时 但没选择时间范围
					this.hint("请选择一个试卷开放的时间范围", 'warning')
					return null
				}
				//如果选择了限时开放 对起始时间做格式处理
				if (!data.isOpenForever) {
					data.start = jutils.formatDate(new Date(scope[0]), "YYYY-MM-DD HH:ii:ss");
					data.end = jutils.formatDate(new Date(scope[1]), "YYYY-MM-DD HH:ii:ss");
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
							return null
						}
					} else {
						this.hint("考试时长格式错误", 'error')
						return null
					}
					data.duration = duration
				}
				//提交到store
				this.$store.commit('saveCurrinvigilate',data)
				return data
			},
			handleSelect(key, keyPath) { //导航菜单被选中时触发
				this.invigilate.activeIndex = key
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
