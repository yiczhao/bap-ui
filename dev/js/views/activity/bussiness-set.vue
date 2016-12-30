<template>
<activity-main :propclass="'bussiness-set'" :datas="datas" :showstep.sync="showstep">
    <div class="rule-row rule-title">
        <a class="btn btn-primary">添加商户</a>
        <div class="search-div">
            <span>商户名称</span>
            <input class="input" type="text" v-model="searchData.name"/>
            <a class="btn btn-primary">查询</a>
        </div>
    </div>
    <div class="rule-row tc">
        <a class="btn btn-primary" @click="backBasic">上一步</a>
        <a class="btn btn-gray" @click="submitAdd(false)">保存草稿</a>
        <a class="btn btn-primary" @click="submitAdd(true)">下一步</a>
    </div>
</activity-main>
</template>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/basic_model'
    export default{
        data(){
            this.model=model(this)
            return{
                showstep:2,
                searchData:{
                    name:''
                },
                datas:[
                    '活动基本设置',
                    '活动规则设置',
                    '活动商户设置'
                ],
            }
        },
        methods:{
            backBasic(){
                this.$router.go({'name':sessionStorage.getItem('rulename'),params:{'propes':this.$route.params.bpropes,'rulename':sessionStorage.getItem('rulename')}});
            },
            submitAdd(bool){
                let data=_.cloneDeep(this.addData);
                data.weeksList=this.getweeks(this.weeksList);
                data.sysid=13;
                data.step =this.showstep+1;
                data.ruleType =this.$route.params.rulename;
                data.timesList=this.gettimesList(this.timesList);
                if (true) {
                    try {
                        this.verifyField(data)
                    } catch (e) {
                        this.errHandle(e.message)
                        return
                    }
                }
                if(!bool){
                    !!sessionStorage.getItem('activityId')?data.id=sessionStorage.getItem('activityId'):data.id=this.$route.params.activityId << 0;
                }
                this.model.addBasic(data).then((res)=>{
                    if(res.data.code===0){
                        let activityId = this.$route.params.activityId << 0;
                        if (bool) {
                            sessionStorage.setItem('activityId',res.data.data);
                            sessionStorage.setItem('rulename',this.$route.params.rulename);
                            this.$router.go({'name':this.$route.params.rulename,params:{'propes':data.propes}});
                        }else{
                            dialog('successTime','草稿保存成功！')
                        }
                    }
                })
            },
            /**
             * @description 错误处理
             * @summary 只是简单的提示用处错误信息
             */
            errHandle (err) {
                dialog('info', err)
            },
        },
        ready(){
            (this.$route.params.bpropes=='online')?this.datas=[ '活动基本设置', '活动规则设置', '活动商户设置','活动权益配置']: this.datas=[ '活动基本设置', '活动规则设置', '活动商户设置']
        },
        created(){
            let activityId = this.$route.params.activityId << 0;
            if (activityId) {
                // 获取活动信息
                this.model.getAddList(activityId).then((res)=>{
                    this.$set('addData',res.data.data);
                    this.$set('weeksList',this.setweeks(res.data.data.weeksList,this.weeksList));
                    this.$set('timesList',this.settimesList(res.data.data.timesList));
                    res.data.data.timesList.length==1&&res.data.data.timesList[0]==='0:00~23:59'?this.$set('switch',true):this.$set('switch',false);
                })
            }
        },
        components: { activityMain }
    }
</script>