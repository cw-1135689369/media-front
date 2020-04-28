<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="str_date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="title" label="标题">
			</el-table-column>
			<el-table-column prop="grp_copy" label="相关" width="180">
			</el-table-column>
		</el-table>
	</div>
</template>
<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
</style>

<script>
	import {
		readlink
	} from "fs";
	export default {
		name: "mediaNewsList",
		data() {
			return {
				tableData: [],
				media: "'中国证券报'"
			};
		},
		mounted() {
			this.getData()
		},

		methods: {
			getData: function() {
				var that = this;
				if (typeof this.$route.query.media != 'undefined') {
					that.media = "'" + this.$route.query.media + "'"
				}
				that.$axios.get('http://127.0.0.1:5000/getMediaPositiveNewsListByMedia', {
						params: {
							date: 30,
							media: that.media,
						},
						headers: {
							"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
						},
					})
					.then((response) => {
						that.tableData = response.data
					})
					.catch((error) => {
						console.log(error); //异常
					});
			},
		}
	}
</script>
