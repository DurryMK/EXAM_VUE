<template>
	<el-container style="height: 100%;">
		<el-header style="height: 10%;">
			<el-menu :default-active="active" class="el-menu-demo" mode="horizontal" active-text-color="#409eff" @select="handleSelect">
				<el-menu-item index="0">试卷分析</el-menu-item>
				<el-menu-item index="1">考生数据</el-menu-item>
				<el-menu-item index="2">成绩分析</el-menu-item>
			</el-menu>
		</el-header>
		<el-main style="height: 90%;padding: 5px;">
			<el-card shadow="never" >
				<v-chart style="height: 300px;width: 300px;" :options="option" />
			</el-card>
		</el-main>
	</el-container>
</template>

<script>
	import ECharts from 'vue-echarts'
	import 'echarts/lib/chart/line'
	import 'echarts/lib/component/polar'
	import 'echarts/lib/chart/pie'
	export default {
		name: "Analysis",
		components: {
			'v-chart':ec
		},
		data() {
			let data = []
			for (let i = 0; i <= 360; i++) {
				let t = i / 180 * Math.PI
				let r = Math.sin(2 * t) * Math.cos(2 * t)
				data.push([r, i])
			}
			return {
				active: "0",
				option : {
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b}: {c} ({d}%)'
				    },
				    legend: {
				        orient: 'vertical',
				        left: 10,
				        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
				    },
				    series: [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius: ['50%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                show: false,
				                position: 'center'
				            },
				            emphasis: {
				                label: {
				                    show: true,
				                    fontSize: '30',
				                    fontWeight: 'bold'
				                }
				            },
				            labelLine: {
				                show: false
				            },
				            data: [
				                {value: 335, name: '直接访问'},
				                {value: 310, name: '邮件营销'},
				                {value: 234, name: '联盟广告'},
				                {value: 135, name: '视频广告'},
				                {value: 1548, name: '搜索引擎'}
				            ]
				        }
				    ]
				}

			}
		},
		mounted() {
			this.initPage()
		},
		methods: {
			//获取初始化数据
			initPage() {

			},
			//选中导航栏触发事件
			handleSelect() {

			}
		}
	}
</script>

<style>
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>
