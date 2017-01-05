<template>
<div class="rule-input" v-for="(index,n) in submitdata">
    <span>满</span>
    <input class="input" type="text" v-model="n.meetMoney" v-limitaddprice="n.meetMoney"/>
    <span>元，立减</span>
    <input class="input" type="text" v-model="n.minusMoney" v-limitaddprice="n.minusMoney"/>
    <span>元</span>
    <i v-if="index===0" class="icon-add" @click="submitdata.push({'meetMoney':'','minusMoney':''})"></i>
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
                ],
                submitdata: [{
                    'meetMoney':'',
                    'minusMoney ':'',
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
                this.$set('submitdata', data);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>