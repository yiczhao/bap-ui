<template>
	<div class="activity-pdfout" id="pdf-area">
		<div class="pdf-title">
			<span class="p-title">活动分析报告</span>
			<span class="out-pdf"><a :href="origin+'/pdf/analysis'">导出PDF报告</a></span>
		</div>
		<span></span>
		<div class="information-area basic-information">
			<div class="title">活动基本信息</div>
			<div class="something-about">
				<table>
					<tr>
						<td>活动名称:</td>
						<td>美食美刻随机1~5折</td>
						<td>活动预算:</td>
						<td>500000</td>
					</tr>
					<tr>
						<td>活动时间: </td>
						<td>2016-01-01 00:00 ~ 2016-06-30 00：00</td>
						<td>所属银行: </td>
						<td>江西建行</td>
					</tr>
					<tr>
						<td>参与时间段:</td>
						<td colspan="3">每天参与时间段【 10：00~ 20：00 】</td>
					</tr>
					<tr>
						<td>活动主题：</td>
						<td colspan="3">1.线上抢权益，线下刷卡消费随机产生折扣；
							2.线下刷卡消费随机产生折扣；
							3.线上抢权益随机产生折扣信息，线下刷卡直接消费（加限制条件，有当前权益使用完才能进行下一次权益的抢夺，防止用户多次抢夺产最低折扣）。
						</td>
					</tr>
					<tr>
						<td>活动细则：</td>
						<td colspan="3">1.本活动“线上参与＋线下优惠”使用；
							2.用户可通过浦发银行各营业厅和活动商户进行扫二维码或摇一摇关注浦发银行信用卡上海”并参加“浦发爱优惠”；
							3. “浦发爱优惠”每天11:00准时发放优惠权益，先抢先得，抢完为止抢到权益后在线下刷卡可获随机1-7折的超值优惠；
							4.活动期间每卡每天限享受一次优惠权益，优惠不找零不兑现，不与内其他优惠同时享受；
							5.浦发银行信用卡中心享有本次活动的最终解释权
						</td>
					</tr>
					<tr>
						<td>POS小票内容设置</td>
						<td colspan="3">江西银行美食美刻随机1~5折优惠</td>
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
				<span class="data-title"><i></i>交易区域关键数据排行</span>
				<div class="region-echart" id=""></div>
				<div class="region-echart" id=""></div>
			</div>
		</div>
		<div class="information-area">
			<div class="data-table">
				<span class="data-title">交易时段分析</span>
			</div>
			<span v-show="upDownToggle.transactionTimeShowArea">
				<div class="time-show">
					<div class="time-echart" id=""></div>
				</div>
			</span>
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
				<span class="data-title"><i></i>商户关键数据排行</span>
				<div class="merchant-echart" id=""></div>
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
				<span class="data-title"><i></i>卡BIN关键数据排行</span>
				<div class="cardBIN-echart" id=""></div>
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
				<div class="one-echart" id=""></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
    import model from '../../ajax/activity/activity-analysis'
	export default{
		data(){
			return{
				origin:window.origin
			}
		},
		methods:{
			//折线统计图
			dataLineEchart(divID,title,xData,parentDataName,parentData,passDataName,passData){
				var myChart=echarts.init(document.getElementById(divID));
				var option = {
				    title: {
				        text: title
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['当前数据(元)','对比数据(元)']
				    },
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
			//时间统计图
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
			//横向柱状图
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
				            barGap:1,//柱子的大小设置
				            data: cityData,
				            sort: 'descending',
				            itemStyle:{
				            	normal:{color:'#5F9EA0'}
				            },
				            barWidth:10,
				        }
				    ]
				}
				myChart.setOption(option);
				console.log('barEchart');
			},
			//===============================================================================

		},
		ready(){

		},
		beforeDestroy(){

		},
		created(){

		}
	}
</script>