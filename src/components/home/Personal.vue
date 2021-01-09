<template>
	<el-row>
		<el-divider content-position="left">
			<i v-show="isLoading" class="el-icon-loading"></i>
			<span v-show="!isLoading">{{title}}</span>
		</el-divider>
		<el-col :span="14" :offset="3">
			<el-row>
				<el-col :span="8">
					<el-card :body-style="{ padding: '2px' }">
						<el-tooltip class="item" effect="light" content="查看大图" placement="left-end">
							<el-image fit="contain" class="image" :src="user.imgUrl" :preview-src-list="srcList">
							</el-image>
						</el-tooltip>
						<div style="padding: 14px;">
							<div class="bottom clearfix">
								<el-divider></el-divider>
								<el-popover placement="right" width="400" trigger="click">
									<Upload></Upload>
									<el-button slot="reference" type="primary" icon="el-icon-upload" circle></el-button>
								</el-popover>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="14" :offset="1">
					<el-card class="box-card" shadow="hover">
						<el-form ref="form" label-position="left" :model="user" label-width="80px">
							<el-form-item label="用户名">
								<el-input v-model="user.username"></el-input>
							</el-form-item>
							<el-form-item label="手机号码">
								<el-input v-model="user.mobile"></el-input>
							</el-form-item>
							<el-form-item label="实名认证">
								<el-tag style="width: 100%;" v-show="user.isRname == 1">已实名</el-tag>
								<el-tag style="width: 100%;" v-show="user.isRname == 0" type="danger">未实名</el-tag>
							</el-form-item>
							<el-form-item label="QQ">
								<el-input v-model="user.qq"></el-input>
							</el-form-item>
							<el-form-item label="所属院校">
								<el-input v-model="user.school"></el-input>
							</el-form-item>
							<el-form-item label="专业">
								<el-input v-model="user.major"></el-input>
							</el-form-item>
						</el-form>
						<el-divider></el-divider>
						<el-tooltip class="item" effect="dark" content="刷新" placement="left-end">
							<el-button icon="el-icon-refresh-right" circle @click="refreshHandle"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="保存" placement="right-start">
							<el-button type="primary" icon="el-icon-s-management" @click="saveHandle" circle></el-button>
						</el-tooltip>
					</el-card>
				</el-col>
			</el-row>
		</el-col>
		<!-- 上传头像 -->
		<el-dialog title="上传头像" :visible.sync="dialogUpload" width="50%">
			<Upload></Upload>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogUpload = false">确 定</el-button>
			</span>
		</el-dialog>
	</el-row>
</template>

<script>
	import Upload from './ImgUpload.vue'
	export default {
		name: "Personal",
		data() {
			return {
				isLoading: true,
				title: "",
				user: new Object(),
				srcList: [],
				dialogUpload: false,
			}
		},
		components: {
			Upload
		},
		mounted() {
			this.initPage()
		},
		methods: {
			initPage() {
				this.$axios({
					url: "/home/personal/personalInfo",
					method: "GET",
				}).then(res => {
					console.log(res)
					if (res.data.E_BACKSTATUS == '0') {
						this.user = res.data.E_BACKINFO
						this.title = this.user.username + "的个人信息"
						this.isLoading = false
						this.srcList.push(this.user.imgUrl)
						//填充页面信息
						this.fullPage()
					} else {
						this.title = "网络出了点小问题,刷新试试"
					}
				}).catch(e => {
					this.title = "网络出了点小问题"
				})
			},
			fullPage() {

			},
			refreshHandle() {
				this.$confirm('刷新页面后未保存的信息将丢失, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.initPage()
				}).catch(() => {
					return
				});
			},
			saveHandle() {
				this.$confirm('是否保存?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.saveOp()
				}).catch(() => {
					return
				});
			},
			saveOp() {
				console.log(this.user)
			}
		}
	}
</script>

<style>
	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 200px;
		height: 200px;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box {
		width: 400px;

		.top {
			text-align: center;
		}

		.left {
			float: left;
			width: 60px;
		}

		.right {
			float: right;
			width: 60px;
		}

		.bottom {
			clear: both;
			text-align: center;
		}

		.item {
			margin: 4px;
		}

		.left .el-tooltip__popper,
		.right .el-tooltip__popper {
			padding: 8px 10px;
		}
	}
</style>
