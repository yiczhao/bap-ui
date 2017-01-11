<template>
<div class="rule-input" v-for="(index,n) in submitdata">
    <span>用户刷卡</span>
    <input class="input" type="text" v-model="n.belowMoney" v-limitaddprice="n.belowMoney"/>
    <span>以内，第</span>
    <input class="input" type="text" v-model="n.time" v-limitaddprice="n.time"/>
    <span>次，可享受</span>
    <input class="input" maxlength="1" type="text" v-model="n.discount" v-limitaddprice="n.discount"/>
    <span>折。</span>
    <i v-if="index===0" class="icon-add" @click="submitdata.push({'belowMoney':'','time':'','discount':''})"></i>
    <i v-if="index!==0" class="icon-remove" @click="submitdata.splice(index, 1)"></i>
</div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                ruleLists:[
                    {name: '卡BIN限制', checked: false, types: 'CardBin',keys:'cardBins'},
                    {name: '活动总数限制', checked: false, types: 'act_total',keys:'quantities'},
                    {name: '商户每卡参与次数', checked: false, types: 'store_card',keys:'quantities'},
                    {name: '每商户参与次数', checked: false, types: 'store',keys:'quantities'},
                    {name: '每卡参与次数', checked: false, types: 'card',keys:'quantities'},
                    {name: '最低消费金额', checked: false, types: 'minimum_consume',keys:'moneys'},
                    {name: '最高优惠金额', checked: false, types: 'max_preferential',keys:'moneys'}
                ],
                submitdata: [{
                    belowMoney:'',
                    time:'',
                    discount:''
                }]
            }
        },
        methods:{
        },
        events:{
            getData(){
                this.$dispatch('getDatas',  this.submitdata);
            },
            setData(data){
                let sdata=[];
                _.map(data,(val)=>{
                    sdata.push({
                        discount:val.discount,
                        belowMoney:val.belowMoney,
                        time:val.time
                    })
                })
                this.$set('submitdata', sdata);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>