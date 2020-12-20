<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="24">
					<el-button-group>
						<el-button type="primary" @click="currentSelect(1)" icon="el-icon-edit">单选题</el-button>
						<el-button type="primary" @click="currentSelect(2)" icon="el-icon-share">多选题</el-button>
						<el-button type="primary" @click="currentSelect(3)" icon="el-icon-edit-outline">填空题</el-button>
						<el-button type="primary" @click="currentSelect(4)" icon="el-icon-check">判断题</el-button>
						<el-button type="primary" @click="currentSelect(5)" icon="el-icon-chat-line-square">问答题</el-button>
						<el-button type="primary" @click="currentSelect(6)" icon="el-icon-tickets">完形填空</el-button>
						<el-button type="primary" @click="currentSelect(7)" icon="el-icon-document-copy">阅读题</el-button>
						<el-button type="primary" @click="currentSelect(8)" icon="el-icon-document">作文题</el-button>
						<el-button type="primary" @click="currentSelect(9)" icon="el-icon-document">自定义</el-button>
					</el-button-group>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-row>
				<!-- 单选题 -->
				<el-col :span="18" :offset="2" :inline="true" v-show="currentEdit == 1">
					<el-form :model="singleOption" ref="singleOption" label-width="100px" class="demo-dynamic">
						<el-form-item label="标题">
							<el-input type="text" placeholder="输入题目标题" maxlength="100" show-word-limit v-model="singleOption.title">
							</el-input>
						</el-form-item>
						<el-form-item label="难度">
							<el-col :span="6">
								<el-rate v-model="level" show-text :texts="['简单','一般','中等','较难','极难']" style="margin-top: 10px;">
								</el-rate>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-input type="textarea" :rows="5" placeholder="请输入题干内容" maxlength="500" show-word-limit v-model="singleOption.content">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-input placeholder="选项A" maxlength="120" show-word-limit v-model="singleOption.optionA">
							</el-input>
							<el-input placeholder="选项B" maxlength="120" show-word-limit v-model="singleOption.optionB">
							</el-input>
							<el-input placeholder="选项C" maxlength="120" show-word-limit v-model="singleOption.optionC">
							</el-input>
							<el-input placeholder="选项D" maxlength="120" show-word-limit v-model="singleOption.optionD">
							</el-input>
						</el-form-item>
						<el-form-item label="正确选项">
							<el-col :span="6">
								<el-select v-model="singleOption.correct" placeholder="正确选项">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-col>
						</el-form-item>
					</el-form>
				</el-col>
				<!-- 多选题 -->
				<el-col :span="18" :offset="2" :inline="true" v-show="currentEdit == 2">
					<el-form :model="multipeOption" ref="multipeOption" label-width="100px" class="demo-dynamic">
						<el-form-item label="标题">
							<el-input type="text" placeholder="输入题目标题" maxlength="100" show-word-limit v-model="multipeOption.title">
							</el-input>
						</el-form-item>
						<el-form-item label="难度">
							<el-col :span="6">
								<el-rate v-model="level" show-text :texts="['简单','一般','中等','较难','极难']" style="margin-top: 10px;">
								</el-rate>
							</el-col>
						</el-form-item>
						<el-checkbox-group v-model="checkList">
						    <el-checkbox label="复选框 A"></el-checkbox>
						    <el-checkbox label="复选框 B"></el-checkbox>
						    <el-checkbox label="复选框 C"></el-checkbox>
						    <el-checkbox label="禁用" disabled></el-checkbox>
						    <el-checkbox label="选中且禁用" disabled></el-checkbox>
						  </el-checkbox-group>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
		<el-footer>
			<el-button type="primary" round>确认 创建</el-button>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'Question',
		props: {

		},
		data() {
			return {
				currentEdit: 1, //当前编辑的题型
				level: 2,
				//单选题的选项
				options: [{
					value: 1,
					label: '选项A'
				}, {
					value: 2,
					label: '选项B'
				}, {
					value: 3,
					label: '选项C'
				}, {
					value: 4,
					label: '选项D'
				}],
				//单选题内容
				singleOption: {
					title: null,
					content: null,
					optionA: null,
					optionB: null,
					optionC: null,
					optionD: null,
					correct: 1,
				},
				//多选题内容
				multipeOption: {
					title: null,
					content: null,
					correct: 1,
				},
			}
		},
		mounted() {


		},
		methods: {
			currentSelect(flag) {
				if (flag == this.currentEdit)
					return
				this.currentEdit = flag
			}
		}
	}
</script>

<style>
</style>
