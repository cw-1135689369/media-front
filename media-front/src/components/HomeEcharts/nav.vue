<template>
	<div>
		<el-row :gutter="24">
			<el-col :span="6">
				<div class="wrap">
					<div class="grid-content bg-purple">
						<ICountUp :endVal="endVal" :duration="5000" @ready="onReady" />
						<div class="text">监测网站的数量</div>
					</div>
				</div>
			</el-col>

			<el-col :span="6">
				<div class="wrap">
					<div class="grid-content bg-purple">
						<ICountUp :endVal="endVal1" :duration="3000" @ready="onReady" />
						<div class="text">监测到新闻的数量</div>
					</div>
				</div>
			</el-col>

			<el-col :span="6">
				<div class="wrap">
					<div class="grid-content bg-purple">
						<ICountUp :endVal="endVal2" :duration="2000" @ready="onReady" />
						<div class="text">平均发文量</div>
					</div>
				</div>
			</el-col>

			<el-col :span="6">
				<div class="wrap">
					<div class="grid-content bg-purple">
						<ICountUp :endVal="endVal3" :duration="6000" @ready="onReady" />
						<div class="text">环比变化量</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>


</template>

<script>
	export default {
		name: "nav",
		data() {
			return {
				endVal: 0,
				endVal1: 0,
				endVal2: 0,
				endVal3: 0,
				date: 30,
			}
	
		},
		methods: {
			//动态加载数据
			onReady: function(instance, CountUp) {
				const that = this;
				instance.update(that.endVal + 100);
			},
			getBigMediaAnalysis: function() {
				//获取date
				var that = this
				this.$axios.get('http://127.0.0.1:5000/getDateById', {
						params: {
							id: 1,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						}
					})
					.then((response) => {
						var analysis_data = response.data
						that.date = Number(analysis_data[0][0])
						this.getDate()
					})
					.catch((error) => {
						console.log(error); //异常
					});
	
			},
			getDate: function() {
				this.$axios.get('http://127.0.0.1:5000/getBigMediaAnalysis', {
						params: {
							date: this.date,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						}
					})
					.then((response) => {
						var analysis_data = response.data
						console.log(analysis_data)
						this.endVal = Number(analysis_data.web_count),
						this.endVal1 = Number(analysis_data.article_sum_count),
						this.endVal2 = Number(analysis_data.article_sum_count_average),
						this.endVal3 = Number(analysis_data.different_count)
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
	
	
		},
		mounted() {
			this.getBigMediaAnalysis()
		}
	};
</script>

<style scoped>
	/* 计数器 */
	.iCountUp {
		width: 100%;
		height: 100%;
		background: rgb(240, 243, 244);
		box-shadow: none;
		font-size: 20px;
		margin: 0;
		color: #4d63bc;
		font-weight: 300;
	}

	/* element ui */
	.el-row {
		margin-bottom: 20px;
	}

	.el-col {
		border-radius: 4px;
		width: 25%;
	}

	/* i 标签 */
	.el-col i {
		font-size: 60px;
	}

	.el-icon-s-custom {
		color: #40c9c6;
	}

	.el-icon-chat-dot-square {
		color: #36a3f7;
	}

	.el-icon-shopping-cart-2 {
		color: red;
	}

	.el-icon-wallet {
		color: #34bfa3;
	}

	/* 头部信息 */
	.wrap {
		background: #fff;
		display: flex;
		text-align: center;
		justify-content: space-around;
		align-items: center;
		margin: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		font-size: 1.5rem;
		font-weight: bolder;
		height: 131px;
	}

	.iCountUp .text {
		font-size: 0.8rem;
		color: #36a3f7;
		text-shadow: 0 5px 10px red;
		white-space: nowrap;
		margin-top: 20px;
		font-weight: 700;
	}

	.bg-purple {
		width: 50%;
		margin-top: -30px;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	/* charts */


	.echort1 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		left: 10px;
	}

	.echort2 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		top: 830px;
		left: 10px;
	}

	.echort3 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		top: 1260px;
		left: 10px;
	}

	.echort4 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		top: 1700px;
		left: 10px;
	}
</style>
