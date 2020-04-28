<template>
	<div id="mediaLinecharts">
		<div id="myChart" :style="{width: '100%', height: '400px'}"></div>
	</div>
</template>

<script>
	import {
		readlink
	} from "fs";
	export default {
		name: "mediaLinecharts",
		data() {
			return {
				sum_data: [],
				x: [],
				negative_counnt_data: [],
				media:"'中国证券报'"
			};
		},
		mounted() {
			this.getDataSet()
		},

		methods: {
			getDataSet: function() {
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
						this.getData();
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
			getData: function() {
				var that = this;
				if(typeof this.$route.query.media != 'undefined'){
					that.media="'"+this.$route.query.media+"'"
				}
				that.$axios.get('http://127.0.0.1:5000/getBigMedia', {
						params: {
							date: 30,
							media: that.media,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						},
					})
					.then((response) => {
						var data = response.data
						for (let j = 0; j < data[1].length; j++) {
							that.x.push(String(data[1][j][0]));
						}
						for (let j = 0; j < data[0].length; j++) {
							that.sum_data.push(String(data[0][j][1]));
						}
						for (let j = 0; j < data[1].length; j++) {
							that.negative_counnt_data.push(String(data[1][j][1]));
						}
						this.mcharts()
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
			mcharts() {
				let myChart = this.echarts.init(document.getElementById("myChart"));
				myChart.setOption({
					title: {
						text: this.media+"近"+this.date+"天发文量正负面折线图",
						textStyle: {
							color: "#36a3f7",
							fontStyle: "italic"
						}
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								background: "#6a7985"
							}
						}
					},
					legend: {
						data: ['总体', '负面'],
						textStyle: {
							fontStyle: "italic",
							fontWeight: "fontWeight",
							fontsize: "16px"
						}
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: {
						type: "category",
						boundaryGap: false,
						nameTextStyle: {
							color: "#36a3f7"
						},
						data: this.x,
					},
					yAxis: {
						type: "value"
					},
					series: [{
							name: '总体',
							type: "line",
							stack: '总体',
							itemStyle: {
								color: "#19CAAD"
							},
							lineStyle: {
								color: "#19CAAD"
							},
							data: this.sum_data
						},
						{
							name: '负面',
							type: "line",
							stack: '负面',
							itemStyle: {
								color: "#f4516c"
							},
							lineStyle: {
								color: "#f4516c"
							},
							data: this.negative_counnt_data
						},
					]
				});
			}
		}
	};
</script>
<style>

</style>
