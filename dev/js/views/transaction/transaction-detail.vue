<template>
    <div class="transaction-detail">
        <div class="detailInfo">
             <span class="activity-name">活动名称：<strong>{{activityName}}</strong></span>
        </div>
        <div class="search-div">
            <input class="input" type="text" v-model="searchData.cardNumber" @keyup.enter="getList" v-limitaddprice="searchData.cardNumber" placeholder="请输入银行卡号"/>
            <ks-date-picker time="00:00:00" type="datetime" :value.sync="searchData.startDate"></ks-date-picker>
            <ks-date-picker time="23:59:59" type="datetime" :value.sync="searchData.endDate"></ks-date-picker>
            <input type="button" class="btn btn-primary searchBtn" @click="getList" value="搜 索">
        </div>
        <div class="flex-chart" v-show="cumulative.length!=0">
            <div class="flex">
                <div class="echart-div" id="num-echart"></div>
                <div class="flex-title">{{cumulative.totalNumber}}笔</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="amount-echart"></div>
                <div class="flex-title">{{cumulative.totalAmount}}元</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="disAmoun-echart"></div>
                <div class="flex-title">{{cumulative.canDisAmount}}元</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="pay-echart"></div>
                <div class="flex-title">{{cumulative.payAmount}}元</div>
                <div class="border-right"></div>
            </div>
            <div class="flex">
                <div class="echart-div" id="subsidy-echart"></div>
                <div class="flex-title">{{cumulative.subsidyAmount}}元</div>
                <div class="2"></div>
            </div>
        </div>
        <div class="flex-chart text" v-show="cumulative.length==0">未查询到数据</div>
        <div class="table">
            <table>
                <tr>
                    <th>商户名称</th>
                    <th>银行卡号</th>
                    <th>卡种</th>
                    <th>交易流水号</th>
                    <th>交易时间</th>
                    <th>结算时间</th>
                    <th>消费金额(元)</th>
                    <th>可打折金额（元）</th>
                    <th>实付金额</th>
                    <th>结算折扣</th>
                    <th>补贴金额</th>
                </tr>
                <tr v-for="n in dataList">
                    <td>{{n.merchantName}}</td><!-- 商户名称 -->
                    <td>{{n.cardNumber | filter_banknum}}</td><!-- 银行卡号 -->
                    <td>{{n.cardType}}</td><!-- 卡种 -->
                    <td><span  aria-label="{{n.transNo}}" v-bind:class="{'hint--top':(!!n.transNo)}">{{n.transNo | substring 10}}</span></td><!-- 交易流水号 -->
                    <td>{{n.transDate}}</td><!-- 交易时间 -->
                    <td>{{n.settlementDate}}</td><!-- 结算时间 -->
                    <td>{{n.totalAmount }} </td><!-- 消费金额 -->
                    <td>{{n.canDisAmount}}</td><!-- 可打折金额（元） -->
                    <td>{{n.payAmount}}</td><!-- 实付金额 -->
                    <td>{{n.settlementDiscount}}</td><!-- 结算折扣 -->
                    <td>{{n.bankMoney}}</td><!-- 补贴金额 -->
                </tr>
            </table>
        </div>
        <div class="showInfo">
            <div class="outPDF" @click="getExcel"><a>导出excel表格</a></div>
            <pagegroup class="pagegroup"
                :page_current.sync="searchData.pageIndex"
                :total="searchData.total"
                :page_size.sync="searchData.pageSize"
                v-on:current_change="getList"
                v-on:size_change="getList"
                ></pagegroup>
        </div>
    </div>
    </template>
</template>
<script type="text/javascript">
    import model from '../../ajax/transaction/transaction_detail_model'
	export default{
        data(){
            this.model=model(this)
            return{
                cumulative:{
                    totalNumber:'',      //交易总笔数
                    totalAmount:'',   //交易总金额
                    canDisAmount:'',//可打折金额
                    payAmount:'',       //实付总金额
                    subsidyAmount:'',//补贴总金额
                },
                tradeTotalNumber:50,
                dataList:[],
                activityName:'',
                haha:'',
                searchData:{
                    pageIndex:1,//当前选中的分页值
                    total:1,//数据总条数
                    pageSize:1,//每页展示多少条数
                    phone:'',
                    activityName:'',//活动名称 
                    cardNumber:'',//银行卡号
                    startDate:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,//开始时间
                    endDate:stringify(new Date())+' 23:59:59',//结束时间
                    activityID:''
                },
            }
        },
        methods:{
            tradeEchart(divID,data1,data_name,baseData,color_1,color_2){
                var myChart=echarts.init(document.getElementById(divID));
                var option = {
                    series: [
                        {
                            type:'pie',
                            radius: ['60%', '80%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                }
                            },
                            labelLine: {normal: {show: false}},
                            data:[
                                {
                                    value:data1, 
                                    name:data_name,
                                    label:{
                                        normal: {
                                            show: true,
                                            textStyle:{
                                                color:'#444',
                                                fontSize: '12',
                                                fontWeight: 'bold'}
                                        }
                                    },
                                    itemStyle:{normal:{color:color_1}   
                                    },
                                },
                                {value:baseData,itemStyle:{normal:{color:color_2}},
                                },
                            ],
                        }
                    ]
                };
                myChart.setOption(option);
            },
            getList(){
                if (!this.searchData.activityID) {
                    this.searchData.bankUuidString=JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                }else{
                    this.searchData.activityID=this.searchData.activityID;
                }
                this.model.getDetailList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('dataList',res.data.dataList)
                        this.$set('searchData.total',res.data.objectotalNumber);
                    }
                })
                this.model.getTradeStatisticsSumList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('cumulative',res.data.data);
                        this.tradeEchart('num-echart',this.cumulative.totalNumber,'交易总笔数',0,'#e76b5f','#e76b5f');
                        this.tradeEchart('amount-echart',this.cumulative.totalAmount,'交易总金额',0,'#ffcf7a','#ffcf7a');
                        this.tradeEchart('disAmoun-echart',this.cumulative.canDisAmount,'可打折金额',this.cumulative.totalAmount-this.cumulative.canDisAmount,'#b6d15d','#ffcf7a');
                        this.tradeEchart('pay-echart',this.cumulative.payAmount,'实付总金额',this.cumulative.totalAmount-this.cumulative.payAmount,'#3ba686','#f0f0f0');
                        this.tradeEchart('subsidy-echart',this.cumulative.subsidyAmount,'补贴总金额',this.cumulative.totalAmount-this.cumulative.subsidyAmount,'#e76b5f','#163b7d');
                    }
                })
            },
            getExcel(){
                let data=getFormData(this.searchData);
                data+='&methodName=statisticsDetailDataExportExcel&mid='+JSON.parse(sessionStorage.getItem('loginList')).token;
                window.open(origin+this.$API.tradeDetailExport+data);
            },
        },
        ready(){
            // this.getList();
            // this.searchData.startDate='';
            // this.searchData.endDate='';
        },
        created(){
            this.activityName=this.$route.params.transactionName;
            this.searchData.activityID=this.$route.params.transactionId;
        }
    }
</script>
