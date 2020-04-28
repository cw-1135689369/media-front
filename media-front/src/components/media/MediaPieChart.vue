<template>
	<div id="mediaPie">
		<div id="mediaPieChart" :style="{width: '100%', height: '400px'}"></div>
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
				myList: [],
				x: [],
				media:"'中国证券报'",
				date:30
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
				that.$axios.get('http://127.0.0.1:5000/getHostilityRatio', {
						params: {
							date: that.date,
							media: that.media,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						},
					})
					.then((response) => {
						that.myList = response.data
						for (let i = 0; i < that.myList.length; i++) {
							that.x.push(String(that.myList[i].name));
						}
						this.pieChart()
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
			pieChart() {
				let pieChart = this.echarts.init(document.getElementById("mediaPieChart"));
				pieChart.setOption({
					title: {
						text: this.media+"近"+this.date+"天负面关注基金公司饼状图",
						textStyle: {
							color: "#36a3f7",
							fontStyle: "italic"
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 10,
						top: 20,
						bottom: 20,
						data: this.x
					},
					series: [{
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
						data: this.myList
					}]
				})
			}
		}
	};
</script>


<style scoped>
	tr,
	th,
	td {
		color: #303133;
	}

	.blank {
		background: rgb(240, 243, 244);
		width: 100%;
		height: 50px;
	}

	div {
		font-size: 1rem;
		font-weight: 100;
	}
</style>
