<template>
	<el-container>
		<el-header>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
				<el-menu-item index="1"><span style="color:#6666FF">登录 | INTELLIE考试平台</span></el-menu-item>
			</el-menu>
		</el-header>
		<el-main>
			<el-row>
				<el-col :span="12" :offset="6">
					<el-card shadow="always">
						<el-button @click="handleClickTop(1)" type="text"><span v-show="activeLogin==1" style="font-size: 20px;">免密登录</span><span
							 v-show="activeLogin!=1">免密登录</span></el-button>
						<span style="font-size: 22px;">/</span>
						<el-button @click="handleClickTop(2)" type="text"><span v-show="activeLogin==2" style="font-size: 20px;">账号密码登录</span><span
							 v-show="activeLogin!=2">账号密码登录</span></el-button>
						<span style="font-size: 22px;">/</span>
						<el-button @click="handleClickTop(3)" type="text"><span v-show="activeLogin==3" style="font-size: 20px;">注册</span><span
							 v-show="activeLogin!=3">注册</span></el-button>
					</el-card>
				</el-col>
				<el-col :span="12" :offset="6">
					<!-- 快速登录 -->
					<el-card v-show="activeLogin==1" shadow="always" style="margin-top: 20px;height: 300px;">
						<el-row>
							<el-col :span="15" :offset="3">
								<el-form ref="quickForm" status-icon :rules="quick_rules" :model="quickForm" label-width="80px" style="margin-top: 10px;">
									<el-form-item prop="mobile">
										<el-col :span="3">
											<i class="el-icon-phone"></i>
										</el-col>
										<el-col :span="21">
											<el-input placeholder="输入手机号码" v-model="quickForm.mobile"></el-input>
										</el-col>
									</el-form-item>
									<el-form-item prop="vcode">
										<el-col :span="3">
											<i class="el-icon-s-promotion"></i>
										</el-col>
										<el-col :span="12">
											<el-input placeholder="请输入验证码" v-model="quickForm.vcode"></el-input>
										</el-col>
										<el-col :span="5">
											<el-button type="primary" style="margin-left: 8px;" @click="sendVcode(1)" :loading="quick_loading">获取验证码</el-button>
										</el-col>
									</el-form-item>
									<el-form-item>
										<el-button type="success" style="width: 90%;margin-left: 10%;" @click="quickLogin('quickForm')">快速登录</el-button>
									</el-form-item>
									<el-form-item>
										<el-button @click="toReg" type="text" style="margin-left: 2px;"><span style="font-size: 10px;">去注册</span></el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-card>
					<!-- 登录卡片 -->
					<el-card v-show="activeLogin==2" status-icon shadow="always" style="margin-top: 20px;">
						<el-row>
							<el-col :span="12" :offset="4">
								<el-form ref="loginForm" :rules="login_rules" :model="loginForm" label-width="80px" style="margin-top: 10px;">
									<el-form-item prop="username">
										<el-col :span="3">
											<i class="el-icon-user-solid"></i>
										</el-col>
										<el-col :span="21">
											<el-input placeholder="用户名/手机号/邮箱" v-model="loginForm.username"></el-input>
										</el-col>
									</el-form-item>
									<el-form-item prop="password">
										<el-col :span="3">
											<i class="el-icon-s-grid"></i>
										</el-col>
										<el-col :span="21">
											<el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
										</el-col>
									</el-form-item>
									<el-form-item>
										<el-button type="danger" style="width: 90%;margin-left: 10%;" @click="doLogin()">立即登录</el-button>
									</el-form-item>
									<el-form-item>
										<el-button @click="toReg" type="text" style="margin-left: 2px;"><span style="font-size: 10px;">去注册</span></el-button>
										<el-button type="text" style="margin-left: 2px;"><span style="font-size: 10px;">忘记密码</span></el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-card>
					<!-- 注册卡片 -->
					<el-card v-show="activeLogin==3" shadow="always" style="margin-top: 20px;">
						<el-row>
							<el-col :span="15" :offset="2">
								<el-form ref="regForm" status-icon :rules="reg_rules" :model="regForm" label-width="80px" style="margin-top: 10px;">
									<el-form-item prop="mobile">
										<el-col :span="3">
											<i class="el-icon-phone"></i>
										</el-col>
										<el-col :span="21">
											<el-input placeholder="输入手机号码" v-model="regForm.mobile"></el-input>
										</el-col>
									</el-form-item>
									<el-form-item prop="password">
										<el-col :span="3">
											<i class="el-icon-s-grid"></i>
										</el-col>
										<el-col :span="21">
											<el-input placeholder="请输入密码" v-model="regForm.password" show-password></el-input>
										</el-col>
									</el-form-item>
									<el-form-item prop="vcode">
										<el-col :span="3">
											<i class="el-icon-s-promotion"></i>
										</el-col>
										<el-col :span="14">
											<el-input placeholder="请输入验证码" v-model="regForm.vcode"></el-input>
										</el-col>
										<el-col :span="5">
											<el-button type="text" style="margin-left: 8px;">获取验证码</el-button>
										</el-col>
									</el-form-item>
									<el-form-item prop="check">
										<el-button @click="dialogVisible = true" size="mini" type="text" style="margin-left: 2px;">
											<span style="font-size: 10px;">一堆乱七八糟的协议</span>
										</el-button>
										<el-checkbox v-model="regForm.checked"><span style="font-size: 10px">注册即表示同意INTELLIE考试平台各种乱七八糟的条约<i class="el-icon-question"
												 style=";margin-left: 3px;"></i></span></el-checkbox>
									</el-form-item>
									<el-form-item>
										<el-button type="primary" style="width: 90%;margin-left: 10%;" @click="doReg">立即注册</el-button>
									</el-form-item>
									<el-form-item>
										<el-button @click="toLogin" type="text" style="margin-left: 2px;"><span style="font-size: 10px;">去登录</span></el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-card>
				</el-col>
			</el-row>
		</el-main>
		<!-- 底部 -->
		<el-footer>
			<div>
				<el-divider></el-divider>
				<span>©2020-2021 Durry. All rights reserved.</span>
			</div>
			<el-dialog title="你不会看的用户隐私协议" :visible.sync="dialogVisible" width="45%">
				<span>你不会看的用户隐私协议</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">我看不懂</el-button>
					<el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
				</span>
			</el-dialog>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'login',
		data() {
			//手机号校验规则
			var checkPhone = (rule, value, callback) => {
				if (this.activeLogin == 1 || this.activeLogin == 3) {
					if (!value) {
						return callback(new Error('手机号不能为空'));
					}
					let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/
					if (!phoneCodeVerification.test(value)) {
						return callback(new Error('手机号格式有误'));
					}
				}
			}
			//验证码校验规则
			var checkVcode = (rule, value, callback) => {
				if (this.activeLogin == 1 || this.activeLogin == 3) {
					if (value === '') {
						callback(new Error('请输入验证码'));
					}
					if (value.length != 6) {
						callback(new Error('验证码错误'));
					}
				}
			}
			//用户名校验规则
			var checkUsername = (rule, value, callback) => {
				if (this.activeLogin == 2) {
					if (value === '') {
						callback(new Error('请输入用户名'));
					}
				}
			}
			//密码校验规则
			var checkPwd = (rule, value, callback) => {
				if (this.activeLogin == 2 || this.activeLogin == 3) {
					if (value === '') {
						callback(new Error('请输入密码'));
					}
					if (value.length > 12 || value.length < 6) {
						callback(new Error('密码格式错误'));
					}
				}
			}
			//协议校验规则
			var checkCheck = (rule, value, callback) => {
				if (this.activeLogin == 3) {
					if (!value) {
						callback(new Error('请先勾选协议'));
					}
				}
			}
			return {
				activeIndex: '1',
				activeLogin: 1,
				quick_loading: false,
				reg_loading: false,
				dialogVisible: false,
				quickForm: {
					mobile: "15974076596",
					vcode: "",
				},
				loginForm: {
					username: "",
					password: "",
				},
				regForm: {
					mobile: "",
					password: "",
					vcode: "",
					checked: "",
				},
				quick_rules: {
					mobile: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					vcode: [{
						validator: checkVcode,
						trigger: 'blur'
					}]
				},
				login_rules: {
					username: [{
						validator: checkUsername,
						trigger: 'blur'
					}],
					password: [{
						validator: checkPwd,
						trigger: 'blur'
					}],
				},
				reg_rules: {
					mobile: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					vcode: [{
						validator: checkVcode,
						trigger: 'blur'
					}],
					password: [{
						validator: checkPwd,
						trigger: 'blur'
					}],
					check: [{
						validator: checkCheck,
						trigger: 'blur'
					}]
				},
			}
		},
		mounted() {},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClickTop(flag) {
				this.activeLogin = flag
			},
			//跳到注册界面
			toReg() {
				this.activeLogin = 3
			},
			//跳到登录界面
			toLogin() {
				this.activeLogin = 1
			},
			//快速登录
			quickLogin(formName) {
				this.$refs[formName].validate(function(boolean,object){
					console.log(boolean)
					if (boolean) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				this.$axios({
					url: "/access/quickLogin",
					method: "POST",
					params: this.quickForm
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						this.hint("登录成功", "success")
						//公钥保存到store
						this.$store.commit('savePrivateKey', res.data.E_BACKINFO)
						//1秒后跳转主页面
						let _this = this
						setTimeout(function() {
							_this.toHome()
						}, 1000)
					} else {
						this.hint(res.data.E_BACKINFO, "error")
					}
				})
			},
			//用户名密码登录
			doLogin() {
				//验证
				this.$refs['loginForm'].validate((valid) => {
					if (!valid) {
						return
					}
				})
				this.$axios({
					url: "/doLogin",
					method: "POST",
					params: this.loginForm
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						this.isLogin = true
					} else {
						this.isLogin = false
					}
				})
			},
			//注册
			doReg() {
				//验证
				this.$refs['regForm'].validate((valid) => {
					if (!valid) {
						return
					}
				})
				this.$axios({
					url: "/doLogin",
					method: "POST",
					params: this.regForm
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						this.isLogin = true
					} else {
						this.isLogin = false
					}
				})
			},
			toHome() {
				this.$router.push("/INTELLIE")
			},
			sendVcode(flag) {
				this.quick_loading = (flag == 1) ? true : false
				var mobile = (flag == 1) ? this.quickForm.mobile : this.regForm.mobile
				this.$axios({
					url: "/svode/sendLoginVcode",
					method: "get",
					params: {
						mobile: mobile
					}
				}).then(res => {
					this.quick_loading = false
					if (res.data.E_BACKSTATUS == '0') {
						this.hint("验证码已发送", "success")
					} else {
						this.hint("发送验证码失败", "error")
					}
				}).catch(e => {
					this.hint("发送验证码失败", "error")
				})
			},
		}
	}
</script>

<style>
</style>
