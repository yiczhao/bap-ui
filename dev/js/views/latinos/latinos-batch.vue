<template>
    <div class="latinos-batch">
        <activity-step :datas="datas" :showstep.sync="showstep"></activity-step>
        <h5>宣传页面预览</h5>
        <div class="batch-upload">
            <div class="up-load">
                <div class="file"><input type="file" name=""></div>
                <div class="info">
                    <span>点击上传图片</span>
                    <span>图片支持jpg、jpeg、格式；尺寸720*280，大小不超过100k；</span>
                </div>
            </div>
            <div class="title">
                <label>*</label>
                <input type="text" class="input" v-model="batchData.title" placeholder="分享标题"/>
            </div>
            <div class="show-list">
                <h3>使用指南</h3>
                <ul>
                    <li>1.活动名称：{{bacthRule.name}}</li>
                    <li>2.{{bacthRule.rule}}</li>
                    <li>3.活动时间：{{bacthRule}}</li>
                    <li>4.{{bacthRule}}</li>
                    <li>5.该权益不兑现不找零</li>
                    <li>6.请在权益有效期内到店刷卡使用</li>
                    <li>7.权益发布银行对本权益的最终解释权</li>
                </ul>
            </div>
            <div class="show-list">
                <h3>适用门店</h3>
                <ul>
                    <li v-for="n in bacthRule.store">{{n.storeName}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="batch-btn">
        <a class="btn btn-primary" v-link="{'name':'latinos-user',params:{'latinosUserId':$route.params.batchUserId}}">下一步</a>
    </div>
</template>
<script>
import model from '../../ajax/latinos/latinos_batch_model'
import activityStep from '../../components/activity-step.vue'
export default{
    data(){
        this.model=model(this);
        return{
            datas:['生成宣传页','选择用户'],
            showstep:0,
            id:'',
            bacthRule:{
                name:'',
                name:'',
                name:'',
                name:'',
            },
            batchData:{
                batch:'',
                title:'',
            }
        }
    },
    methods:{
    },
    created(){
        this.id=this.$route.params.batchId;
        console.log(this.id);
        this.model.getBatchList(this.id).then((res)=>{
            if(res.data.code===0){
                console.log(res.data.data);
            }
        })
    },
    components: { activityStep }
}
</script>