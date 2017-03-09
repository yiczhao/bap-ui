<template>
    <div class="transaction-search">
        <div class="search-div">
            <span>活动名称</span>
            <input class="input" type="text" placeholder="输入活动名称" v-model="searchData.activityName" @keypress.enter="getActivity"/>
            <div class="showList" v-show="showList">
                <ul>
                    <li v-for="n in activityList | filterBy searchData.activityName in 'name'" @click="getId(n)">{{n.name}}</li>
                    <li v-if="!activityList.length">未查询到{{searchData.activityName}}活动</li>
                </ul>
            </div>
            <span>发起方（银行）</span>
            <select class="select" v-model="bankUuidString" @change="setBank">
                <option value="">请选择发起方</option>
                <option v-for="n in bankFullName" :value="n.uuid" @change="getBankString">{{n.shortName}}</option>
            </select>
            <span>活动状态</span>
            <select class="select" v-model="searchData.activityStatus">
                <option value="">请选择活动状态</option>
                <option value="1">运行中</option>
                <option value="0">已结束</option>
            </select>
            <span>交易时间</span>
            <ks-date-picker type="datetime" :value.sync="searchData.startDate"></ks-date-picker>
            <span>到</span>
            <ks-date-picker type="datetime" :value.sync="searchData.endDate"></ks-date-picker>
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
            <span class="infor-num">共<strong>{{objectotalNumber}}</strong>条数据</span>
            <span class="out-excel" @click="getExcel"><i class="icon-file-excel"></i>导出excel表格</span>
        </div>
        <div class="table"> 
            <table>
                <tr>
                    <th>活动名称</th>
                    <th>发起方</th>
                    <th>类型</th>
                    <th>活动状态</th>
                    <th>总笔数</th>
                    <th>总金额</th>
                    <th>单笔金额</th>
                    <th>开始日期</th>
                    <th>结束日期</th>
                    <th>操作</th>
                </tr>
                <tr v-for="n in dataList">
                    <td>{{n.activityName}}</td><!-- 活动名称 -->
                    <td>{{n.bankUuidsName}}</td><!-- 发起方 -->
                    <td><span v-if="n.subType==online">线上</span><span v-else>线下</span></td><!-- 子类型 -->
                    <td>{{n.activitStatus}}</td><!-- 活动状态 -->
                    <td>{{n.totalNumber}}</td><!-- 总笔数 -->
                    <td>{{n.totalAmount}}</td><!-- 总金额 -->
                    <td>{{n.avgAmount}}</td><!-- 单笔金额 -->
                    <td>{{n.startDate}} </td><!-- 开始日期 -->
                    <td>{{n.endDate}}</td><!-- 结束日期 -->
                    <td><a v-link="{name:'transaction-detail',params:{'transactionName':n.activityName,'transactionId':n.activityId}}">交易明细</a></td><!-- 操作 -->
                </tr>
                 <tr v-if="!dataList.length">
                    <td colspan="10">未查询到{{activityName}}活动</td>
                </tr>
            </table>
        </div>
        <pagegroup class="pagegroup"
            :page_current.sync="searchData.pageIndex"
            :total="objectotalNumber"
            :page_size.sync="searchData.pageSize"
            v-on:current_change="getList"
            v-on:size_change="getList"
            ></pagegroup>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/transaction/transaction_search_model'
	export default{
        data(){
            this.model=model(this)
            return{
                cumulative:[],
                activityList:[],
                bankFullName:[],
                showList:false,
                tradeTotalNumber:50,
                activityStatues:[
                    {'status':'运行中','num':'1'},
                    {'status':'已结束','num':'0'},
                ],
                dataList:[],
                searchData:{
                    activityName:'',
                    activityID:'',
                    bankUuidString:'',
                    activityStatus:'',//活动状态
                    startDate:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,//开始时间
                    endDate:stringify(new Date())+' 23:59:59',//结束时间
                    pageIndex:1,//当前选中的分页值
                    pageSize:10,//每页展示多少条数
                },
                objectotalNumber:0,
                activityName:'',
                privilegeList:[],
                bankUuidString:''
            }
        },
        methods:{
            getBankString(){
                if (!this.searchData.bankUuidString) {
                    this.searchData.bankUuidString=sessionStorage.getItem('uuids');
                }
            },
            setBank(){
                this.searchData.bankUuidString=this.bankUuidString
            },
            getList(){
                this.getBankString();
                if(!this.searchData.activityName){
                    this.searchData.activityID="";
                }
                this.model.getList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('dataList',res.data.dataList);
                        this.objectotalNumber=res.data.objectotalNumber;
                    }
                })
                this.model.getTradeStatisticsSumList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('cumulative',res.data.data);
                    }
                });
            },
            getActivity(){
                let data={
                    name:this.searchData.activityName,
                    maxResult:100,
                    uuids:_.split(sessionStorage.getItem('uuids'), ',')
                };
                this.$common_model.getActivityList(data).then((res)=>{
                    if(res.data.code===0){
                        this.$set('activityList',res.data.data);
                        this.showList=true;
                    }
                })
            },
            getId({uniqueId,name}){
                this.showList=false;
                this.searchData.activityName=name;
                this.searchData.activityID=uniqueId;
            },
            getBankList(){
                let data={
                };
                this.model.getBankList(data).then((res)=>{
                    if (res.data.code==0) {
                        this.$set('bankFullName',res.data.dataList);
                    }
                })
            },
            resetName(){
                this.showList=false;
            },
            getMenuList(){
                var privilegeList=JSON.parse(sessionStorage.getItem('loginList')).privilegeList;
                _.map(privilegeList,(val)=>{
                    this.privilegeList.push(val.name)
                })
            },
            getExcel(){
                let data=getFormData(this.searchData);
                data+='&methodName=statisticsDataExportExcel&mid='+JSON.parse(sessionStorage.getItem('loginList')).token;
                window.open(origin+this.$API.tradeSearchExport+data);
            },
        },
        ready(){
            this.getBankList();
            document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('showLi')) {
                    this.resetName();
                }
            }, false);
            this.getMenuList();
            this.getList();
        },
        beforeDestroy() {
            document.removeEventListener('click', this.resetName, false);
        },
        created(){}
    }
</script>
