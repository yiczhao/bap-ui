<template>
<div class="rule-input">
    <span>每满</span>
    <input class="input" type="text" v-model="submitdata.meetMoney" v-limitaddprice="submitdata.meetMoney"/>
    <span>元，立减</span>
    <input class="input" type="text" v-model="submitdata.minusMoney" v-limitaddprice="submitdata.minusMoney"/>
    <span>元</span>
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
                submitdata: {
                    meetMoney:'',
                    minusMoney:'',
                }
            }
        },
        methods:{
        },
        events:{
            getData(){
                this.$dispatch('getDatas',  this.submitdata);
            },
            setData(data){
                let sdata={
                    meetMoney:data.meetMoney,
                    minusMoney:data.minusMoney,
                };
                this.$set('submitdata', sdata);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>