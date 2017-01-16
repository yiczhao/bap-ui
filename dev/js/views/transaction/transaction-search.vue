<template> 
    <div class="transaction-search">
        <div class="search-div">
            <span>活动名称</span>
            <input class="input" type="text" placeholder="输入活动名称" v-model="activityName" @keyup.enter="getActivity"/>
            <div class="showList" v-show="showList">
                <ul>
                    <li v-for="n in activityList | filterBy searchDate.activityName in 'name'" @click="getId(n)">{{n.name}}</li>
                    <li v-if="!activityList.length">未查询到{{searchDate.activityName}}活动</li>
                </ul>
            </div>
            <span>发起方（银行）</span>
            <select class="select" v-model="bankUuidString" @change="getBankString">
                <option value="">请选择发起方</option>
                <option v-for="n in bankFullName" :value="n.uuid">{{n.shortName}}</option>
            </select>
            <span>活动状态</span>
            <select class="select" v-model="searchDate.activityStatus">
                <option value="">请选择活动状态</option>
                <option value="1">运行中</option>
                <option value="0">已结束</option>
            </select>
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
            <span class="infor-num">共{{objectotalNumber}}条数据</span>
            <span class="out-excel"><i class="icon-file-excel"></i>导出excel表格</span>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>活动名称</th>
                    <th>发起方</th>
                    <th>子类型</th>
                    <th>活动状态</th>
                    <th>总笔数</th>
                    <th>总金额</th>
                    <th>单笔金额</th>
                    <th>开始日期</th>
                    <th>结束日期</th>
                    <th>操作</th>
                </tr>
                <tr v-for="n in dataList">
                    <td>{{n.activityName }}</td><!-- 活动名称 -->
                    <td>{{n.bankName }}</td><!-- 发起方 -->
                    <td>{{n.subType }}</td><!-- 子类型 -->
                    <td>{{n.activitStatus}}</td><!-- 活动状态 -->
                    <td>{{n.totalNumber }}</td><!-- 总笔数 -->
                    <td>{{n.totalAmount}}</td><!-- 总金额 -->
                    <td>{{n.avgAmount }}</td><!-- 单笔金额 -->
                    <td>{{n.startDate  }} </td><!-- 开始日期 -->
                    <td>{{n.endDate }}</td><!-- 结束日期 -->
                    <td><a v-link="{name:'transaction-detail',params:{'transactionName':n.activityName,'transactionId':n.id}}">交易明细</a></td><!-- 操作 -->
                </tr>
                 <tr v-if="!dataList.length">
                    <td colspan="10">未查询到{{activityName}}活动</td>
                </tr>
            </table>
        </div>
        <pagegroup class="pagegroup"
            :page_current.sync="searchDate.pageIndex" 
            :total="objectotalNumber" 
            :page_size.sync="searchDate.pageSize"
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
                cumulative:{
                    // totalNumber:'',      //交易总笔数
                    // totalAmount:'',   //交易总金额
                    // canDisAmount:'',//可打折金额
                    // payAmount:'',       //实付总金额
                    // subsidyAmount:'',//补贴总金额
                },
                activityList:[],
                bankFullName:[],
                showList:false,
                tradeTotalNumber:50,
                activityStatues:[
                    {'status':'运行中'},
                    {'status':'已结束'},
                ],
                dataList:[],
                searchDate:{
                    activityStatus:0,//活动状态
                    startDate:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,//开始时间
                    endDate:'',//结束时间
                    activityID:'',
                    pageIndex:1,//当前选中的分页值
                    pageSize:1,//每页展示多少条数
                    bankUuidString:''
                },
                objectotalNumber:0,
                bankUuidString:'',
                activityName:'',
                privilegeList:[],
            }
        }, 
        methods:{
            getBankString(){
                if (!this.bankUuidString) {
                    this.searchDate.bankUuidString=JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                }else{
                    this.searchDate.bankUuidString=this.bankUuidString;
                }
            },
            getList(){
                if (!this.bankUuidString) {
                    this.searchDate.bankUuidString=JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                }
                this.model.getList(this.searchDate).then((res)=>{
                    if(res.data.code===0){
                        this.$set('dataList',res.data.dataList);
                        this.objectotalNumber=res.data.objectotalNumber;
                    }
                })
                this.model.getTradeStatisticsSumList(this.searchDate).then((res)=>{
                    if(res.data.code===0){
                        this.$set('cumulative',res.data.dataList[0])
                    }
                })
            },
            getActivity(){
                let data={
                    name:this.activityName,
                    uuids:[JSON.parse(sessionStorage.getItem('loginList')).bankUUID]
                };
                this.$common_model.getActivityList(data).then((res)=>{
                    if(res.data.code===0){
                        this.$set('activityList',res.data.data);
                        this.showList=true;
                    }
                })
            },
            getId({id,name}){
                this.showList=false;
                this.searchDate.activityName=name;
                this.searchDate.activityId=id;
                this.searchDate.activityID=this.searchDate.activityId;
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
                console.log(this.privilegeList)
            }
        },
        ready(){
            // this.getList();
            this.getBankList();
            document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('showLi')) {
                    this.resetName();
                }
            }, false);
            this.getMenuList();
            // console.log(JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.resetName, false);
        },
        created(){}
    }
</script>