<template>
	<div id="simple">
		<div class="title">
			<span>发文量前十的媒体数据统计</span>
		</div>
		<el-container>
			<el-container>
				<el-main>
					<el-table :data="mylist">
						<el-table-column prop="rank" label="排名"></el-table-column>
						<el-table-column prop="top_ten_media" label="媒体"></el-table-column>
						<el-table-column prop="top_ten_count" label="发文量"></el-table-column>
						<el-table-column prop="effecte" label="影响力指数"></el-table-column>
						<el-table-column label="查看">
							<template slot-scope="scope">
								<a :href="'http://localhost:8090/meidiaAnalysis?media='+scope.row.top_ten_media">查看详情</a>
							</template>
						</el-table-column>
					</el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>


<script>
	export default {
		name: "bigMediaAnalysisTable",
		data() {
			return {
				mylist: [],
				date: 30,
			};
		},
		methods: {
			getDate: function() {
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
						this.getBigMediaChartByDate()
					})
					.catch((error) => {
						console.log(error); //异常
					});

			},
			getBigMediaChartByDate: function() {
				var that = this
				that.$axios.get('http://127.0.0.1:5000/getBigMediaFormByDate', {
						params: {
							date: that.date,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						},
					})
					.then((response) => {
						that.mylist = response.data
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},

		},
		// 页面渲染前拿到数据
		mounted() {
			this.getDate();
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
