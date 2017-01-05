<template>
	<div class="activity-analysis">
		<div class="activity-search">
			<div class="search-left">
				<label>活动名称</label>
				<input class="input" type="text" name="" placeholder="请输入活动名称" v-model="">
			</div>
			<div class="search-right">
				<span class="search-time">活动进行中，数据截止到{{times.endDate}}</span>
				<a class="view-report">查看分析报告</a>
			</div>
		</div>
		<div class="transaction-data border">
			<div class="data-title">
				<span class="title-left">交易数据分析</span>
				<span class="title-right" v-show="this.upDownToggle.transactionDataShowArea==true" @click="transactionDataToggle('transaDataToggleUp')">收起</span>
				<span class="title-right" v-show="this.upDownToggle.transactionDataShowArea==false" @click="transactionDataToggle('transaDataToggleDown')">展开</span>
			</div>
			<span v-show="this.upDownToggle.transactionDataShowArea==true">
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
								<strong>{{transactionDataShow.tradeCardNum}}</strong>
							</td>
							<td>
								<span>单笔平均交易金额(元)</span>
								<strong>{{transactionDataShow.averageTradeAmount}}</strong>
							</td>
							<td>
								<span>单笔平均补贴金额(元)</span>
								<strong>{{transactionDataShow.averageSubsidyAmount}}</strong>
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
								<strong>{{transactionDataShow.totalTradeAmount}}</strong>
							</td>
							<td>
								<span>补贴总金额(元)</span>
								<strong>{{transactionDataShow.totalSubsidyAmount}}</strong>
							</td>
							<td>
								<span>交易总笔数(笔)</span>
								<strong>{{transactionDataShow.totalTradeNum}}</strong>
							</td>
							<td>
								<span>参与活动卡数量(个)</span>
								<strong>{{transactionDataShow.totalTradeCardNum}}</strong>
							</td>
							<td>
								<span>单笔平均交易金额(元)</span>
								<strong>{{transactionDataShow.totalAverageTradeAmount}}</strong>
							</td>
							<td>
								<span>单笔平均补贴金额(元)</span>
								<strong>{{transactionDataShow.totalAverageSubsidyAmount}}</strong>
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
			</span>
		</div>
		<div class="transaction-region border">
			<div class="region-title">
				<span class="title-left">交易区域分析</span>
				<span class="title-right" v-show="this.upDownToggle.transactionRegionShowArea==true" @click="transactionDataToggle('transaRegionToggleUp')">收起</span>
				<span class="title-right" v-show="this.upDownToggle.transactionRegionShowArea==false" @click="transactionDataToggle('transaRegionToggleDown')">展开</span>
			</div>
			<span v-show="this.upDownToggle.transactionRegionShowArea==true">
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
			</span>
		</div>
		<div class="transaction-time border">
			<div class="time-title">
				<span class="title-left">交易时段分析</span>
				<span class="title-right" v-show="this.upDownToggle.transactionTimeShowArea==true" @click="transactionDataToggle('transaTimeToggleUp')">收起</span>
				<span class="title-right" v-show="this.upDownToggle.transactionTimeShowArea==false" @click="transactionDataToggle('transaTimeToggleDown')">展开</span>
			</div>
			<span v-show="this.upDownToggle.transactionTimeShowArea==true">
				<div class="time-show">
					<div class="time-echart" id="time-echart"></div>
				</div>
			</span>
		</div>
		<div class="merchant-data border">
			<div class="merchant-title">
				<span class="title-left">商户数据分析</span>
				<span class="title-right" v-show="this.upDownToggle.merchantDataShowArea==true" @click="transactionDataToggle('merchantToggleUp')">收起</span>
				<span class="title-right" v-show="this.upDownToggle.merchantDataShowArea==false" @click="transactionDataToggle('merchantToggleDown')">展开</span>
			</div>
			<span v-show="this.upDownToggle.merchantDataShowArea==true">
				<div class="merchant-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>参与门店数（个）</span>
								<strong>{{merchantDataArea.storeNumbers}}</strong>
							</td>
							<td>
								<span>产生交易门店数(个)</span>
								<strong>{{merchantDataArea.generateTradeStoreNumbers}}</strong>
							</td>
							<td>
								<span>店均交易笔数(个)</span>
								<strong>{{merchantDataArea.averageTradeNumbers}}</strong>
							</td>
							<td>
								<span>店均补贴金额(元)</span>
								<strong>{{merchantDataArea.averageSubsidyAmount}}</strong>
							</td>
							<td>
								<span>店均交易金额（元）</span>
								<strong>{{merchantDataArea.averageTradeAmount}}</strong>
							</td>
						</tr>
					</table>
				</div>
				<div class="merchant-detail">
					<span class="title"><i></i>商户关键数据排行</span>
					<div class="choose-btn">
						<a class="btn btn-primary" :class="merchantDataDetailJudgeName=='amount'?'btn-primary':'btn-gray'" @click="merchantDataTradeAmountChange">交易金额</a>
						<a class="btn btn-primary" :class="merchantDataDetailJudgeName=='num'?'btn-primary':'btn-gray'" @click="merchantDataTradeCountChange">交易笔数</a>
					</div>
					<div class="merchant-echart" id="merchant-echart">
					</div>
				</div>
			</span>
		</div>
		<div class="cardBIN-data border">
			<div class="cardBIN-title">
				<span class="title-left">卡BIN数据分析</span>
				<span class="title-right" v-show="this.upDownToggle.cardBINDataShowArea==true" @click="transactionDataToggle('cardBINToggleUp')">收起</span>
				<span class="title-right" v-show="this.upDownToggle.cardBINDataShowArea==false" @click="transactionDataToggle('cardBINToggleDown')">展开</span>
			</div>
			<span v-show="this.upDownToggle.cardBINDataShowArea==true">
				<div class="cardBIN-ranking-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>卡BIN个数（个）</span>
								<strong>{{cardBINDataArea.cardBinNum}}</strong>
							</td>
							<td>
								<span>卡BIN平均交易笔数(个)</span>
								<strong>{{cardBINDataArea.averageTradeNum}}</strong>
							</td>
							<td>
								<span>卡BIN平均交易金额（元）</span>
								<strong>{{cardBINDataArea.averageTradeAmount}}</strong>
							</td>
							<td>
								<span>卡BIN平均补贴金额(元)</span>
								<strong>{{cardBINDataArea.averageSubsidyAmount }}</strong>
							</td>
						</tr>
					</table>
				</div>
				<div class="cardBIN-detail">
					<span class="title"><i></i>卡BIN关键数据排行</span>
					<div class="choose-btn">
						<a class="btn btn-primary" :class="cardBINDetailJudgeChoose=='amount'?'btn-primary':'btn-gray'" @click="cardBINDetailAmount">交易金额</a>
						<a class="btn btn-primary" :class="cardBINDetailJudgeChoose=='num'?'btn-primary':'btn-gray'" @click="cardBINDetailNumber">交易笔数</a>
					</div>
					<div class="cardBIN-echart" id="cardBIN-echart">
					</div>
				</div>
			<span >
		</div>
		<div class="one-card border">
			<div class="one-title">
				<span class="title-left">单卡交易分析</span>
				<span class="title-right" v-show="this.upDownToggle.oneCardShowArea==true" @click="transactionDataToggle('oneCardoggleUp')">收起</span>
				<span class="title-right" v-show="this.upDownToggle.oneCardShowArea==false" @click="transactionDataToggle('oneCardoggleDown')">展开</span>
			</div>
			<span v-show="this.upDownToggle.oneCardShowArea==true">
				<div class="one-ranking-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>参与卡数量（个）</span>
								<strong>{{oneCardArea.cardNumbers}}</strong>
							</td>
							<td>
								<span>卡均参与次数(次)</span>
								<strong>{{oneCardArea.averageCardNumbers}}</strong>
							</td>
							<td>
								<span>单卡最高参与次数（次）</span>
								<strong>{{oneCardArea.maxSwipedCardNumbers}}</strong>
							</td>
						</tr>
					</table>
				</div>
				<div class="one-detail">
					<span class="title"><i></i>单卡最高参与次数（次）</span>
					<div class="one-echart" id="one-echart"></div>
				</div>
			</span>
		</div>
		<!-- <div class="latinos-data border">
			<div class="latinos-title">
				<span class="title-left">权益数据分析</span>
				<span class="title-right">收起</span>
			</div>
			<span >
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
			</span>
		</div>
		<div class="latinos-probability border">
			<div class="latinos-title">
				<span class="title-left">权益数据概率分析</span>
				<span class="title-right">收起</span>
			</div>
			<span >
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
			</span>
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
				merDataJudgeTime:'7',//数据分析Judge
				merchantDataDetailJudgeName:'amount',//商户分析Judge
				regionDetailJudgeChoose:'amount',//交易区域Judge;
				cardBINDetailJudgeChoose:'amount',//卡binJudge;
				upDownToggle:{//展开收起判断true or false
					transactionDataShowArea:false,//交易数据分析
					transactionRegionShowArea:false,//交易区域分析
					transactionTimeShowArea:false,//交易时段分析
					merchantDataShowArea:false,//商户数据分析
					cardBINDataShowArea:false,//卡BIN数据分析
					oneCardShowArea:false,//单卡交易分析
				},
				tableTitleChoose:{
					title:'',
					sevenAmount:'7日交易总金额数据展示图',
					sevenSubsidy:'7日补贴总金额数据展示图',
					sevenCount:'7日交易总笔数数据展示图',
					monthAmount:'30日交易总金额数据展示图',
					monthSubsidy:'30日补贴总金额数据展示图',
					monthCount:'30日交易总笔数数据展示图',
				},
				activityID:{
					transactionData:'交易数据分析',
					transactionRegion:'交易区域分析',
					transactionTime:'交易时段分析',
					merchantData:'商户数据分析',
					cardBINData:'卡BIN数据分析',
					oneCard:'单卡交易分析'
				},
				times:{
					startDate:'',
					endDate:'',
					oneMonthAgo:''
				},
				transactionDataShow:{					//交易数据分析
					tradeAmount:'',//交易总金额
					subsidyAmount:'',//补贴总金额
					tradeNum:'',//交易总笔数
					averageSubsidyAmount:'',//单笔平均补贴金额
					averageTradeAmount:'',//单笔平均交易金额
					tradeCardNum:'',//参与活动卡数量
					totalTradeAmount:'',//交易总金额total
					totalSubsidyAmount:'',//补贴总金额total
					totalTradeNum:'',//交易总笔数total
					totalAverageSubsidyAmount:'',//单笔平均补贴金额total
					totalAverageTradeAmount:'',//单笔平均交易金额total
					totalTradeCardNum:'',//参与活动卡数量 total
					tradeDate:'2016-12-15',//交易日期（YYYY-MM-DD）
					xAxisData:[],
					weekThis:[],
					weekLast:[],
					chooseWeek:['本周','上周'],
				},
				transactionRegion:{						//交易区域数据
					cityData:[],//区域交易数据
					averageTradeNum:'',// 区域平均交易笔数 ,
					maxTradeArea:'',// 最高交易区域 ,
					maxTradeAreaTradeAmount:'',//最高交易区域交易额（单位，元） ,
					maxTradeAreaTradeNum:'',// 最高交易区域交易笔数 ,
					tradeAmount:'',//交易金额（单位，元） ,
					tradeArea:[],//交易区域 ,
					tradeAreaNum:'',// 交易区域个数 ,
					tradeNum:'',//交易笔数
				},
				merchantDataArea:{						//商户数据分析
					averageSubsidyAmount:'',// 店均补贴金额(元)
					averageTradeAmount:'',// 店均交易金额(元)
					averageTradeNumbers:'',// 店均交易笔数(个)
					generateTradeStoreNumbers:'',// 产生交易门店数
					merchantName:'',// 商户名称
					storeName:'',// 门店名称
					storeNumbers:'',// 参与门店数
					totalSubsidyAmount:'',// 补贴总金额
					totalTradeAmount:'',// 交易总金额
					totalTradeNumbers:'',// 交易总笔数
					tradeAmount:'',//刷卡金额
					tradeCount:'',//刷卡笔数

				},
				transactionTime:{//交易时段分析数据
					// timeData:['45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45','45'],//时段数据
					// timePoint:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']//时段时间点
					timeData:'',
					timePoint:'',
				},
				tradeAmountMerArea:{//
					averageSubsidyAmount:'',//店均补贴金额(元)
					averageTradeAmount:'',//店均交易金额(元)
					averageTradeNumbers:'',//店均交易笔数(个)
					generateTradeStoreNumbers:'',//产生交易门店数 
					merchantName:'',//商户名称 ,
					storeName:'',//门店名称 ,
					storeNumbers:'',//参与门店数 ,
					totalSubsidyAmount:'',//补贴总金额 ,
					totalTradeAmount:'',//交易总金额 ,
					totalTradeNumbers:'',//交易总笔数
					tradeAmountMerChange:'',//交易金额Change
					tradeNubmerMerChange:'',//交易笔数Change
				},
				cardBINDataArea:{
					averageSubsidyAmount:'',//卡BIN平均补贴金额
					averageTradeAmount:'',//卡BIN平均交易金额
					averageTradeNum :'',//卡BIN平均交易笔数 
					binType:'',//卡BIN种类 
					cardBinNum:'',//卡BIN个数
					subsidyAmount:'',//补贴金额（单位，元）
					tradeAmount:'',//交易金额（单位，元）
					tradeNum:'',//交易笔数
					binStartNumber:'',//卡BIN开头数字
					tradeAmountCardBINChange:'',//交易金额排行change
					tradeNumCardBINChange:'',//交易笔数排行change
				},
				oneCardArea:{
					averageCardNumbers:'',//卡均参与次数（次） 
					cardNumbers:'',//参与卡数量（个） 
					maxSwipedCardNumbers:'',//单卡最高参与次数（次）
					oneCardChance:'',
					oneCardNum:'',
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
				        data:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
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
			// getdate(){
			dateGetShow(){
				var date = new Date(),
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
				this.times.startDate=pastDate;
				this.times.endDate=locakDate;
				this.times.oneMonthAgo=agoMonthDate;
			},
			// =================================================================================================
			//交易数据分析
			TradeDataTotalReadyToday(){//获取今日关键数据
				let data={
					activityID:'112111',
	        		startDate:this.times.endDate,
	        		endDate:this.times.endDate,
	        		compareFlag:true
        		}
        		this.model.getTradeDataTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.transactionDataShow.tradeAmount=res.data.data.tradeAmount;//交易总金额
        				this.transactionDataShow.subsidyAmount=res.data.data.subsidyAmount;//补贴总金额
        				this.transactionDataShow.tradeNum=res.data.data.tradeNum;//交易总笔数
        				this.transactionDataShow.averageSubsidyAmount=res.data.data.averageSubsidyAmount;//单笔平均补贴金额
        				this.transactionDataShow.averageTradeAmount=res.data.data.averageTradeAmount;//单笔平均交易金额
        				this.transactionDataShow.tradeCardNum=res.data.data.tradeCardNum;//参与活动卡数量
        			}
        		})
			},
			TradeDataTotalReadyAll(){//获取累计交易数据
				let data={
					activityID:'01',
	        		compareFlag:true
        		}
        		this.model.getTradeDataTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.transactionDataShow.totalTradeAmount=res.data.data.tradeAmount;//交易总金额total
        				this.transactionDataShow.totalSubsidyAmount=res.data.data.subsidyAmount;//补贴总金额total
        				this.transactionDataShow.totalTradeNum=res.data.data.tradeNum;//交易总笔数total
        				this.transactionDataShow.totalAverageSubsidyAmount=res.data.data.averageSubsidyAmount;//单笔平均补贴金额total
        				this.transactionDataShow.totalAverageTradeAmount=res.data.data.averageTradeAmount;//单笔平均交易金额total
        				this.transactionDataShow.totalTradeCardNum=res.data.data.tradeCardNum;//参与活动卡数量 total
        			}
        		})
			},
	     	TradeAmountList(){//某个时间段的交易总金额
	     		this.transactionDataJudgeName='TradeAmountList';
	     		let data={
					activityID:'01',
	        		startDate:this.times.startDate,
	        		endDate:this.times.endDate,
	        		compareFlag:true
        		}
        		this.model.getTradeAmount(data).then((res)=>{
        			if (res.data.code==0){
						this.transactionDataShow.xAxisData=res.data.data.category;
         				this.transactionDataShow.weekThis=res.data.data.series[0].dataDecimal;
         				this.transactionDataShow.weekLast=res.data.data.series[1].dataDecimal;
         				this.dataLineEchart("data-echart-weekmonth",this.tableTitleChoose.title,this.transactionDataShow.chooseWeek,this.transactionDataShow.xAxisData,this.transactionDataShow.chooseWeek[0],this.transactionDataShow.weekThis,this.transactionDataShow.chooseWeek[1],this.transactionDataShow.weekLast);
        			}
        		})
        	},
        	SubsidyAmountList(){//某个时间段的补贴总金额
        		this.transactionDataJudgeName='SubsidyAmountList';
        		let data={
        			activityID:'',
        			startDate:this.times.startDate,
        			endDate:this.times.endDate,
        			compareFlag:true
        		}
        		this.model.getSubsidyAmount(data).then((res)=>{
        			if (res.data.code==0){
        				this.transactionDataShow.xAxisData=res.data.data.category;
         				this.transactionDataShow.weekThis=res.data.data.series[0].dataDecimal;
         				this.transactionDataShow.weekLast=res.data.data.series[1].dataDecimal;
         				this.dataLineEchart("data-echart-weekmonth",this.tableTitleChoose.title,this.transactionDataShow.chooseWeek,this.transactionDataShow.xAxisData,this.transactionDataShow.chooseWeek[0],this.transactionDataShow.weekThis,this.transactionDataShow.chooseWeek[1],this.transactionDataShow.weekLast);
        			}
        		})
        	},
        	TradeNumList(){//某个时间段的交易总笔数
        		this.transactionDataJudgeName='TradeNumList';
        		let data={
        			activityID:'',
        			startDate:this.times.startDate,
        			endDate:this.times.endDate,
        			compareFlag:true
        		}
        		this.model.getTradeNum(data).then((res)=>{
        			if (res.data.code==0){
        				this.transactionDataShow.xAxisData=res.data.data.category;
         				this.transactionDataShow.weekThis=res.data.data.series[0].dataLong;
         				this.transactionDataShow.weekLast=res.data.data.series[1].dataLong;
         				this.dataLineEchart("data-echart-weekmonth",this.tableTitleChoose.title,this.transactionDataShow.chooseWeek,this.transactionDataShow.xAxisData,this.transactionDataShow.chooseWeek[0],this.transactionDataShow.weekThis,this.transactionDataShow.chooseWeek[1],this.transactionDataShow.weekLast);
        			}
        		})
        	},
			weekData(){//7天切换数据
				this.transactionDataJudgeTime="7";
				this.times.startDate=this.times.startDate;
				this.times.endDate=this.times.endDate;	
				this.tableTitleChoose.title='7日交易总金额数据展示图';
				this.TradeAmountList();
				if(this.transactionDataJudgeName=="TradeAmountList"){
					this.tableTitleChoose.title='7日交易总金额数据展示图';
					this.TradeAmountList();
				}else if (this.transactionDataJudgeName=="SubsidyAmountList") {
					this.tableTitleChoose.title='7日补贴总金额数据展示图';
					this.SubsidyAmountList();
				}else if (this.transactionDataJudgeName=="TradeNumList") {
					this.tableTitleChoose.title='7日交易总笔数数据展示图';
					this.TradeNumList();
				}
        	},
        	monthData(){//30天切换数据
				this.transactionDataJudgeTime="30";
        		this.times.startDate=this.times.oneMonthAgo;
				this.times.endDate=this.times.endDate;
        		if(this.transactionDataJudgeName=="TradeAmountList"){
					this.tableTitleChoose.title='30日交易总金额数据展示图';
					this.TradeAmountList();
				}else if (this.transactionDataJudgeName=="SubsidyAmountList") {
					this.tableTitleChoose.title='30日补贴总金额数据展示图';
					this.SubsidyAmountList();
				}else if (this.transactionDataJudgeName=="TradeNumList") {
					this.tableTitleChoose.title='30日交易总笔数数据展示图';
					this.TradeNumList();
				}
        	},
			// =================================================================================================
        	//交易区域 sucess
        	regionDetailReady(){//交易区域数据获取
        		let data={
        			activityID:'112111'
        		}
        		this.model.getTradeAreaTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.transactionRegion.tradeAreaNum =res.data.data.tradeAreaNum;
        				this.transactionRegion.averageTradeNum=res.data.data.averageTradeNum;
        				this.transactionRegion.maxTradeArea=res.data.data.maxTradeArea;
        				this.transactionRegion.maxTradeAreaTradeNum=res.data.data.maxTradeAreaTradeNum;
        				this.transactionRegion.maxTradeAreaTradeAmount =res.data.data.maxTradeAreaTradeAmount;
        			}
        		})
        	},
        	regionDetailAmount(){//交易区域交易金额切换
        		this.regionDetailJudgeChoose='amount';
        		let data={
        			activityID:'112111'
        		}
        		this.model.getTradeAreaTotalAmountList(data).then((res)=>{
        			if (res.data.code==0){
						this.transactionRegion.tradeArea=res.data.data.category;
						this.transactionRegion.cityData=res.data.data.series[0].dataDecimal;
						this.dataBarEchart('region-echart',this.transactionRegion.tradeArea,'交易金额',this.transactionRegion.cityData);
        			}
        		})

        	},
			regionDetailNumber(){//交易区域交易笔数切换
				this.regionDetailJudgeChoose='num';
				let data={
					activityID:'112111'
				}
				this.model.getTradeAreaNumList(data).then((res)=>{
        			if (res.data.code==0){
						this.transactionRegion.tradeArea=res.data.data.category;
						this.transactionRegion.cityData=res.data.data.series[0].dataLong;
						this.dataBarEchart('region-echart',this.transactionRegion.tradeArea,'交易笔数',this.transactionRegion.cityData);
        			}
        		})
			},
			// =================================================================================================
			//交易时段分析 sucess
			transactionTimeReady(){//交易时段加载数据
				let data={
					activityID:'112111'
				}
				this.model.getTradePeriodTotal(data).then((res)=>{
					if (res.data.code==0){
						this.transactionTime.timePoint = res.data.data.series;
        			}
					this.justChart(this.transactionTime.timeData,this.transactionTime.timePoint);	
				})
			},
			// =================================================================================================
			//商户数据分析
			merchantDataAreaReady(){//商户关键数据
				let data={
					activityID:'112111'
				}
				this.model.getMerchantTradeTotal(data).then((res)=>{
					if (res.data.code==0){
						this.merchantDataArea.storeNumbers=res.data.data.storeNumbers;
						this.merchantDataArea.generateTradeStoreNumbers=res.data.data.generateTradeStoreNumbers;
						this.merchantDataArea.averageTradeNumbers=res.data.data.averageTradeNumbers;
						this.merchantDataArea.averageSubsidyAmount=res.data.data.averageSubsidyAmount;
						this.merchantDataArea.averageTradeAmount=res.data.data.averageTradeAmount;
					}
				})
			},
			merchantDataTradeAmountChange(){//商户数据交易金额
				this.merchantDataDetailJudgeName='amount';
				let data={
					activityID:'112111'
				}
				this.model.getMerchantTradeAmount(data).then((res)=>{
					if (res.data.code==0){
						this.merchantDataArea.storeName=res.data.data.series[0].storeAndMerchantName;//商户数据名称
						this.merchantDataArea.tradeAmount=res.data.data.series[0].dataDecimal;//商户数据刷卡金额
						this.dataBarEchart('merchant-echart',this.merchantDataArea.storeName,'刷卡金额',this.merchantDataArea.tradeAmount);
					}
				})
			},
			merchantDataTradeCountChange(){//商户数据交易笔数
				this.merchantDataDetailJudgeName='num';
				let data={
					activityID:'112111'
				}
				this.model.getMerchantTradeCount(data).then((res)=>{
					if (res.data.code==0){
						this.merchantDataArea.storeName=res.data.data.series[0].storeAndMerchantName;//商户数据名称
						this.merchantDataArea.tradeCount=res.data.data.series[0].dataLong;//商户数据刷卡笔数
						this.dataBarEchart('merchant-echart',this.merchantDataArea.storeName,'刷卡笔数',this.merchantDataArea.tradeCount);
					}
				})
			},
			// =================================================================================================
			//卡BIN数据分析 success
			cardBINDataAreaReady(){//卡BIN数据分析获取数据
				let data={
					activityID:'112111'
				};
				this.model.getCardBINTotal(data).then((res)=>{
					if (res.data.code==0){
						this.cardBINDataArea.cardBinNum=res.data.data.cardBinNum;
						this.cardBINDataArea.averageTradeNum=res.data.data.averageTradeNum;
						this.cardBINDataArea.averageTradeAmount=res.data.data.averageTradeAmount;
						this.cardBINDataArea.averageSubsidyAmount=res.data.data.averageSubsidyAmount;
        			}
				})
			},
			cardBINDetailAmount(){//卡BIN交易金额chenge
				this.cardBINDetailJudgeChoose='amount';
				let data={
					activityID:'112111'
				};
				this.model.getCardBINTradeAmountList(data).then((res)=>{
					if (res.data.code==0) {
						this.cardBINDataArea.binStartNumber=res.data.data.category;
						this.cardBINDataArea.tradeAmountCardBINChange=res.data.data.series[0].dataDecimal;
						this.dataBarEchart('cardBIN-echart',this.cardBINDataArea.binStartNumber,'卡BIN刷卡金额',this.cardBINDataArea.tradeAmountCardBINChange);
					}
				});
			},
			cardBINDetailNumber(){//卡BIN交易笔数change
				this.cardBINDetailJudgeChoose='num';
				let data={
					activityID:'112111'
				};
				this.model.getCardBINTradeNumList(data).then((res)=>{
					if (res.data.code==0) {
						this.cardBINDataArea.binStartNumber=res.data.data.category;
						this.cardBINDataArea.tradeNumCardBINChange=res.data.data.series[0].dataLong;
						this.dataBarEchart('cardBIN-echart',this.cardBINDataArea.binStartNumber,'卡BIN刷卡笔数',this.transactionRegion.tradeNumCardBINChange);
					}
				});
			},
			// =================================================================================================
			oneCardDataReady(){//单卡获取total
				let data={
					activityID:'112111'
				};
				this.model.getOneCardTotal(data).then((res)=>{
					if (res.data.code==0) {
						this.oneCardArea.averageCardNumbers=res.data.data.averageCardNumbers;
						this.oneCardArea.cardNumbers=res.data.data.cardNumbers;
						this.oneCardArea.maxSwipedCardNumbers=res.data.data.maxSwipedCardNumbers;
						
					}
				})
			},
			oneCardDataOnceData(){//获取单卡参与次数数据
				let data={
					activityID:'112111'
				};
				this.model.getOneCardSwipedCount(data).then((res)=>{
					if (res.data.code==0) {
						this.oneCardArea.oneCardChance=res.data.data.series[0].data;
						this.oneCardArea.oneCardNum=res.data.data.series[0].dataLong;
						this.dataBarEchart('one-echart',this.oneCardArea.oneCardChance,'卡数量',this.oneCardArea.oneCardNum);
					}
				})
			},
			//展开收起触发======================================================================
				//交易数据分析
			transactionDataToggle(toggle){
				switch(toggle){
					case 'transaDataToggleUp'://交易数据分析
						this.upDownToggle.transactionDataShowArea=false;
        				// this.weekData();
						break;
					case 'transaDataToggleDown'://交易数据分析
						this.upDownToggle.transactionDataShowArea=true;	
        				this.weekData();
						break;
					case 'transaRegionToggleUp'://交易区域分析
						this.upDownToggle.transactionRegionShowArea=false;
						break;
					case 'transaRegionToggleDown'://交易区域分析
						this.upDownToggle.transactionRegionShowArea=true;
						this.regionDetailAmount();//交易区域交易金额数据读取
        				this.regionDetailReady();//交易区域数据获取
						break;
					case 'transaTimeToggleUp'://交易时段分析
						this.upDownToggle.transactionTimeShowArea=false;
						break;
					case 'transaTimeToggleDown'://交易时段分析
						this.upDownToggle.transactionTimeShowArea=true;
        				this.transactionTimeReady();//交易时段数据读取
						break;
					case 'merchantToggleUp'://商户数据分析
						this.upDownToggle.merchantDataShowArea=false;
						break;
					case 'merchantToggleDown'://商户数据分析
						this.upDownToggle.merchantDataShowArea=true;
						this.merchantDataAreaReady();//商户数据读取
        				this.merchantDataTradeAmountChange();//商户数据交易金额
						break;
					case 'cardBINToggleUp'://卡BIN数据分析
						this.upDownToggle.cardBINDataShowArea=false;
						break;
					case 'cardBINToggleDown'://卡BIN数据分析
						this.upDownToggle.cardBINDataShowArea=true;
						this.cardBINDataAreaReady();//卡BIN数据分析获取
        				this.cardBINDetailAmount();//卡BIN交易金额读取
						break;
					case 'oneCardoggleUp'://单卡交易分析
						this.upDownToggle.oneCardShowArea=false;
						break;
					case 'oneCardoggleDown'://单卡交易分析
						this.upDownToggle.oneCardShowArea=true;
						this.oneCardDataReady();//单卡获取total
        				this.oneCardDataOnceData();//单卡读取参与数据
						break;
					default:
						break;
				}
			}
		},
		ready(){
			this.dateGetShow();
        	this.TradeDataTotalReadyToday();
			this.TradeDataTotalReadyAll();
		}
	}
</script>