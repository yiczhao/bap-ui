<template>
	<div class="activity-pdfout" id="pdf-area">
		<div class="pdf-title">
			<span class="p-title">活动分析报告</span>
			<span class="out-pdf"><a @click="outPDF">导出PDF报告</a></span>
		</div>
		<span></span>
		<div class="information-area basic-information" v-show="!!this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id">
			<div class="title">活动基本信息</div>
			<div class="something-about">
				<table>
					<tr>
						<td>活动名称:</td>
						<td>{{basicData.name}}</td>
						<td>活动预算:</td>
						<td>{{basicData.budget}}</td>
					</tr>
					<tr>
						<td>活动时间: </td>
						<td>{{basicData.startTime}} ~ {{basicData.endTime}}</td>
						<td>所属银行: </td>
						<td>{{basicData.uuid | get_bank uuidsList}}</td>
					</tr>
					<tr>
						<td>参与时间段:</td>
						<td colspan="3">
						<template v-for="n in basicData.timesList">【{{n}}】</template>
						</td>
					</tr>
					<tr>
						<td>活动主题：</td>
						<td colspan="3">{{basicData.subject}}</td>
					</tr>
					<tr>
						<td>活动细则：</td>
						<td colspan="3">{{basicData.detail}}</td>
					</tr>
					<tr>
						<td>POS小票内容设置</td>
						<td colspan="3">{{basicData.posPrint}}</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="information-area">
			<div class="title">交易数据分析</div>
			<div class="data-table">
				<span class="data-title"><i></i>今日关键数据</span>
				<table>
					<tr>
						<td>
							<span>交易总金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelToday.tradeAmount}}</strong>
						</td>
						<td>
							<span>补贴总金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelToday.subsidyAmount}}<strong>
						</td>
						<td>
							<span>交易总笔数(笔)</span>
							<strong>{{transactionDataShow.tradeDataModelToday.tradeNum}}<strong>
						</td>
						<td>
							<span>参与活动卡数量(个)</span>
							<strong>{{transactionDataShow.tradeDataModelToday.tradeCardNum}}<strong>
						</td>
						<td>
							<span>单笔平均交易金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelToday.averageTradeAmount}}</strong>
						</td>
						<td>
							<span>单笔平均补贴金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelToday.averageSubsiyAmount}}</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>累计关键数据</span>
				<table>
					<tr>
						<td>
							<span>交易总金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelTotail.tradeAmount}}<strong>
						</td>
						<td>
							<span>补贴总金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelTotail.subsidyAmount}}<strong>
						</td>
						<td>
							<span>交易总笔数(笔)</span>
							<strong>{{transactionDataShow.tradeDataModelTotail.tradeNum}}<strong>
						</td>
						<td>
							<span>参与活动卡数量(个)</span>
							<strong>{{transactionDataShow.tradeDataModelTotail.tradeCardNum}}<strong>
						</td>
						<td>
							<span>单笔平均交易金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelTotail.averageTradeAmount}}</strong>
						</td>
						<td>
							<span>单笔平均补贴金额(元)</span>
							<strong>{{transactionDataShow.tradeDataModelTotail.averageSubsdyAmount}}</strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>7日/30日交易总金额数据详解对比图</span>
				<div class="data-echart" id="trade-area-week"></div>
				<div class="data-echart" id="trade-area-month"></div>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>7日/30日补贴总金额数据详解对比图</span>·
				<div class="data-echart" id="subsidy-area-week"></div>
				<div class="data-echart" id="subsidy-area-month"></div>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>7日/30日交易总笔数数据详解对比图</span>
				<div class="data-echart" id="number-area-week"></div>
				<div class="data-echart" id="number-area-month"></div>
			</div>
		</div>
		<div class="information-area">
			<div class="title">交易区域分析</div>
			<div class="data-table">
				<span class="data-title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>产生交易区域（个）</span>
							<strong>{{transactionRegion.tradeAreaModel.tradeAreaNum}}<strong>
						</td>
						<td>
							<span>区域平均交易笔数(笔)</span>
							<strong>{{transactionRegion.tradeAreaModel.averageTradeNum}}<strong>
						</td>
						<td>
							<span>最高交易区域</span>
							<strong>{{transactionRegion.tradeAreaModel.maxTradeArea}}<strong>
						</td>
						<td>
							<span>最高交易区域交易笔数(笔)</span>
							<strong>{{transactionRegion.tradeAreaModel.maxTradeAreaTradeNum}}<strong>
						</td>
					 	<td>
							<span>最高交易区域交易额（元）</span>
							<strong>{{transactionRegion.tradeAreaModel.maxTradeAreaTradeAmount}}<strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>交易区域交易金额排行</span>
				<div class="data-echart region-echart" id="region-echart-amount"></div>
				<span class="data-title"><i></i>交易区域交易笔数排行</span>
				<div class="data-echart region-echart" id="region-echart-num"></div>
			</div>
		</div>
		<div class="information-area">
			<div class="title">交易时段分析</div>
			<div class="data-table">
				<div class="data-echart time-echart" id="time-echart"></div>
			</div>
		</div>
		<div class="information-area">
			<div class="title">商户数据分析</div>
			<div class="data-table">
				<span class="data-title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>参与门店数（个）</span>
							<strong>{{merchantDataArea.merchantDataTotal.storeNumbers}}<strong>
						</td>
						<td>
							<span>产生交易门店数(个)</span>
							<strong>{{merchantDataArea.merchantDataTotal.generateTradeStorNumbers}}</strong>
						</td>
						<td>
							<span>店均交易笔数(个)</span>
							<strong>{{merchantDataArea.merchantDataTotal.averageTradeNumbers}}<strong>
						</td>
						<td>
							<span>店均补贴金额(元)</span>
							<strong>{{merchantDataArea.merchantDataTotal.averageSubsidyAmount}}<strong>
						</td>
						<td>
							<span>店均交易金额（元）</span>
							<strong>{{merchantDataArea.merchantDataTotal.averageTradeAmount}}<strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>商户刷卡金额排行</span>
				<div class="data-echart merchant-echart" id="merchant-echart-amount"></div>
				<span class="data-title"><i></i>商户刷卡笔数排行</span>
				<div class="data-echart merchant-echart" id="merchant-echart-num"></div>
			</div>
		</div>
		<div class="information-area">
			<div class="title">卡BIN数据分析</span></div>
			<div class="data-table">
				<span class="data-title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>卡BIN个数（个）</span>
							<strong>{{cardBINDataArea.CardBinModel.cardBinNum}}</strong>
						</td>
						<td>
							<span>卡BIN平均交易笔数(个)</span>
							<strong>{{cardBINDataArea.CardBinModel.averageTradeNum}}<strong>
						</td>
						<td>
							<span>卡BIN平均交易金额（元）</span>
							<strong>{{cardBINDataArea.CardBinModel.averageTradeAmount}}<strong>
						</td>
						<td>
							<span>卡BIN平均补贴金额(元)</span>
							<strong>{{cardBINDataArea.CardBinModel.averageSubsidyAmount}}<strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>卡BIN刷卡金额排行</span>
				<div class="data-echart cardBIN-echart" id="cardBIN-echart-amount"></div>
				<span class="data-title"><i></i>卡BIN刷卡笔数排行</span>
				<div class="data-echart cardBIN-echart" id="cardBIN-echart-num"></div>
			</div>
		</div>
		<div class="information-area">
			<div class="title">单卡交易分析</div>
			<div class="data-table">
				<span class="data-title"><i></i>关键数据</span>
				<table>
					<tr>
						<td>
							<span>参与卡数量（个）</span>
							<strong>{{oneCardArea.oneCardModel.cardNumbers}}</strong>
						</td>
						<td>
							<span>卡均参与次数(次)</span>
							<strong>{{oneCardArea.oneCardModel.averageCardNumbers}}</stron>
						</td>
						<td>
							<span>单卡最高参与次数（次）</span>
							<strong>{{oneCardArea.oneCardModel.maxSwipedCardNumbers}}<strong>
						</td>
					</tr>
				</table>
			</div>
			<div class="data-table">
				<span class="data-title"><i></i>单卡参与次数（次）</span>
				<div class="data-echart one-echart" id="one-echart-times"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
    import model from '../../ajax/activity/activity-analysis'
	export default{
		data(){
			this.model=model(this)
			return{
				origin:window.origin,
				base64:{
					trade_all_amount_7:'',//交易总金额7日
					trade_all_amount_30:'',//交易总金额30日
					subsidy_all_amount_7:'',//补贴总金额7日
					subsidy_all_amount_30:'',//补贴总金额30日
					trade_all_num_7:'',//交易总笔数7日
					trade_all_num_30:'',//交易总笔数30日
					trade_area_amount:'',//交易区域交易金额
					trade_area_num:'',//交易区域交易笔数
					trade_time:'',//交易时段
					merchant_trade_amount:'',//商户交易金额
					merchant_trade_num:'',//商户交易笔数
					cardBIN_trade_amount:'',//卡bin交易金额
					cardBIN_trade_num:'',//卡bin交易笔数
					oneCard_num:'',//单卡参与次数
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
				times:{//时间初始化数据
					todayDate:'',
					lastWeek:'',
					monthAgo:''
				},
				tradeSearchData:{
					xAxisData:[],
					weekThis:[],
					weekLast:[],
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
				tradeDataEchart:{
					echartDivID:'data-echart-weekmonth',
					now:'当前数据(元)',
					contrast:'对比数据(元)',
				},
				echartID:{
					tradeAmount_7:'trade-area-week',
					tradeAmount_30:'trade-area-month',
					subsidyAmoun_7:'subsidy-area-week',
					subsidyAmoun_30:'subsidy-area-month',
					tradeNum_7:'number-area-week',
					tradeNum_30:'number-area-month',
				},
				activityInfo:0,
				basicData:{
					name:'',
					budget:'',
					startTime:'',
					endTime:'',
					subject:'',
					detail:'',
					posPrint:'',
					timesList:[]
				},
				id:{
					activityID:'',
					bankUuidString:'',
					pdfMap:{
						activityBaseInfo:{
							'activityBaseInfo':[{'id':'','uri':''}],
						},
						tradeAreaAnalysis:{
							'keyData':[{'uri':''}],
							'tradeAmountTop':[{'base64IMG':'','uri':''}],
							'tradeNumTop':[{'base64IMG':'','uri':''}],
						},
						tradePeriodAnalysis:{
							'tradeNum':[{'base64IMG':'','uri':''}],
						},
						merchantDataAnalysis:{
							'keyData':[{'uri':''}],
							'amountTop':[{'base64IMG':'','uri':''}],
							'numTop':[{'base64IMG':'','uri':''}],
						},
						cardBINDataAnalysis:{
							'keyData':[{'uri':''}],
							'amountTop':[{'base64IMG':'','uri':''}],
							'numTop':[{'base64IMG':'','uri':''}],
						},
						oneCardTradeAnalysis:{
							'keyData':[{'uri':''}],
							'participateNum':[{'base64IMG':'','uri':''}],
						},
						tradeDataAnalysis:{
							'today':[{'startDate':'','endDate':'','uri':''}],
							'total':[{'startDate':'','endDate':'','uri':''}],
							'tradeAmount_7':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'tradeAmount_30':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'subsidyAmount_7':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'subsidyAmount_30':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'tradeNum_7':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'tradeNum_30':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
						},
					},
				}
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
			dataLineEchart(divID,title,xData,parentDataName,parentData,passDataName,passData,type){
				var myChart=echarts.init(document.getElementById(divID));
				var option = {
				    title: {text: title},//表名称
				    tooltip: {trigger: 'axis'},
				    legend: {data:['当前数据(元)','对比数据(元)']},
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: xData,
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:parentDataName,
				            type:'line',
				            data:parentData,
				            itemStyle:{normal:{color:'#e75035'}},
				        },
				        {
				            name:passDataName,
				            type:'line',
				            data:passData,
				            itemStyle:{normal:{color:'#429eeb'}},
				        }
				    ]
				};
        		myChart.setOption(option);
        		this.base64[type] = myChart.getDataURL('png');//获取base64编码
			},
			justChart(timePoint){
				var myChart = echarts.init(document.getElementById('time-echart'));
				var option = {
				    tooltip: {trigger: 'axis'},
				    toolbox: {show: true},
				    legend: {data:['交易笔数(笔)']},
				    xAxis:  {type: 'category',boundaryGap: false,data:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
				        name:['时间段']
				    },
				    yAxis: {
				    	type: 'value',
				        name:['交易笔数(笔)'],
					},
				    series: [{
				            name:'交易笔数(笔)',
				            type:'line',
				            data:timePoint,
				            itemStyle:{normal:{color:'#429eeb'}}
				        }]
				}
				myChart.setOption(option);
				this.base64.trade_time=myChart.getDataURL('png');//获取base64编码
				this.id.pdfMap.tradePeriodAnalysis.tradeNum[0].base64IMG=myChart.getDataURL('png');
			},
			dataBarEchart(chartID,dataTitle,yAxisTitle,cityName,dataName,cityData,type){
				var myChart = echarts.init(document.getElementById(chartID));
				var option ={
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {type: 'shadow'}
				    },
				    legend: {data:dataTitle},
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        top:'33px',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				    },
				    yAxis: {
				        type: 'category',
				        axisTick : {show: false},
				        data: cityName,
				        name:yAxisTitle,
				    },
				    series: [
				        {
				            name: dataName,
				            type: 'bar',
				            barWidth:'23px',
				            data: cityData,
				            sort: 'descending',
				            itemStyle:{
				            	normal:{
				            		color:'#429eeb'
				            		// color:function (params) {
				            		// 	var colorList = ['#429eeb','#a91f8c','#5a2d8c','#045aad','#0173ba','#00a9ae','#22af47','#a1cd38','#fdd503','#f7b717'];
                  //       				return colorList[params.dataIndex]
				            		// }
				            		}//单色color后直接加rgb色号
				            },
				            label:{
				                normal:{
				                    show: true,
				                    position: 'right',
                    				offset:[0,-3],
                    				textStyle:{
                    					color:'#429eeb'
                    				}
				                }
				            },
				        }
				    ]
				}
				myChart.setOption(option);
				this.base64[type]= myChart.getDataURL('png');//获取base64编码
			},
			// =================================================================================================
			//交易数据分析
			tradeAnalysis(){
				this.tradeDataModelToday();
				this.tradeDataModelTotail();
				this.tradeAmountEchart_week();
				this.tradeAmountEchart_month();
				this.subsidyAmountEchart_week();
				this.subsidyAmountEchart_month();
				this.tradeNumEchart_week();
				this.tradeNumEchart_month();
			},
			tradeSetData(data,ID,title,type){
				this.$set('transactionDataShow.XData',data.category);
				this.$set('transactionDataShow.PData',data.series[0].dataDecimal);
				this.$set('transactionDataShow.Ldata',data.series[1].dataDecimal);
         		this.dataLineEchart(
         			ID,
         			title,
					this.transactionDataShow.XData,
					this.tradeDataEchart.now,this.transactionDataShow.PData,
					this.tradeDataEchart.contrast,this.transactionDataShow.Ldata,type
				)
			},
			tradeDataModelToday(){//获取今日关键数据
				let data={
					startDate:this.times.todayDate,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
					
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeDataTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionDataShow.tradeDataModelToday',res.data.data);
        			}
        		})
			},
			tradeDataModelTotail(){//获取累计交易数据
				let data={
					compareFlag:true,
					activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeDataTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionDataShow.tradeDataModelTotail',res.data.data);
        			}
        		})
			},
			tradeAmountEchart_week(){
				let data_7={
					compareFlag:true,
					startDate:this.times.lastWeek,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
				};
                (!this.id.activityID)? data_7.bankUuidString=sessionStorage.getItem('uuids'):data_7.bankUuidString='';
				this.model.getTradeAmount(data_7).then((res)=>{
	        		if (res.data.code==0){
	        			this.trade_a_week=res.data.data;
	        		};
						this.tradeSetData(res.data.data,this.echartID.tradeAmount_7,'7日交易总金额数据展示图','trade_all_amount_7');
	        	});
						// this.tradeSetData(this.trade_a_week,this.echartID.tradeAmount_7,'7日交易总金额数据展示图','trade_all_amount_7');
			},
			tradeAmountEchart_month(){
				let data_30={
					compareFlag:true,
					startDate:this.times.monthAgo,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
				};
                (!this.id.activityID)? data_30.bankUuidString=sessionStorage.getItem('uuids'):data_30.bankUuidString='';
				this.model.getTradeAmount(data_30).then((res)=>{
	        		if (res.data.code==0){
	        			this.trade_a_month=res.data.dat;
	        			};
							this.tradeSetData(res.data.data,this.echartID.tradeAmount_30,'30日交易总金额数据展示图','trade_all_amount_30');
	        		});
							// this.tradeSetData(this.trade_a_month,this.echartID.tradeAmount_30,'30日交易总金额数据展示图','trade_all_amount_30');

			},
			subsidyAmountEchart_week(){
				let data_7={
					compareFlag:true,
					startDate:this.times.lastWeek,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
				};
                (!this.id.activityID)? data_7.bankUuidString=sessionStorage.getItem('uuids'):data_7.bankUuidString='';
				this.model.getSubsidyAmount(data_7).then((res)=>{
	        		if (res.data.code==0){
	        			this.subsidy_a_week=res.data.data;
	        			};
							this.tradeSetData(res.data.data,this.echartID.subsidyAmoun_7,'7日补贴总金额数据展示图','subsidy_all_amount_7');
	        		});
							// this.tradeSetData(this.subsidy_a_week,this.echartID.subsidyAmoun_7,'7日补贴总金额数据展示图','subsidy_all_amount_7');
			},
			subsidyAmountEchart_month(){
				let data_30={
					compareFlag:true,
					startDate:this.times.monthAgo,
					endDate:this.times.todayDate,
					activityID:this.id.activityID,
				};
                (!this.id.activityID)? data_30.bankUuidString=sessionStorage.getItem('uuids'):data_30.bankUuidString='';
				this.model.getSubsidyAmount(data_30).then((res)=>{
	        		if (res.data.code==0){
	        			this.subsidy_a_month=res.data.data;
	        			};
							this.tradeSetData(res.data.data,this.echartID.subsidyAmoun_30,'30日补贴总金额数据展示图','subsidy_all_amount_30');
	        		});
							// this.tradeSetData(this.subsidy_a_month,this.echartID.subsidyAmoun_30,'30日补贴总金额数据展示图','subsidy_all_amount_30');
			},
			tradeNumEchart_week(){
				let data_7={
					compareFlag:true,
					startDate:this.times.lastWeek,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
				};
                (!this.id.activityID)? data_7.bankUuidString=sessionStorage.getItem('uuids'):data_7.bankUuidString='';
				this.model.getTradeAmount(data_7).then((res)=>{
	        		if (res.data.code==0){
	        			this.trade_n_week=res.data.data;
	        			};
							this.tradeSetData(res.data.data,this.echartID.tradeNum_7,'7日交易总笔数数据展示图','trade_all_num_7');
	        		});
							// this.tradeSetData(this.trade_n_week,this.echartID.tradeNum_7,'7日交易总笔数数据展示图','trade_all_num_7');
			},
			tradeNumEchart_month(){
				let data_30={
					compareFlag:true,
					startDate:this.times.monthAgo,
					endDate:this.times.todayDate,
					activityID:this.id.activityID,
				};
                (!this.id.activityID)? data_30.bankUuidString=sessionStorage.getItem('uuids'):data_30.bankUuidString='';
				this.model.getTradeAmount(data_30).then((res)=>{
	        		if (res.data.code==0){
	        			this.trade_n_month=res.data.data
	        			};
							this.tradeSetData(res.data.data,this.echartID.tradeNum_30,'30日交易总笔数数据展示图','trade_all_num_30');
	        		});
							// this.tradeSetData(this.trade_n_month,this.echartID.tradeNum_30,'30日交易总笔数数据展示图','trade_all_num_30');
			},
			// =================================================================================================
        	//交易区域 sucess
        	regionDetail(){
        		this.regionDetailReady();
        		this.regionDetailAmount();
        		this.regionDetailNumber();
        	},
        	regionDetailReady(){//交易区域数据获取
        		let data={
        			activityID:this.id.activityID
        		};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeAreaTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionRegion.tradeAreaModel',res.data.data);
        			}
        		});
        	},
        	regionDetailAmount(){//交易区域交易金额切换
        		this.regionDetailJudgeChoose='amount';
        		let data={
        			activityID:this.id.activityID
        		};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeAreaTotalAmountList(data).then((res)=>{
        			if (res.data.code==0){
						this.transactionRegion.tradeArea=res.data.data.category;
						this.transactionRegion.cityData=res.data.data.series[0].dataDecimal;
        			}
        		})
						this.dataBarEchart('region-echart-amount',['交易金额(元)'],['区域名称'],this.transactionRegion.tradeArea,'交易金额(元)',this.transactionRegion.cityData,'trade_area_amount');

        	},
			regionDetailNumber(){//交易区域交易笔数切换
				this.regionDetailJudgeChoose='num';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getTradeAreaNumList(data).then((res)=>{
        			if (res.data.code==0){
						this.transactionRegion.tradeArea=res.data.data.category;
						this.transactionRegion.cityData=res.data.data.series[0].dataLong;
        			}
        		})
						this.dataBarEchart('region-echart-num',['交易笔数(笔)'],['区域名称'],this.transactionRegion.tradeArea,'交易笔数(笔)',this.transactionRegion.cityData,'trade_area_num');
			},
			// =================================================================================================
			//交易时段分析 sucess
			transactionTimeReady(){//交易时段加载数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getTradePeriodTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('transactionTime.timePoint',res.data.data.series);
						this.justChart(this.transactionTime.timePoint);
        			}
				})
			},
			// =================================================================================================
			//商户数据分析
			merchantData(){
				this.merchantDataAreaReady();
				this.merchantDataTradeAmountChange();
				this.merchantDataTradeCountChange();
			},
			merchantDataAreaReady(){//商户关键数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getMerchantTradeTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('merchantDataArea.merchantDataTotal',res.data.data);
					}
				})
			},
			merchantDataTradeAmountChange(){//商户数据交易金额
				this.merchantDataDetailJudgeName='amount';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getMerchantTradeAmount(data).then((res)=>{
					if (res.data.code==0){
						// debugger;
						this.merchantDataArea.storeName=res.data.data.series[0].storeAndMerchantName;//商户数据名称
						this.merchantDataArea.tradeAmount=res.data.data.series[0].dataDecimal;//商户数据刷卡金额
					}
				})
						this.dataBarEchart('merchant-echart-amount',['刷卡金额(元)'],['门店名称，所属商户'],this.merchantDataArea.storeName,'刷卡金额(元)',this.merchantDataArea.tradeAmount,'merchant_trade_amount');
			},
			merchantDataTradeCountChange(){//商户数据交易笔数
				this.merchantDataDetailJudgeName='num';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';

				this.model.getMerchantTradeCount(data).then((res)=>{
					if (res.data.code==0){
						this.merchantDataArea.storeName=res.data.data.series[0].storeAndMerchantName;//商户数据名称
						this.merchantDataArea.tradeCount=res.data.data.series[0].dataLong;//商户数据刷卡笔数
					}
				})
						this.dataBarEchart('merchant-echart-num',['刷卡笔数(笔)'],['门店名称，所属商户'],this.merchantDataArea.storeName,'刷卡笔数(笔)',this.merchantDataArea.tradeCount,'merchant_trade_num');
			},
			// =================================================================================================
			//卡BIN数据分析 success
			cardBINData(){
				this.cardBINDataAreaReady();
				this.cardBINDetailAmount();
				this.cardBINDetailNumber();
			},
			cardBINDataAreaReady(){//卡BIN数据分析获取数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('cardBINDataArea.CardBinModel',res.data.data);
        			}
				})
			},
			cardBINDetailAmount(){//卡BIN交易金额chenge
				this.cardBINDetailJudgeChoose='amount';
				let data={
        			activityID:this.id.activityID

				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTradeAmountList(data).then((res)=>{
					if (res.data.code==0) {
						this.cardBINDataArea.binStartNumber=res.data.data.category;
						this.cardBINDataArea.tradeAmountCardBINChange=res.data.data.series[0].dataDecimal;
					}
				});
						this.dataBarEchart('cardBIN-echart-amount',['卡BIN刷卡金额(元)'],['卡BIN'],this.cardBINDataArea.binStartNumber,'卡BIN刷卡金额(元)',this.cardBINDataArea.tradeAmountCardBINChange,'cardBIN_trade_amount');
			},
			cardBINDetailNumber(){//卡BIN交易笔数change
				this.cardBINDetailJudgeChoose='num';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTradeNumList(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('cardBINDataArea.binStartNumber',res.data.data.category)
						this.$set('cardBINDataArea.tradeNumCardBINChange',res.data.data.series[0].dataLong)
					}
				});
						this.dataBarEchart('cardBIN-echart-num',['卡BIN刷卡笔数(笔)'],['卡BIN'],this.cardBINDataArea.binStartNumber,'卡BIN刷卡笔数(笔)',this.cardBINDataArea.tradeNumCardBINChange,'cardBIN_trade_num');
				//cardBIN-echart
			},
			// =================================================================================================
			oneCard(){
				this.oneCardDataReady();
				this.oneCardDataOnceData();
			},
			oneCardDataReady(){//单卡获取total
				let data={
        			activityID:this.id.activityID
				};
				(!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getOneCardTotal(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('oneCardArea.oneCardModel',res.data.data);
					}
				});
			},
			oneCardDataOnceData(){//获取单卡参与次数数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getOneCardSwipedCount(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('oneCardArea.oneCardNum',res.data.data.series[0].dataLong);//x轴
						this.$set('oneCardArea.oneCardChance',res.data.data.series[0].data);//y轴
					}
				})
						this.dataBarEchart('one-echart-times',['卡数量(张)'],['次数(次)'],this.oneCardArea.oneCardChance,'卡数量(张)',this.oneCardArea.oneCardNum,'oneCard_num');
			},
			outPDF(){
				this.upID();
				let formdata = {};
	            _.map(this.id,(val,key)=>{
	            	formdata[key]=val;
	            })
	            // console.log(formdata);
	            this.$http.post(origin+'/pdf/analysis',formdata).then((res)=>{
	            		// console.log(res);
	            })
				// window.open(+formdata)
			},
			upID(){
				//activityBaseInfo
				this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].uri= this.$API.getinfoList + this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id;
				//tradeDataAnalysis
				(!this.id.activityID)?this.id.bankUuidString=sessionStorage.getItem('uuids'):null;
				var dataAnalysis=this.id.pdfMap.tradeDataAnalysis;
				dataAnalysis.today[0].startDate=this.times.todayDate;
				dataAnalysis.today[0].endDate=this.times.todayDate;
				dataAnalysis.today[0].uri=this.$API.getTradeDataTotal;
				dataAnalysis.total[0].uri=this.$API.getTradeDataTotal;
				dataAnalysis.tradeAmount_7[0].startDate=this.times.lastWeek;
				dataAnalysis.tradeAmount_7[0].endDate=this.times.todayDate;
				dataAnalysis.tradeAmount_7[0].base64IMG=this.base64.trade_all_amount_7;
				dataAnalysis.tradeAmount_7[0].uri=this.$API.getTradeAmount;
				dataAnalysis.tradeAmount_30[0].startDate=this.times.monthAgo;
				dataAnalysis.tradeAmount_30[0].endDate=this.times.todayDate;
				dataAnalysis.tradeAmount_30[0].base64IMG=this.base64.trade_all_amount_30;
				dataAnalysis.tradeAmount_30[0].uri=this.$API.getTradeAmount;
				dataAnalysis.subsidyAmount_7[0].startDate=this.times.lastWeek;
				dataAnalysis.subsidyAmount_7[0].endDate=this.times.todayDate;
				dataAnalysis.subsidyAmount_7[0].base64IMG=this.base64.subsidy_all_amount_7;
				dataAnalysis.subsidyAmount_7[0].uri=this.$API.getSubsidyAmount;
				dataAnalysis.subsidyAmount_30[0].startDate=this.times.monthAgo;
				dataAnalysis.subsidyAmount_30[0].endDate=this.times.todayDate;
				dataAnalysis.subsidyAmount_30[0].base64IMG=this.base64.subsidy_all_amount_30;
				dataAnalysis.subsidyAmount_30[0].uri=this.$API.getSubsidyAmount;
				dataAnalysis.tradeNum_7[0].startDate=this.times.lastWeek;
				dataAnalysis.tradeNum_7[0].endDate=this.times.todayDate;
				dataAnalysis.tradeNum_7[0].base64IMG=this.base64.trade_all_num_7;
				dataAnalysis.tradeNum_7[0].uri=this.$API.getTradeNum;
				dataAnalysis.tradeNum_30[0].startDate=this.times.monthAgo;
				dataAnalysis.tradeNum_30[0].endDate=this.times.todayDate;
				dataAnalysis.tradeNum_30[0].base64IMG=this.base64.trade_all_num_30;
				dataAnalysis.tradeNum_30[0].uri=this.$API.getTradeNum;
				// //tradeAreaAnalysis
				var areaAnalysis=this.id.pdfMap.tradeAreaAnalysis;
				areaAnalysis.keyData[0].uri=this.$API.getTradeAreaTotal;
				areaAnalysis.tradeAmountTop[0].base64IMG=this.base64.trade_area_amount;
				areaAnalysis.tradeAmountTop[0].uri=this.$API.getTradeAreaTotalAmountList;
				areaAnalysis.tradeNumTop[0].base64IMG=this.base64.trade_area_num;
				areaAnalysis.tradeNumTop[0].uri=this.$API.getTradeAreaNumList;
				// //tradePeriodAnalysis
				this.id.pdfMap.tradePeriodAnalysis.tradeNum[0].base64IMG=this.base64.trade_time;
				this.id.pdfMap.tradePeriodAnalysis.tradeNum[0].uri=this.$API.getTradeAreaNumList;
				// //merchantDataAnalysis
				var merchant=this.id.pdfMap.merchantDataAnalysis;
				merchant.keyData[0].uri=this.$API.getMerchantTradeTotal;
				merchant.amountTop[0].base64IMG=this.base64.merchant_trade_amount;
				merchant.amountTop[0].uri=this.$API.getMerchantTradeAmount;
				merchant.numTop[0].base64IMG=this.base64.merchant_trade_num;
				merchant.numTop[0].uri=this.$API.getMerchantTradeCount;
				// //cardBINDataAnalysis
				var cardBIN=this.id.pdfMap.cardBINDataAnalysis;
				cardBIN.keyData[0].uri=this.$API.getCardBINTotal;
				cardBIN.amountTop[0].base64IMG=this.base64.cardBIN_trade_amount;
				cardBIN.amountTop[0].uri=this.$API.getCardBINTradeAmountList;
				cardBIN.numTop[0].base64IMG=this.base64.cardBIN_trade_num;
				cardBIN.numTop[0].uri=this.$API.getCardBINTradeNumList;
				// //oneCardTradeAnalysis
				var oneCard=this.id.pdfMap.oneCardTradeAnalysis;
				oneCard.keyData[0].uri=this.$API.getOneCardTotal;
				oneCard.participateNum[0].base64IMG=this.base64.oneCard_num;
				oneCard.participateNum[0].uri=this.$API.getOneCardSwipedCount;
			},
		},
		ready(){
            this.tradeAnalysis();
            this.regionDetail();
            this.transactionTimeReady();
            this.merchantData();
            this.cardBINData();
            this.oneCard();
            console.log(this.id.pdfMap.tradeDataAnalysis.today.length)
		},
		beforeDestroy () {
            document.removeEventListener('click', this.resetName, false);
        },
        created(){
			this.dateGetShow();
			(this.$route.params.pdfActivityId!=':pdfActivityId')? this.id.activityID=this.$route.params.pdfActivityId : this.id.activityID='';
			(this.$route.params.pdfoutId!=':pdfoutId')? this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id=this.$route.params.pdfoutId : this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id='';
			if(!!this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id){
				this.model.getinfoList(this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id).then((res)=>{
					if(res.data.code===0){
						this.$set('basicData',res.data.data.base);
		            }
	            })
			}        
		}
	}
</script>