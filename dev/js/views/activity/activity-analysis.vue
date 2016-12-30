<template>
	<div class="activity-analysis">
		<div class="activity-search">
			<div class="search-left">
				<label>活动名称</label>
				<input class="input" type="text" name="" placeholder="请输入活动名称" v-model="">
			</div>
			<div class="search-right">
				<span class="search-time">活动进行中，数据截止到16:00，2016-06-16 </span>
				<a class="view-report">查看分析报告</a>
			</div>
		</div>
		<div class="transaction-data border">
			<div class="data-title">
				<span class="title-left">交易数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="data-today-table">
				<span class="title"><i></i>今日关键数据</span>
				<table>
					<tr>
						<td>
							<span>交易总金额(元)</span>
							<strong>{{transactionDataShow.tradeAmount}}</strong>
						</td>
						<td>
							<span>补贴总金额(元)</span>
							<strong>{{transactionDataShow.subsidyAmount}}</strong>
						</td>
						<td>
							<span>交易总笔数(笔)</span>
							<strong>{{transactionDataShow.tradeNum}}</strong>
						</td>
						<td>
							<span>参与活动卡数量(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均交易金额(元)</span>
							<strong>{{transactionDataShow.tradeAmount/transactionDataShow.tradeNum}}</strong>
						</td>
						<td>
							<span>单笔平均补贴金额(元)</span>
							<strong>{{transactionDataShow.subsidyAmount/transactionDataShow.tradeNum}}</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-cumulative-table">
				<span class="title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>交易总金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>补贴总金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>交易总笔数(笔)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与活动卡数量(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均交易金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单笔平均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-detail">
				<span class="title"><i></i>7日/30日关键数据详解</span>
				<div class="choose-btn">
					<a class="btn" :class="transactionDataJudgeName=='TradeAmountList'?'btn-primary':'btn-gray'" @click="TradeAmountList">交易总金额</a>
					<a class="btn" :class="transactionDataJudgeName=='SubsidyAmountList'?'btn-primary':'btn-gray'" @click="SubsidyAmountList">补贴总金额</a>
					<a class="btn" :class="transactionDataJudgeName=='TradeNumList'?'btn-primary':'btn-gray'" @click="TradeNumList">交易总笔数</a>
				</div>
				<div class="choose-btn">
					<a class="btn btn-primary" :class="transactionDataJudgeTime=='7'?'btn-primary':'btn-gray'" @click="weekData">7日关键数据</a>
					<a class="btn btn-gray" :class="transactionDataJudgeTime=='30'?'btn-primary':'btn-gray'" @click="monthData">30日关键数据</a>
				</div>
				<div class="data-echart" id="data-echart-weekmonth"></div>
			</div>
		</div>
		<div class="transaction-region border">
			<div class="region-title">
				<span class="title-left">交易区域分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="region-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>产生交易区域（个）</span>
							<strong>{{transactionRegion.tradeAreaNum}}</strong>
						</td>
						<td>
							<span>区域平均交易笔数(笔)</span>
							<strong>{{transactionRegion.averageTradeNum }}</strong>
						</td>
						<td>
							<span>最高交易区域</span>
							<strong>{{transactionRegion.maxTradeArea }}</strong>
						</td>
						<td>
							<span>最高交易区域交易笔数(笔)</span>
							<strong>{{transactionRegion.maxTradeAreaTradeNum}}</strong>
						</td>
					 	<td>
							<span>最高交易区域交易额（元）</span>
							<strong>{{transactionRegion.maxTradeAreaTradeAmount}}</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="region-detail">
				<span class="title"><i></i>交易区域关键数据排行</span>
				<div class="choose-btn">
					<a class="btn btn-primary" :class="regionDetailJudgeChoose=='amount'?'btn-primary':'btn-gray'" @click="regionDetailAmount">交易金额</a>
					<a class="btn btn-primary" :class="regionDetailJudgeChoose=='num'?'btn-primary':'btn-gray'" @click="regionDetailNumber">交易笔数</a>
				</div>
				<div class="region-echart" id="region-echart" style="">
				</div>
			</div>
		</div>
		<div class="transaction-time border">
			<div class="time-title">
				<span class="title-left">交易时段分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="time-show">
				<div class="time-echart" id="time-echart"></div>
			</div>
		</div>
		<div class="merchant-data border">
			<div class="merchant-title">
				<span class="title-left">商户数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="merchant-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>参与门店数（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>产生交易门店数(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>店均交易笔数(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>店均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>店均交易金额（元）</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="merchant-detail">
				<span class="title"><i></i>商户关键数据排行</span>
				<div class="choose-btn">
					<a class="btn btn-primary" @click="">交易金额</a>
					<a class="btn btn-primary" @click="">交易笔数</a>
				</div>
				<div class="merchant-echart" id="merchant-echart">
				</div>
			</div>
		</div>
		<div class="cardBIN-data border">
			<div class="cardBIN-title">
				<span class="title-left">卡BIN数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="cardBIN-ranking-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>卡BIN个数（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡BIN平均交易笔数(个)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡BIN平均交易金额（元）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡BIN平均补贴金额(元)</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="cardBIN-detail">
				<span class="title"><i></i>卡BIN关键数据排行</span>
				<div class="choose-btn">
					<a class="btn btn-primary" @click="">交易金额</a>
					<a class="btn btn-primary" @click="">交易笔数</a>
				</div>
				<div class="cardBIN-echart" id="cardBIN-echart">
				</div>
			</div>
		</div>
		<div class="one-card border">
			<div class="one-title">
				<span class="title-left">单卡交易分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="one-ranking-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>参与卡数量（个）</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>卡均参与次数(次)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>单卡最高参与次数（次）</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="one-detail">
				<span class="title"><i></i>单卡最高参与次数（次）</span>
				<div class="one-echart" id="one-echart"></div>
			</div>
		</div>
		<!-- <div class="latinos-data border">
			<div class="latinos-title">
				<span class="title-left">权益数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="latinos-data-table">
				<span class="title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>总权益数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>领取权益数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>未领取权益数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益领取率</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>
							<span>权益使用量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益未使用量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益核销率</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="latinos-probability border">
			<div class="latinos-title">
				<span class="title-left">权益数据概率分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="probability-table">
				<span class="title"><i></i>今日关键数据</span>
				<table>
					<tr>
						<td>
							<span>中奖率</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与次数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益中出数量</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
				<span class="title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>中奖率</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与次数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>参与人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>权益中出数量</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="probability-detail">
				<span class="title"><i></i>累计关键数据</span>
				<div class="probability-echart" id="probability-echart"></div>
			</div>
		</div> -->
	</div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/activity-analysis'
	export default{
		data(){
            this.model=model(this)
			return{
				transactionDataJudgeName:'TradeAmountList',//数据分析Judge
				transactionDataJudgeTime:'7',//数据分析Judge
				regionDetailJudgeChoose:'amount',//交易区域Judge;
				activityID:{
					transactionData:'交易数据分析',
					transactionRegion:'交易区域分析',
					transactionTime:'交易时段分析',
					merchantData:'商户数据分析',
					cardBINData:'卡BIN数据分析',
					oneCard:'单卡交易分析'
				},
				dateData:{
					startDate:'',
					endDate:'',
					oneMonthAgo:''
				},
				transactionDataShow:{					//交易数据分析
					tradeAmount:500,//交易总金额
					subsidyAmount:200,//补贴总金额
					tradeNum:250,//交易总笔数
					averageSubsidyAmount:110,//单笔平均补贴金额
					averageTradeAmount:110,//单笔平均交易金额
					tradeCardNum:100,//参与活动卡数量 
					tradeDate:'2016-12-15',//交易日期（YYYY-MM-DD）
					xAxisData:[],
					weekThis:[],
					weekLast:[],
					chooseWeek:['本周','上周'],
				},
				transactionRegion:{						//交易区域数据
					cityData:[182,89,34,49,131,60,182,89,34,49],//区域交易数据
					averageTradeNum:100,// 区域平均交易笔数 ,
					maxTradeArea:'苏州',// 最高交易区域 ,
					maxTradeAreaTradeAmount:100,//最高交易区域交易额（单位，元） ,
					maxTradeAreaTradeNum:100,// 最高交易区域交易笔数 ,
					tradeAmount:100,//交易金额（单位，元） ,
					tradeArea:['江苏','印尼','美国','印度','中国','江苏','印尼','美国','印度','中国'],//交易区域 ,
					tradeAreaNum:100,// 交易区域个数 ,
					tradeNum:500,//交易笔数

				},
				transactionTime:{//交易时段分析数据
					timeData:['45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45'],//时段数据
					timePoint:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']//时段时间点
				}
			}
		},
		methods:{
			dataLineEchart(chartID,title,chooseWeek,xData,parentDataName,parentData,passDataName,passData){
				var myChart = echarts.init(document.getElementById(chartID ));
        		var option = {
        		    title : {text: title},
				    tooltip : {
				        trigger: 'axis',
				    },
				    legend: {data:chooseWeek},
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: false},
				            saveAsImage : {show: true},
				        },
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : xData
				        }
				    ],
				    yAxis : [{type : 'value'}],
				    series : [
				        {
				            name:parentDataName,
				            type:'line',
				            data:parentData
				        },
				        {
				            name:passDataName,
				            type:'line',
				            data:passData
				        }
				    ]
        		}
        		myChart.setOption(option)
			},
			dataBarEchart(chartID,cityName,dataName,cityData){
				var myChart = echarts.init(document.getElementById(chartID));
				var option ={
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        top:'3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        data: cityName
				    },
				    series: [
				        {
				        	type:'funnel',
				            name: dataName,
				            type: 'bar',
				            data: cityData,
				            sort: 'descending'
				        }
				    ]
				}
				myChart.setOption(option)
			},
			justChart(timeData,timePoint){
				var myChart = echarts.init(document.getElementById('time-echart'));
				var option = {
				    tooltip: {trigger: 'axis'},
				    toolbox: {show: true,
				        feature: {magicType: {type: ['line', 'bar']},}},
				    xAxis:  {type: 'category',boundaryGap: false,
				        data:timeData
				    },
				    yAxis: {type: 'value'},
				    series: [{
				            name:'交易笔数',
				            type:'line',
				            data:timePoint
				        }]
				}
				myChart.setOption(option);
			},
			transactionRegionReady(){
				let data={
					activityID:''
				}
				this.model.getTradeAreaTotal(data).then((res)=>{
					if (res.data.code==0) {
						this.$set("transactionRegion.averageTradeNum",res.data.data.averageTradeNum);
						this.$set("transactionRegion.tradeAmount",res.data.data.tradeAmount);
						this.$set("transactionRegion.maxTradeArea",res.data.data.maxTradeArea);
						this.$set("transactionRegion.maxTradeAreaTradeNum",res.data.data.maxTradeAreaTradeNum);
						this.$set("transactionRegion.maxTradeAreaTradeAmount",res.data.data.maxTradeAreaTradeAmount);
					}
				})
			},
			getdate(){
				let times={},
					date = new Date(),
					lyear = date.getFullYear(),
					lmonth = date.getMonth() + 1,
					agoMonth = lmonth-1,
					lday = date.getDate(),
					pdate = new Date(date.getTime() - 7 * 24 * 3600 * 1000),
					pyear = pdate.getFullYear(),
					pmonth = pdate.getMonth() + 1,
					pday = pdate.getDate(),
					locakDate=lyear + '-' + lmonth + '-' + lday,
					pastDate=pyear + '-' + pmonth + '-' + pday,
					agoMonthDate=lyear+'-'+agoMonth+'-'+lday;
				times.startDate=pastDate;
				times.endDate=locakDate;
				times.oneMonthAgo=agoMonthDate;
				return times;
			},
	     	TradeAmountList(){//某个时间段的交易总金额
	     		this.transactionDataJudgeName='TradeAmountList';
	     		let data={
					activityID:'01',
	        		startDate:this.dateData.startDate,
	        		endDate:this.dateData.endDate,
	        		compareFlag:true
        		}
        		this.model.getTradeAmount(data).then((res)=>{
        			if (res.data.code==0){
						this.$set("transactionDataShow.xAxisData",res.data.data.category);
         				this.$set("transactionDataShow.weekThis",res.data.data.series[0].dataDecimal);
         				this.$set("transactionDataShow.weekLast",res.data.data.series[1].dataDecimal);
         				this.dataLineEchart("data-echart-weekmonth","7日交易总金额数据展示图",this.transactionDataShow.chooseWeek,this.transactionDataShow.xAxisData,this.transactionDataShow.chooseWeek[0],this.transactionDataShow.weekThis,this.transactionDataShow.chooseWeek[1],this.transactionDataShow.weekLast);
        			}
        		})
        	},
        	SubsidyAmountList(){//某个时间段的补贴总金额
        		this.transactionDataJudgeName='SubsidyAmountList';
        		let data={
        			activityID:'',
        			startDate:this.dateData.startDate,
        			endDate:this.dateData.endDate,
        			compareFlag:true
        		}
        		this.model.getSubsidyAmount(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set("transactionDataShow.xAxisData",res.data.data.category);
         				this.$set("transactionDataShow.weekThis",res.data.data.series[0].dataDecimal);
         				this.$set("transactionDataShow.weekLast",res.data.data.series[1].dataDecimal);
         				this.dataLineEchart("data-echart-weekmonth","7日补贴总金额数据展示图",this.transactionDataShow.chooseWeek,this.transactionDataShow.xAxisData,this.transactionDataShow.chooseWeek[0],this.transactionDataShow.weekThis,this.transactionDataShow.chooseWeek[1],this.transactionDataShow.weekLast);
        			}
        		})
        	},
        	TradeNumList(){//某个时间段的交易总笔数
        		this.transactionDataJudgeName='TradeNumList';
        		let data={
        			activityID:'',
        			startDate:this.dateData.startDate,
        			endDate:this.dateData.endDate,
        			compareFlag:true
        		}
        		this.model.getTradeNum(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set("transactionDataShow.xAxisData",res.data.data.category);
         				this.$set("transactionDataShow.weekThis",res.data.data.series[0].dataDecimal);
         				this.$set("transactionDataShow.weekLast",res.data.data.series[1].dataDecimal);
         				this.dataLineEchart("data-echart-weekmonth","7日交易总笔数数据展示图",this.transactionDataShow.chooseWeek,this.transactionDataShow.xAxisData,this.transactionDataShow.chooseWeek[0],this.transactionDataShow.weekThis,this.transactionDataShow.chooseWeek[1],this.transactionDataShow.weekLast);
        			}
        		})
        	},
			weekData(){//7天切换数据
				this.transactionDataJudgeTime="7";
				this.dateData.startDate=this.getdate().startDate;
				this.dateData.endDate=this.getdate().endDate;
				if(this.transactionDataJudgeName=="TradeAmountList"){
					this.TradeAmountList();
				}else if (this.transactionDataJudgeName=="SubsidyAmountList") {
					this.SubsidyAmountList();
				}else if (this.transactionDataJudgeName=="TradeNumList") {
					this.TradeNumList();
				}
        	},
        	monthData(){//30天切换数据
				this.transactionDataJudgeTime="30";
        		this.dateData.startDate=this.getdate().oneMonthAgo;
				this.dateData.endDate=this.getdate().endDate;
        		if(this.transactionDataJudgeName=="TradeAmountList"){
					this.TradeAmountList();
				}else if (this.transactionDataJudgeName=="SubsidyAmountList") {
					this.SubsidyAmountList();
				}else if (this.transactionDataJudgeName=="TradeNumList") {
					this.TradeNumList();
				}
        	},
        	regionDetailAmount(){//交易区域交易金额切换
        		this.regionDetailJudgeChoose='amount';
        		let data={
        			activityID:'1'
        		}
        		this.model.getTradeAreaTotalAmountList(data).then((res)=>{
        			if (res.data.code==0){
																					//未写完
        			}
        		})

        	},
			regionDetailNumber(){//交易区域交易笔数切换
				this.regionDetailJudgeChoose='num';
				let data={
					activityID:'2'
				}
				this.model.getTradeAreaNumList(data).then((res)=>{
        			if (res.data.code==0){
																					//未写完
        			}
        		})
			},
			transactionTimeReady(){//交易时段加载数据
				console.log("'transactionTimeReady'成功")
				let data={
					activityID:'3'
				}
				this.model.getTradePeriodTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set("transactionTime.timeData",res.data.data.category);
						this.$set("transactionTime.timePoint",res.data.data.series);
        			}
				})
			},
		},
		ready(){
        	this.weekData();
        	this.transactionRegionReady();
        	this.transactionTimeReady();
			this.dataBarEchart('region-echart',this.transactionRegion.tradeArea,'交易金额',this.transactionRegion.cityData);
			this.justChart(this.transactionTime.timePoint,this.transactionTime.timeData);
			this.dataBarEchart('cardBIN-echart',this.transactionRegion.tradeArea,'交易金额',this.transactionRegion.cityData);
			this.dataBarEchart('one-echart',this.transactionRegion.tradeArea,'交易金额',this.transactionRegion.cityData);
			console.log()
		}
	}
</script>