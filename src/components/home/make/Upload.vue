<template>
	<el-container>
		<el-header>

		</el-header>
		<el-main>
			<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">支持上传word/excel文件，文件大小不超过100MB</div>
			</el-upload>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: "Upload",
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
