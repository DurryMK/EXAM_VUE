<template>
	<el-container>
		<el-header>
			<el-backtop @click.prevent.self="topa" :bottom="100" :visibility-height=1 disabled>
				<i class="el-icon-view"></i>
			</el-backtop>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="el-icon-switch-button"></i>结束考试</el-menu-item>
				<el-menu-item index="2"><i class="el-icon-info"></i>本场考试须知</el-menu-item>
			</el-menu>
		</el-header>
		<el-main>
			<el-col :span="4">
				<!-- 监考区域开考状态 -->
				<el-card style="height: 650px;">
					<!-- 计时栏 -->
					<el-col :span="24">
						<el-tag style="width: 100%;background-color: white;"><i class="el-icon-time"></i>&nbsp;&nbsp;{{totalTimeText}}</span></el-tag>
					</el-col>
					<!-- 智能监考提示语 -->
					<el-col :span="24">
						<el-tag type="success" style="width: 100%;"><i class="el-icon-view"></i>&nbsp;&nbsp;智能监考已开启<br />
						</el-tag>
					</el-col>
					<!-- 页面监听 -->
					<el-col :span="24" v-show="leaveTime!=0">
						<el-tag type="warning" style="width: 100%;"><span><i class="el-icon-camera-solid"></i>&nbsp;&nbsp;你已经离开页面{{leaveTime}}次</span>
						</el-tag>
					</el-col>
					<!-- 视频监考区 -->
					<el-col :span="24" style="border-radius: 30px">
						<video id="player" style="width: 100px;height: 100px;"></video>
						<canvas id="canvas" style="display:none;"></canvas>
						<el-button @click="stopCa()">停止</el-button>
					</el-col>
				</el-card>
			</el-col>
			<el-col :span="19" :offset="1">
				<!-- 考试信息确认 -->
				<el-card v-show="!isBegin" shadow="always" style="height: 650px;">
					<div @click.stop>
						<el-button @click="begin">确认开始考试</el-button>
					</div>
				</el-card>
				<!-- 考试内容 -->
				<el-card v-show="isBegin" shadow="always" style="height: 650px;">
					<span>请你仔细看：小草在努力生长，花儿在尽情绽放，蝶儿翩翩起舞，飞鸟空中翱翔，校园里学生们认真读书学习，社会中人们勤奋工作、生活……这是我们祖国的美丽画卷，万物的努力都是为祖国赢得更美好的明天！因为，我们都相信，祖国的未来不是梦！

						我们期待着，环保意识注入每个人的心中，环保行动投入整个社会，这是人们现在的梦想，这也会是祖国不久后的现实。“水是生命的源泉”，水滋养了一代又一代人民，净化、荡涤着人们的心灵。为了中国梦，请从现在开始珍惜每一滴水，让每一滴水都滋润中国人的心田！

						在草木茂盛，鸟语花香的季节里，漫步在优美的环境中，总是会令人心旷神怡，那就不要让垃圾污染了美丽的景色。看到垃圾，俯身轻轻拾起，正确地放入分类垃圾桶中。顿时，你会感到心情舒畅，所有人都在向你点头微笑。有了垃圾，不乱丢；看到垃圾，主动拾。那我们的社会将会多么美丽，祖国将会多么整洁，让全世界都仰慕这优美的文化古国——中国！

						我们期待着，这个社会有更多的和谐与无私，这是人们现在的梦想，这也将会是祖国不久后的现实。现在的社会很可作文https://wWw.ZuoWenwang.Net/怕，黑心商人们为了谋取个人的利益，将有毒有害的物质添加进入商品中，如今，就连食物也成了人们心中的危险品。自私吞噬了一些人的美好心灵，请大家敞开心扉，扪心自问，到底该如何来面对这个社会，那答案一定会是：真诚无私。只要抛弃了心中的自私贪婪，让无私，纯真，快乐永驻心中，不再想获得那一丝利益，不再去碰触那一点私心，真诚无私的面对这个世界。那么，快乐将重回人们的脸上，放心将重驻人们的心中，祖国也将更加和谐繁荣！请为了中国梦，真诚无私一次吧！

						我们青少年，也将会是祖国的未来。俗话说：“少年富则国富，少年强则国强。”青少年是国家与民族的希望，只有现在我们努力读书，勤奋刻苦，长大后才能够装点祖国，回报社会。现在，我们是祖国的花朵；将来，我们就是祖国的栋梁，同学们，有了我们的努力，祖国定会大放光彩。请为了中国梦，奋力拼搏，实现人生的价值，释放生命的光辉，因为，我们就是祖国的未来。

						祖国的未来不是梦，我们认真的过每一分钟，祖国的未来不是梦，我们的心跟着希望在动，跟着希望在动……

						哦，沸腾吧，中国梦！</span>
				</el-card>
			</el-col>
		</el-main>
	</el-container>

