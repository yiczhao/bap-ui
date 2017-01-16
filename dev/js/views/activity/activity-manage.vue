<template>
<div class="activity-manage">
    <div class="activity-row activity-title">
        <div class="search-div">
            <span>活动名称</span>
            <input class="input" type="text" v-model="searchDate.name" placeholder="输入活动名称"/>
            <span>活动时间</span>
            <ks-date-picker time="00:00:00" @change=""
                            placeholder="开始时间" :value.sync="searchDate.startTime"></ks-date-picker>
            <span>到</span>
            <ks-date-picker time="23:59:59" @change=""
                            placeholder="结束时间" :value.sync="searchDate.endTime"></ks-date-picker>
            <span>活动性质</span>
            <select class="select" v-model="actPropes" @change="getactPropes">
                <option value="">全部性质</option>
                <option value="online">线上活动</option>
                <option value="offline">线下活动</option>
            </select>
            <a class="btn btn-primary" @click="getList">搜索</a>
        </div>
        <div class="search-div">
            <span>活动状态</span>
            <ks-checkbox @change="checked(['draft_other'],checkedBox[0])" :checked.sync="checkedBox[0]">草稿</ks-checkbox>
            <ks-checkbox @change="checked(['draft','check_fail','wait_check'],checkedBox[1])" :checked.sync="checkedBox[1]">待审核</ks-checkbox>
            <ks-checkbox @change="checked(['online'],checkedBox[2])" :checked.sync="checkedBox[2]">运行中</ks-checkbox>
            <ks-checkbox @change="checked(['early_offline','finish'],checkedBox[3])" :checked.sync="checkedBox[3]">已结束</ks-checkbox>
        </div>
    </div>
    <div class="table-row">
        <table class="table">
            <tr>
                <th>活动名称</th>
                <th>活动开始时间</th>
                <th>活动结束时间</th>
                <th>线上&线下</th>
                <th>活动创建时间</th>
                <th>所属银行</th>
                <th>活动状态</th>
                <th>活动详情</th>
                <th>交易</th>
                <!--<th>权益</th>-->
                <th>操作</th>
            </tr>
            <tr v-show="!!searchList" v-for="n in searchList">
                <td>{{n.name}}</td>
                <td>{{n.startTime | datetimes}}</td>
                <td>{{n.endTime | datetimes}}</td>
                <td>
                    <template v-if="n.propes=='online'">线上</template>
                    <template v-else>线下</template>
                </td>
                <td>{{n.createdAt | datetimes}}</td>
                <td>{{n.uuid | get_bank uuidsList}}</td>
                <td>
                    <template v-if="n.status=='draft_other'">草稿</template>
                    <template v-if="n.status=='wait_early_offline'">运行中</template>
                    <template v-if="n.status=='draft'">待审核</template>
                    <template v-if="n.status=='wait_check'">待审核</template>
                    <template v-if="n.status=='check_fail'">审核失败</template>
                    <template v-if="n.status=='online'">运行中</template>
                    <template v-if="n.status=='early_offline'">已结束</template>
                    <template v-if="n.status=='finish'">已结束</template>
                </td>
                <td><a v-link="{name:'activity-info',params:{'infoId':n.id}}">查看</a></td>
                <td><a v-if="n.status!='draft_other'&&n.status!='draft'&&n.status!='wait_check'" v-link="{name:'transaction-detail',params:{'transactionName':n.name,'transactionId':n.uniqueId}}">查看</a></td>
                <!--<td></td>-->
                <td>
                    <a v-if="n.step==1&&n.status=='draft_other'" @click="setProp(n.propes,n.ruleType)" v-link="{name:'basic-rule',params:{'activityId':n.id,'rulename':n.ruleType}}">编辑</a>
                    <a v-if="n.step==2&&n.status=='draft_other'" @click="setProp(n.propes,n.ruleType)" v-link="{name:n.ruleType,params:{'ruleId':n.id}}">编辑</a>
                    <a v-if="n.step==3&&n.status=='draft_other'" @click="setProp(n.propes,n.ruleType)" v-link="{name:'bussiness-set',params:{'bactivityId':n.id}}">编辑</a>
                    <a v-if="n.status=='draft_other'" @click="deleteActivity(n.id)">删除</a>
                </td>
            </tr>
            <tr v-show="!searchList.length">
                <td colspan="10">未查询到数据</td>
            </tr>
        </table>
        <div v-show="!!searchList">
            <pagegroup
                    :total="searchDate.total"
                    :page_size.sync="searchDate.maxResult"
                    :page_current.sync="searchDate.page"
                    v-on:current_change="getfirstResult"
                    v-on:size_change="getfirstResult"
            ></pagegroup>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
    import model from '../../ajax/activity/activity_manage_model'
    export default{
        data(){
            this.model=model(this)
            return{
                searchList:[],
                actPropes:'',
                uuidsList:JSON.parse(sessionStorage.getItem('bankNames')),
                searchDate:{
                    name:'',
                    actPropes:null,
                    startTime:JSON.parse(sessionStorage.getItem('loginList')).bankCreateTime,
                    endTime:stringify(new Date())+' 23:59:59',
                    statuses:['online','draft_other','draft','wait_check','check_fail','early_offline','finish'],
                    page:1,
                    firstResult:0,
                    maxResult:10,
                    uuids:_.split(sessionStorage.getItem('uuids'), ','),
                    systemId:'yhhd',
                    total:0
                },
                checkedBox:[true,true,true,true]
            }
        },
        methods:{
            getfirstResult(){
                this.searchDate.firstResult=(this.searchDate.page-1)*this.searchDate.maxResult;
                this.getList();
            },
            setProp(val,val1){
                sessionStorage.setItem('props',val)
                sessionStorage.setItem('rulename',val1)
            },
            getactPropes(){
                (!this.actPropes)?this.searchDate.actPropes=null:this.searchDate.actPropes= this.actPropes;
            },
            checked(type,bool){
                if(bool){
                    this.searchDate.statuses=_.concat(this.searchDate.statuses,type);
                }else{
                    _.pullAll(this.searchDate.statuses,type);
                }
                this.getList();
            },
            getList(){
                this.model.getList(this.searchDate).then((res)=>{
                    if(res.data.code===0){
                        this.$set('searchList',res.data.data);
                        this.searchDate.total=res.data.total;
                    }
                })
            },
            deleteActivity(_id){
                this.model.deleteActivity(_id).then((res)=>{
                    if(res.data.code===0){
                        dialog('successTime','已删除')
                        this.getList();
                    }
                })
            }
        },
        ready(){
            sessionStorage.removeItem('activityId');
        },
        created(){
            this.getList()
        }
    }
</script>