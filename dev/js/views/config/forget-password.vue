<template>
    <div class="password-config">
        <div class="bg">
            <div class="forget-1" v-show="forgetShow==1">
                <div class="form-row">
                    <div class="form-label"><i>*</i>手机号码</div>
                    <div class="form-input"><input v-model="passwordData.curPassword" type="password" class="input" placeholder="请输入当前密码"/></div>
                </div>
                <div class="form-row">
                    <div class="form-label"><i>*</i> 图片验证码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.newPassword" class="input" placeholder="请输入图片中的数字或字母"/></div>
                    <img :src="sysCodeImg"/>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword1">确认</a>
                </div>
            </div>
            <div class="forget-2" v-show="forgetShow==2">
                <div class="form-row">
                    <div class="form-label"><i>*</i>当前密码</div>
                    <div class="form-input"><input v-model="passwordData.curPassword" type="password" class="input" placeholder="请输入当前密码"/></div>
                </div>
            </div>
            <div class="forget-3" v-show="forgetShow==3">
                <div class="form-row">
                    <div class="form-label"><i>*</i>确认密码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.confirmPassword" class="input" placeholder="请再次输入新密码"/></div>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword">确认</a>
                </div>
            </div>
            <div class="forget-4" v-show="forgetShow==4">
                <div class="form-row">
                    <div class="form-label"><i>*</i> 新密码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.newPassword" class="input" placeholder="请输入新密码"/></div>
                </div>
                <div class="form-row">
                    <div class="form-label"><i>*</i>确认密码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.confirmPassword" class="input" placeholder="请再次输入新密码"/></div>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword">确认</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    .password-config{
            padding-top: 50px;
        .bg{
        background:#fff;
            width:1000px;
            height: 300px;
            margin: 0px auto;
        }
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                forgetShow:1,
                sysCodeImg:'',
                passwordData:{
                    curPassword:'',
                    newPassword:'',
                    confirmPassword:''
                }
            }
        },
        methods:{
            savePassword1(){
                if(this.passwordData.newPassword!==this.passwordData.confirmPassword)
                {
                    dialog('info','新密码与确认密码不一致！')
                    return;
                }
                this.$http.post('./bank/verify_img_code',this.passwordData).then((res)=>{
                    if(res.data.code==0){
                        dialog('success',res.data.message)
                        this.forgetShow=2;
                    }
                })
            },
            savePassword(){
                this.$http.post('./user/verify_img_code',this.passwordData).then((res)=>{
                    if(res.data.code==0){
                        dialog('success',res.data.message);
                    }
                })
            }
        },
        ready(){
            formDataRequest('./bank/create_img_code').get().then((res)=>{
            })
        }
    }
</script>