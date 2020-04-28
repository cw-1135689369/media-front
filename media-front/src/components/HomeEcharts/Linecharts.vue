<template>
	<div id="linecharts">
		<div id="myChart" :style="{width: '100%', height: '400px'}"></div>
	</div>
</template>

<script>
	import {
		readlink
	} from "fs";
	export default {
		name: "linecharts",
		data() {
			return {
				top_1: [],
				top_2: [],
				top_3: [],
				top_4: [],
				top_5: [],
				top_6: [],
				top_7: [],
				top_8: [],
				top_9: [],
				top_10: [],
				x: [],
				media: [],
				date: 30,
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
				that.$axios.get('http://127.0.0.1:5000/getBigMediaBrokenlineChartByDate', {
						params: {
							date: that.date,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						},
					})
					.then((response) => {
						var data = response.data
						for (let i = 0; i < data.length; i++) {
							that.media.push(String(data[i]));
							i++;
						}

						for (let j = 0; j < data[1].length; j++) {
							that.x.push(String(data[1][j][0]));
						}

						for (let j = 0; j < data[1].length; j++) {
							that.top_1.push(String(data[1][j][1]));
						}
						for (let j = 0; j < data[3].length; j++) {
							that.top_2.push(String(data[3][j][1]));
						}
						for (let j = 0; j < data[5].length; j++) {
							that.top_3.push(String(data[5][j][1]));
						}
						for (let j = 0; j < data[7].length; j++) {
							that.top_4.push(String(data[7][j][1]));
						}
						for (let j = 0; j < data[9].length; j++) {
							that.top_5.push(String(data[9][j][1]));
						}
						for (let j = 0; j < data[11].length; j++) {
							that.top_6.push(String(data[11][j][1]));
						}
						for (let j = 0; j < data[13].length; j++) {
							that.top_7.push(String(data[13][j][1]));
						}
						for (let j = 0; j < data[15].length; j++) {
							that.top_8.push(String(data[15][j][1]));
						}
						for (let j = 0; j < data[17].length; j++) {
							that.top_9.push(String(data[17][j][1]));
						}
						for (let j = 0; j < data[19].length; j++) {
							that.top_10.push(String(data[19][j][1]));
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
						text: "日发文监测",
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
						data: this.media,
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
							name: this.media[0],
							type: "line",
							stack: this.media[0],
							itemStyle: {
								color: "#f4516c"
							},
							lineStyle: {
								color: "#f4516c"
							},
							data: this.top_1
						},
						{
							name: this.media[1],
							type: "line",
							stack: this.media[1],
							itemStyle: {
								color: "#19CAAD"
							},
							lineStyle: {
								color: "#19CAAD"
							},
							data: this.top_2
						},
						{
							name: this.media[2],
							type: "line",
							stack: this.media[2],
							itemStyle: {
								color: "#8CC7B5"
							},
							lineStyle: {
								color: "#8CC7B5"
							},
							data: this.top_3
						}, {
							name: this.media[3],
							type: "line",
							stack: this.media[3],
							itemStyle: {
								color: "#A0EEE1"
							},
							lineStyle: {
								color: "#A0EEE1"
							},
							data: this.top_4
						},
						{
							name: this.media[4],
							type: "line",
							stack: this.media[4],
							itemStyle: {
								color: "#BEE7E9"
							},
							lineStyle: {
								color: "#BEE7E9"
							},
							data: this.top_5
						},
						{
							name: this.media[5],
							type: "line",
							stack: this.media[5],
							itemStyle: {
								color: "#aaffff"
							},
							lineStyle: {
								color: "#aaffff"
							},
							data: this.top_6
						},
						{
							name: this.media[6],
							type: "line",
							stack: this.media[6],
							itemStyle: {
								color: "#aa0000"
							},
							lineStyle: {
								color: "#aa0000"
							},
							data: this.top_7
						},
						{
							name: this.media[7],
							type: "line",
							stack: this.media[7],
							itemStyle: {
								color: "#00aaff"
							},
							lineStyle: {
								color: "#00aaff"
							},
							data: this.top_8
						},
						{
							name: this.media[8],
							type: "line",
							stack: this.media[8],
							itemStyle: {
								color: "#550000"
							},
							lineStyle: {
								color: "#550000"
							},
							data: this.top_9
						},
						{
							name: this.media[9],
							type: "line",
							stack: this.media[9],
							itemStyle: {
								color: "#ffff00"
							},
							lineStyle: {
								color: "#ffff00"
							},
							data: this.top_10
						},
					]
				});
			}
		}
	};
</script>
<style>
</style>
