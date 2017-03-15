<template>
    <div class="include-area">
        <div class="search-div">
            <input class="input " type="text" v-model="searchDate.name" placeholder="输入活动名称" @keypress.enter="getActivity"/>
            <div class="showList showLi" v-show="showList">
                <ul class="showLi">
                    <li class="showLi" v-for="n in activityList | filterBy this.replaceName in 'name'" @click="getId(n)">{{n.name}}</li>
                    <li class="showLi" v-if="!activityList.length">未查询到{{searchDate.name}}活动</li>
                </ul>
            </div>
            <select class="select" v-model="searchDate.type">
                <option value="">时间类型</option>
                <option value="all">累计</option>
                <option value="now">今日</option>
            </select>
            <input class="btn btn-primary" type="button" @click="getTime" value="搜 索">
        </div>
        <div class="right">展示所有正在进行中的活动今日、累计的刷卡数据，以及活动中不同商户交易、不同卡bin交易的笔数排行。</div>
        <div class="right">当前数据截止到小时,{{now}} (每整点更新数据)</div>
    </div>
    <div class="home">
        <div class="total-div">
            <div class="total left">
                <span>{{total.tradeAmount[0]}}.<i v-if="total.tradeAmount.length!=1">{{total.tradeAmount[1]}}</i><i v-else>00</i></span>
                <span>交易总金额(元)</span>
            </div>
            <div class="total center">
                    <span>{{total.tradeNum[0]}}</span>
                    <span>交易总笔数(笔)</span>
            </div>
            <div class="total right">
                <span>{{total.subsidyAmount[0]}}.<i v-if="total.subsidyAmount.length!=1">{{total.subsidyAmount[1]}}</i><i v-else>00</i></span>
                <span>补贴总金额(元)</span>
            </div>
        </div>
        <div class="top-ten">
            <div>
                <h4>商户刷卡笔数排行</h4>
                <ul>
                    <li v-for="n in TradeAreaNumList">
                        <span>{{$index + 1 }}</span>
                        <span>{{n.topName | substring 15}}</span>
                        <span><i>{{n.topValue}}</i>笔</span>
                    </li>
                </ul>
            </div>
            <div>
                <h4>卡bin刷卡笔数排行</h4>
                <ul>
                    <li v-for="n in CardBINTradeNumList">
                        <span>{{$index + 1 }}</span>
                        <span>{{n.topName | substring 15}}</span>
                        <span><i>{{n.topValue}}</i>笔</span>
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
                total:{
                    tradeAmount:'',
                    tradeNum:'',
                    subsidyAmount:'',
                },
                activityList:[],
                TradeAreaNumList:[],
                CardBINTradeNumList:[],
                showList:false,
                searchDate:{
                    type:'',
                    name:'',
                    activityID:'',
                     startDate:'',
                     endDate:'',
                     bankUuidString:'',
                },
                replaceName:'',
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
                    var tradeAmount=String(res.data.data.tradeAmount);
                    var tradeNum=String(res.data.data.tradeNum);
                    var subsidyAmount=String(res.data.data.subsidyAmount);
                    this.total.tradeAmount=tradeAmount.split('.');
                    this.total.tradeNum=tradeNum.split('.');
                    this.total.subsidyAmount=subsidyAmount.split('.');
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
                this.replaceName=(this.searchDate.name).replace(/(^\s+)|(\s+$)/g, "");
                let data={
                    name:this.replaceName,
                    maxResult:100,
                    uuids:_.split(sessionStorage.getItem('uuids'), ',')
                }
                if(!this.replaceName){
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