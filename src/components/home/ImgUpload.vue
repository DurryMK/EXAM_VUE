<template>
	<el-container>
		<el-main>
			<el-upload class="upload-demo" accept="jpg/png/jpeg" drag :action="uploadUrl">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">支持上传jpg/png/jpeg文件，文件大小不超过1000kb</div>
			</el-upload>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: "ImgUpload",
		data() {
			return {
				uploadUrl:"",
			}
		},
		mounted() {
			this.uploadUrl = this.uploadUrl+"/avatar/"
		},
		methods: {

		}
	}
</script>

<style>
</style>
