<template>
	<el-container>
		<el-header>
			<el-divider>
				<span v-show="!isRname"><i class="el-icon-star-off"></i>您尚未完成实名认证</span>
				<span v-show="isRname"><i class="el-icon-star-on"></i>您已完成实名认证</span>
			</el-divider>
		</el-header>
		<el-main>
			<el-row>
				<el-col v-show="isRname" :span="12" :offset="6">
					<el-card shadow="hover">
						<el-form ref="form" label-position="left" :model="realInfo" label-width="100px">
							<el-form-item label="姓名">
								<el-tag style="width: 100%;">{{realInfo.rname}}</el-tag>
							</el-form-item>
							<el-form-item label="证件号">
								<el-tag style="width: 100%;">{{realInfo.idCard}}</el-tag>
							</el-form-item>
							<el-form-item label="绑定手机号">
								<el-tag style="width: 100%;">{{realInfo.mobile}}</el-tag>
							</el-form-item>
							<el-form-item label="认证日期">
								<el-tag style="width: 100%;">{{realInfo.rTime}}</el-tag>
							</el-form-item>
							<el-divider></el-divider>
							<el-button type="warning" icon="el-icon-refresh-right" circle></el-button>
							<el-button type="primary" icon="el-icon-view" circle></el-button>
						</el-form>
					</el-card>
				</el-col>
				<el-col v-show="!isRname" :span="12" :offset="6">
					<el-card shadow="never">
						<el-button style="width: 100%;" type="danger" plain>点击进行实名认证</el-button>
					</el-card>
				</el-col>
			</el-row>
		</el-main>
		<el-footer></el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'RealName',
		data() {
			return {
				isRname: false,
				realInfo: new Object(),
			}
		},
		mounted() {
			this.initPage()
		},
		methods: {
			initPage() {
				this.$axios({
					url: "/home/realName",
					method: "GET",
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						console.log(res.data.E_BACKINFO)
						this.isRname = true
						this.realInfo = res.data.E_BACKINFO
					} else {
						this.isRname = false
					}
				}).catch(e => {
					this.$router.push("/Login")
				})
			}
		}
	}
</script>

<style>
</style>
