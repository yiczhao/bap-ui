<template>
    <div class="transaction-search">
        <div class="search-div">
            <input class="input " type="text" v-model="searchData.activityName" placeholder="输入活动名称"
                   @keyup="getActivity($event)" @keyup.enter="searchList"
                   @keyup.up="changeLiIndex('up')" @keyup.down="changeLiIndex('down')"
            />
            <div class="showList showLi" v-show="showList">
                <ul class="showLi">
                    <li class="showLi" v-for="n in activityList" :class="{'checked':liIndex==$index}" @click="getId(n)">{{n.name}}</li>
                    <li class="showLi" v-if="!activityList.length">未查询到{{searchData.activityName}}活动</li>
                </ul>
            </div>
            <select class="select" v-model="bankUuidString" @change="setBank">
                <option value="">请选择发起方</option>
                <option v-for="n in bankFullName" :value="n.uuid" @change="getBankString">{{n.shortName}}</option>
            </select>
            <select class="select" v-model="searchData.activityStatus">
                <option value="">请选择活动状态</option>
                <option value="1">运行中</option>
                <option value="0">已结束</option>
            </select>
            <ks-date-picker type="datetime" :value.sync="searchData.startDate"></ks-date-picker>
            <ks-date-picker type="datetime" :value.sync="searchData.endDate"></ks-date-picker>
            <input type="button" class="btn btn-primary searchBtn" @click="searchList" value="搜 索">
        </div>
        <div class="flex-chart" v-show="trade_echart==1">
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
        <div class="flex-chart text" v-show="trade_echart==0">未查询到数据</div>
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
        <div class="showInfo">
            <div class="outPDF" @click="getExcel"><a>导出excel表格</a></div>
            <pagegroup class="pagegroup"
                :page_current.sync="searchData.pageIndex"
                :total="objectotalNumber"
                :page_size.sync="searchData.pageSize"
                v-on:current_change="getList"
                v-on:size_change="getList"
                ></pagegroup>
        </div>
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
                    sorts:'id|desc',
                    startDate:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,//开始时间
                    endDate:stringify(new Date())+' 23:59:59',//结束时间
                    pageIndex:1,//当前选中的分页值
                    pageSize:10,//每页展示多少条数
                },
                objectotalNumber:0,
                activityName:'',
                privilegeList:[],
                bankUuidString:'',
                trade_echart:1,
                replaceName:'',
                liIndex:0
            }
        },
        methods:{
            searchList(){
                if(!this.showList && this.liIndex==0)return;
                this.showList=false;
                this.searchData.activityName=this.activityList[this.liIndex].name;
                this.searchData.activityID=this.activityList[this.liIndex].uniqueId;
                this.getList();
            },
            getActivity: _.debounce(function(e){
                if(e.keyCode == 38 || e.keyCode == 40|| e.keyCode == 13){  //向上向下
                    console.log(e.keyCode);
                    return ;
                }
                let vm=this;
                vm.replaceName=(vm.searchData.activityName).replace(/(^\s+)|(\s+$)/g, "");
                let data={
                    name:vm.replaceName,
                    maxResult:10,
                    uuids:_.split(sessionStorage.getItem('uuids'), ',')
                }
                if(!vm.replaceName){
                    vm.searchData.activityID="";
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
            getId({uniqueId,name}){
                this.showList=false;
                this.searchData.activityName=name;
                this.searchData.activityID=uniqueId;
                this.getList();
            },
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
                        this.tradeEchart('num-echart',this.cumulative.totalNumber,'交易总笔数',0,'#e76b5f','#e76b5f');
                        this.tradeEchart('amount-echart',this.cumulative.totalAmount,'交易总金额',0,'#ffcf7a','#ffcf7a');
                        this.tradeEchart('disAmoun-echart',this.cumulative.canDisAmount,'可打折金额',this.cumulative.totalAmount-this.cumulative.canDisAmount,'#b6d15d','#ffcf7a');
                        this.tradeEchart('pay-echart',this.cumulative.payAmount,'实付总金额',this.cumulative.totalAmount-this.cumulative.payAmount,'#3ba686','#f0f0f0');
                        this.tradeEchart('subsidy-echart',this.cumulative.subsidyAmount,'补贴总金额',this.cumulative.totalAmount-this.cumulative.subsidyAmount,'#e76b5f','#163b7d');
                    }else{
                        this.trade_echart=0;
                    }
                });
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
                this.searchData.sorts='id%7Cdesc';
                let data=getFormData(this.searchData);
                data+='&methodName=statisticsDataExportExcel&mid='+JSON.parse(sessionStorage.getItem('loginList')).token;
                window.open(origin+this.$API.tradeSearchExport+data);
                this.searchData.sorts='id|desc';
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
