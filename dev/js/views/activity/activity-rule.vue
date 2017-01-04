<template>
<activity-main :propclass="'activity-rule'" :datas="datas" :showstep.sync="showstep">
    <div class="rule-row">
        <h3><i>*</i>活动规则</h3>
        <router-view></router-view>
    </div>
    <div class="dashed"></div>
    <div class="rule-row">
        <h3><i>*</i>活动条件设置</h3>
        <div class="rule-input">
            <ks-checkbox v-for="n in ruleLists" :checked.sync="n.checked">{{n.name}}</ks-checkbox>
        </div>
    </div>
    <div class="rule-row" v-for="n in ruleLists.length" v-show="ruleLists[n].checked">
        <h3>{{ruleLists[n].name}}</h3>
        <div class="rule-input" v-if="ruleLists[n].types=='CardBin'">
            <div class="db" v-for="(index,n) in ruleDatas.CardBin">
                <span>卡BIN</span>
                <select class="select" v-model="n.data">
                    <option value="">请选择卡片种类</option>
                </select>
                <input class="input" type="text" v-model="n.extData" v-limitids="n.extData"/>
                <i v-if="index===0" class="icon-add" @click="ruleDatas.CardBin.push({data :'',extData :''})"></i>
                <i v-if="index!==0" class="icon-remove" @click="ruleDatas.CardBin.splice(n, 1)"></i>
            </div>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='act_total'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.total"  v-limitaddprice="ruleDatas.act_total.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.totalMonth"  v-limitaddprice="ruleDatas.act_total.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.totalWeek"  v-limitaddprice="ruleDatas.act_total.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.totalDay"  v-limitaddprice="ruleDatas.act_total.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='store_card'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.total"  v-limitaddprice="ruleDatas.store_card.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.totalMonth"  v-limitaddprice="ruleDatas.store_card.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.totalWeek"  v-limitaddprice="ruleDatas.store_card.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.totalDay"  v-limitaddprice="ruleDatas.store_card.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='store'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.total"  v-limitaddprice="ruleDatas.store.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.totalMonth"  v-limitaddprice="ruleDatas.store.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.totalWeek"  v-limitaddprice="ruleDatas.store.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.totalDay"  v-limitaddprice="ruleDatas.store.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='card'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.total"  v-limitaddprice="ruleDatas.card.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.totalMonth"  v-limitaddprice="ruleDatas.card.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.totalWeek"  v-limitaddprice="ruleDatas.card.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.totalDay"  v-limitaddprice="ruleDatas.card.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='minimum_consume'">
            <span>最低消费</span>
            <input class="input" type="text" v-model="ruleDatas.minimum_consume.minimum_consume"  v-limitaddprice="ruleDatas.minimum_consume.minimum_consume"/>
            <span>元</span>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='max_preferential'">
            <span>最高优惠额</span>
            <input class="input" type="text" v-model="ruleDatas.max_preferential.max_preferential"  v-limitaddprice="ruleDatas.max_preferential.max_preferential"/>
            <span>元</span>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='less_than'">
            <input class="input" type="text" v-model="ruleDatas.less_than.less_than"  v-limitaddprice="ruleDatas.less_than.less_than"/>
            <span>元内，参与打折</span>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row tc">
        <a class="btn btn-primary" @click="backBasic">上一步</a>
        <a class="btn btn-gray" @click="submitAdd(false)">保存草稿</a>
        <a class="btn btn-primary" @click="submitAdd(true)">下一步</a>
    </div>
</activity-main>
</template>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/rule_model'
    export default{
        computed: {
        },
        data(){
            this.model=model(this)
            return {
                showstep: 1,
                nextBool:true,
                ruleLists: [
//                    {name: '卡BIN限制', checked: false, types: 'CardBin',keys:'cardBins'},
//                    {name: '活动总数限制', checked: false, types: 'act_total',keys:'quantities'},
//                    {name: '商户每卡参与次数', checked: false, types: 'store_card',keys:'quantities'},
//                    {name: '每商户参与次数', checked: false, types: 'store',keys:'quantities'},
//                    {name: '每卡参与次数', checked: false, types: 'card',keys:'quantities'},
//                    {name: '最低消费金额', checked: false, types: 'minimum_consume',keys:'moneys'},
//                    {name: '最高优惠金额', checked: false, types: 'max_preferential',keys:'moneys'},
//                    {name: '多少元内参与打折', checked: false, types: 'less_than',keys:'moneys'}
                ],
                ruleDatas:{
                    CardBin: [{data:'',extData :''}],
                    act_total:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'act_total'},
                    store_card:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'store_card'},
                    store:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'store'},
                    card:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'card'},
                    minimum_consume:{minimum_consume : '' ,type:'minimum_consume'},
                    max_preferential:{max_preferential : '',type:'max_preferential'},
                    less_than:{less_than : '',type:'less_than'},
                },
                ruleNames: {
                    'MeetMinus':'meetMinuses',// 满多少减多少
                    'EveryMeetMinus':'everyMeetMinus',// 每满多少减多少
                    'ImmediatelyMinus':'immediatelyMinus',//  立减规则
                    'RandomMinus':'randomMinuses',// 随机立减
                    'Ticket':'tickets',// 票务规则
                    'SerialDiscount':'serialDiscounts',//连环折扣
                    'WeekdayDiscount':'weekdayDiscounts',//周几几折
                    'MeetDiscount':'meetDiscounts',// 满多少打几折
                    'DateDiscount':'dateDiscounts',//几号几折
                    'RandomDiscount':'randomDiscounts',//随机折扣
                }
            }
        },
        methods:{
            backBasic(){
                this.$router.go({'name':'basic-rule',params:{'activityId':sessionStorage.getItem('activityId'),'rulename':sessionStorage.getItem('rulename')}});
            },
            getNextData(){
                let moneydata={
                    moneys:[],
                    quantities:[]
                };
                _.map(this.ruleLists,(val)=>{
                    if(val.checked&&val.types!='CardBin'){
                        moneydata[val.keys].push(this.ruleDatas[val.types])
                    }
                    if(val.checked&&val.types=='CardBin'){
                        moneydata[val.keys]=this.ruleDatas[val.types];
                    }
                })
                return moneydata;
            },
            submitAdd(bool){
                this.nextBool=bool;
                this.$broadcast('getData');
            }
        },
        events:{
          getDatas(datas){
              let sumitdata1=this.getNextData();
              let sumitdata2={};
              let rulename=sessionStorage.getItem('rulename');
              console.log(this.ruleNames[rulename]);
              sumitdata2[this.ruleNames[rulename]]=datas;
              let submitData=_.assign(sumitdata1, sumitdata2);
              submitData.step=this.showstep+1;
              submitData.ruleType=rulename;
              !!sessionStorage.getItem('activityId')?submitData.id=sessionStorage.getItem('activityId')>>0:null;
              console.log(submitData);
              this.model.addRule(submitData).then((res)=>{
                  if(res.data.code===0){
                      if (this.nextBool) {
                          this.$router.go({'name':'bussiness-set',params:{'bpropes':this.$route.params.propes}});
                      }else{
                          dialog('successTime','草稿保存成功！')
                      }
                  }
              })
          }
        },
        ready(){
            this.$set('ruleLists',this.$children[0].$children[1].ruleLists);
        },
        created(){
        },
        components: { activityMain }
    }
</script>