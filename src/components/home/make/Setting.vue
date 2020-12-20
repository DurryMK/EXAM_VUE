<template>
	<!-- 基础属性设置 -->
	<el-form ref="form" :model="setting" label-width="100px" label-position="left">
		<el-form-item label="试卷标题">
			<el-input placeholder="输入试卷的标题,不超过50个字" v-model="setting.title" clearable>
			</el-input>
		</el-form-item>
		<el-form-item label="试卷类型">
			<el-col :span="6">
				<el-select v-model="setting.type">
					<el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
		</el-form-item>
		<el-form-item label="预计试卷难度" style="width: 45%;">
			<el-rate v-model="setting.level" show-text :texts="['简单','一般','中等','较难','极难']" style="margin-top: 10px;">
			</el-rate>
		</el-form-item>
		<el-form-item label="试卷描述">
			<el-input type="textarea" placeholder="描述一下你的试卷,不超过200个字" rows=5 v-model="setting.remark" maxlength="200"
			 show-word-limit>
			</el-input>
		</el-form-item>
		<el-form-item label="试卷编号">
			<el-col :span="20">
				<el-input v-model="setting.code" :disabled="true">
				</el-input>
			</el-col>
			<el-col :span="3">
				<el-tooltip class="item" effect="dark" content="点击复制" placement="bottom-end">
					<el-button icon="el-icon-document-copy" v-clipboard:copy="setting.code" v-clipboard:success="clickCopy"
					 circle></el-button>
				</el-tooltip>
			</el-col>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'Setting',
		mounted() {
			this.initPage()
			//获取用户拥有的类型列表
			this.getUserTypeList()
		},
		data() {
			return {
				types: [{
					id: '0',
					name: '默认'
				}],
				setting: this.$store.state.setting
			}
		},
		created() {
		},
		methods: {
			initPage() {
				
			},
			getUserTypeList(){
				this.$axios({
					url:'/make/info/getUserTypeList',
					method:'GET'
				}).then(res=>{
					if(res.data.E_BACKSTATUS == '0'){
						var list = res.data.E_BACKINFO
						this.types = this.types.concat(list)
					}else{
						this.$router.push('/Login')
					}
				})
			},
			getSettingData() {
				if (this.setting.title.length <= 0) {
					this.hint('需要一个标题哦', 'warning')
					return null
				}
				return this.setting
			},
			clickCopy() { //点击复制考试编码
				this.hint('考试编号已复制到剪切板', 'success')
			}
		}
	}
</script>

<style>
</style>
