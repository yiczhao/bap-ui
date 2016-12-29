<template>
    <div class="activity-main">
        <activity-step :datas="datas" :showstep.sync="showstep"></activity-step>
        <div class="rule-main" :class="propclass">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
    import activityStep from '../../components/activity-step.vue'
    export default{
        props:{
            datas:{type:Array,require:true,default:[]},
            propclass:{type:String},
            showstep:{type:Number,default:1}
        },
        data(){
            return{
            }
        },
        methods:{
        },
        ready(){
        },
        components: { activityStep }
    }
</script>