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
				<span :class="{'active':mainStep==1}" @click="changeStep(['getTradeDataTotal','getTradeAmount'],1)">交易数据分析</span>
				<span :class="{'active':mainStep==2}" @click="changeStep(['getTradeAreaTotal','getTradeAreaTotalAmountList'],2)">交易区域分析</span>
				<span :class="{'active':mainStep==3}" @click="changeStep(['getTradePeriodTotal'],3)">交易时段分析</span>
				<span :class="{'active':mainStep==4}" @click="changeStep(['getMerchantTradeTotal','getMerchantTradeAmount'],4)">商户数据分析</span>
				<span :class="{'active':mainStep==5}" @click="changeStep(['getCardBINTotal','getCardBINTradeAmountList'],5)">卡BIN数据分析</span>
				<span :class="{'active':mainStep==6}" @click="changeStep(['getOneCardTotal','getOneCardSwipedCount'],6)">单卡交易分析</span>
			</div>
			<div class="data-labels" v-if="mainStep!=3&&!!totalData">
				<div class="labels-title">
					<span v-if="mainStep==1" class="btn active">今日关键数据</span>
					<span v-if="mainStep==1" class="btn">累计关键数据</span>
					<span v-else class="btn active">关键数据</span>
				</div>
				<div v-if="mainStep==1" class="labels-lists">
					<div>
						<p>{{totalData.tradeAmount}}</p>
						<p>交易总金额（元）</p>
					</div><div>
						<p>{{totalData.subsidyAmount}}</p>
						<p>补贴总金额（元）</p>
					</div><div>
						<p>{{totalData.tradeNum}}</p>
						<p>交易总笔数（笔）</p>
					</div><div>
						<p>{{totalData.tradeCardNum}}</p>
						<p>参与活动卡数量（个）</p>
					</div><div>
						<p>{{totalData.averageTradeAmount}}</p>
						<p>单笔平均交易金额（元）</p>
					</div><div>
						<p>{{totalData.averageSubsidyAmount}}</p>
						<p>单笔平均补贴金额（元）</p>
					</div>
				</div>
				<div v-if="mainStep==2" class="labels-lists">
					<div>
						<p>{{totalData.tradeAreaNum}}</p>
						<p>产生交易区域（个）</p>
					</div><div>
						<p>{{totalData.averageTradeNum}}</p>
						<p>区域平均交易笔数(笔)</p>
					</div><div>
						<p>{{totalData.maxTradeArea}}</p>
						<p>最高交易区域</p>
					</div><div>
						<p>{{totalData.maxTradeAreaTradeNum}}</p>
						<p>最高交易区域交易笔数(笔)</p>
					</div><div>
						<p>{{totalData.maxTradeAreaTradeAmount}}</p>
						<p>最高交易区域交易额（元）</p>
					</div>
				</div>
				<div v-if="mainStep==4" class="labels-lists">
					<div>
						<p>{{totalData.storeNumbers}}</p>
						<p>参与门店数（个）</p>
					</div><div>
						<p>{{totalData.generateTradeStoreNumbers}}</p>
						<p>产生交易门店数(个)</p>
					</div><div>
						<p>{{totalData.averageTradeNumbers}}</p>
						<p>店均交易笔数(个)</p>
					</div><div>
						<p>{{totalData.averageSubsidyAmount}}</p>
						<p>店均补贴金额(元)</p>
					</div><div>
						<p>{{totalData.averageTradeAmount}}</p>
						<p>店均交易金额（元）</p>
					</div>
				</div>
				<div v-if="mainStep==5" class="labels-lists">
					<div>
						<p>{{totalData.cardBinNum}}</p>
						<p>卡BIN个数（个）</p>
					</div><div>
						<p>{{totalData.averageTradeNum}}</p>
						<p>卡BIN平均交易笔数(个)</p>
					</div><div>
						<p>{{totalData.averageTradeAmount}}</p>
						<p>卡BIN平均交易金额（元）</p>
					</div><div>
						<p>{{totalData.averageSubsidyAmount}}</p>
						<p>卡BIN平均补贴金额(元)</p>
					</div>
				</div>
				<div v-if="mainStep==6" class="labels-lists">
					<div>
						<p>{{totalData.cardNumbers}}</p>
						<p>参与卡数量（个）</p>
					</div><div>
						<p>{{totalData.averageCardNumbers}}</p>
						<p>卡均参与次数(次)</p>
					</div><div>
						<p>{{totalData.maxSwipedCardNumbers}}</p>
						<p>单卡最高参与次数（次）</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<template v-if="mainStep==1">
					<h3>7日/30日关键数据详解</h3>
					<div class="table-btns">
						<span class="btn active">交易总金额</span>
						<span class="btn">补贴总金额</span>
						<span class="btn">交易总笔数</span>
						<div>
							<span class="active">7日</span>
							<span>|</span>
							<span>30日</span>
							<span :class="{'active':compareFlag}" @click="compareFlagChange">按时间对比</span>
						</div>
					</div>
				</template>
				<div v-el:table-init  class="table-init">
					<div v-show="tableShow">未查询到数据</div>
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
				mainStep:3,
				tableShow:true,
				compareFlag:true,
				times:{//时间初始化数据
					todayDate:getDates().today,
					lastWeek:getDates().aweekAgo,
					monthAgo:getDates().amonthAgo
				},
				uuids:sessionStorage.getItem('loginList').bankUUID,
				searchData:{
					activityID:'',
					activityName:'',
				},
				tableText:'交易金额（元）',
				totalData:''
			}
		},
		methods:{
			initTable(xData,yData,ydata2){
				if(_.isEmpty(xData)||_.isEmpty(yData)){
					this.tableShow=true;
					return;
				}
				this.tableShow=false;
				let axisData = xData;
				let data = yData;
				let data2 = ydata2;
				let option = {
					width:'95%',
					title: {text: this.tableText, textStyle:{color:'#666', fontSize:12}, right:35, top:15},
					tooltip:{},
					grid:{x:40},
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
			},
			getName(steps,data){
				switch (steps){
					case 1:
						this.tableText='交易金额（元）'
						this.initTable(data.category,data.series[0].dataDecimal,data.series[1].dataDecimal);
						break
					case 2:
						this.tableText='交易金额（元）'
						this.initTable(data.category,data.series[0].dataDecimal);
						break
					case 3:
						this.tableText='交易笔数（笔）'
						let datas=[]
						_.map(data.category,(val)=>{
							datas.push(val+':00')
						})
						this.initTable(datas,data.series);
						break
					case 4:
						this.tableText='刷卡金额（元）'
						this.initTable(data.series[0].storeAndMerchantName,data.series[0].dataDecimal);
						break
					case 5:
						this.tableText='卡BIN刷卡金额（元）'
						this.initTable(data.category,data.series[0].dataDecimal);
						break
					case 6:
						this.tableText='卡数量（张）'
						this.initTable(data.series[0].data,data.series[0].dataLong);
						break
				}
			},
			changeStep(ajaxArr,steps){
				this.totalData='';
				this.mainStep=steps;
				let data={};
				if(steps==1){
					data={
						startDate:this.times.todayDate,
						endDate:this.times.todayDate,
						compareFlag:true,
						activityID:'',
					}
				}else{
					data={
						activityID:'',
					}
				}
				(!this.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				_.map(ajaxArr,(val)=>{
					this.model[val](data).then((res)=>{
						if(res.data.code===0){
							if(!res.data.data.series){
								this.$set('totalData',res.data.data);
							}else{
								this.getName(steps,res.data.data);
							}
						}
						console.log(res.data.data);
					})
				})
			},
			compareFlagChange(){
				this.compareFlag=!this.compareFlag;
			}
		},
		ready(){
			this.changeStep(['getTradePeriodTotal'],3)
		}
	}
</script>