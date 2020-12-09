<style type="text/css">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
<template>
	<el-container>
		<!-- 头部区域 -->
		<el-header>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="100">
					<el-avatar fit="contain" :src="user.imgUrl"></el-avatar>
					<span style="margin-left: 10px;margin-top: 5px;">{{user.username}}</span>
				</el-menu-item>
				<el-menu-item index="101">控制中心</el-menu-item>
			</el-menu>
		</el-header>
		<el-container style="margin-top: 10px;">
			<!-- 侧边菜单 ——控制中心 -->
			<el-aside v-show="asideMenu==101" width="220px">
				<el-menu class="el-menu-vertical-demo" @select="handleSelectAside" @open="handleOpen" @close="handleClose">
					<el-menu-item index="/Make">
						<i class="el-icon-s-promotion"></i>
						<span slot="title">由我出卷</span>
					</el-menu-item>
					<el-menu-item index="/List">
						<i class="el-icon-document-copy"></i>
						<span slot="title">试卷管理</span>
					</el-menu-item>
					<el-menu-item index="/Questionlist">
						<i class="el-icon-s-grid"></i>
						<span slot="title">EXAM题库</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 侧边菜单 ——用户信息 -->
			<el-aside v-show="asideMenu==100" width="220px">
				<el-menu class="el-menu-vertical-demo" @select="handleSelectAside" @open="handleOpen" @close="handleClose">
					<el-menu-item index="/Personal">
						<i class="el-icon-user"></i>
						<span slot="title">我的信息</span>
					</el-menu-item>
					<el-menu-item index="加入考试" @click="dialogVisible = true">
						<span slot="title"><i class="el-icon-edit-outline"></i>加入考试</span>
					</el-menu-item>
					<el-menu-item index="查看成绩">
						<i class="el-icon-s-claim"></i>
						<span slot="title">查看成绩</span>
					</el-menu-item>
					<el-menu-item index="实名认证">
						<i v-if="user.isRname == 1" class="el-icon-star-on"></i>
						<i v-if="user.isRname == 0" class="el-icon-star-off"></i>
						<span slot="title">实名认证</span>
					</el-menu-item>
					<el-menu-item index="退出登录" @click="exitLogin">
						<span slot="title"><i class="el-icon-switch-button"></i>退出登录</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 主体内容 -->
			<el-container style="height: 800px;">
				<el-main>
					<el-tabs v-model="activeTab" type="card" editable @tab-click="selectTab" @edit="handleTabsEdit" @tab-remove="handleTabsClose">
						<el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
							{{item.content}}
						</el-tab-pane>
					</el-tabs>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		<el-container>
			<!-- 底部 -->
			<el-footer>
				<div>
					<el-divider></el-divider>
					<span>©2020-2021 Durry. All rights reserved.</span>
				</div>
				<el-dialog :visible.sync="dialogVisible" width="45%" @close="dialogVisible=false">
					<el-input placeholder="请输入试卷编号或考试链接加入考试" v-model="testLink" clearable>
					</el-input>
				</el-dialog>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
	let tabMap = new Map([
		['/Make', '新建试卷'],
		['/Welcome', '欢迎页'],
		['/List', '试卷列表'],
		['/Personal', '个人信息'],
		['/Questionlist','EXAM题库']
	]) //标签卡与router-view的对应关系

	export default {
		name: 'home',
		props: {

		},
		components: {},
		data() {
			return {
				//界面内容
				asideMenu: 100,
				testLink: "",
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
				user: [],
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
						//已有登录状态  展示个人信息
						this.user = res.data.user
					} else {
						//未登录 跳转到登录界面
						this.$router.push("/Login")
					}
				}).catch(e => {
					console.log("网络异常")
					this.$router.push("/Login")
				})
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(key, keyPath) {
				this.asideMenu = key
			},
			exitLogin() { //退出登录
				this.$confirm('将要退出当前账号, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {}).catch(() => {
					return
				});
				this.$axios({
					url: "/access/exitLogin",
					method: "GET",
				}).then(res => {
					console.log(res)
					if (res.data.E_BACKSTATUS == '0') {
						//已有登录状态  展示个人信息
						this.user = res.data.user
					} else {
						//未登录 跳转到登录界面
						this.$router.push("/Login")
					}
				}).catch(e => {
					console.log("网络异常")
					this.$router.push("/EXAM")
				})
			},
			//选中侧边导航栏时 新增标签卡 并定位到新标签卡 并使路由指向标签卡对应的地址
			handleSelectAside(key) {
				if (!tabMap.has(key)) {
					return
				}
				//1.跳转到对应的路由地址
				this.$router.push(key)
				console.log(this.hasTab(key))
				if (this.hasTab(key)) { //2.判断标签卡是否已存在
					//2.1标签卡已经打开则跳转到对应的标签卡
					this.activeTab = key
					this.preTab = key
					return
				}
				//3.标签不存在 创建新的标签卡
				this.editableTabs.push({
					title: tabMap.get(key),
					name: key,
					closable: true
				})
				//4.定位到新标签卡
				this.activeTab = key
				this.preTab = key
			},
			//选择主体内容的标签时
			selectTab(data) {
				if (this.activeTab == this.preTab) {
					//2.选中的标签卡已经展示 则不操作
					return
				}
				//3.点击新的标签卡 跳转到对应路由
				this.preTab = this.activeTab
				this.$router.push(this.activeTab)
			},
			handleTabsClose(data) {},
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
