<template> 
    <div class="transaction-search">
        <div class="search-div">
            <span>活动名称</span>
            <input class="input" type="text" v-model="searchDate.activityName" placeholder="输入活动名称"/>
            <span>发起方（银行）</span>
            <select class="select" v-model="searchDate.bankName">
                <option>11</option>
            </select>
            <span>活动状态</span>
            <select class="select" v-model="searchDate.activityStatue">
                <option>全部状态</option>
            </select>
            <span>交易时间</span>
            <ks-date-picker value="2016-10-12" v-on:change="" v-model="searchDate.startTime"></ks-date-picker>
            <span>到</span>
            <ks-date-picker value="2016-10-12" v-on:change="" v-model="searchDate.endTime"></ks-date-picker>
            <a class="btn btn-primary searchBtn" @click="searchActivity">搜索</a>
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
                    <td>{{cumulative.tradeNum}}</td>
                    <td>{{cumulative.tradeAmount}}</td>
                    <td>{{cumulative.discountAmount}}</td>
                    <td>{{cumulative.realPay}}</td>
                    <td>{{cumulative.subsidiesAmount}}</td>
                </tr>
            </table>
        </div>
        <div class="showInfo">
            <span class="infor-num">共{{pagegroupInfor.total}}条数据</span>
            <span class="out-excel">导出excel表格</span>
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
                    <td><a v-link="{name:''}">交易明细</a></td><!-- 操作 -->
                </tr>
            </table>
        </div>
        <pagegroup class="pagegroup"
            :page_current.sync="pagegroupInfor.page" 
            :total="pagegroupInfor.total" 
            :page_size.sync="pagegroupInfor.maxResult"
            :pages="pagegroupInfor.allPages"
            v-on:current_change="getList"
            v-on:size_change="getList"
            ></pagegroup>
    </div>
    </template>
</template>
<script type="text/javascript">
    import model from '../../ajax/transaction/transaction_search_model'
	export default{
        data(){
            this.model=model(this)
            return{
                cumulative:{
                    tradeNum:'',      //交易总笔数
                    tradeAmount:'',   //交易总金额
                    discountAmount:'',//可打折金额
                    realPay:'',       //实付总金额
                    subsidiesAmount:'',//补贴总金额
                },
                tradeTotalNumber:50,
                pagegroupInfor:{
                    page:1,//当前选中的分页值
                    total:5,//数据总条数
                    maxResult:1,//每页展示多少条数
                    allPages:1,//总页数
                },
                dataList:[],
                searchDate:{
                    activityName:'',//活动名称
                    startTime:'',//开始时间
                    endTime:'',//结束时间
                    bankName:'',//发起方名称
                    activityStatue:'',//活动状态
                },
            }
        },
        methods:{
            getList(){//分页数据获取
                let data={
                    activityID:'112111'
                }
                this.model.getList(data).then((res)=>{
                    if(res.data.code===0){
                        console.log("分页数据获取成功")
                        this.dataList=res.data.dataList;
                        this.pagegroupInfor.page=res.data.pageIndex;
                        this.pagegroupInfor.total=res.data.objectotalNumber;
                        this.pagegroupInfor.maxResult=res.data.pageSize;
                        this.pagegroupInfor.allPages=res.data.objectotalPage;
                    }
                })
            },
            cumulativeArea(){//累计信息获取
                let data={
                    activityID:'112111'
                }
                this.model.getTradeStatisticsSumList(data).then((res)=>{
                    if(res.data.code===0){
                        this.cumulative.tradeNum=res.data.dataList[0].totalNumber;//交易总笔数
                        this.cumulative.tradeAmount=res.data.dataList[0].totalAmount;//交易总金额
                        this.cumulative.discountAmount=res.data.dataList[0].canDisAmount ;//可打折金额
                        this.cumulative.realPay=res.data.dataList[0].payAmount;//实付总金额
                        this.cumulative.subsidiesAmount=res.data.dataList[0].subsidyAmount ;//补贴总金额
                    }
                })
            },
            searchActivity(){//未写完===========================================
                let data={
                    activityName:this.activityName,//活动名称
                    cardNumber:this.cardNumber,//银行卡号
                    startTime:this.startTime,//开始时间
                    endTime:this.endTime,//结束时间

                }
                this.model.getSearchActivity(data).then((res)=>{
                    if(res.data.code===0){
                        console.log("success")
                    }

                })
            }
        },
        ready(){
            this.getList();
            this.cumulativeArea();
        }
    }
</script>