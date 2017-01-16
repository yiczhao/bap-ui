<template>
    <div class="transaction-detail">
        <div class="search-div">
            <span>手机号码</span>
            <input class="input" type="text" v-model="searchDate.phone" v-limitaddprice="searchDate.phone"  placeholder="输入手机号码"/>
            <span>银行卡号</span>
            <input class="input" type="text" v-model="searchDate.cardNumber" v-limitaddprice="searchDate.cardNumber" placeholder="银行卡号"/>
            <span>交易时间</span>
            <ks-date-picker time="00:00:00" :value.sync="searchDate.startDate"></ks-date-picker>
            <span>到</span>
            <ks-date-picker time="23:59:59" :value.sync="searchDate.endDate"></ks-date-picker>
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
            <span class="activity-name">活动名称：{{activityName}}</span>
            <span class="infor-num">共{{searchDate.total}}条数据</span>
            <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>商户名称</th>
                    <th>银行卡号</th>
                    <th>卡种</th>
                    <th>手机号码</th>
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
                    <td>{{n.accountNumber | filter_phone}}</td><!-- 手机号码 -->
                    <td>{{n.transNo | substring 10}}</td><!-- 交易流水号 -->
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
            :page_current.sync="searchDate.pageIndex" 
            :total="searchDate.total" 
            :page_size.sync="searchDate.pageSize"
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
                searchDate:{
                    pageIndex:1,//当前选中的分页值
                    total:1,//数据总条数
                    pageSize:1,//每页展示多少条数
                    phone:'',
                    activityName:'',//活动名称
                    cardNumber:'',//银行卡号
                    startDate:'',//开始时间
                    endDate:'',//结束时间
                    activityId:''
                },
            }
        },
        methods:{
            getList(){
                if (!this.searchDate.activityID) {
                    this.searchDate.uuids=JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                }else{
                    this.searchDate.activityID=this.searchDate.activityID;
                }
                this.model.getList(this.searchDate).then((res)=>{
                    if(res.data.code===0){
                        this.$set('dataList',res.data.dataList)
                        this.searchDate.total=res.data.objectotalNumber;
                    }
                })
                this.model.getTradeStatisticsSumList(this.searchDate).then((res)=>{
                    if(res.data.code===0){
                        this.$set('cumulative',res.data.dataList[0]);
                    }
                })
            },
        },
        ready(){
            this.activityName=this.$route.params.transactionName;
            this.searchDate.activityId=this.$route.params.transactionId;
            this.getList();
            this.searchDate.startDate='';
            this.searchDate.endDate='';
        }
    }
</script>