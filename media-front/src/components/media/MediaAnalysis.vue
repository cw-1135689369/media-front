<template>
	<div>
		<span> 注： </span>
		<ul>
			<li>{{  media  }}近{{ date }}天发文量如上图所示，总计发文
				<span>{{ mylist.media_articles_sum }}</span>篇，
				环比<span>{{ mylist.diff_str }}</span>了{{mylist.diff_abs}}篇
				平均每天发表新闻{{mylist.average_count}}篇。
			</li>
			<li>该媒体工作日日均发文量为{{mylist.Working_day_average}}篇，
				非工作日日均发文量为{{mylist.non_working_days_average}}篇，
				其中{{mylist.str_week_most}}发文量最高，为{{mylist.week_count_most}}篇。
			</li>
			<li>
				发文量标准差为<span> {{ mylist.media_count_std }}</span>,
				发文量离散系数为 {{ mylist.dispersion_coefficient }}</span> 。
			</li>
			<li>
				新闻列表如下所示
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
				media:'中国证券报',
				date:30
			};
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
						this.getBigMediaChartByDate();
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
			getBigMediaChartByDate: function() {
				var that = this;
				that.media="'"+this.$route.query.media+"'"
				that.$axios.get('http://127.0.0.1:5000/getMediaDate', {
						params: {
							date: that.date,
							// media:this.$route.query.meida,
							media: that.media,
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
			this.getDataSet();
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
