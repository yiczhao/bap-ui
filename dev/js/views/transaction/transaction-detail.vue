<template>
    <div class="transaction-detail">
        <div class="detailInfo">
             <span class="activity-name">活动名称：<strong>{{activityName}}</strong></span>
        </div>
        <div class="search-div search-table">
            <div class="conditions-list">
                <input class="input" type="text" v-model="searchData.cardNumber" @keyup.enter="getList" v-limitaddprice="searchData.cardNumber" placeholder="请输入银行卡号"/>
                <ks-date-range-picker placeholder="开始时间,结束时间"
                                      :range.sync="daterange"
                                      :readonly="false"
                                      v-on:change="date_multi_picker_change"></ks-date-range-picker>
                </div>
            <div class="do-search">
                <input type="button" class="btn btn-primary searchBtn" @click="getList" value="搜 索">
            </div>
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
                v-on:current_change="sizeChange"
                v-on:size_change="sizeChange"
                ></pagegroup>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/transaction/transaction_detail_model'
	export default{
        watch:{
            'daterange'(){
                if(this.daterange.length>1){
                    this.searchData.endDate=this.daterange[1]+' 23:59:59'
                }else{
                    this.searchData.startDate=this.daterange[0]+' 00:00:00'
                    this.searchData.endDate=''
                }
            }
        },
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
                    startDate:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime+' 00:00:00',//开始时间
                    endDate:stringify(new Date())+' 23:59:59',//结束时间
                    activityID:''
                },
                daterange:[JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,stringify(new Date())]
            }
        },
        methods:{
            date_multi_picker_change(val){
                this.searchData.startDate=val[0]+' 00:00:00';
                this.searchData.endDate=val[1]+' 23:59:59';
            },
            tradeEchart(divID,data1,data_name,color_1,baseData,color_2){
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
                            ],
                        }
                    ]
                };
                if(!!baseData){
                    option.series[0].data.push({value:baseData,itemStyle:{normal:{color:color_2}}});
                }
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
                        this.tradeEchart('num-echart',this.cumulative.totalNumber,'交易总笔数','#e76b5f');
                        this.tradeEchart('amount-echart',this.cumulative.totalAmount,'交易总金额','#ffcf7a');
                        this.tradeEchart('disAmoun-echart',this.cumulative.canDisAmount,'可打折金额','#b6d15d',this.cumulative.totalAmount-this.cumulative.canDisAmount,'#ffcf7a');
                        this.tradeEchart('pay-echart',this.cumulative.payAmount,'实付总金额','#3ba686',this.cumulative.totalAmount-this.cumulative.payAmount,'#f0f0f0');
                        this.tradeEchart('subsidy-echart',this.cumulative.subsidyAmount,'补贴总金额','#163b7d',this.cumulative.totalAmount,'#f0f0f0');
                    }
                })
            },
            sizeChange(){
                this.model.getDetailList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('dataList',res.data.dataList)
                        this.$set('searchData.total',res.data.objectotalNumber);
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
