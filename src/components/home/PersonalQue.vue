<template>
	<el-container style="height: 750px;">
		<el-main>
			<el-table v-loading="loading" :data="pageInfo.infos" style="width: 100%;" :max-height="680" :highlight-current-row="true">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="标题:">
								<span>{{ props.row.title }}</span>
							</el-form-item>
							<el-form-item label="内容:">
								<span>{{ props.row.content }}</span>
							</el-form-item>
							<el-form-item label="上传时间:">
								<span>{{ props.row.time }}</span>
							</el-form-item>
							<el-form-item label="类型:">
								<span>{{ props.row.type }}</span>
							</el-form-item>
							<el-form-item label="难度:">
								<span>{{ props.row.level }}</span>
							</el-form-item>
							<el-form-item label="来源:">
								<span>{{ props.row.from }}</span>
							</el-form-item>
							<el-form-item label="查看原题:">
								<el-link :href="props.row.origin" type="primary">{{props.row.origin}}</el-link>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="题号" type="index" :index="1" width="80">
				</el-table-column>
				<el-table-column label="标题" prop="title" width="350">
				</el-table-column>
				<el-table-column prop="level" label="难度" width="100" :filters="[{'text':'算法','value':'算法'},]" :filter-method="filterLevel"
				 filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="'danger'" disable-transitions>{{scope.row.level}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="分类" width="100" :filters="[{'text':'算法','value':'算法'},]" :filter-method="filterType"
				 filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="'success'" disable-transitions>{{scope.row.type}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="time" label="创建时间" width="145" :filters="[{'text':'算法','value':'算法'},]" :filter-method="filterTime"
				 filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="'primary'" disable-transitions>{{scope.row.time}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="right">
					<template slot="header" slot-scope="scope">
						<el-input v-model="pageInfo.searchKey" size="mini" style="width: 150px;" placeholder="输入标题/类型搜索" />
					</template>
					<template slot-scope="scope">
						<el-button icon="el-icon-edit" plain type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
						<el-button icon="el-icon-delete" plain type="danger" size="mini" @click="handleEdit(scope.$index, scope.row)">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
			 :page-sizes="pageSizes" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
			<!-- 解释说明的提示框 -->
			<el-dialog title="个人题库" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
		name: "PersonalQue",
		data() {
			return {
				loading:true,//加载界面
				dialogVisible: false,
				pageSizes: [5, 10, 15, 20, 25],
				pageInfo: {
					types: [],
					infos: [],
					levels: [],
					pageSize: 10,
					total: 0,
					currentPage: 1,
					searchKey: "", //搜索关键字
					type: "",
					level: "",
					createTime: "",
				}
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
				this.$axios({
					url: "/personal/genQuestionList",
					method: "POST",
					params: {
						param: this.$qs.stringify(this.pageInfo),
					}
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						//返回的数据填充页面
						this.fullPage(res.data.E_BACKINFO)
					} else {
						this.hint("数据加载失败，请刷新页面重试", "error")
					}
				}).catch(e => {
					this.loading = false
					this.hint("数据加载失败，请检查网络状态", "error")
				})
			},
			fullPage(data) {
				this.pageInfo = data
				this.loading = false
			},
			resetDateFilter() {
				this.$refs.filterTable.clearFilter('date');
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
				return row.tag === value;
			},
			filterTime(value, row) {
				return row.tag === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		}
	}
</script>

<style>
	<style>.demo-table-expand {
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
</style>
