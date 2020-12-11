<template>
	<el-container style="height: 100%;">
		<el-header style="height: 10%;">
			<el-steps :active="active" finish-status="success" simple>
				<el-step title="属性设置"></el-step>
				<el-step title="监考设置"></el-step>
				<el-step title="添加试题"></el-step>
				<el-step title="发布试卷"></el-step>
			</el-steps>
		</el-header>
		<el-main style="height: 80%;">
			<el-row>
				<el-col :span="14" :offset="5">
					<!-- 基础属性设置 -->
					<el-form v-show="active==0" ref="form" :model="setting" label-width="100px" label-position="left">
						<el-form-item label="试卷标题">
							<el-input placeholder="输入试卷的标题,不超过50个字" v-model="setting.title" clearable>
							</el-input>
						</el-form-item>
						<el-form-item label="试卷开放时间">
							<el-col :span="11">
								<el-date-picker type="datetime" placeholder="开始时间" v-model="setting.date1" style="width: 100%;"></el-date-picker>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
								<el-date-picker type="datetime" placeholder="结束时间" v-model="setting.date2" style="width: 100%;"></el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item label="是否限时" style="width: 20%;">
							<el-switch v-model="setting.delivery"></el-switch>
						</el-form-item>
						<el-form-item label="设置考试时长" v-show="setting.delivery"  style="width: 45%;">
							<el-autocomplete class="inline-input" v-model="setting.duration" :fetch-suggestions="querySearch" placeholder="请输入一个时长"
							 @select="handleSelect" clearable></el-autocomplete>
						</el-form-item>
						<el-form-item label="预计试卷难度" style="width: 40%;">
							<el-rate v-model="setting.level" show-text :texts="['简单','一般','中等','较难','极难']" style="margin-top: 10px;">
							</el-rate>
						</el-form-item>
						<el-form-item label="试卷描述">
							<el-input type="textarea" placeholder="描述一下你的试卷,不超过200个字" rows=5 v-model="setting.remark" maxlength="200"
							 show-word-limit>
							</el-input>
						</el-form-item>
					</el-form>
					<!-- 监考属性设置 -->
					<el-form v-show="active==1" ref="form" :model="invigilate" label-width="160px" label-position="left">
						<el-form-item label="允许考试次数">
							<el-col :span="8">
								<el-input-number size="medium" v-model="invigilate.num" :min="1" :max="10"></el-input-number>
								</el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="允许切屏次数">
							<el-col :span="8">
								<el-input-number size="medium" v-model="invigilate.page" :min="0" :max="10"></el-input-number>
								</el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="禁止复制试卷内容">
							<el-col :span="3">
								<el-switch v-model="invigilate.isCopy" ></el-switch>
							</el-col>
						</el-form-item>
						<el-form-item label="禁止试卷内粘贴内容">
							<el-col :span="3">
								<el-switch v-model="invigilate.isPaste" ></el-switch>
							</el-col>
						</el-form-item>
						<el-form-item>
							<template slot="label">
								<span style="font-size: 12px;">仅允许实名考生参加</span>&nbsp;&nbsp;&nbsp;<i class="el-icon-info" @click="dialogHint('isRname')"></i>
							</template>
							<el-col :span="3">
								<el-switch v-model="invigilate.isRname" ></el-switch>
							</el-col>
						</el-form-item>
						<el-form-item v-show="invigilate.isRname">
							<template slot="label">
								<span>考前进行人脸识别</span>&nbsp;&nbsp;&nbsp;<i class="el-icon-info" @click="dialogHint('isRname')"></i>
							</template>
							<el-col :span="3">
								<el-switch v-model="invigilate.isDoRame" ></el-switch>
							</el-col>
						</el-form-item>
						<el-form-item>
							<template slot="label">
								启用摄像头监考&nbsp;&nbsp;&nbsp;<i class="el-icon-info"></i>
							</template>
							<el-col :span="3">
								<el-switch v-model="invigilate.isCamera" ></el-switch>
							</el-col>
						</el-form-item>
						<el-form-item label="允许离开摄像头次数" v-show="invigilate.isCamera">
							<el-col :span="8">
								<el-input-number v-model="invigilate.leave" :min="1" :max="10"></el-input-number>
								</el-input>
							</el-col>
						</el-form-item>
					</el-form>
					<!-- 试题添加 -->
					<el-form v-show="active==2" ref="form" :model="invigilate" label-position="left">
						<el-form-item>
							<el-row>
								<el-button type="primary" plain><i class="el-icon-zoom-in"></i>&nbsp;从题库中选择</el-button>
								<el-button type="success" plain><i class="el-icon-circle-plus"></i>&nbsp;创建新的试题</el-button>
								<el-button type="info" plain><i class="el-icon-upload2"></i>&nbsp;从文件导入</el-button>
							</el-row>
						</el-form-item>
					</el-form>
					<!-- 发布试卷 -->
					<el-form v-show="active==3" ref="form" :model="invigilate" label-position="left">
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
			<el-button round type="warning" style="width: 30%;margin-top: 5px;" v-show="active>0" @click="toStep(-1)">上一步</el-button>
			<el-button round type="warning" style="width: 30%;margin-top: 5px;" v-show="active<3" @click="toStep(1)">下一步</el-button>
		</el-footer>
		<el-dialog title="说明" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<ul>
				<li>
					<span>{{systemMark}}</span>
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</el-container>

</template>

<script>
	export default {
		name: 'make',
		props: {},
		data() {
			return {
				active: 0,
				setting: { //基础设置
					title: '',
					region: '',
					date1: '',
					date2: '',
					duration: null,
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					remark: '',
					level: 2,
				},
				invigilate: {
					page: 0,//允许切屏次数
					num: 1,//允许考试次数
					leave:0,//允许离开摄像头界面的次数
					isRname:false,//仅允许实名考生参加
					isDoRame:false,//考前进行人脸识别
					isCopy: false,//是否允许复制试卷内容
					isPaste: false,//是否允许在试卷粘贴
					isCamera: false//是否开启摄像头监考
				},
				restaurants: [],
				systemMark:"",//对于各项设置的文字说明
			};
		},
		mounted() {
			this.restaurants = this.loadAll();
		},
		methods: {
			dialogHint(flag){
				
			},
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			changeRate(v) {
				console.log(v)
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
			handleSelect(item) {
				console.log(item);
			},
			handleIconClick(ev) {
				console.log(ev);
			},
			toStep(i) {
				if (this.active + i > 3 || this.active + i < 0) return
				this.active += i
			},
			onSubmit() {
				console.log('submit!');
			}
		},
	}
</script>

<style>
</style>
