<template>
    <div class="custom" >
        <div><span></span></div>
        <div class="custom-section">
            <div class="title">活动自定义</div>
            <div class="type-text"><textarea v-model="upCheck.textarea" placeholder="如所给模板没有能满足您的活动需求时，请您将您的问题在此进行描述。尽量将您的需求描述完整，方便我们为您提供更好的服务。" @change="change"></textarea></div>
            <div class="upload-file">
                <div class="file">
                    <upload
                        :src.sync="upCheck.upload_src"
                        :size="1048576"  
                        :exts="['xlsx','doc','docx','xls']"></upload>
                </div>
                <!-- <div class="check"><a class="btn btn-primary" @click="submit">确定</a></div> -->
                <div class="info">仅支持Word、Excel文档</div>
            </div>
        </div>
        <div class="up-type">
            <a class="btn btn-primary" @click="submit">确定</a>
        </div>
    </div>
</template>
<style type="text/css">
    .upload-input{
        width: 360px;
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                src:{type:String,required: false},
                name:{type:String,required:false},
                server:{type:String,required: false},
                multiple:{type:String,required:false},
                imgshow:{type:Boolean,required:false,default:true},
                limit:{type:Number,required:false,default:null},
                upCheck:{
                    upload_src:'',
                    textarea:'',
                }
            }
        },
        methods:{
            showMessage(message){
                dialog('info', message);
            },
            /**
             * @description 上传图片逻辑
             * @param e {Object} 事件event对象
             */
            upload_picture(e) {
                let _this = this,
                        formdata = new FormData(),
                        exts = ['jpg','png','jpeg'],
                        files = e.target.files;

                if(this.limit&&files.length >this.limit){
                    this.showMessage("单次图片最多仅允许"+this.limit+"张")
                    return ;
                }

                for(let i = 0; i < files.length ; i ++){
                    if(files[i].size > 0.2 * 1024 * 1024){
                        this.showMessage("文件大小不能超过200KB");
                        return ;
                    }
                    formdata.append('upload', files[i]);
                }
                let file=e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(){
                    _this.src=this.result
                }
            },
            submit(){
                dialog('info','提示');
                console.log(this.upCheck)
            },
            change(){
                console.log(this.upCheck.textarea);
            }
        },
        events:{
            uploadSuccess(data){
                console.log(data);
            }
        },
        ready (){
            
        },
    }
</script>