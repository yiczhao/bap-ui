<template>
    <div class="home">
        <div class="search-div">
            <span>活动名称</span>
            <input class="input" type="text" v-model="searchDate.name" placeholder="输入活动名称(回车键搜索)" @blur="showList=false" @keyup.enter="getActivity"/>
            <div class="showList" v-show="showList">
                <ul>
                    <li v-for="n in activityList | filterBy searchDate.name in 'name'" @click="getId(n)">{{n.name}}</li>
                </ul>
            </div>
            <span>时间类型</span>
            <select class="select" v-model="searchDate.type" @change="getTime">
                <option value="now">今日</option>
                <option value="all">累计</option>
            </select>
            <div class="right">当前数据截止到{{now}} (每整点更新数据)</div>
        </div>
        <div class="total-div">
            <div class="total-left">
                <span>交易总金额</span>
                <span>{{total.tradeAmount/100 | currency '' }}元</span>
            </div>
            <div class="total-right">
                <div>
                    <span>交易总笔数(笔)</span>
                    <span>{{total.tradeNum}}</span>
                </div>
                <div class="">
                    <span>补贴总金额(元)</span>
                    <span>{{total.subsidyAmount/100 | currency '' }}元</span>
                </div>
            </div>
        </div>
        <div class="top-ten">
            <div>
                <h3>商户刷卡笔数排行</h3>
                <ul>
                    <li v-for="n in TradeAreaNumList">
                        <span>NO.{{$index + 1 }}</span>
                        <span>{{n.topName | substring 15}}</span>
                        <span>{{n.topValue}}笔</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3>卡bin刷卡笔数排行</h3>
                <ul>
                    <li v-for="n in CardBINTradeNumList">
                        <span>NO.{{$index + 1 }}</span>
                        <span>{{n.topName | substring 15}}</span>
                        <span>{{n.topValue}}笔</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../ajax/common/home_model'
    export default{
        data(){
            this.model=model(this);
            return{
                now:stringify(new Date()),
                total:{},
                activityList:[],
                TradeAreaNumList:[],
                CardBINTradeNumList:[],
                showList:false,
                searchDate:{
                    type:'now',
                    name:'',
                    activityID:'',
                    startDate:stringify(new Date()),
                    endDate:stringify(new Date()),
                }
            }
        },
        methods:{
            getList(){
                let data={
                    activityID:this.searchDate.activityID,
                    startDate:this.searchDate.startDate,
                    endDate:this.searchDate.endDate,
                }
                this.model.getTotal(data).then((res)=>{
                    this.$set('total',res.data.data);
                })
                this.model.getTradeAreaNumList(data).then((res)=>{
                    console.log(res.data.dataList)
                    this.$set('TradeAreaNumList',res.data.dataList);
                })
                this.model.getCardBINTradeNumList(data).then((res)=>{
                    console.log(res.data.dataList)
                    this.$set('CardBINTradeNumList',res.data.dataList);
                })
            },
            getTime(){
                if(this.searchDate.type=='now'){
                    this.searchDate.startDate=stringify(new Date());
                    this.searchDate.endDate=stringify(new Date());
                }else{
                    this.searchDate.startDate='';
                    this.searchDate.endDate='';
                }
                this.getList();
            },
            getActivity(){
                let data={
                    name:this.searchDate.name,
                }
                this.model.getActivityList(data).then((res)=>{
                    if(res.data.code===0){
                        this.$set('activityList',res.data.data);
                        this.showList=true;
                    }
                })
            },
            getId({id,name}){
                this.showList=false;
                this.searchDate.name=name;
                this.searchDate.activityID=id;
                this.getList();
            }
        },
        created(){
            this.getList();
        }
    }
</script>