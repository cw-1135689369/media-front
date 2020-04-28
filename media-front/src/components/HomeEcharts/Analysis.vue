<template>
	<div>
		<span> 注： </span>
		<ul>
			<li>橘涞金服近{{ date }}天监测传统媒体<span> {{ mylist.web_count }}</span>个网站
				<el-tooltip placement="top">
					<div slot="content">收录数据不包含雪球，新浪微博，贴吧等媒体新闻，仅主流媒体发表新闻</div>
					<el-button>*</el-button>
				</el-tooltip>
				，总计收录新闻
				<span> {{ mylist.article_sum_count }} </span>条。
			</li>
			<li>发文量前十的网站每天发文量如上直方图所示，其中
				<span> {{ mylist.first_media }}</span>
				近{{date}}天发文最多，总计<span> {{ mylist.first_media_count }}</span>条，
				日均发文量{{ mylist.first_media_average_count }}条。
			</li>
			<li>
				橘涞金服监测所有网站网站在<span> {{ mylist.first_date }}</span>
				发文量最多，累计发文<span> {{ mylist.first_date_count }}</span>条 ，
				高出均值<span> {{ mylist.diff_count }}</span>篇。
			</li>
		</ul>
	</div>
</template>


<script>
	export default {
		name: "mediaAnalysis",
		data() {
			return {
				mylist: [],
				date:30,
			};
		},
		methods: {
			getBigMediaChartByDate: function() {
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
				var that = this;
				that.$axios.get('http://127.0.0.1:5000/getBigMediaAnalysis', {
						params: {
							date: this.date,
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
