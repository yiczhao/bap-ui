<template>
    <div class="home">
        <div class="search-div">
            <span>活动名称</span>
            <input class="input" type="text" v-model="searchDate.name" placeholder="输入活动名称" @keypress.enter="getActivity"/>
            <div class="showList showLi" v-show="showList">
                <ul class="showLi">
                    <li class="showLi" v-for="n in activityList | filterBy searchDate.name in 'name'" @click="getId(n)">{{n.name}}</li>
                    <li class="showLi" v-if="!activityList.length">未查询到{{searchDate.name}}活动</li>
                </ul>
            </div>
            <span>时间类型</span>
            <select class="select" v-model="searchDate.type" @change="getTime">
                <option value="all">累计</option>
                <option value="now">今日</option>
            </select>
            <div class="right">当前数据截止到{{now}} (每整点更新数据)</div>
        </div>
        <div class="total-div">
            <div class="total-left">
                <span>交易总金额(元)</span>
                <span>{{total.tradeAmount}}</span>
            </div>
            <div class="total-right">
                <div>
                    <span>交易总笔数(笔)</span>
                    <span>{{total.tradeNum}}</span>
                </div>
                <div class="">
                    <span>补贴总金额(元)</span>
                    <span>{{total.subsidyAmount}}</span>
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
                total:[],
                activityList:[],
                TradeAreaNumList:[],
                CardBINTradeNumList:[],
                showList:false,
                searchDate:{
                    type:'all',
                    name:'',
                    activityID:'',
                     startDate:'',
                     endDate:'',
                     bankUuidString:'',
                }
            }
        },
        methods:{
            getList(){
                this.searchDate.bankUuidString=sessionStorage.getItem('uuids');
                let data={
                    activityID:this.searchDate.activityID,
                    startDate:this.searchDate.startDate,
                    endDate:this.searchDate.endDate,
                    compareFlag:true,
                    // bankUuidString:sessionStorage.getItem('uuids')
                    bankUuidString:this.searchDate.bankUuidString,
                };
                // (!!this.searchDate.activityID)? data.bankUuidString='':null;
                this.model.getTotal(data).then((res)=>{
                    this.$set('total',res.data.data);
                })
                this.model.getTradeAreaNumList(data).then((res)=>{
                    this.$set('TradeAreaNumList',res.data.dataList);
                })
                this.model.getCardBINTradeNumList(data).then((res)=>{
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
                    maxResult:100,
                    uuids:_.split(sessionStorage.getItem('uuids'), ',')
                }
                if(!this.searchDate.name){
                    this.searchDate.activityID="";
                    this.showList=false;
                    this.getList();
                }else{
                    this.$common_model.getActivityList(data).then((res)=>{
                        if(res.data.code===0){
                            this.$set('activityList',res.data.data);
                            this.showList=true;
                        }
                    })
                }
            },
            getId({uniqueId,name}){
                this.showList=false;
                this.searchDate.name=name;
                this.searchDate.activityID=uniqueId;
                this.getList();
            },
            resetName(){
                this.showList=false;
            }
        },
        ready() {
            document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('showLi')) {
                    this.resetName();
                }
            }, false);
        },
        beforeDestroy () {
            document.removeEventListener('click', this.resetName, false);
        },
        created(){
            formDataRequest('./bank/bank_list').get({'noPage':1}).then((res)=>{
                if(res.data.code===0){
                    let data=[]
                    let datas=[]
                    _.map(res.data.dataList,(val)=>{
                        (!!val.uuid)?data.push(val.uuid):null;
                        (!!val.uuid)?datas.push({
                            id:val.uuid,
                            name:val.shortName
                        }):null;
                    })
                    sessionStorage.setItem('uuids',_.join(data, ','));
                    sessionStorage.setItem('bankNames',JSON.stringify(datas));
                    this.getTime();
                    this.getList();
                }
            });

        }
    }
</script>