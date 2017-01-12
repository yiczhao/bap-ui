<template>
    <div class="activity-info">
        <div class="info-title">
            <ul class="tab-bor">
                <li @click="step=1" :class="{'active':step===1}">活动基本信息</li>
                <li v-show="!!ruleList.ruleType" @click="step=2" :class="{'active':step===2}">规则设置</li>
                <li v-show="!!storeList.length" @click="step=3" :class="{'active':step===3}">商户信息</li>
                <!--<li @click="step=4" :class="{'active':step===4}">权益信息</li>-->
            </ul>
        </div>
        <div class="info-main">
            <div class="main-title">
                <span>活动名称： {{basicData.name}}</span>
                <span v-if="!!ruleList.ruleName">活动形式： {{ruleList.ruleName}}</span>
                <span>创建时间： {{basicData.createdAt}}</span>
                <span>所属银行：{{basicData.uuid | get_bank uuidsList}}</span>
            </div>
            <div v-show="step===1" class="info-basic">
               <div class="main-row">
                   <span>活动名称：</span>
                   <span>{{basicData.name}}</span>
               </div>
                <div class="main-row">
                    <span>活动主办方： </span>
                    <span>{{basicData.uuid | get_bank uuidsList}}</span>
                </div>
                <div class="main-row">
                    <span>活动预算： </span>
                    <span> {{basicData.budget | currency ''}}元</span>
                </div>
                <div class="main-row">
                    <span>参与时间段：</span>
                    <span>每天参与时间段<template v-for="n in basicData.timesList">【{{n}}】</template></span>
                    <span>活动时间：  {{basicData.startTime}} ~ {{basicData.endTime}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w85">活动主题：</span>
                    <span>{{basicData.subject}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w85">活动细则：</span>
                    <span>{{basicData.detail}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w140">POS小票内容设置：</span>
                    <span>{{basicData.posPrint}}</span>
                </div>
            </div>
            <div v-show="step===2" class="info-rule">
                <div class="main-row table-row">
                    <span class="w140">{{ruleList.ruleName}}：</span>
                    <template v-if="ruleList.ruleType=='MeetMinus'">
                         <span v-for="n in ruleList[ruleList.ruleTypes]">
                            满{{n.meetMoney}}元，减{{n.minusMoney}}元.
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='EveryMeetMinus'">
                        <span>每满{{ruleList[ruleList.ruleTypes].meetMoney}}元，减{{ruleList[ruleList.ruleTypes].minusMoney}}元.</span>
                    </template>
                    <template v-if="ruleList.ruleType=='ImmediatelyMinus'">
                        <span>立减{{ruleList[ruleList.ruleTypes].money}}元.</span>
                    </template>
                    <template v-if="ruleList.ruleType=='RandomMinus'">
                        <span v-for="n in ruleList[ruleList.ruleTypes]">
                            随机立减{{n.amount}}元，{{n.number}}名.
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='MeetDiscount'">
                        <span v-for="n in ruleList[ruleList.ruleTypes]">
                            满{{n.meetMoney}}元，打{{n.discount}}折.
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='Ticket'">
                         <span v-for="n in ruleList[ruleList.ruleTypes]">
                             票务名称{{n.name}}，原价{{n.originalPrice}}元，实付{{n.actualPayment}}元.
                             单次每卡可购{{n.numberLimit}}张
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='SerialDiscount'">
                         <span v-for="n in ruleList[ruleList.ruleTypes]">
                            用户刷卡{{n.belowMoney}}以内，第{{n.time}}次，可享受{{n.discount}}折.
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='WeekdayDiscount'">
                         <span v-for="n in ruleList[ruleList.ruleTypes]">
                             每周{{n.weekday}}，打{{n.discount }}折.
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='DateDiscount'">
                         <span v-for="n in ruleList[ruleList.ruleTypes]">
                              {{n.date}}号，立减{{n.discount}}折.
                         </span>
                    </template>
                    <template v-if="ruleList.ruleType=='RandomDiscount'">
                         <span v-for="n in ruleList[ruleList.ruleTypes]">
                            随机{{n.discount}}折，{{n.number}}名.
                         </span>
                    </template>
                </div>
                <div v-show="!!ruleList.moneys.length" class="main-row table-row">
                    <span>金额限制：</span>
                    <span v-for="n in ruleList.moneys">
                        <template v-if="n.type =='minimum_consume'">
                            最低消费金额:{{n.amount}}元.
                        </template>
                         <template v-if="n.type =='max_preferential'">
                            最高优惠金额:{{n.amount}}元.
                        </template>
                         <template v-if="n.type =='less_than'">
                            多少元内参与打折:{{n.amount}}元.
                        </template>
                    </span>
                </div>
                <div v-show="!!ruleList.quantities.length" class="main-row table-row">
                    <span>参与次数限制：</span>
                    <span v-for="n in ruleList.quantities">
                        <template v-if="n.type =='act_total'">
                            活动总数限制:共{{n.total}}次，每天{{n.totalDay }}次，每周{{n.totalWeek }}次，每月{{n.totalMonth }}次.
                        </template>
                        <template v-if="n.type =='store_card'">
                            商户每卡参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                        <template v-if="n.type =='store'">
                            每商户参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                        <template v-if="n.type =='card'">
                            每卡参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                        <template v-if="n.type =='user'">
                            用户参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                    </span>
                </div>
            </div>
            <div v-show="step===3" class="info-store">
                <div class="store-title">共{{storeList.length}}家商户</div>
                <table class="table">
                    <tr>
                        <th>商户ID</th>
                        <th>商户名称</th>
                        <th>地区</th>
                    </tr>
                    <tr v-for="n in storeList">
                        <td>{{n.storeId}}</td>
                        <td>{{n.storeName}}</td>
                        <td>{{n.industry}}</td>
                    </tr>
                </table>
            </div>
            <div v-show="step===4" class="info-quanyi">
                权益信息
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .activity-info{
        .info-title{
            .tab-bor{
                position: relative;
                top: -20px;
                left: -20px;
                font-size: 16px;
                li{
                    cursor: pointer;
                }
            }
        }
        .info-main{
            font-size: 15px;
            .main-title{
                margin:20px;
                span{
                    font-size: 17px;
                    margin-right: 40px;
                }
            }
            .info-basic,.info-store,.info-rule{
                margin-left: 30px;
                padding-right: 20px;
                .table-row{
                    span{
                        display: table-cell;
                    }
                    .w85{
                        width: 85px;
                    }
                    .w140{
                        width: 140px;
                    }
                }
                .main-row{
                    padding: 20px 0;
                    span{
                        min-width: 100px;
                        margin-right: 20px;
                    }
                }
            }
            .store-title{
                font-size: 16px;
                margin-bottom: 10px;
            }
        }
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/activity/info_model'
    export default{
        data(){
            this.model=model(this)
            return{
                step:1,
                uuidsList:JSON.parse(sessionStorage.getItem('bankNames')),
                basicData:{},
                ruleList:{
                    moneys:[],
                    quantities:[]
                },
                storeList:[],
                ruleTypes: {
                    'MeetMinus':['meetMinuses','满多少减多少'],// 满多少减多少
                    'EveryMeetMinus':['everyMeetMinus','每满多少减多少'],// 满多少减多少
                    'ImmediatelyMinus':['immediatelyMinus','立减'],// 立减
                    'RandomMinus':['randomMinuses','随机立减'],// 随机立减
                    'MeetDiscount':['meetDiscounts','折扣'],// 折扣
                    'Ticket':['tickets','票务规则'],// 票务规则
                    'SerialDiscount':['serialDiscounts','连环折扣'],// 连环折扣
                    'WeekdayDiscount':['weekdayDiscounts','周几几折'],// 周几几折
                    'DateDiscount':['dateDiscounts','几号几折'],// 几号几折
                    'RandomDiscount':['randomDiscounts','随机折扣'],// 随机折扣
                }
            }
        },
        methods:{
            getRules(data){
                let datas=_.cloneDeep(data);
                datas.ruleTypes=this.ruleTypes[data.ruleType][0];
                datas.ruleName=this.ruleTypes[data.ruleType][1];
                this.$set('ruleList',datas);
            }
        },
        created(){
            let activityId=this.$route.params.infoId;
            this.model.getinfoList(activityId).then((res)=>{
                if(res.data.code===0){
                    console.log(res.data.data);
                    this.$set('basicData',res.data.data.base);
                    this.$set('storeList',res.data.data.store.bankMarketingStores);
                    this.getRules(res.data.data.ruleAndLimit);
                }
            })
        },
    }
</script>