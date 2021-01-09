<template>
	<el-container style="height: 100%;">
		<el-header style="padding: 2px;">
			<el-divider content-position="right">
				<el-input @keyup.enter.native="initPaperList" size="small" v-model="pageInfo.key" style="width: 200px;" placeholder="输入编号/标题/类型搜索"
				 clearable />
			</el-divider>
		</el-header>
		<el-main style="height: 90%;padding: 10px;">
			<el-row>
				<el-col style="height: 100%;" :span="24">
					<el-col :span="6" v-for="(item, index) in tableData" :key="item.code" :offset="1">
						<el-card shadow="hover" :body-style="{ padding: '0px' }" style="margin-top: 5px;">
							<el-image style="width: 100%; height: 200px" :src="item.imgUrl" fit="contain"></el-image>
							<div style="padding: 14px;">
								<div class="bottom clearfix">
									<span class="sys-tl-md">{{ item.title }}</span>
								</div>
								<div class="bottom clearfix" style="text-align:left;margin-left: 10%;">
									<span class="sys-font-md"> 类型 : {{item.type}} </span>
									<el-divider direction="vertical"></el-divider>
									<span class="sys-font-md"> 题数 : 0 </span>
									<el-divider direction="vertical"></el-divider>
									<el-link type="primary" icon="el-icon-view">预览</el-link>
								</div>
								<div class="bottom clearfix" style="text-align:left;margin-left: 10%;">
									<span class="sys-font-md"> 状态 : </span>
									<el-tag size="mini" v-if="item.status == 0" type="info">未发布</el-tag>
									<el-tag size="mini" v-if="item.status == 1" type="success">已发布</el-tag>
									<el-divider direction="vertical"></el-divider>
									<el-tag size="mini" v-if="item.runningStatus == -1" type="info">未开始</el-tag>
									<el-tag size="mini" v-if="item.runningStatus == 0" type="success">进行中</el-tag>
									<el-tag size="mini" v-if="item.runningStatus == 1" type="info">已结束</el-tag>
									<el-divider direction="vertical"></el-divider>
									<el-tag size="mini" v-if="item.personal == 0" type="danger">私密</el-tag>
									<el-tag size="mini" v-if="item.personal == 1" type="warning">公开</el-tag>
								</div>
								<div class="bottom clearfix">
									<el-button style="width: 100%;" type="info" v-clipboard:copy="item.code" v-clipboard:success="clickCopy" plain>点击复制试卷链接</el-button>
								</div>
								<div class="bottom clearfix">
									<el-button style="width: 100%;" type="danger" plain class="sys-font-md">查看详情</el-button>
								</div>
								<div class="bottom clearfix" style="text-align:left;margin-left: 10%;">
									<span class="time">创建时间:</span><time class="time">{{ item.time }}</time>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-col>
			</el-row>
		</el-main>
		<el-footer style="width: 100%;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
			 :page-sizes="[3,6, 9, 15, 21]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="pageInfo.total">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: 'PaperManage',
		data() {
			return {
				drawer: false,
				pageInfo: {
					currentPage: 1,
					pageSize: 3,
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
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
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
</style>
