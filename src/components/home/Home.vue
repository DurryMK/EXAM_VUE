<template>
	<el-container>
		<el-header>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="100" style="width: 200px;">
					<el-avatar fit="contain" :src="user.imgUrl"></el-avatar>
					<span style="margin-left: 10px;margin-top: 5px;">{{user.username}}</span>
				</el-menu-item>
				<el-menu-item index="101">控制中心</el-menu-item>
			</el-menu>
		</el-header>
		<el-container style="margin-top: 5px;">
			<el-aside v-show="asideMenu==100" width="220px">
				<el-menu style="height: 95%;" class="el-menu-vertical-demo" @select="handleSelectAside">
					<el-menu-item index="/Personal">
						<i class="el-icon-user"></i>
						<span slot="title">我的信息</span>
					</el-menu-item>
					<el-menu-item index="加入考试" @click="joinHandle(1)">
						<span slot="title"><i class="el-icon-edit-outline"></i>加入考试</span>
					</el-menu-item>
					<el-menu-item index="/Memeber">
						<i class="el-icon-more"></i>
						<span slot="title">我的组员</span>
					</el-menu-item>
					<el-menu-item index="/ScoreView">
						<i class="el-icon-s-claim"></i>
						<span slot="title">查看成绩</span>
					</el-menu-item>
					<el-menu-item index="/RealName">
						<i v-if="user.isRname == 1" class="el-icon-star-on"></i>
						<i v-if="user.isRname == 0" class="el-icon-star-off"></i>
						<span slot="title">实名认证</span>
					</el-menu-item>
					<el-menu-item index="退出登录" @click="exitLogin">
						<span slot="title"><i class="el-icon-switch-button"></i>退出登录</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-aside v-show="asideMenu==101" width="220px">
				<el-menu style="height: 95%;" class="el-menu-vertical-demo" @select="handleSelectAside">
					<el-menu-item index="/Make">
						<i class="el-icon-s-promotion"></i>
						<span slot="title">由我出卷</span>
					</el-menu-item>
					<el-menu-item index="/PaperList">
						<i class="el-icon-document-copy"></i>
						<span slot="title">试卷管理</span>
					</el-menu-item>
					<el-menu-item index="/Analysis">
						<i class="el-icon-s-marketing"></i>
						<span slot="title">数据分析</span>
					</el-menu-item>
					<el-menu-item index="/PersonalQue">
						<i class="el-icon-menu"></i>
						<span slot="title">我的题库</span>
					</el-menu-item>
					<el-menu-item index="/Questionlist">
						<i class="el-icon-s-grid"></i>
						<span slot="title">EXAM题库</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main style="height: 700px;padding: 5px;">
					<el-container style="height: 100%;padding: 0px;">
						<el-header style="height: 5%;">
							<el-tabs v-model="activeTab" type="card" editable @tab-click="selectTab" @edit="handleTabsEdit" @tab-remove="handleTabsClose">
								<el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
									{{item.content}}
								</el-tab-pane>
							</el-tabs>
						</el-header>
						<el-main style="height: 95%;padding: 10px;">
							<router-view></router-view>
						</el-main>
					</el-container>
				</el-main>
				<el-footer>
					<div>
						<el-divider></el-divider>
						<span>©2020-2021 Durry. All rights reserved.</span>
					</div>
					<el-dialog title="加入考试" :visible.sync="dialogVisible">
						<el-form>
							<el-form-item>
								<el-input v-model="paperLink" autocomplete="off" placeholder="输入 考试链接/考试编号 进入考试"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="joinHandle(2)">确 定</el-button>
						</div>
					</el-dialog>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	//标签卡与router-view的注册表
	let tabMap = new Map([
		['/Make', '新建试卷'],
		['/Welcome', '欢迎页'],
		['/PaperList', '试卷列表'],
		['/Personal', '个人信息'],
		['/Questionlist', 'EXAM题库'],
		['/RealName', '实名认证'],
		['/PersonalQue', '我的题库'],
		['/Analysis', '数据分析'],
		['/Memeber', '成员列表'],
		['/ScoreView', '我的成绩'],
	])

	export default {
		name: 'home',
		props: {

		},
		components: {},
		data() {
			return {
				//界面内容
				asideMenu: 100,
				paperLink: "",
				dialogVisible: false,
				visible: false,
				loading: true,
				isCollapse: true,
				activeIndex: '100',
				isCollapse: true,
				fullscreenLoading: false,
				activeTab: '', //当前激活的标签卡
				preTab: '', //上一个激活的标签卡
				editableTabs: [], //标签卡的容器
				tabIndex: 1,

				//用户信息
				user: new Object(),

				//Setting组件中的数据
				setting: { //基础设置
					title: '',
					type: '0',
					remark: '',
					level: 2,
					code: null, //试卷编码
				},
			};
		},
		created() {
			this.initPage()
		},
		mounted() {
			var path = this.$route.path
			if (path == '/') {
				path = '/Welcome'
			}
			if (!tabMap.has(path)) {
				path = '/Welcome'
			}
			this.handleSelectAside(path)
		},
		watch: {
			$route: {
				handler(val, oldval) {
					// console.log(oldval)
					// console.log(val); //新路由信息
					// var path = val.path
					// if (!tabMap.has(path)||path == '/') {
					// 	path = '/Welcome'
					// }
					// console.log("watch",path)
					// this.handleSelectAside(path)
				},
				// 深度观察监听
				deep: true
			}
		},
		methods: {
			initPage() { //获取初始化页面信息
				this.$axios({
					url: "/home/initPage",
					method: "GET",
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						this.user = res.data.E_BACKINFO //已有登录状态  展示个人信息
					} else {
						this.$router.push("/Login") //未登录 跳转到登录界面
					}
				}).catch(e => {
					this.$router.push("/Login")
				})
			},
			joinHandle(flag) { //点击加入考试时触发 1打开弹框 2跳转到考试面版
				if (flag === 1) {
					this.dialogVisible = true //打开输入框
					return
				}
				this.$router.push("/Core")

			},
			exitLogin() { //退出登录
				this.$confirm('将要退出当前账号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						url: "/access/exitLogin",
						method: "GET",
					}).then(res => {}).catch(e => {
						console.log("网络异常")
						this.$router.push("/EXAM")
					})
				}).catch(() => {
					return
				});
			},
			handleSelectAside(key) { //选中侧边导航栏时 新增标签卡 并定位到新标签卡 并使路由指向标签卡对应的地址
				if (!tabMap.has(key)) {
					return
				}
				this.$router.push(key) //1.跳转到对应的路由地址
				if (this.hasTab(key)) { //2.判断标签卡是否已存在
					this.activeTab = key //2.1标签卡已经打开则跳转到对应的标签卡
					this.preTab = key
					return
				}
				this.editableTabs.push({ //3.标签不存在 创建新的标签卡
					title: tabMap.get(key),
					name: key,
					closable: true
				})
				this.activeTab = key //4.定位到新标签卡
				this.preTab = key
			},
			selectTab(data) { //选择主体内容的标签时
				if (this.activeTab == this.preTab) {
					return //2.选中的标签卡已经展示 则不操作
				}
				this.preTab = this.activeTab
				this.$router.push(this.activeTab) //3.点击新的标签卡 跳转到对应路由
			},
			handleTabsClose(data) {
				return false
			},
			handleTabsEdit(targetName, action) {
				if (action === 'add') {
					// let newTabName = ++this.tabIndex + '';
					// this.editableTabs.push({
					// 	title: 'New Tab',
					// 	name: newTabName,
					// 	content: 'New Tab content'
					// });
					// this.editableTabsValue = newTabName;
				}
				if (action === 'remove') {
					let tabs = this.editableTabs;
					let welcomeName = "/Welcome"
					let activeName = this.activeTab;
					if (activeName === targetName) {
						//1.如果关闭的是当前打开的标签卡  
						tabs.forEach((tab, index) => {
							if (tab.name === targetName) {
								//2.获取当前页的下一页
								let nextTab = tabs[index + 1] || tabs[index - 1];
								if (nextTab) {
									//3.打开下一页
									activeName = nextTab.name;
								} else {
									//5.如果当前已经是最后一页  则打开欢迎页
									activeName = welcomeName
								}
							}
						});
					}
					this.activeTab = activeName;
					this.preTab = activeName
					this.editableTabs = tabs.filter(tab => tab.name !== targetName);
					this.handleSelectAside(activeName)
				}
			},
			handleSelect(key, keyPath) { //导航菜单被选中时触发
				this.asideMenu = key
			},
			hasTab(key) {
				var flag = false
				this.editableTabs.forEach((tab, index) => {
					if (tab.name == key) {
						flag = true
					}
				});
				return flag
			}
		}
	}
</script>

<style>
</style>
