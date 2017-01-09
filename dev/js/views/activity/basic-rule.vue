<template>
<activity-main :propclass="'basic-rule'" :showstep.sync="showstep">
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动名称</div>
        <div class="rule-input">
            <input class="input" type="text" v-model="addData.name" placeholder="请输入活动名称" />
        </div>
    </div>
    <!-- <div class="rule-row">
        <div class="rule-label"><i>*</i>所在地区</div>
        <div class="rule-input">
            <select class="select" v-model="addData.province" @change="getCity">
                <option value="">请选择省份</option>
                <option v-for="n in provinceList" :value="n.id">{{n.name}}</option>
            </select>
            <select class="select" v-model="addData.city">
                <option value="">请选择城市</option>
                <option v-for="n in cityList" :value="n.id">{{n.name}}</option>
            </select>
        </div>
    </div> -->
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动预算</div>
        <div class="rule-input">
            <input class="input" type="text" v-model="addData.budget" v-limitaddprice="addData.budget" placeholder="请输入预算" />
            <span>元</span>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动持续时间</div>
        <div class="rule-input">
            <ks-date-picker time="00:00:00" @change="setincludeTimes"
                            placeholder="活动时间" :value.sync="addData.startTime"></ks-date-picker>
            <div class="m20">---</div>
            <ks-date-picker time="23:59:59" @change="setincludeTimes"
                            placeholder="活动时间" :value.sync="addData.endTime"></ks-date-picker>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>可选时间段</div>
        <div class="rule-input">
            <ks-checkbox v-for="n in weeksList" :checked.sync="n.checked">{{n.name}}</ks-checkbox>
        </div>
    </div>
    <!--<div class="rule-row">-->
        <!--<div class="rule-label"><i>*</i>删选时间</div>-->
        <!--<div class="rule-input">-->
                <!--<a @click="dater.show = true" class="btn btn-primary">删选时间</a>-->
                <!--<ks-dater style="position: relative; z-index: 9" v-show="dater.show" :exclude="true"-->
                          <!--:value.sync="dater.includeTimes" @change="removeDate"-->
                          <!--placeholder="删选时间"></ks-dater>-->
        <!--</div>-->
    <!--</div>-->
    <div class="rule-row">
        <div class="rule-label">全天</div>
        <div class="rule-input">
            <ks-switch :color="'#2196F3'" :checked.sync="switch" @change="addtimesList"></ks-switch>
        </div>
    </div>
    <div class="rule-row" v-show="!switch">
        <div class="rule-label">可选时间段</div>
        <!-- 时间多段设定 -->
        <div class="rule-input">
            <div class="db" v-for="n in timesList.length">
                <select class="select" v-model="timesList[n].start" @change="timesList[n].end==''">
                    <option v-for="i in 24" :value="i + ':' + '00'" v-text="i + ':' + '00'">时间</option>
                </select>
                <span class="mr15">至</span>
                <select class="select" v-model="timesList[n].end">
                    <option v-for="i in 23 - timesListShadow[n]"
                            :value="i + timesListShadow[n] + 1 + ':' + '00'"
                            v-text="i + timesListShadow[n] + 1 + ':' + '00'"
                    >时间</option>
                    <option :value="'23:59'" v-text="'23:59'">时间</option>
                </select>
                <i v-if="n===0" class="icon-add" @click="timesList.push({'start':'0:00','end':'23:59'})"></i>
                <i v-if="n!==0" class="icon-remove" @click="timesList.splice(n, 1)"></i>
            </div>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动主题</div>
        <div class="rule-input">
            <textarea class="input textarea" v-model="addData.subject"></textarea>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动细则</div>
        <div class="rule-input">
            <textarea class="input textarea" v-model="addData.detail"></textarea>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row tc">
        <a class="btn btn-gray" @click="submitAdd(false)">保存草稿</a>
        <a class="btn btn-primary" @click="submitAdd(true)">下一步</a>
    </div>
