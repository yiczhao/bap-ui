<template>
	<div class="activity-data-overview">
		<div class="search-bg">
			<div class="search-show">
				<input type="text" class="input" placeholder="请输入活动名称" v-model="searchData.activityName"
				@keyup="getActivity($event)" @keyup.enter="searchList"
                @keyup.up="changeLiIndex('up')" @keyup.down="changeLiIndex('down')"/>
				<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':0}}">
					查看活动总览
				</a>
				<!--<input type="button" class="btn btn-primary searchBtn" @click="searchList" value="搜 索">-->
				<div class="showList showLi" v-show="showList">
	                <ul class="showLi">
	                    <li class="showLi" v-for="n in activityList" :class="{'checked':liIndex==$index}" @click="getId(n)">{{n.name}}</li>
	                    <li class="showLi" v-if="!activityList.length">未查询到{{searchData.activityName}}活动</li>
	                </ul>
	            </div>
			</div>
			<div style="color:#A3A3A3">展示活动的交易数据,截止到{{nowDate}}</div>
		</div>
		<div class="chart-show">
			<div class="flex border">
				<div class="left">
					<h4>
						交易数据
						<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':0}}">查看详细数据<i class="iconfont">&#xe659;</i></a>
						</h4>
					<div class="echart-div" v-el:trade-data></div>
					<div>
						<p><span class="colora9"></span>累计交易总金额</p>
						<p class="right"><span></span>今日交易总金额</p>
					</div>
					<div>
						<p>{{tradeData.total}}</p>
						<p class="right">{{tradeData.today}}</p>
					</div>
				</div>
				<div class="center">
					<h4>
						交易区域
						<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':1}}">查看详细数据<i class="iconfont">&#xe659;</i></a>
					</h4>
					<div class="echart-div" v-el:trade-area></div>
				</div>
				<div class="right">
					<h4>交易时段
						<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':2}}">查看详细数据<i class="iconfont">&#xe659;</i></a>
					</h4>
					<div class="echart-div" v-el:trade-time></div>
				</div>
			</div>
			<div class="flex short">
				<div class="left">
					<h4>商户数据
						<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':3}}">查看详细数据<i class="iconfont">&#xe659;</i></a>
					</h4>
					<div class="echart-div">
						<div>店均交易笔数</div>
						<div>{{merchant.averageTradeNumbers}}</div>
						<div>店均交易金额</div>
						<div>
							{{merchant.averageTradeAmount[0]}}
							<i class="float-num" v-if="!merchant.averageTradeAmount[1]">.00</i>
							<i class="float-num" v-else>.{{merchant.averageTradeAmount[1]}}</i>
						</div>
					</div>
				</div>
				<div class="center">
					<h4>卡BIN数据
						<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':4}}">查看详细数据<i class="iconfont">&#xe659;</i></a>
					</h4>
					<div class="echart-div">
						<div>卡BIN交易笔数</div>
						<div>{{cardBin.averageTradeNum}}</div>
						<div>卡BIN交易金额</div>
						<div>
							{{cardBin.averageTradeAmount[0]}}
							<i class="float-num" v-if="!cardBin.averageTradeAmount[1]">.00</i>
							<i class="float-num" v-else>.{{cardBin.averageTradeAmount[1]}}</i>
						</div>
					</div>
				</div>
				<div class="right">
					<h4>单卡交易
						<a v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':5}}">查看详细数据<i class="iconfont">&#xe659;</i></a>
					</h4>
					<div class="echart-div">
						<div>参与卡数量</div>
						<div>{{oneCard.cardNumbers}}</div>
						<div>卡均参与数量</div>
						<div>{{oneCard.averageCardNumbers}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	.float-num{
		font-style: normal;
		font-size: 14px;
	}
	.float-num span{
		font-size:22px;
	}
	.activity-data-overview td{
		border-width: 0px !important;
	}
	.searchBtn:hover{
		background-color: #e74c39!important;
	}
</style>
<script>
	import model from '../../ajax/activity/activity-analysis'
	export default{
		data(){
			this.model=model(this)
			return{
			    nowDate:stringify(new Date()),
				mainStep:0,
				searchData:{
				    id:'',
					activityName:'',
					activityID:'',
					compareFlag:true,
                    bankId:JSON.parse(sessionStorage.getItem('loginList')).bapBankId,
				},
				compareFlag:true,
				times:{//时间初始化数据
                    today:getDates().today,
                    aweekAgo:getDates().aweekAgo,
                    amonthAgo:getDates().amonthAgo
				},
				tradeArea:'',
				tradeData:{
					today:'',
					total:'',
				},
				tradeTime:[],
				merchant:{
					averageTradeNumbers:[],
					averageTradeAmount:[],
				},
				cardBin:{
					averageTradeNum:[],
					averageTradeAmount:[],
				},
				oneCard:{},
                activityList:[],
                liIndex:0,
                showList:false,
			}
		},
		methods:{
            echarts1(){
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['苏州','上海','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐','乌鲁木齐'],
                            axisLabel: {
                                formatter:function(val){
                                    return val.split("").join("\n");
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name:'区域平均交易笔数',
                            type:'bar',
							/*设置柱状图颜色*/
                            itemStyle: {
                                normal: {
                                    color:'#7ECAC5',
									/*信息显示方式*/
                                    label: {
                                        show: false,
                                        position: 'top',
                                        formatter: '{b}\n{c}'
                                    }
                                }
                            },
                            data:[130, 145, 130, 120, 100, 80, 30, 20,45, 40, 35, 35]
                        },
                        {
                            name:'产生的交易总笔数',
                            type:'line',
                            itemStyle : {  /*设置折线颜色*/
                                normal : {
                                    color:'#E76B5F'
                                }
                            },
                            symbol:'circle',
                            symbolSize:10,
                            data:[200, 175, 160, 150, 100, 80, 60, 50,45, 40, 35, 35]
                        }
                    ]
                };
            },
			echarts2(){
                option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1','2','3','4','5','6','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9','10','11','12']
                        }
                    ],
                    yAxis: [
                        {

                            type: 'value',
                            name: '',
                            min: 0,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} '
                            },
                            axisLine:{show:false}
                        }
                    ],
                    series: [
                        {
                            name:'产生的交易总笔数',
                            type:'line',
                            itemStyle : {  /*设置折线颜色*/
                                normal : {
                                    color:'#E76B5F'
                                }
                            },
                            symbol:'circle',
                            symbolSize:10,
                            data:[200, 175, 160, 150, 100, 80, 60, 50,45, 40, 35, 35,200, 175, 160, 150, 100, 80, 60, 50,45, 40, 35, 35]
                        }
                    ]
                };
			},
			searchList(){
                if(this.showList){
					this.searchData.activityName=this.activityList[this.liIndex].name;
					this.searchData.activityID=this.activityList[this.liIndex].uniqueId;
					this.searchData.id=this.activityList[this.liIndex].id;
				}
                this.showList=false;
				this.initList();
            },
            getActivity: _.debounce(function(e){
                if(e.keyCode == 38 || e.keyCode == 40|| e.keyCode == 13){  //向上向下
                    return ;
                }
                let vm=this;
                vm.replaceName=(vm.searchData.activityName).replace(/(^\s+)|(\s+$)/g, "");
                let data={
                    name:vm.replaceName,
                    maxResult:10,
                    organizers:[JSON.parse(sessionStorage.getItem('loginList')).bankOperationCode]
                }
                if(!vm.replaceName){
                    vm.searchData.activityID="";
                    vm.searchData.id="";
                    vm.showList=false;
                    return;
                }else{
                    vm.$common_model.getActivityList(data).then((res)=>{
                        if(res.data.code===0&&res.data.data!=vm.searchData.activityName){
                            this.liIndex=0;
                            vm.$set('activityList',res.data.data);
                            vm.showList=true;
                        }
                    })
                }
            },300),
            changeLiIndex(type){
                if(!this.activityList.length)return;
                switch (type){
                    case 'up':
                        this.liIndex==0?this.liIndex=this.activityList.length-1:this.liIndex--;
                        break;
                    case 'down':
                        this.liIndex==this.activityList.length-1?this.liIndex=0:this.liIndex++;
                        break;
                    default:
                        break;
                }
            },
            getId({uniqueId,name,id}){
                this.showList=false;
                this.searchData.activityName=name;
                this.searchData.activityID=uniqueId;
                this.searchData.id=id;
                this.searchData.bankId='';
                this.searchList();
            },
			initList(){
                console.log(this.$els.msg);
				this.echartRadar();
				this.tradeDataGet();
				this.tradeTimeGet();
				this.tradeAreaData();
				this.dataGet();
			},
			tradeAreaData(){
			(!this.searchData.activityID)?this.searchData.bankId=this.searchData.bankId : this.searchData.activityID=this.searchData.activityID;
				this.model.getTradeAreaTotal(this.searchData).then((res)=>{
					if(res.data.code===0){
						// this.echartRadar();
					}
				})
			},
			echartRadar(){
				let option = {
					title: {text:'',textStyle:{fontSize:12,color:"#fff"},},
					tooltip: {},
				    radar: {
				        indicator: [{ name: '产生交易区域'},{ name: '区域平均交易笔数'},{ name: '最高交易区域'},{ name: '最高交易区域交易笔数'},{ name: '最高交易区域交易额'}],
				        name:{textStyle:{color:'#fff'}},axisTick:{show:false},axisLabel:{show:false},splitArea:{show:false},splitLine:{show:false},axisLine:{show:false}},
				    series: [{
				        type: 'radar',
				        data : [{value : [1, 51,51,70,50], name : '交易区域'}],
				        areaStyle: {normal: {color:'#10b283'}},lineStyle: {normal: {color:'#b9babd'}},itemStyle:{normal:{color:'#3ba686'}}
				    }]
				};
				let id=this.$els.tradeArea;
				let myChart=echarts.init(id);
				myChart.setOption(option);
			},
			tradeDataGet(){
				(!this.searchData.activityID)?this.searchData.bankId=this.searchData.bankId : this.searchData.activityID=this.searchData.activityID;
				this.model.getTradeDataTotal(this.searchData).then((res)=>{
					if(res.data.code===0){
						this.tradeData.today=res.data.data.tradeAmount;
						this.model.getTradeDataTotalAll(this.searchData).then((res)=>{
							if(res.data.code===0){
								this.tradeData.total=res.data.data.tradeAmount;
								this.echartBar([this.tradeData.today,this.tradeData.total]);
							}
						})
					}
				});
			},
			echartBar(data){
				let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {
                                    value:data[0],
                                    name:'今日交易总金额',
                                    itemStyle:{normal:{color:'#7ECAC5'}},
                                    label:{
                                        normal: {
                                            show: false
                                        }
                                    }
                                },
                                {
                                    value:data[1],
                                    name:'累计交易总金额',
                                    itemStyle:{normal:{color:'#DBDBDB'}},
                                    label:{
                                        normal: {
                                            show: false
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };
				let myChart=echarts.init(this.$els.tradeData)
				myChart.setOption(option);
			},
			tradeTimeGet(){
				(!this.searchData.activityID)?this.searchData.bankId=this.searchData.bankId : this.searchData.activityID=this.searchData.activityID;
				this.model.getTradePeriodTotal(this.searchData).then((res)=>{
					if(res.data.code===0){
						this.tradeTime=res.data.data.series
						this.echartLine(this.tradeTime);
					}
				})
			},
			echartLine(data){
				let hours=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
				let option = {
					    tooltip : {trigger: 'axis'},
					    grid: {left: '0px',right: '4%',top:'20px',bottom: '3%',containLabel: true},
					    xAxis : [{type:'category',boundaryGap:false,data:hours,axisLabel:{textStyle:{color:'#fff'}},}],
					    yAxis : [{type : 'value', axisLine:{show:false}, axisLabel:{show:false}, splitLine:{show:false}, axisTick:{lineStyle:{color:'#777778',width:2,}}} ],
					    series : [
					        {name:'交易笔数',type:'line',areaStyle: {normal: {color:'#10b283'}},lineStyle: {normal: {color:'#b9babd'}},itemStyle:{normal:{color:'#10b283'}},
					            data:data},
					    ],
					};
				let myChart = echarts.init(this.$els.tradeTime);
				myChart.setOption(option);
			},
			dataGet(){
				this.model.getMerchantTradeTotal(this.searchData).then((res)=>{if(res.data.code===0){
					let Amount=String(res.data.data.averageTradeAmount);
					this.merchant.averageTradeAmount=Amount.split('.');
					this.merchant.averageTradeNumbers=res.data.data.averageTradeNumbers;
				}})
				this.model.getCardBINTotal(this.searchData).then((res)=>{if(res.data.code===0){
					this.cardBin.averageTradeNum=res.data.data.averageTradeNum;
					let Amount=String(res.data.data.averageTradeAmount);
					this.cardBin.averageTradeAmount=Amount.split('.');
				}})
				this.model.getOneCardTotal(this.searchData).then((res)=>{if(res.data.code===0){this.oneCard=res.data.data;}})
			},
		},
		ready(){
			this.initList();
			this.echartRadar();
		},
	}
</script>