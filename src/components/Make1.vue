<template>
	<el-container>
		<el-header style="height: 0px;"></el-header>
		<el-row>
			<el-col :span="24">
				<el-steps :active="active" finish-status="success" simple>
					<el-step title="属性设置"></el-step>
					<el-step title="监考设置"></el-step>
					<el-step title="添加试题"></el-step>
					<el-step title="发布试卷"></el-step>
				</el-steps>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="14" :offset="4">
				<el-divider></el-divider>
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
					<el-form-item label="是否限时">
						<el-switch v-model="setting.delivery" style="margin-right: 92%;"></el-switch>
					</el-form-item>
					<el-form-item label="设置考试时长" v-show="setting.delivery">
						<el-autocomplete clearable popper-class="my-autocomplete" v-model="setting.duration" :fetch-suggestions="querySearch"
						 placeholder="请输入一个时长" style="margin-right: 60%;">
							<template slot-scope="{ item }">
								<div class="name">{{ item.value }}</div>
							</template>
						</el-autocomplete>
					</el-form-item>
					<el-form-item label="试卷描述">
						<el-input type="textarea" placeholder="描述一下你的试卷,不超过200个字" rows=5 v-model="setting.remark" maxlength="200"
						 show-word-limit>
						</el-input>
					</el-form-item>
				</el-form>
				<!-- 监考属性设置 -->
				<el-form v-show="active==1" ref="form" :model="invigilate" label-width="120px" label-position="left">
					<el-form-item label="允许切屏次数">
						<el-col :span="8">
								<el-input-number v-model="invigilate.page" :min="1" :max="10"></el-input-number>
							</el-input>
						</el-col>
						<el-col class="line" :span="4">可考次数</el-col>
						<el-col :span="8">
							<el-input-number v-model="invigilate.num" :min="1" :max="10"></el-input-number>
						</el-col>
					</el-form-item>
					<el-form-item label="禁止复制">
						<el-col :span="8">
							<el-switch v-model="invigilate.isCopy" style="margin-right: 75%;"></el-switch>
						</el-col>
						<el-col class="line" :span="4">禁止粘贴</el-col>
						<el-col :span="8">
							<el-switch v-model="invigilate.isPaste" style="margin-right: 75%;"></el-switch>
						</el-col>
					</el-form-item>
					<el-form-item label="启用摄像头">
						<el-col :span="8">
							<el-switch v-model="invigilate.isCamera" style="margin-right: 75%;"></el-switch>
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
		<el-row>
			<el-col :span="21">
				<el-button v-show="active>0" style="margin-top: 12px;" @click="toStep(-1)">上一步</el-button>
				<el-button v-show="active<3" style="margin-top: 12px;" @click="toStep(1)">下一步</el-button>
			</el-col>
		</el-row>
	</el-container>
</template>

<script>
	import Question from "./addQuestion.vue"
	export default {
		name: 'make',
		props: {
		},
		data() {
			return {
				active: 0,
				setting: { //基础设置
					title: '',
					region: '',
					date1: '',
					date2: '',
					duration: '30分钟',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					remark: '',
				},
				invigilate: {
					page: 0,
					num: 1,
					isCopy: false,
					isPaste: false,
					isCamera:false
				},
				restaurants: [],
			};
		},
		mounted() {
			this.restaurants = this.loadAll();
		},
		methods: {
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
