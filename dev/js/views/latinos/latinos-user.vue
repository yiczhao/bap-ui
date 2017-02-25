<template>
    <div class="latinos-user">
        <activity-step :datas="datas" :showstep.sync="showstep"></activity-step>
        <div class="user-title">
            <h5>*手机号</h5>
            <a>上传手机号Excel表</a>
            <upload
                    :src.sync="upCheck.upload_src"
                    :size="1048576"
                    :exts="['xlsx','doc','docx','xls']"
                    :url="'./user/rights/phone/upload_read_excel'"></upload>
            <span>/</span>
            <a @click="downLoad">下载手机号Excel表</a>
        </div>
        <div class="batch-upload">
            <div>
                <label>*</label>
                <input type="text" class="input" v-model="userData.title" placeholder="分享标题"/>
            </div>
        </div>
    </div>
    <div class="batch-btn">
        <a class="btn btn-primary">确定</a>
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
            showstep:1,
            id:'',
            upCheck:{
                upload_src:'',
                textarea:'',
            },
            userData:{
                title:''
            }
        }
    },
    methods:{
        downLoad(){
            window.open(origin+'/user/rights/phone/download');
        }
    },
    created(){
        this.id=this.$route.params.latinosUserId;
        console.log(this.id);
        this.model.getBatchList(this.id).then((res)=>{
        })
    },
    components: { activityStep }
}
</script>