<template>
    <div class="transaction-detail">
        <div class="search-div">
            <span>银行卡号</span>
            <input class="input" type="text" v-model="searchData.cardNumber" v-limitaddprice="searchData.cardNumber" placeholder="银行卡号"/>
            <span>交易时间</span>
            <ks-date-picker time="00:00:00" :value.sync="searchData.startDate"></ks-date-picker>
            <span>到</span>
            <ks-date-picker time="23:59:59" :value.sync="searchData.endDate"></ks-date-picker>
            <a class="btn btn-primary searchBtn" @click="getList">搜索</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>交易总笔数</th>
                    <th>交易总金额</th>
                    <th>可打折金额</th>
                    <th>实付总金额</th>
                    <th>补贴总金额</th>
                </tr>
                <tr>
                    <td>{{cumulative.totalNumber}}</td>
                    <td>{{cumulative.totalAmount}}</td>
                    <td>{{cumulative.canDisAmount}}</td>
                    <td>{{cumulative.payAmount}}</td>
                    <td>{{cumulative.subsidyAmount}}</td>
                </tr>
            </table>
        </div>
        <div class="showInfo">
            <span class="activity-name">活动名称：<strong>{{activityName}}</strong></span>
            <span class="infor-num">共<strong>{{searchData.total}}</strong>条数据</span>
            <!-- <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span> -->
        </div>
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
                    <td>{{n.disAmount}}</td><!-- 结算折扣 -->
                    <td>{{n.subsidyAmount}}</td><!-- 补贴金额 -->
                </tr>
            </table>
        </div>
        <pagegroup class="pagegroup"
            :page_current.sync="searchData.pageIndex"
            :total="searchData.total"
            :page_size.sync="searchData.pageSize"
            v-on:current_change="getList"
            v-on:size_change="getList"
            ></pagegroup>
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
                        this.$set('cumulative',res.data.dataList[0]);
                    }
                })
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
