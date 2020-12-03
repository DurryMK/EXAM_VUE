<template>
	<el-row>
		<el-divider content-position="left">
			<i v-show="isLoading" class="el-icon-loading"></i>
			<span v-show="!isLoading">{{title}}</span>
		</el-divider>
		<el-col :span="14" :offset="3">
			<el-row>
				<el-col :span="8">
					<el-card class="box-card" shadow="hover">
						<div>
							<el-image style="width: 100px; height: 120px" :src="user.imgUrl" fit="contain"></el-image>
						</div>
						<el-divider></el-divider>
						<el-button icon="el-icon-search" circle></el-button>
						<el-button type="primary" icon="el-icon-edit" circle></el-button>
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
								<el-tag v-show="user.isRname">已实名</el-tag>
								<el-tag v-show="!user.isRname" type="danger">未实名</el-tag>
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
						<el-button icon="el-icon-refresh-right" circle></el-button>
						<el-button type="primary" icon="el-icon-s-management" circle></el-button>
					</el-card>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "Personal",
		data() {
			return {
				isLoading: true,
				title: "",
				user: [],
			}
		},
		mounted() {
			this.initPage()
		},
		methods: {
			initPage() {
				this.$axios({
					url: this.baseUrl + "/personal/initPage",
					method: "GET",
				}).then(res => {
					console.log("Personal.vue:")
					console.log(res)
					if (res.data.E_BACKSTATUS == '0') {
						this.user = res.data.user
						this.title = this.user.username + "的个人信息"
						this.isLoading = false
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

			}
		}
	}
</script>

<style>
</style>
