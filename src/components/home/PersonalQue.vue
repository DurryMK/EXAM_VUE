<template>
	<el-container style="height: 810px;">
		<el-main>
			<div style="text-align: left;">
				<span class="sys-tl-md">共收录题目:<B>{{myTotal}}</B>条</span>
				<el-divider direction="vertical"></el-divider>
				<el-link class="sys-font-md" icon="el-icon-edit">自定义题目</el-link>
				<el-divider direction="vertical"></el-divider>
				<el-link class="sys-font-md" icon="el-icon-circle-plus-outline">从系统题库挑选</el-link>
				<el-divider direction="vertical"></el-divider>
				<el-link class="sys-font-md" icon="el-icon-search">发现更多</el-link>
			</div>
			<el-table v-loading="loading" empty-text="还没有收录题目哦 ~" :data="tableData" style="width: 100%;" :max-height="680"
			 :highlight-current-row="true">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="标题:">
								<span>{{ props.row.title }}</span>
							</el-form-item>
							<el-form-item label="类型:">
								<span>{{ props.row.type }}</span>
							</el-form-item>
							<el-form-item label="难度:">
								<span>{{ props.row.level }}</span>
							</el-form-item>
							<el-form-item label="上传时间:">
								<span>{{ props.row.time }}</span>
							</el-form-item>
							<el-form-item label="来源:">
								<span>{{ props.row.from }}</span>
							</el-form-item>
							<el-form-item label="查看原题:">
								<el-link :href="props.row.origin" type="primary">{{props.row.origin}}</el-link>
							</el-form-item>
							<el-form-item label="内容:">
								<span>{{ props.row.content }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="题号" type="index" :index="1" width="80">
				</el-table-column>
				<el-table-column label="标题" prop="title" width="350">
				</el-table-column>
				<el-table-column prop="level" label="难度" width="100" :filters="levels" :filter-method="filterLevel"
				 filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="'danger'" disable-transitions>{{scope.row.level}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="分类" width="100" :filters="types" :filter-method="filterType" filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="'success'" disable-transitions>{{scope.row.type}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="right">
					<template slot="header" slot-scope="scope">
						<el-input @keyup.enter.native="doQuery" v-model="pageInfo.key" size="mini" style="width: 150px;" placeholder="输入标题/类型搜索" />
					</template>
					<template slot-scope="scope">
						<el-button icon="el-icon-circle-plus" plain type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">Add</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
			 :page-sizes="pageSizes" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
			<!-- 解释说明的提示框 -->
			<el-dialog title="INTELLIE题库" :visible.sync="dialogVisible" width="30%">
				<ul>
					<li>
						<span>INTELLIE题库是由系统提供的题库</span>
					</li>
					<li>
						<span>题库内容来自于网络爬取，因此内容将会不定期更新，用户可以自行选择条目添加到个人题库。</span>
					</li>
				</ul>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</span>
			</el-dialog>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: "SystemQue",
		data() {
			return {
				myTotal: 0,
				dialogVisible: false,
				pageSizes: [5, 10, 15, 20, 25],
				pageInfo: {
					currentPage: 1,
					pageSize: 10,
					total: 0,
					key: "",
				},
				tableData: [{
					title: 'INTELLIE',
					content: '',
					time: '',
					type: '',
					level: '',
					origin: '',
					from: '',
					personal: '',
					level: '',
					runningStatus: '',
				}],
				levels: [{}],
				types: [{}],
				loading: false,

			}
		},
		mounted() {
			this.initPage()
		},
		methods: {
			initPage() {
				this.doQuery()
			},
			hintInfo() {
				this.dialogVisible = true
			},
			doQuery() { //提交PageInfo 查询数据
				this.loading = true
				this.$axios({
					url: "/que/initPagePersonal",
					method: "POST",
					params: this.pageInfo
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						this.fullPage(res.data.E_BACKINFO)
					} else {
						this.hint("数据加载失败，请刷新页面重试", "error")
					}
				}).catch(e => {
					console.log(e)
					this.hint("数据加载失败，请检查网络状态", "error")
				})
			},
			//填充页面
			fullPage(data) {
				this.myTotal = data.data.totalWithUser
				this.pageInfo = data.condition
				this.tableData = data.data.list
				this.levels = []
				for (var index in data.data.levels) {
					this.levels.push({
						text: data.data.levels[index],
						value: data.data.levels[index]
					})
				}
				this.types = []
				for (var index in data.data.types) {
					this.types.push({
						text: data.data.types[index],
						value: data.data.types[index]
					})
				}
				this.loading = false
			},
			handleSizeChange(val) {
				this.pageInfo.pageSize = val
				this.doQuery()
			},
			handleCurrentChange(val) {
				this.pageInfo.currentPage = val
				this.doQuery()
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},
			formatter(row, column) {
				return row.address;
			},
			filterType(value, row) {
				return row.type === value;
			},
			filterLevel(value, row) {
				return row.level === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			}
		}
	}
</script>

<style>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
