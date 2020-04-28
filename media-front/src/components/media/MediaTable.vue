<template>
	<div id="simple">
		<div class="title">
			<span> {{ media }}发文量前三的记者 </span>
		</div>
		<el-container>
			<el-container>
				<el-main>
					<el-table :data="mylist">
						<el-table-column prop="reporter_name" label="记者"></el-table-column>
						<el-table-column prop="reporter_count" label="发文数"></el-table-column>
						<el-table-column prop="check" label="记者详细分析">记者详细分析</el-table-column>
					</el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>


<script>
	export default {
		name: "mediaTable",
		data() {
			return {
				mylist: [],
				media:"'中国证券报'"
			};
		},
		methods: {
			getBigMediaChartByDate: function() {
				var that = this;
				if(typeof this.$route.query.media != 'undefined'){
					that.media="'"+this.$route.query.media+"'"
				}
				that.$axios.get('http://127.0.0.1:5000/getReporterBymediaAndDate', {
						params: {
							date: 30,
							media: that.media
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
			}
		},
		// 页面渲染前拿到数据
		mounted() {
			this.getBigMediaChartByDate();
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
