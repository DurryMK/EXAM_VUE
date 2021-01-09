<template>
	<el-container>
		<el-header>
			<el-page-header @back="goBack">
				<span slot="title" style="font-size: 16px;color: #409eff;">
					INTELLIE 首页
				</span>
				<span slot="content" style="font-size: 16px;color: #909399;">
					错误页
				</span>
			</el-page-header>
			<el-divider></el-divider>
		</el-header>
		<el-main style="height: 450px;">
			<el-row>
				<el-col :span="8" :offset="8">
					<el-card shadow="never" style="margin-top: 5%;">
						<div>
							<span style="font-size: 16px;color:#01070d;">发生了一些问题...</span>
						</div>
						<div style="margin-top: 5%;">
							<el-button @click="feedBack" type="text">反馈到INTELLIE</el-button>
							<el-divider direction="vertical"></el-divider>
							<el-button @click="dialogFormVisible = true" type="text">骂两句脏话</el-button>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</el-main>
		<el-footer>
			<div>
				<el-divider></el-divider>
				<span>©2020-2021 Durry. All rights reserved.</span>
			</div>
			<el-dialog title="来吧,骂我!" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item>
						<el-input placeholder="给出您的宝贵建议" v-model="form.word" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogFormVisible = false">骂完了</el-button>
				</div>
			</el-dialog>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'home',
		props: {

		},
		components: {},
		data() {
			return {
				dialogFormVisible: false,
				form: {
					word: ''
				}
			}
		},
		methods: {
			feedBack() {
				this.hint("感谢您的反馈，我们会努力改进", "sucess")
			},
			goBack() {}
		}
	}
</script>

<style>
</style>
