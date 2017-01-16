<template>
	<div class="activity-analysis">
		<div class="activity-search">
			<div class="search-left">
				<label>活动名称</label>
				<input class="input" type="text" name="" placeholder="请输入活动名称" v-model="searchDate.activityName" @keyup.enter="getActivity">
			</div>
			<div class="showList" v-show="searchDate.showList">
                <ul>
                    <li v-for="n in activityList | filterBy searchDate.activityName in 'name'" @click="getId(n)">{{n.name}}</li>
                    <li v-if="!activityList.length">未查询到{{searchDate.activityName}}活动</li>
                </ul>
            </div>
			<div class="search-right">
				<span class="search-time">活动进行中，数据截止到{{times.todayDate}}</span>
				<a class="view-report">查看分析报告</a>
			</div>
		</div>
		<div class="transaction-data border">
			<div class="data-title">
				<span class="title-left">交易数据分析</span>
				<span class="title-right" @click="transactionDataToggle('transaDataToggleUp')" v-if="upDownToggle.transactionDataShowArea" >收起</span>
				<span class="title-right" @click="transactionDataToggle('transaDataToggleDown')" v-else>展开</span>
			</div>
			<span v-show="upDownToggle.transactionDataShowArea">
				<div class="data-today-table">
					<span class="title"><i></i>今日关键数据</span>
					<table>
						<tr>
							<td>
								<span>交易总金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelToday.tradeAmount}}</strong>
							</td>
							<td>
								<span>补贴总金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelToday.subsidyAmount}}</strong>
							</td>
							<td>
								<span>交易总笔数(笔)</span>
								<strong>{{transactionDataShow.tradeDataModelToday.tradeNum}}</strong>
							</td>
							<td>
								<span>参与活动卡数量(个)</span>
								<strong>{{transactionDataShow.tradeDataModelToday.tradeCardNum}}</strong>
							</td>
							<td>
								<span>单笔平均交易金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelToday.averageTradeAmount}}</strong>
							</td>
							<td>
								<span>单笔平均补贴金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelToday.averageSubsidyAmount}}</strong>
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
								<strong>{{transactionDataShow.tradeDataModelTotail.tradeAmount}}</strong>
							</td>
							<td>
								<span>补贴总金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelTotail.subsidyAmount}}</strong>
							</td>
							<td>
								<span>交易总笔数(笔)</span>
								<strong>{{transactionDataShow.tradeDataModelTotail.tradeNum}}</strong>
							</td>
							<td>
								<span>参与活动卡数量(个)</span>
								<strong>{{transactionDataShow.tradeDataModelTotail.tradeCardNum}}</strong>
							</td>
							<td>
								<span>单笔平均交易金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelTotail.averageTradeAmount}}</strong>
							</td>
							<td>
								<span>单笔平均补贴金额(元)</span>
								<strong>{{transactionDataShow.tradeDataModelTotail.averageSubsidyAmount}}</strong>
							</td>
						</tr>
					</table>
				</div>
				<div class="data-detail">
					<span class="title"><i></i>7日/30日关键数据详解</span>
					<div class="choose-btn">
						<a class="btn" :class="transactionDataJudgeName=='TradeAmountList'?'btn-primary':'btn-gray'" @click="changeDataShow('TradeAmountList')">交易总金额</a>
						<a class="btn" :class="transactionDataJudgeName=='SubsidyAmountList'?'btn-primary':'btn-gray'" @click="changeDataShow('SubsidyAmountList')">补贴总金额</a>
						<a class="btn" :class="transactionDataJudgeName=='TradeNumList'?'btn-primary':'btn-gray'" @click="changeDataShow('TradeNumList')">交易总笔数</a>
					</div>
					<div class="choose-btn">
						<a class="btn btn-primary" :class="transactionDataJudgeTime=='7'?'btn-primary':'btn-gray'" @click="dateChange('week')">7日关键数据</a>
						<a class="btn btn-gray" :class="transactionDataJudgeTime=='30'?'btn-primary':'btn-gray'" @click="dateChange('month')">30日关键数据</a>
					</div>
					<div class="data-echart" id="data-echart-weekmonth"></div>
				</div>
			</span>
		</div>
		<div class="transaction-region border">
			<div class="region-title">
				<span class="title-left">交易区域分析</span>
				<span class="title-right" v-if="upDownToggle.transactionRegionShowArea" @click="transactionDataToggle('transaRegionToggleUp')">收起</span>
				<span class="title-right" v-else @click="transactionDataToggle('transaRegionToggleDown')">展开</span>
			</div>
			<span v-show="upDownToggle.transactionRegionShowArea">
				<div class="region-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>产生交易区域（个）</span>
								<strong>{{transactionRegion.tradeAreaModel.tradeAreaNum}}</strong>
							</td>
							<td>
								<span>区域平均交易笔数(笔)</span>
								<strong>{{transactionRegion.tradeAreaModel.averageTradeNum}}</strong>
							</td>
							<td>
								<span>最高交易区域</span>
								<strong>{{transactionRegion.tradeAreaModel.maxTradeArea}}</strong>
							</td>
							<td>
								<span>最高交易区域交易笔数(笔)</span>
								<strong>{{transactionRegion.tradeAreaModel.maxTradeAreaTradeNum}}</strong>
							</td>
						 	<td>
								<span>最高交易区域交易额（元）</span>
								<strong>{{transactionRegion.tradeAreaModel.maxTradeAreaTradeAmount}}</strong>
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
				<span class="title-right" v-if="upDownToggle.transactionTimeShowArea" @click="transactionDataToggle('transaTimeToggleUp')">收起</span>
				<span class="title-right" v-else @click="transactionDataToggle('transaTimeToggleDown')">展开</span>
			</div>
			<span v-show="upDownToggle.transactionTimeShowArea">
				<div class="time-show">
					<div class="time-echart" id="time-echart"></div>
				</div>
			</span>
		</div>
		<div class="merchant-data border">
			<div class="merchant-title">
				<span class="title-left">商户数据分析</span>
				<span class="title-right" v-if="upDownToggle.merchantDataShowArea" @click="transactionDataToggle('merchantToggleUp')">收起</span>
				<span class="title-right" v-else @click="transactionDataToggle('merchantToggleDown')">展开</span>
			</div>
			<span v-show="upDownToggle.merchantDataShowArea">
				<div class="merchant-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>参与门店数（个）</span>
								<strong>{{merchantDataArea.merchantDataTotal.storeNumbers}}</strong>
							</td>
							<td>
								<span>产生交易门店数(个)</span>
								<strong>{{merchantDataArea.merchantDataTotal.generateTradeStoreNumbers}}</strong>
							</td>
							<td>
								<span>店均交易笔数(个)</span>
								<strong>{{merchantDataArea.merchantDataTotal.averageTradeNumbers}}</strong>
							</td>
							<td>
								<span>店均补贴金额(元)</span>
								<strong>{{merchantDataArea.merchantDataTotal.averageSubsidyAmount}}</strong>
							</td>
							<td>
								<span>店均交易金额（元）</span>
								<strong>{{merchantDataArea.merchantDataTotal.averageTradeAmount}}</strong>
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
				<span class="title-right" v-if="upDownToggle.cardBINDataShowArea" @click="transactionDataToggle('cardBINToggleUp')">收起</span>
				<span class="title-right" v-else @click="transactionDataToggle('cardBINToggleDown')">展开</span>
			</div>
			<span v-show="upDownToggle.cardBINDataShowArea">
				<div class="cardBIN-ranking-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>卡BIN个数（个）</span>
								<strong>{{cardBINDataArea.CardBinModel.cardBinNum}}</strong>
							</td>
							<td>
								<span>卡BIN平均交易笔数(个)</span>
								<strong>{{cardBINDataArea.CardBinModel.averageTradeNum}}</strong>
							</td>
							<td>
								<span>卡BIN平均交易金额（元）</span>
								<strong>{{cardBINDataArea.CardBinModel.averageTradeAmount}}</strong>
							</td>
							<td>
								<span>卡BIN平均补贴金额(元)</span>
								<strong>{{cardBINDataArea.CardBinModel.averageSubsidyAmount}}</strong>
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
			</span>
		</div>
		<div class="one-card border">
			<div class="one-title">
				<span class="title-left">单卡交易分析</span>
				<span class="title-right" v-if="upDownToggle.oneCardShowArea" @click="transactionDataToggle('oneCardoggleUp')">收起</span>
				<span class="title-right" v-else @click="transactionDataToggle('oneCardoggleDown')">展开</span>
			</div>
			<span v-show="upDownToggle.oneCardShowArea==true">
				<div class="one-ranking-table">
					<span class="title"><i></i>关键数据</span>
					<table>
						<tr>
							<td>
								<span>参与卡数量（个）</span>
								<strong>{{oneCardArea.oneCardModel.cardNumbers}}</strong>
							</td>
							<td>
								<span>卡均参与次数(次)</span>
								<strong>{{oneCardArea.oneCardModel.averageCardNumbers}}</strong>
							</td>
							<td>
								<span>单卡最高参与次数（次）</span>
								<strong>{{oneCardArea.oneCardModel.maxSwipedCardNumbers}}</strong>
							</td>
						</tr>
					</table>
				</div>
				<div class="one-detail">
					<span class="title"><i></i>单卡参与次数（次）</span>
					<div class="one-echart" id="one-echart"></div>
				</div>
			</span>
		</div>
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
				times:{//时间吃初始化数据
					todayDate:'',
					lastWeek:'',
					monthAgo:''
				},
				tradeSearchData:{
					xAxisData:[],
					weekThis:[],
					weekLast:[],
				},
				tradeGET:{
					startDate:'',
					endDate:'',
					compareFlag:true,
					activityID:''
				},
				transactionDataShow:{//交易数据分析
					tradeDataModelToday:[],//交易数据今日累计关键数据
					tradeDataModelTotail:[],//交易数据累计关键数据
					XData:[],
					PData:[],
					Ldata:[],
					tableTitle:'',
				},
				transactionRegion:{//交易区域数据
					tradeAreaModel:[],//交易区域累计的关键数据
					tradeAreaAmount:[],//交易区域交易金额排行数据
					tradeAreaNum:[],//交易区域交易笔数排行数据
				},
				transactionTime:{//交易时段分析数据
					timeData:[],
					timePoint:[],
				},
				merchantDataArea:{//商户数据分析
					merchantDataTotal:[],//商户数据关键数据
					storeName:[],
					tradeAmount:[],
				},
				cardBINDataArea:{//卡BIN数据分析
					CardBinModel:[],
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
				oneCardArea:{//单卡数据
					oneCardModel:[],
				},
				uuids:[JSON.parse(sessionStorage.getItem('loginList')).bankUUID],
				activityList:[],
				searchDate:{
					activityID:'',
					activityName:'',
					showList:false
				},
			}
		},
		methods:{
			dateGetShow(){
				var date = new Date(),lyear = date.getFullYear(),lmonth = date.getMonth() + 1,agoMonth = lmonth-1,lday = date.getDate(),pdate = new Date(date.getTime() - 7 * 24 * 3600 * 1000),pyear = pdate.getFullYear(),pmonth = pdate.getMonth() + 1,pday = pdate.getDate(),locakDate=lyear + '-' + lmonth + '-' + lday,pastDate=pyear + '-' + pmonth + '-' + pday,agoMonthDate=lyear+'-'+agoMonth+'-'+lday;
				this.times.lastWeek=pastDate;
				this.times.todayDate=locakDate;
				this.times.monthAgo=agoMonthDate;
			},
			// =================================================================================================
			dataLineEchart(title,xData,parentDataName,parentData,passDataName,passData){
				var myChart=echarts.init(document.getElementById("data-echart-weekmonth"));
				var option = {
				    title: {
				        text: title
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['当前数据','对比数据']
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: xData
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
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
				};
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
				            data:timePoint,
				        }]
				}
				myChart.setOption(option);
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
				            sort: 'descending',
				            itemStyle:{
				            	normal:{color:'#5F9EA0'}
				            }
				        }
				    ]
				}
				myChart.setOption(option)
			},
			// =================================================================================================
			//交易数据分析
			tradeSetData(data){
				this.$set('transactionDataShow.XData',data.category);
				this.$set('transactionDataShow.PData',data.series[0].dataDecimal);
				this.$set('transactionDataShow.Ldata',data.series[1].dataDecimal);
         		this.dataLineEchart(
         			this.transactionDataShow.tableTitle,
					this.transactionDataShow.XData,
					'当前数据',this.transactionDataShow.PData,
					'对比数据',this.transactionDataShow.Ldata
				)
			},
			tradeDataModelToday(){//获取今日关键数据
				let data={
					startDate:this.times.todayDate,
					endDate:this.times.todayDate,
					activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeDataTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionDataShow.tradeDataModelToday',res.data.data);
        			}
        		})
			},
			tradeDataModelTotail(){//获取累计交易数据
				let data={compareFlag:true,activityID:this.tradeGET.activityID};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeDataTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionDataShow.tradeDataModelTotail',res.data.data);
        			}
        		})
			},
        	changeDataShow(toggle){//数据切换
        		switch(toggle){
        			case 'TradeAmountList':
						this.transactionDataJudgeName="TradeAmountList";
						this.transactionDataShow.tableTitle="交易总金额数据展示图";
	        			this.model.getTradeAmount(this.tradeGET).then((res)=>{
	        				if (res.data.code==0){
								this.tradeSetData(res.data.data)
	        				};
	        			});
	        			break;
	        		case 'SubsidyAmountList':
						this.transactionDataJudgeName="SubsidyAmountList";
						this.transactionDataShow.tableTitle="补贴总金额数据展示图";
						this.model.getSubsidyAmount(this.tradeGET).then((res)=>{
		        			if (res.data.code==0){
		        				this.tradeSetData(res.data.data)
		        			}
		        		});
		        		break;
	        		case 'TradeNumList':
						this.transactionDataJudgeName="TradeNumList";
						this.transactionDataShow.tableTitle="交易总笔数数据展示图";
						this.model.getTradeNum(this.tradeGET).then((res)=>{
		        			if (res.data.code==0){
		        				this.$set('transactionDataShow.XData',res.data.data.category);
								this.$set('transactionDataShow.PData',res.data.data.series[0].dataLong);
								this.$set('transactionDataShow.Ldata',res.data.data.series[1].dataLong);
		         				this.dataLineEchart(
		         					this.transactionDataShow.tableTitle,
									this.transactionDataShow.XData,
									'当前数据',this.transactionDataShow.PData,
									'对比数据',this.transactionDataShow.Ldata
								);
		        			}
		        		});
		        		break;
		        	default:
						break;
		        	};
        	},
        	dateChange(toggle){
        		switch(toggle){
        			case 'week':
        				this.transactionDataJudgeTime="7";
						this.tradeGET.startDate=this.times.lastWeek;
						this.tradeGET.endDate=this.times.todayDate;
						if(this.transactionDataJudgeName=="TradeAmountList"){
							this.changeDataShow('TradeAmountList');
		        			break;
						}else if (this.transactionDataJudgeName=="SubsidyAmountList") {
							this.changeDataShow('SubsidyAmountList');
			        		break;
						}else if (this.transactionDataJudgeName=="TradeNumList") {
							this.changeDataShow('TradeNumList');
			        		break;
						}
						break;
        			case 'month':
        				this.transactionDataJudgeTime="30";
						this.tradeGET.startDate=this.times.monthAgo;
						this.tradeGET.endDate=this.times.todayDate;
						if(this.transactionDataJudgeName=="TradeAmountList"){
							this.changeDataShow('TradeAmountList');
		        			break;
						}else if (this.transactionDataJudgeName=="SubsidyAmountList") {
							this.changeDataShow('SubsidyAmountList');
			        		break;
						}else if (this.transactionDataJudgeName=="TradeNumList") {
							this.changeDataShow('TradeNumList');
			        		break;
						}
						break;
					default:
						break;
        		}
        	},
			// =================================================================================================
        	//交易区域 sucess
        	regionDetailReady(){//交易区域数据获取
        		let data={
        			activityID:this.tradeGET.activityID
        		};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeAreaTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionRegion.tradeAreaModel',res.data.data);
        			}
        		})
        	},
        	regionDetailAmount(){//交易区域交易金额切换
        		this.regionDetailJudgeChoose='amount';
        		let data={
        			activityID:this.tradeGET.activityID
        		};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
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
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
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
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getTradePeriodTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('transactionTime.timePoint',res.data.data.series);
        			}
					this.justChart(this.transactionTime.timeData,this.transactionTime.timePoint);	
				})
			},
			// =================================================================================================
			//商户数据分析
			merchantDataAreaReady(){//商户关键数据
				let data={
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getMerchantTradeTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('merchantDataArea.merchantDataTotal',res.data.data);
					}
				})
			},
			merchantDataTradeAmountChange(){//商户数据交易金额
				this.merchantDataDetailJudgeName='amount';
				let data={
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
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
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';

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
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('cardBINDataArea.CardBinModel',res.data.data);
        			}
				})
			},
			cardBINDetailAmount(){//卡BIN交易金额chenge
				this.cardBINDetailJudgeChoose='amount';
				let data={
        			activityID:this.tradeGET.activityID

				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
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
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTradeNumList(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('cardBINDataArea.binStartNumber',res.data.data.category)
						this.$set('cardBINDataArea.tradeNumCardBINChange',res.data.series[0].dataLong)
						this.dataBarEchart('cardBIN-echart',this.cardBINDataArea.binStartNumber,'卡BIN刷卡笔数',this.cardBINDataArea.tradeNumCardBINChange);
					}
				});
			},
			// =================================================================================================
			oneCardDataReady(){//单卡获取total
				let data={
        			activityID:this.tradeGET.activityID
				};
				(!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getOneCardTotal(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('oneCardArea.oneCardModel',res.data.data);
					}
				})
			},
			oneCardDataOnceData(){//获取单卡参与次数数据
				let data={
        			activityID:this.tradeGET.activityID
				};
                (!this.tradeGET.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getOneCardSwipedCount(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('oneCardArea.oneCardChance',res.data.data.series[0].data);
						this.$set('oneCardArea.oneCardNum',res.data.data.series[0].dataLong);
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
						break;
					case 'transaDataToggleDown'://交易数据分析
						this.upDownToggle.transactionDataShowArea=true;	
        				this.tradeDataModelToday();
        				this.tradeDataModelTotail();
        				this.changeDataShow('TradeAmountList');
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
			},
			//搜索活动
			getActivity(){
				 let data={
                    name:this.searchDate.activityName,
                    uuids:_.split(sessionStorage.getItem('uuids'), ','),
                    activityID:this.searchDate.activityID
                };
                this.$common_model.getActivityList(data).then((res)=>{
                    if(res.data.code===0){
                        this.$set('activityList',res.data.data);
                        this.searchDate.showList=true;
                    }
                })
			},
			getId({id,name}){
                this.searchDate.showList=false;
                this.searchDate.activityName=name;
                this.tradeGET.activityID=id;
                this.transactionDataToggle("transaDataToggleDown");
            },
            resetName(){
                this.searchDate.showList=false;
            },
		},
		ready(){
			this.dateGetShow();
			this.tradeGET.startDate=this.times.lastWeek;
			this.tradeGET.endDate=this.times.todayDate;
			document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('showLi')) {
                    this.resetName();
                }
            }, false);
		},
		beforeDestroy () {
            document.removeEventListener('click', this.resetName, false);
        },
        created(){}
	}
</script>