<template>
	<div id="header">
		<div class="wrap">
			<div id="title-sidebar">
				<a class="image">
					<img src="../assets/github.png" alt />
					橘涞金服
				</a>
			</div>
			<div class="right" id="right-bread">
				<i class="el-icon-s-fold" id="fold" @click="flodpx()"></i>
				<div class="shouye">
					<li id="domshouye">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>当前位置:</el-breadcrumb-item>
							<el-breadcrumb-item :to="{ path: items.path }" v-for="(items,index) in breadList" :key="index">{{items.meta.title}}</el-breadcrumb-item>
						</el-breadcrumb>
					</li>
				</div>
				<div class="loginin">
					<li id="domFullScreen">
						<i class="el-icon-full-screen" @click="screen"></i>
					</li>
					<div class="geren">
						<el-col>
							<el-dropdown>
								<span class="el-dropdown-link">
									<div class="admin">
										admin
										<i class="el-icon-arrow-down"></i>
									</div>
									<div>
										<img src="../assets/personal/user01.jpg" alt />
									</div>
								</span>
								<el-dropdown-menu slot="dropdown">
									<router-link to="/home">
										<el-dropdown-item icon="el-icon-s-home">首页</el-dropdown-item>
									</router-link>
									<el-dropdown-item icon="el-icon-setting">
										<span @click="open()" class="remove">设置</span>
									</el-dropdown-item>
									<el-dropdown-item icon="el-icon-switch-button">
										<span @click="removetoken()" class="remove">退出</span>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-col>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				fullscreen: false,
				key: 0,
				breadList: []
			};
		},
		methods: {
			//设置时间，媒体等信息
			open() {
				this.$prompt('请输入系统查询时间（30-90的正整数）', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^([3-9][0-9]|90)$/,
					inputErrorMessage: '输入不正确'
				}).then(({
					value
				}) => {
					this.$message({
						type: 'success',
						message: '已更新系统查询时间为: ' + value + '天',
						
					});
					this.setData(value)
					this.$router.go(0)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
				
			},
			//更改数据库数据
			setData: function(value) {
				var that = this;
				that.$axios.get('http://127.0.0.1:5000/setDateById', {
						params: {
							date: value,
							id: 1,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						},
					})
					.then((response) => {
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
			// 缩放面包屑
			flodpx() {
				let titlesidebar = document.getElementById("title-sidebar");
				let elaside = document.getElementById("elaside");
				let fold = document.getElementById("fold");
				let rightbread = document.getElementById("right-bread");
				let sidebarwrap = document.getElementById("sidebarwrap");

				this.key++;
				if (this.key == 1) {
					titlesidebar.style.width = "50px";
					elaside.style.width = "50px";
					rightbread.style.width = "calc(100% - 100px)";
					sidebarwrap.style.width = "calc(100% - 200px)";
					fold.className = "el-icon-s-unfold";
				}
				if (this.key == 2) {
					titlesidebar.style.width = "200px";
					elaside.style.width = "200px";
					rightbread.style.width = "calc(100% - 200px)";
					sidebarwrap.style.width = "calc(100% - 300px)";
					fold.className = "el-icon-s-fold";
					this.key = 0;
				}
			},

			// 点击全屏
			screen() {
				let element = document.documentElement;
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			},
			// 退出
			removetoken() {
				// 清除token
				localStorage.removeItem("loginToken");
				this.$router.push("/login");
			},
			// 面包屑
			isHome(route) {
				return route.name === "home";
			},
			getBreadcrumb() {
				let matched = this.$route.matched;
				//如果不是首页
				if (!this.isHome(matched[0])) {
					matched = [{
						path: "/home",
						meta: {
							title: "首页"
						}
					}].concat(matched);
				}
				this.breadList = matched;
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
		},
		mounted() {
			this.getBreadcrumb();
		}
	};
</script>

<style scoped>
	#header {
		width: 100%;
		height: 50px;
		background: #fff;
		border-bottom: 1px solid rgb(101, 105, 122);
	}

	.wrap {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100%;
	}

	#title-sidebar {
		width: 200px;
		background: rgb(95, 100, 119);
		transition: 1s;
	}

	.right {
		width: calc(100% - 200px);
		background: #fff;
		transition: 1s;
	}

	.el-breadcrumb {
		line-height: 50px;
	}

	li {
		list-style: none;
	}

	/* left */
	.image {
		color: #fff;
		text-align: center;
		position: absolute;
		line-height: 50px;
		margin-left: 24px;
		cursor: pointer;
	}

	.image img {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		margin-left: -2px;
		color: #fff;
		vertical-align: middle;
	}

	/* right */
	#fold,
	.shouye {
		float: left;
		line-height: 50px;
		text-align: center;
		margin-left: 3rem;
	}

	.loginin {
		float: right;
		width: 300px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.loginin i {
		font-size: 1.2rem;
		color: #9b9292;
		cursor: pointer;
		margin-left: 1rem;
	}

	.loginin li:hover {
		background: #ccc;
		opacity: 0.6;
	}

	.el-dropdown-link {
		display: flex;
		justify-content: space-around;
		align-items: center;
		cursor: pointer;
		margin-left: 20px;
	}

	.el-dropdown-link:hover {
		background: #ccc;
		opacity: 0.6;
	}

	.el-dropdown-link img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.remove {
		width: 100%;
		height: 100%;
	}
</style>
