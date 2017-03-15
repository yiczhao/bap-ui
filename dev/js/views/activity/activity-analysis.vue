<template>
	<div class="crumbs">
		<span>数据总览</span>
		<span>活动分析-随机五折</span>
	</div>
	<div class="activity-analysis">
		<div class="analysis-title">
			<h1>
				<span>/活动分析数据总览</span>
				<a class="btn btn-primary">导出PDF报告</a>
			</h1>
			<h3>Activity analysis report</h3>
		</div>
		<div class="analysis-data">
			<div class="data-title">
				<span :class="{'active':mainStep==1}">交易数据分析</span>
				<span :class="{'active':mainStep==2}">交易区域分析</span>
				<span :class="{'active':mainStep==3}">交易时段分析</span>
				<span :class="{'active':mainStep==4}">商户数据分析</span>
				<span :class="{'active':mainStep==5}">卡BIN数据分析</span>
				<span :class="{'active':mainStep==6}">单卡交易分析</span>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">今日关键数据</span><span class="btn">累计关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>4214214.241</p>
						<p>交易总金额（元）</p>
					</div><div>
					<p>24124</p>
					<p>补贴总金额（元）</p>
				</div><div>
					<p>24124</p>
					<p>交易总笔数（笔）</p>
				</div><div>
					<p>41242</p>
					<p>参与活动卡数量（个）</p>
				</div><div>
					<p>2412412</p>
					<p>单笔平均交易金额（元）</p>
				</div><div>
					<p>4124241</p>
					<p>单笔平均补贴金额（元）</p>
				</div>
				</div>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>4214214.241</p>
						<p>产生交易区域（个）</p>
					</div><div>
					<p>24124</p>
					<p>区域平均交易笔数(笔)</p>
				</div><div>
					<p>24124</p>
					<p>最高交易区域</p>
				</div><div>
					<p>41242</p>
					<p>最高交易区域交易笔数(笔)</p>
				</div><div>
					<p>2412412</p>
					<p>最高交易区域交易额（元）</p>
				</div>
				</div>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>4214214.241</p>
						<p>参与门店数（个）</p>
					</div><div>
					<p>24124</p>
					<p>产生交易门店数(个)</p>
				</div><div>
					<p>24124</p>
					<p>店均交易笔数(个)</p>
				</div><div>
					<p>41242</p>
					<p>店均补贴金额(元)</p>
				</div><div>
					<p>2412412</p>
					<p>店均交易金额（元）</p>
				</div>
				</div>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>4214214.241</p>
						<p>卡BIN个数（个）</p>
					</div><div>
					<p>24124</p>
					<p>卡BIN平均交易笔数(个)</p>
				</div><div>
					<p>24124</p>
					<p>卡BIN平均交易金额（元）</p>
				</div><div>
					<p>41242</p>
					<p>卡BIN平均补贴金额(元)</p>
				</div>
				</div>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>4214214.241</p>
						<p>参与卡数量（个）</p>
					</div><div>
					<p>24124</p>
					<p>卡均参与次数(次)</p>
				</div><div>
					<p>24124</p>
					<p>单卡最高参与次数（次）</p>
				</div>
				</div>
			</div>
			<div class="data-table">
				<h3>7日/30日关键数据详解</h3>
				<div class="table-btns">
					<span class="btn active">交易总金额</span>
					<span class="btn">补贴总金额</span>
					<span class="btn">交易总笔数</span>
					<div>
						<span class="active">7日</span>
						<span>|</span>
						<span>30日</span>
						<span class="active">按时间对比</span>
					</div>
				</div>
				<div v-el:table-init  class="table-init">
					<div v-show="tableShow">未查询到数居</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import model from '../../ajax/activity/activity-analysis';
	export default{
		data(){
			this.model=model(this)
			return{
				mainStep:2,
				tableShow:true,
				times:{//时间初始化数据
					todayDate:getDates().today,
					lastWeek:getDates().aweekAgo,
					monthAgo:getDates().amonthAgo
				},
				uuids:sessionStorage.getItem('loginList').bankUUID,
				searchData:{
					activityID:'',
					activityName:'',
				}
			}
		},
		methods:{
			initTable(xData,yData,ydata2){
				if(!xData||!yData){
					this.tableShow=true;
					return;
				}
				this.tableShow=false;
				let axisData = xData;
				let data = yData;
				let data2 = ydata2;
				let option = {
					width:'100%',
					title: {text: '交易金额（元）', textStyle:{color:'#666', fontSize:12}, right:35, top:15},
					tooltip:{},
					grid:{x:60},
					xAxis: {type : 'category', boundaryGap : false,
						data : axisData
					},
					yAxis: {type : 'value', axisLine:{show:false}},
					series: [{name:'当前数据',type: 'line', symbolSize:10, symbol: 'circle', itemStyle:{normal:{color:'#11b183', lineStyle:{color:'#11b183'}}}, label: {normal: {show: false}}, lineStyle: {normal: {color: '#11b183'}},
						data: data
					}]
				};
				if(!!data2){
					option.tooltip={trigger: 'axis'};
					option.series.push({name:'对比数据',type: 'line', symbolSize:10, symbol: 'circle', itemStyle:{normal:{color:'#ea6953', lineStyle:{color:'#ea6953'}}}, label: {normal: {show: false}}, lineStyle: {normal: {color: '#ea6953'}},
						data: data2
					});
				}
				let myChart = echarts.init(this.$els.tableInit);
				myChart.setOption(option);
			}
		},
		ready(){
			let axisData = ['2017-2-33'];
			let data = ['421'];
			let data2 = ['421'];
			this.initTable(axisData,data,data2);
		}
	}
</script>