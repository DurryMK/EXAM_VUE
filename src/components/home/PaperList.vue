<template>
	<el-container style="height: 100%;">
		<el-divider content-position="right">
			<el-tooltip class="item" effect="dark" content="点击刷新" placement="right-end">
				<el-link icon="el-icon-refresh-right" @click="reflush"></el-link>
			</el-tooltip>
		</el-divider>
		<el-main style="height: 90%;padding: 10px;">
			<el-table :data="tableData" :height="500" :highlight-current-row="true">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="试卷封面">
								<el-image style="width: 100px; height: 100px" :src="props.row.imgUrl" fit="contain"></el-image>
							</el-form-item>
							<el-form-item label="试卷标题">
								<span>{{ props.row.title }}</span>
							</el-form-item>
							<el-form-item label="创建时间">
								<span>{{ props.row.time }}</span>
							</el-form-item>
							<el-form-item label="开放时间">
								<span>{{ props.row.start }}</span>
							</el-form-item>
							<el-form-item label="结束时间">
								<span>{{ props.row.end }}</span>
							</el-form-item>
							<el-form-item label="试卷描述">
								<span>{{ props.row.remark }}</span>
							</el-form-item>
							<el-form-item label="试卷编码">
								<el-tooltip class="item" effect="dark" content="点击复制" placement="bottom-end">
									<el-link v-clipboard:copy="props.row.code" v-clipboard:success="clickCopy" circle type="success">{{ props.row.code }}</el-link>
								</el-tooltip>
							</el-form-item>
							<el-form-item label="预览">
								<el-button @click="drawer = true" icon="el-icon-tickets" plain type="primary" size="mini">试卷预览</el-button>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column type="index" :index="1">
				</el-table-column>
				<el-table-column label="试卷标题" prop="title">
				</el-table-column>
				<el-table-column prop="tag" label="分类" width="100" :filters="filters" :filter-method="filterTag" filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="scope.row.type === '' ? 'danger' : 'success'" disable-transitions>{{scope.row.type}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="试卷状态" align="left">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.status == 0" type="info">未发布</el-tag>
						<el-tag v-if="scope.row.status == 1" type="success">已发布</el-tag>
						<el-tag v-if="scope.row.runningStatus == -1">未开始</el-tag>
						<el-tag v-if="scope.row.runningStatus == 0">进行中</el-tag>
						<el-tag v-if="scope.row.runningStatus == 1">已结束</el-tag>
						<el-tag v-if="scope.row.personal == 0" type="danger">私密</el-tag>
						<el-tag v-if="scope.row.personal == 1" type="warning">公开</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="right">
					<template slot="header" slot-scope="scope">
						<el-row>
							<el-col :span='24' style="margin-top: 5px;">
								<el-input @keyup.enter.native="handleSearch" size="small" v-model="pageInfo.key" style="width: 170px;"
								 placeholder="输入编号/标题/类型搜索" />
							</el-col>
						</el-row>
					</template>
					<template slot-scope="scope">
						<el-button icon="el-icon-edit" plain type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button icon="el-icon-delete-solid" plain size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer style="width: 100%;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
			 :page-sizes="[10, 15, 30, 45,60]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageInfo.total">
			</el-pagination>
			<el-drawer title="我是标题" :visible.sync="drawer" :before-close="handleClose">
				<span>我来啦!</span>
			</el-drawer>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'PaperList',
		data() {
			return {
				drawer: false,
				pageInfo: {
					currentPage: 1,
					pageSize: 10,
					total: 0,
					key: "",
				},
				filters: [{
					text: '默认',
					value: '默认'
				}, ],
				tableData: [{
					title: 'INTELLIE',
					code: '',
					remark: '',
					time: '',
					status: '',
					type: '',
					imgUrl: '',
					personal: '',
					level: '',
					runningStatus: '',
				}],
			}
		},
		mounted() {
			this.initPaperList()
		},
		methods: {
			initPaperList() {
				this.$axios({
					url: "/paper/getPaperList",
					method: "POST",
					params: this.pageInfo
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						var data = res.data.E_BACKINFO
						console.log(data)
						this.pageInfo = data.condition
						this.tableData = data.data.list
						this.filters = []
						for (var index in data.data.types) {
							this.filters.push({
								text: data.data.types[index],
								value: data.data.types[index]
							})
						}
					} else {
						this.hint("数据加载失败，刷新页面试一试，")
					}
				}).catch(e => {
					console.log(e)
					this.hint("网络异常", "error")
				})
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},
			formatter(row, column) {
				return row.address;
			},
			filterTag(value, row) {
				return row.type === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			//修改页面size时触发
			handleSizeChange(val) {
				this.pageInfo.pageSize = val
				this.initPaperList()
			},
			//跳转页面时触发
			handleCurrentChange(val) {
				this.pageInfo.currentPage = val
				this.initPaperList()
			},
			//点击回车搜索时触发
			handleSearch() {
				this.initPaperList()
			},
			//点击顶部刷新按钮触发
			reflush() {
				this.initPaperList()
			},
			//点击复制考试编码
			clickCopy() {
				this.hint('试卷编号已复制到剪切板', 'success')
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		}
	};
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
