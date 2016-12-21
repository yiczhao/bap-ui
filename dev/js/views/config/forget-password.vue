<template>
    <div class="password-config">
        <div class="bg"></div>
        <div class="form-row">
            <div class="form-label"><i>*</i>当前密码</div>
            <div class="form-input"><input v-model="passwordData.curPassword" type="password" class="form-input" placeholder="请输入当前密码"/></div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i> 新密码</div>
            <div class="form-input"><input type="password" v-model="passwordData.newPassword" class="form-input" placeholder="请输入新密码"/></div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i>确认密码</div>
            <div class="form-input"><input type="password" v-model="passwordData.confirmPassword" class="form-input" placeholder="请再次输入新密码"/></div>
        </div>
        <div class="form-row">
            <a class="btn btn-primary" @click="savePassword">确认</a>
        </div>
    </div>
</template>
<style lang="sass">
    .password-config{
        padding-top: 50px;
        margin: 0px auto;
        .bg{
            width:1000px;
            height: 300px;
            background:#fff;
        }
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                passwordData:{
                    curPassword:'',
                    newPassword:'',
                    confirmPassword:''
                }
            }
        },
        methods:{
            savePassword(){
                if(this.passwordData.newPassword!==this.passwordData.confirmPassword)
                {
                    dialog('info','新密码与确认密码不一致！')
                    return;
                }
                this.$http.post('./user/reset_password',this.passwordData).then((res)=>{
                    if(res.data.code==0){
                        dialog('success',res.data.message);
                    }else{
                        dialog('error',res.data.message);
                    }
                })
            }
        },
        ready(){
        }
    }
</script>