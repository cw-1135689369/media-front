<template>
	<div class="iCountUp" id="content">
		<!-- Echarts -->
		<div class="echort1">
			<mediaTable />
		</div>
		<div class="echort2">
			<mediaLinecharts />
		</div>
		<div class="echort3">
			<mediaPieChart />
		</div>
		<div class="echort4">
			<mediaAnalysis />
		</div>
		<div class="echort5">
			<mediaNewsList />
		</div>
	</div>
</template>

<script>
	import mediaTable from "../media/MediaTable";
	import mediaLinecharts from "../media/MediaLinecharts";
	import mediaPieChart from "../media/MediaPieChart";
	import mediaAnalysis from "../media/MediaAnalysis";
	import mediaNewsList from "../media/MediaNewsList";
	
	export default {
		name: "demo",
		components: {
			mediaTable,
			mediaLinecharts,
			mediaPieChart,
			mediaAnalysis,
			mediaNewsList
		},
	}
</script>

<style>
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
		top: 330px;
		left: 10px;
	}
	
	.echort3 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		top: 770px;
		left: 10px;
	}
	
	.echort4 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		top: 1210px;
		left: 10px;
	}
	.echort5 {
		width: 98%;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
		background: #ffffff;
		position: absolute;
		top: 1400px;
		left: 10px;
	}
</style>
