<-->home页面直方图</-->
<template>
  <div id="bar">
    <div id="barChart" :style="{width : '100%',height:'400px'}"></div>
  </div>
</template>

<script>
export default {
	name: "bar",
	data() {
		return {
			count:[],
			effe:[],
			x:[],
			date:30,
	    };
	},
	
	
  mounted() {
	this.getBigMediaChartByDate()
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
				this.getData();
	  		})
	  		.catch((error) => {
	  			console.log(error); //异常
	  		});
	  	
	  },
	//获取数据
	getData:function(){
		var that =this;
		that.$axios.get('http://127.0.0.1:5000/getBigMediaFormByDate',{
			params: {
				date: that.date,
			},
			headers: {
				"Access-Control-Allow-Origin": "http://127.0.0.1:5000"
			},
		})
		.then((response) => {
			 var data = response.data
			 that.mylist = response.data
			 for (let i = 0; i < data.length; i++) {
			     that.x.push(String((data[i].top_ten_media)));
			 }
			 for (let i = 0; i < data.length; i++) {
			     that.count.push(String((data[i].top_ten_count)));
			 }
			 for (let i = 0; i < data.length; i++) {
			     that.effe.push(String((data[i].effecte)));
			 }
			 
			 this.drawLine()
		})
		.catch((error) => {
		console.log(error);//异常
		});
	 } ,
	 //画图
	drawLine:function() {
      let barChart = this.echarts.init(document.getElementById("barChart"));
	  var that =this;
	  var option = {
        title: {
          text: this.date+"天内发文量前十的媒体直方图",
          textStyle: {
            color: "#36a3f7",
            fontStyle: "italic"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["发文量", "影响力"]
        },
        
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: that.x,
			axisLabel:{interval: 0},
			axisLabel: {  
			    interval:0,  
			    rotate:40  
			},
			grid: {  
			    left: '10%',  
			     bottom:'35%'  
			 }
          },
		  
		  
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "发文量",
            type: "bar",
            data: that.count,
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "影响力",
            type: "bar",
            data: that.effe,
            markLine: {
              data: [{ type: "average", name: "平均值" }]
			},
          }
        ]
      };
      barChart.setOption(option)
	}
  }
};
</script>
<style>
</style>