</activity-main>
</template>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/basic_model'
    export default{
        computed: {
            /**
             * @description 可选时间段的映射
             * @summary 用来实现可选时间段后者大于前者
             */
            timesListShadow () {
                let timesList = this.timesList

                return timesList.map(m => m && m.start && m.start.split(':')[0] << 0)
            },
        },
        data(){
            this.model=model(this)
            return{
                showstep:0,
                // provinceList:[],
                // cityList:[],
                addData:{
                    // province:'',
                    id:'',
                    name:'',
                    // city:'',
                    budget:'',
                    startTime:'',
                    endTime:'',
                    actType:'common_act',
                    subject:'',
                    detail:'',
                    propes :sessionStorage.getItem('props'),
                },
                timesList:[
                    {start:'0:00',end:'23:59'}
                ],
                dater:{
                    show:false,
                    includeTimes:''
                },
                weeksList:[
                    {name:'周日',checked:true,id:0},
                    {name:'周一',checked:true,id:1},
                    {name:'周二',checked:true,id:2},
                    {name:'周三',checked:true,id:3},
                    {name:'周四',checked:true,id:4},
                    {name:'周五',checked:true,id:5},
                    {name:'周六',checked:true,id:6}
                ],
                switch:true
            }
        },
        methods:{
            setincludeTimes(){

            },
            removeDate(){

            },
            addtimesList(){
                this.switch? this.timesList=[{start:'0:00',end:'23:59'}]:null;
            },
            gettimesList(data){
                let arr=[];
                _.map(data,(val)=>{
                    arr.push(val.start+'~'+val.end);
                })
                return arr;
            },
            getweeks(data){
                let arr=[];
                _.map(data,(val)=>{
                    val.checked?arr.push(val.id):null;
                })
                return arr;
            },
            setweeks(data,weeks){
                let arr=_.cloneDeep(weeks);
                _.map(arr,(val)=>{
                    if(_.difference(data, [''+val.id]).length==data.length){
                        val.checked=false;
                    }
                })
                return arr;
            },
            // getProvince(){
            //     this.$common_model.getProvince().then((res)=>{
            //         if(res.data.code===0){
            //             this.$set('provinceList',res.data.data);
            //         }
            //     })
            // },
            // initCity(){
            //     if(!this.addData.province)return;
            //     let data={
            //         province:this.addData.province
            //     }
            //     this.$common_model.getCity(data).then((res)=>{
            //         if(res.data.code===0){
            //             this.$set('cityList',res.data.data);
            //         }
            //     })
            // },
            // getCity(){
            //     this.addData.city='';
            //     if(!this.addData.province)return;
            //     let data={
            //         province:this.addData.province
            //     }
            //     this.$common_model.getCity(data).then((res)=>{
            //         if(res.data.code===0){
            //             this.$set('cityList',res.data.data);
            //         }
            //     })
            // },
            settimesList(data){
                // 解析 req 数据
                let times=[];
                data.forEach(m => {
                    let splitedTime = m.split('~')
                    let time = {
                        start: splitedTime[0] === 'null' ? null : splitedTime[0],
                        end: splitedTime[1] === 'null' ? null : splitedTime[1]
                    }
                    times.push(time)
                })
                return times;
            },
            verifyField (data) {
                // 错误名称映射表 表内是需要检测的字段
                let errMapper = {
                    name: '活动名称',
//                    city: '所在地区',
                    actType: '活动类型',
                    budget: '活动预算',
                    propes: '活动性质',
                    weeksList: '可选时间段',
                    subject: '活动主题',
                    detail: '活动细则'
                }

                // 检测是否存在未填写项
                for (let k in data) {
                    let m = data[k]
                    let err = errMapper[k] && new Error(`请检查 ${errMapper[k]} 字段!`)

                    /*global _*/
                    if ((!m && err) || (_.isArray(m) && !m.length && err)) {
                        throw err
                    }
                }

                // 活动时间检查
                if (data.endTime <= data.startTime) {
                    throw new Error('活动开始时间不能大于等于活动结束时间!')
                }

                // 活动时间段检查
                let timesList = data.timesList
                timesList && timesList.forEach(m => {
                    let timesList = m.split(' ~ ')
                    if (timesList[0] === 'null' || timesList[1] === 'null') {
                        throw new Error('可选时间段中的两个选择框都要是必填项!')
                    }
                })
            },
            submitAdd(bool){
                let data=_.cloneDeep(this.addData);
                data.weeksList=this.getweeks(this.weeksList);
                data.systemId='yhhd';
                data.step =this.showstep+1;
                data.ruleType =this.$route.params.rulename;
                data.timesList=this.gettimesList(this.timesList);
                data.uuid =JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                data.organizer =JSON.parse(sessionStorage.getItem('loginList')).organizerID;
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
                            this.$router.go({'name':this.$route.params.rulename});
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
            sessionStorage.removeItem('activityId');
        },
        created(){
            // this.getProvince();
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