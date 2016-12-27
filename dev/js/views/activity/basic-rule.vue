<template>
<activity-main :datas="datas" :showstep.sync="showstep">
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动名称</div>
        <div class="rule-input">
            <input class="input" type="text"/>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>所在地区</div>
        <div class="rule-input">
            <select class="select">
                <option>请选择省份</option>
            </select>
            <select class="select">
                <option>请选择市区</option>
            </select>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动类型</div>
        <div class="rule-input">
            <a class="btn btn-info">常规活动</a>
            <a class="btn btn-gray">票务活动</a>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动性质</div>
        <div class="rule-input">
            <a class="btn btn-info">线上活动</a>
            <a class="btn btn-gray">线下活动</a>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动持续时间</div>
        <div class="rule-input">
            <ks-date-picker time="00:00:00" @change=""
                            placeholder="活动时间" value="2016-10-12"></ks-date-picker>
            <span class="pl10 pr10">---</span>
            <ks-date-picker time="23:59:59" @change=""
                            placeholder="活动时间" value="2016-10-12"></ks-date-picker>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>可选时间段</div>
        <div class="rule-input">
            <ks-checkbox :checked=""  @change="">周日</ks-checkbox>
            <ks-checkbox :checked=""  @change="">周一</ks-checkbox>
            <ks-checkbox :checked=""  @change="">周二</ks-checkbox>
            <ks-checkbox :checked=""  @change="">周三</ks-checkbox>
            <ks-checkbox :checked=""  @change="">周四</ks-checkbox>
            <ks-checkbox :checked=""  @change="">周五</ks-checkbox>
            <ks-checkbox :checked=""  @change="">周六</ks-checkbox>
            <ks-switch></ks-switch>
        </div>
    </div>
</activity-main>
</template>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    export default{
        data(){
            return{
                showstep:0,
                datas:[
                    '活动基本设置',
                    '活动规则设置',
                    '活动商户设置',
                    '活动权益设置'
                ]
            }
        },
        methods:{
        },
        ready(){
        },
        components: { activityMain }
    }
</script>