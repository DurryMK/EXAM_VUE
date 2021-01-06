<template>
	<el-container style="height: 100%;padding: 0px;">
		<el-header style="height: 10%;">
			<el-steps :active="active" finish-status="success" simple>
				<el-step title="属性设置"></el-step>
				<el-step title="监考设置"></el-step>
				<el-step title="添加试题"></el-step>
				<el-step title="发布试卷"></el-step>
			</el-steps>
		</el-header>
		<el-main style="height: 80%;padding: 10px;">
			<el-row>
				<!-- 基础属性设置 -->
				<el-col v-show="active==0" :span="14" :offset="5">
					<Setting ref="SettingData"></Setting>
				</el-col>
				<!-- 监考属性设置 -->
				<el-col :span="22" :offset="1" v-show="active==1">
					<Invigilate ref="invigilateData"></Invigilate>
				</el-col>
				<!-- 试题添加 -->
				<el-col :span="18" :offset="3" v-show="active==2">
					<el-container>
						<el-header>
							<el-row>
								<el-button type="primary" plain @click="dialogSelect = true"><i class="el-icon-zoom-in"></i>&nbsp;从题库中选择</el-button>
								<el-button type="success" plain @click="dialogCreate = true"><i class="el-icon-circle-plus"></i>&nbsp;创建新的试题</el-button>
								<el-button type="info" plain @click="dialogUpload = true"><i class="el-icon-upload2"></i>&nbsp;从文件导入</el-button>
								<el-button icon="el-icon-refresh-right" size="mini" circle></el-button>
							</el-row>
						</el-header>
						<el-main style='margin-top: 10px;'>
						</el-main>
					</el-container>
				</el-col>
				<!-- 发布试卷 -->
				<el-col :span="14" :offset="5" v-show="active==3">
					<el-form ref="form" label-position="left">
						<el-form-item>
							<el-row>
								<el-button type="primary" plain><i class="el-icon-s-promotion"></i>&nbsp;发布试卷</el-button>
								<el-button type="success" plain><i class="el-icon-s-order"></i>&nbsp;保存但不发布</el-button>
							</el-row>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
		<el-footer style="height: 10%;">
			<el-button plain round type="warning" style="width: 25%;margin-top: 5px;" v-show="active>0" @click="toStep(-1)">上一步</el-button>
			<el-button plain round type="warning" style="width: 25%;margin-top: 5px;" v-show="active<3" @click="stepHandle(1)">保存并进入下一步</el-button>
		</el-footer>
		<!-- 说明文字的弹框 -->
		<el-dialog title="说明" :visible.sync="dialogMark" width="80%">
			<ul>
				<li>
					<span>{{systemMark}}</span>
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogMark = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 从题库选择的弹框 -->
		<el-dialog title="选择题目" :visible.sync="dialogSelect" width="80%">
			<PersonalQue></PersonalQue>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogSelect = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 新建题目 -->
		<el-dialog title="新建题目" :visible.sync="dialogCreate" width="80%">
			<addQuestion></addQuestion>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogCreate = false">关 闭</el-button>
			</span>
		</el-dialog>
		<!-- 上传文件 -->
		<el-dialog title="上传文件" :visible.sync="dialogUpload" width="80%">
			<Upload></Upload>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogUpload = false">确 定</el-button>
			</span>
		</el-dialog>
	</el-container>

</template>

<script>
	import PersonalQue from '../PersonalQue.vue'
	import addQuestion from '../addQuestion.vue'
	import Upload from './Upload.vue'
	import Invigilate from './Invigilate.vue'
	import Setting from './Setting.vue'

	export default {
		name: 'make',
		props: {},
		components: {
			PersonalQue,
			addQuestion,
			Upload,
			Invigilate,
			Setting
		},
		data() {
			return {
				active: 0,
				restaurants: [],
				systemMark: "", //对于各项设置的文字说明

				dialogMark: false,
				dialogSelect: false,
				dialogCreate: false,
				dialogUpload: false,

				questions: [],
			};
		},
		created() {},
		mounted() {
			//每次加载页面时 从数据中心获取当前执行的步骤
			this.active = this.$store.state.make.step
			this.initPage()
		},
		methods: {
			initPage() {},
			stepHandle(i) { //跳转步骤时对当前页面内容做校验
				switch (this.active) {
					case 0:
						this.makeFirstStep(i) //第一步保存基础设置
						break;
					case 1:
						this.makeSecondStep(i) //第二步保存属性设置
						break;
					default:
						break;
				}
			},
			makeFirstStep(i) {
				//获取子组件的基础设置数据
				let setting = this.$refs.SettingData.getSettingData()
				if (setting == null) return
				this.$axios({ //保存基础设置信息
					url: '/make/makeFirstStep',
					method: 'POST',
					params: setting
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//保存试卷信息成功
						this.hint(res.data.E_BACKINFO, 'success')
						//跳到下一步
						this.toStep(i)
						//提交到store
						this.$store.commit('saveCurrSetting', setting)
					} else {
						this.hint(res.data.E_BACKINFO, 'warning')
					}
				}).catch(e => {
					this.hint("网络异常，请稍后再试", 'error')
				})
			},
			makeSecondStep(i) {
				//通过ref获取子组件的参数
				var _invi = {}
				_invi = this.$refs.invigilateData.getInvigolateDate()
				if (_invi == null) return
				//此操作为了解决一个很蛇皮的问题 不可省略
				var scope = _invi.scope
				_invi.scope = ''
				this.$axios({ //保存属性设置信息
					url: '/make/makeSecondStep',
					method: 'POST',
					params: _invi
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//保存试卷设置成功
						this.hint(res.data.E_BACKINFO, 'success')
						//跳到下一步
						this.toStep(i)
						_invi.scope = scope
					} else {
						this.hint(res.data.E_BACKINFO, 'warning')
					}
				}).catch(e => {
					this.hint("网络异常，请稍后再试", 'error')
				})
			},
			toStep(i) { //跳转步骤
				if (this.active + i > 3 || this.active + i < 0) return
				this.active += i
				this.$store.commit('saveMakeStep', this.active)
			},
		},
	}
</script>

<style>
</style>
