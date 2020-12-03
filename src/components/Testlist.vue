<template>
	<el-container style="height: 480px;">
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="试卷编号">
							<span>{{ props.row.id }}</span>
						</el-form-item>
						<el-form-item label="试卷标题">
							<span>{{ props.row.title }}</span>
						</el-form-item>
						<el-form-item label="上传时间">
							<span>{{ props.row.time }}</span>
						</el-form-item>
						<el-form-item label="开放时间">
							<span>{{ props.row.startTime }}</span>
						</el-form-item>
						<el-form-item label="结束时间">
							<span>{{ props.row.endTime }}</span>
						</el-form-item>
						<el-form-item label="试卷描述">
							<span>{{ props.row.mark }}</span>
						</el-form-item>
						<el-form-item label="预览">
							<el-button @click="drawer = true" icon="el-icon-tickets" plain type="primary" size="mini">试卷预览</el-button>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="试卷编号" prop="id">
			</el-table-column>
			<el-table-column label="试卷标题" prop="title">
			</el-table-column>
			<el-table-column prop="tag" label="分类" width="100" :filters="filters" :filter-method="filterTag" filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
					<el-input v-model="searchKey" size="mini" style="width: 150px;" placeholder="输入ID/标题搜索" />
				</template>
				<template slot-scope="scope">
					<el-button icon="el-icon-edit" plain type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button icon="el-icon-delete-solid" plain size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-footer>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
			<el-drawer title="我是标题" :visible.sync="drawer" :before-close="handleClose">
				<span>我来啦!</span>
			</el-drawer>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'list',
		data() {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				drawer: false,
				searchKey:"",
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				filters: [{
						text: '家',
						value: '家'
					}, {
						text: '地球',
						value: '地球'
					},
					{
						text: '外星',
						value: '外星'
					},
					{
						text: '公司',
						value: '公司'
					}
				],
				tableData: [{
					id: '12987122',
					title: '2021-2020好自为之期末考试',
					mark: '好自为之，好好反思，下次还敢',
					time: '2020-11-9 12:12:41',
					isLimit: '限时考试',
					startTime: "2020-11-21 12:00:00",
					endTime: "2020-11-25 15:30:00",
					tag: '家'
				}, {
					id: '12987122',
					title: '2021-2020好自为之期末考试',
					mark: '好自为之，好好反思，下次还敢',
					time: '2020-11-9 12:12:41',
					isLimit: '限时考试',
					startTime: "2020-11-21 12:00:00",
					endTime: "2020-11-25 15:30:00",
					tag: '外星'
				}, {
					id: '12987122',
					title: '2021-2020好自为之期末考试',
					mark: '好自为之，好好反思，下次还敢',
					time: '2020-11-9 12:12:41',
					isLimit: '限时考试',
					startTime: "2020-11-21 12:00:00",
					endTime: "2020-11-25 15:30:00",
					tag: '公司'
				}]
			}
		},
		methods: {
			resetDateFilter() {
				this.$refs.filterTable.clearFilter('date');
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},
			formatter(row, column) {
				return row.address;
			},
			filterTag(value, row) {
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
