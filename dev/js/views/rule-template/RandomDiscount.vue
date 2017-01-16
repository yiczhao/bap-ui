<template>
<div class="rule-input" v-for="(index,n) in submitdata">
    <span>随机</span>
    <input class="input" type="text" v-model="n.discount" v-limitaddprice="n.discount"/>
    <span>折，</span>
    <input class="input" type="text" v-model="n.number" v-limitnumber="n.number"/>
    <span>名</span>
    <i v-if="index===0" class="icon-add" @click="submitdata.push({'discount':'','number':''})"></i>
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
                    {name: '最高优惠金额', checked: false, types: 'max_preferential',keys:'moneys'},
                    {name: '多少元内参与打折', checked: false, types: 'less_than',keys:'moneys'}
                ],
                submitdata: [{
                    discount:'',
                    number :'',
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
                        number:val.number,
                        discount:val.discount
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