</template>

<script>
	function formatTimeText(totalTime) {
		var h = Math.floor(totalTime / 60 / 60)
		var m = Math.floor((totalTime - (h * 60 * 60)) / 60)
		var s = (totalTime - (h * 60 * 60) - (m * 60))
		if (h < 10) {
			h = "0" + h
		}
		if (m < 10) {
			m = "0" + m
		}
		if (s < 10) {
			s = "0" + s
		}
		return h + "小时 " + m + "分 " + s + "秒"
	}
	export default {
		name: 'Core',
		props: {},
		created() {

		},
		mounted() {
			if (this.isCopy) {
				//开启禁止复制
				this.$nextTick(() => {
					// 禁用右键
					document.oncontextmenu = new Function("event.returnValue=false");
					// 禁用选择
					document.onselectstart = new Function("event.returnValue=false");
				});
			}
			if (this.isLeave) {
				//开启页面切换监听
				window.addEventListener("focus", this.enter);
				window.addEventListener("blur", this.leave);
			}
		},
		data() {
			return {
				paperId: "123", //本张试卷的编号
				examineeId: "123", //本场考生的用户id
				runningId: this.getUUID(), //本场考试的唯一标识

				isLimit: false, //是否开启考试限时功能
				isCopy: false, //是否开启禁止复制功能
				isPaste: false, //是否开启禁止粘贴功能
				isLeave: true, //是否开启监听切换页面功能
				isCamera: true, //是否开启智能视频监考
				isBegin: false, //是否开始考试
				totalTime: 120, //考试总时长
				totalTimeText: '考试尚未开始',

				activeIndex: '0', //顶部激活的菜单
				leaveNum: 3, //允许离开考试界面的次数
				leaveTime: 0, //已经离开考试界面的次数

				detectionTime: 120, //图像采集的持续时间

				timeId: "", //计时器id

				player: null, //视频显示对象
			}
		},
		methods: {
			topa(event) {
				console.log(event)
			},
			enter() {
				console.log("进入页面")
			},
			leave() {
				if (this.isBegin) {
					this.leaveTime++
				}
			},
			handleSelect() {

			},
			begin() { //开始考试计时
				if (!this.isBegin) {
					if (this.isCamera) {
						this.vedioHandle_1() //开启视频监考流程
					}
					this.isBegin = true
					this.timeId = setInterval(this.timer_, 1000)
				}
			},
			vedioHandle_1() { //视频监考流程处理
				//1.提示开始人脸图像收集
				this.$confirm('本场考试已开启视频监考,即将开始收集考生人脸图像信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info',
					center: true
				}).then(v => {
					this.vedioHandle_2()
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '图像采集失败,请刷新页面重试'
					});
				});
			},
			vedioHandle_2() { //开始人脸图像收集
				this.$message({
					type: 'success',
					message: '请保持面部正对摄像头,图像采集将在1分钟内完成',
					duration: 6000,
					iconClass: 'el-icon-camera-solid'
				});
				//2.打开摄像头
				this.cameraOpenHandle()
				//3.两分钟内不停截取图像 直到检测到人脸并记录
				//坑：vue中必须使用_this指向this才能实现延迟调用函数的效果
				let _this = this
				setTimeout(function() {
					_this.faceDetection()
				}, 3000)
				//4.开始计时 两分钟内持续检测
				this.timeId = setInterval(this.timer__, 1000)
			},
			faceDetection() { //图像采集检测
				//截取一张图像传到服务端检测
				let imgStr = this.getImage()
				imgStr = imgStr.replace("data:image/png;base64,", "")
				this.$axios({
					url:  "/faceDetectionOp",
					method: "POST",
					params: {
						imgStr: imgStr,
						paperId: this.paperId,
						examineeId: this.examineeId,
						runningId: this.runningId,
					}
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						this.$message({
							type: 'success',
							message: '图像采集已完成,请开始作答',
							duration: 1000,
						});
						//停止采集图像倒计时
						clearInterval(this.timeId)
						//开启视频监考
						this.vedioHandle_3()
					} else {
						this.$message({
							type: 'success',
							message: '请保持面部正对摄像头,图像采集将在2分钟内完成',
							duration: 2000,
							iconClass: 'el-icon-camera-solid'
						});
						this.$message({
							type: 'error',
							message: res.data.E_BACKINFO,
							duration: 1000,
						});
						// 检测失败重新检测
						if (this.detectionTime > 0) {
							//防止页面闪烁过快 3000调一次接口
							let _this = this
							setTimeout(function() {
								_this.faceDetection()
							}, 3000)
						}
					}
				})
			},
			vedioHandle_3() { //持续的视频监考
				if (this.totalTime == 0) {
					return
				}
				//截取一张图像传到服务端
				let imgStr = this.getImage()
				imgStr = imgStr.replace("data:image/png;base64,", "")
				this.$axios({
					url:  "/faceCompareOp",
					method: "POST",
					params: {
						imgStr: imgStr,
						paperId: this.paperId,
						examineeId: this.examineeId,
						runningId: this.runningId,
					}
				}).then(res => {
					if (res.data.E_BACKSTATUS == '0') {
						// 人脸对比成功 
					} else {
						// 对比失败发出警示
						this.$message({
							type: 'error',
							message: '考试过程中,请保持面部在采集框内',
							duration: 1000,
							iconClass: 'el-icon-camera-solid'
						});
					}
					if (this.totalTime > 0) {
						//继续下一次检测  生成一个随机检测时间
						let nextTime = Math.floor(Math.random() * (12 - 1 + 1) + 1)
						console.log("下一次检测在" + nextTime + "秒后")
						let _this = this
						setTimeout(function() {
							_this.vedioHandle_3()
						}, nextTime * 1000)
					}
				})
			},
			cameraOpenHandle() { //开启摄像头
				//固定套路
				if (navigator.mediaDevices === undefined) {
					navigator.mediaDevices = {};
				}
				if (navigator.mediaDevices.getUserMedia === undefined) {
					navigator.mediaDevices.getUserMedia = function(constraints) {
						var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
						if (!getUserMedia) {
							return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
							console.log("浏览器不支持")
						}
						return new Promise(function(resolve, reject) {
							getUserMedia.call(navigator, constraints, resolve, reject);
						});
					}
				}
				const constraints = {
					video: true,
					audio: false
				};
				let videoPlaying = false;
				let v = document.getElementById('player');
				let promise = navigator.mediaDevices.getUserMedia(constraints);
				promise.then(stream => {
					if ("srcObject" in v) {
						v.srcObject = stream;
					} else {
						v.src = window.URL.createObjectURL(stream);
					}
					v.onloadedmetadata = function(e) {
						v.play();
						videoPlaying = true;
					};
				}).catch(err => {
					console.error(err.name + ": " + err.message);
				})
				this.player = v
			},
			getImage() { //截取视频框的信息
				let canvas = document.getElementById("canvas")
				canvas.getContext('2d').drawImage(this.player, 0, 0, 100, 100)
				// 获取图片base64链接
				var image = canvas.toDataURL('image/png')
				return image
			},
			stopCa() { //停止摄像
				this.player.srcObject.getTracks()[0].stop()
			},
			timer_() { //本场考试的计时
				this.totalTime--
				this.totalTimeText = formatTimeText(this.totalTime)
				if (this.totalTime == 0) {
					this.isBegin = false
					this.totalTimeText = "考试已结束"
					this.stopCa() //关闭摄像头
					clearInterval(this.timeId)
				}
			},
			timer__() { //图像采集的计时
				this.detectionTime--
				if (this.detectionTime == 0) {
					clearInterval(this.timeId)
					this.$message({
						type: 'error',
						message: '图像采集失败,请刷新页面后重试',
						duration: 3000,
						iconClass: 'el-icon-camera-solid'
					});
				}
			}
		}
	}
</script>

<style>
</style>
