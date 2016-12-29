<template>
	<div class="activity-analysis">
		<div class="activity-search">
			<div class="search-left">
				<label>活动名称</label>
				<input class="input" type="text" name="" placeholder="请输入活动名称">
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
					<a class="btn btn-primary" @click="weekData">7日关键数据</a>
					<a class="btn btn-primary" @click="monthData">30日关键数据</a>
				</div>
				<div class="choose-btn">
					<a class="btn btn-primary">交易总金额</a>
					<a class="btn btn-primary">补贴总金额</a>
					<a class="btn btn-primary">交易总笔数</a>
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
							<strong>123456</strong>
						</td>
						<td>
							<span>区域平均交易笔数(笔)</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>最高交易区域</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>最高交易区域交易笔数(笔)</span>
							<strong>123456</strong>
						</td>
					 	<td>
							<span>最高交易区域交易额（元）</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="region-detail">
				<span class="title"><i></i>交易区域关键数据排行</span>
				<div class="choose-btn">
					<a class="btn btn-primary">交易金额</a>
					<a class="btn btn-primary">交易笔数</a>
				</div>
				<div class="region-echart">
					<table>
						<tr>
							<td width="12%">商户交易排行</td>
							<td width="12%">区域名称</td>
							<td>刷卡金额</td>
						</tr>
						<tr>
							<td>1</td>
							<td>上海</td>
							<td rowspan="10">
								<div id="region-echart" style="width:100%;height:600px;border:1px solid red"></div>
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>3</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>4</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>5</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>6</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>7</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>8</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>9</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>10</td>
							<td>0000</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="transaction-time border">
			<div class="time-title">
				<span class="title-left">交易时段分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="time-show">
				<div class="choose-btn">
					<a class="btn btn-primary" @click="">7日关键数据</a>
					<a class="btn btn-primary" @click="">30日关键数据</a>
				</div>
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
				<div class="merchant-echart">
					<table>
						<tr>
							<td width="12%" style="border:1px solid red">商户交易排行</td>
							<td width="12%" style="border:1px solid red">区域名称</td>
							<td style="border:1px solid red">刷卡金额</td>
						</tr>
						<tr>
							<td>1</td>
							<td>上海</td>
							<td rowspan="10">
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>3</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>4</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>5</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>6</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>7</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>8</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>9</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>10</td>
							<td>0000</td>
						</tr>
					</table>
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
				<div class="cardBIN-echart">
					<table>
						<tr>
							<td width="12%" style="border:1px solid red">卡BIN交易排行</td>
							<td width="12%" style="border:1px solid red">卡BIN</td>
							<td style="border:1px solid red">交易笔数</td>
						</tr>
						<tr>
							<td>1</td>
							<td>0000</td>
							<td rowspan="10">
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>3</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>4</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>5</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>6</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>7</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>8</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>9</td>
							<td>0000</td>
						</tr>
						<tr>
							<td>10</td>
							<td>0000</td>
						</tr>
					</table>
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
		<div class="wechat-data border">
			<div class="wechat-title">
				<span class="title-left">微信数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="wechat-cumulative-table">
				<span class="title"><i></i>昨日关键数据</span>
				<table>
					<tr>
						<td>
							<span>新关注人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>取消关注人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>净关注人数</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>累计关注人数</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="wechat-detail">
				<span class="title"><i></i>7日/30日关键数据详解</span>
				<div class="choose-btn">
					<a class="btn btn-primary" @click="">7日关键数据</a>
					<a class="btn btn-primary" @click="">30日关键数据</a>
					<a class="btn btn-primary" @click="">按时间对比</a>
				</div>
				<div class="choose-btn">
					<a class="btn btn-primary" @click="">新关注人数</a>
					<a class="btn btn-primary" @click="">取消关注人数</a>
					<a class="btn btn-primary" @click="">净关注人数</a>
					<a class="btn btn-primary" @click="">累计关注人数</a>
				</div>
				<div class="wechat-echart" id="wechat-echart"></div>
			</div>
		</div>
		<div class="apply-card border">
			<div class="apply-title">
				<span class="title-left">申卡数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<div class="apply-cumulative-table">
				<span class="title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>今日申卡数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>累计申卡数量</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>今日申卡最多区域</span>
							<strong>123456</strong>
						</td>
						<td>
							<span>累计申卡最多区域</span>
							<strong>123456</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="apply-detail">
				<span class="title"><i></i>申卡数据排行</span>
				<div class="choose-btn">
					<a class="btn btn-primary" @click="">今日申卡数量</a>
					<a class="btn btn-primary" @click="">累计申卡数量</a>
				</div>
				<div class="apply-echart" id="apply-echart"></div>
			</div>
		</div>
		<div class="latinos-data border">
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
		</div>
	</div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/activity-analysis'
	export default{
		data(){
            this.model=model(this)
			return{
				xAxisData:[],
				weekThis:[],
				weekLast:[],
				chooseWeek:['本周','上周'],
				dateData:{
					startDate:'1',
					endDate:'1',
				},
				transactionDataShow:{
					tradeAmount:500,
					subsidyAmount:200,
					tradeNum:250,
				}
			}
		},
		methods:{
			dataLineEchart(chartID,title,xData,parentDataName,parentData,passDataName,passData){
				var myChart = echarts.init(document.getElementById(chartID ));
        		var option = {
        		    title : {text: title},
				    tooltip : {
				        trigger: 'axis',
				        // formatter:function(p) {
				        // 	var thisweek="当前时间："+p[0].name+'<br>';
				        // 	var thisdata="交易金额："+p[0].data+'<br>';
				        // 	// if(p[1].name==undefined){
					       //  	var lastweek="当前时间："+p[1].name+'<br>';
					       //  	var lastdata="交易金额："+p[1].data+'<br>';
				        // 		var needShow=thisweek+thisdata+lastweek+lastdata;
				        // 	// }
				        // 	// var needShow=thisweek+thisdata;
				        // 	return needShow;
				        // }
				    },
				    legend: {data:this.chooseWeek},
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
				            data : this.xAxisData
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
			dataBarEchart(chartID,xData,dataName,dataData){//需要进步一调整
				var myChart = echarts.init(document.getElementById('region-echart'));
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
				        bottom: '13%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
				    },
				    series: [
				        {
				            name: '2011年',
				            type: 'bar',
				            data: [18203, 23489, 29034, 104970, 131744, 630230]
				        }
				    ]
				}
				myChart.setOption(option)
			},
			getdate(){
				var locakDate='',
					pastDate='',
					date = new Date(),
					lyear = date.getFullYear(),
					lmonth = date.getMonth() + 1,
					lday = date.getDate(),
					pdate = new Date(date.getTime() - 7 * 24 * 3600 * 1000),
					pyear = pdate.getFullYear(),
					pmonth = pdate.getMonth() + 1,
					pday = pdate.getDate();
				locakDate=lyear + '-' + lmonth + '-' + lday;
				pastDate=pyear + '-' + pmonth + '-' + pday;
				this.dateData.startDate=locakDate;
				this.dateData.endDate=pastDate;
				console.log(this.dateData);
			},
			weekData(){
         		this.model.getTradeAmount().then((res)=>{
         			if (res.data.code==0) {
         				this.$set("xAxisData",res.data.data.category);
         				this.$set("weekThis",res.data.data.series[0].dataDecimal);
         				this.$set("weekLast",res.data.data.series[1].dataDecimal);
         				this.dataLineEchart("data-echart-weekmonth","7日关键数据展示图",this.xAxisData,this.chooseWeek[0],this.weekThis,this.chooseWeek[1],this.weekLast);
         			}
         		})	
        	},
        	monthData(){
        		this.model.getTradeAmount().then((res)=>{
         			if (res.data.code==0) {
         				this.$set("xAxisData",res.data.data.category);
         				this.$set("weekThis",res.data.data.series[0].dataDecimal);
         				this.$set("weekLast",res.data.data.series[1].dataDecimal);
         				this.dataLineEchart("data-echart-weekmonth","30日关键数据展示图",this.xAxisData,this.chooseWeek[0],this.weekThis,this.chooseWeek[1],this.weekLast);
         			}
         		})
        	},
        	getMerchantTradeAmount(){

        	}
		},
		ready(){
        	this.weekData();
			this.getdate()
			this.dataBarEchart();
		}
	}
</script>