<template>
    <div class="password-config">
        <div class="four-type">
            <div class="pr">
                <div class="w265" :class="{'active':passwordShow=='1'}">1.验证身份</div>
                    <div class="triangle-right" :class="{'active':passwordShow=='1'}"></div>
                    <div class="triangle-right-white" v-if="passwordShow!=1"></div>
                </div>
                <div class="pr">
                    <div class="w265" :class="{'active':passwordShow=='2'}">2.验证密保手机</div>
                    <div class="triangle-right" :class="{'active':passwordShow=='2'}"></div>
                    <div class="triangle-right-white" v-if="passwordShow!=2"></div>
                </div>
                <div class="pr">
                    <div class="w265" :class="{'active':passwordShow=='3'}">3.设置新密码</div>
            </div>
        </div>
        <div class="verify-identity" v-show="passwordShow==1">
            <div class="verify-title">您正在为账号{{phone}}找回密码，为了保护账号安全，需要身份验证</div>
            <div class="verify-area">
                <div class="phone-icon"><img src="../../../img/phone.png" alt=""></div>
                <div class="verify-way">通过密保手机{{phone | filter_phone}}验证</div>
                <div class="verify-next">
                    <a class="btn btn-primary" @click="verifyIdentity">立即验证</a>
                </div>
            </div>

        </div>
        <div class="verify-phone" v-show="passwordShow==2">
            <div class="verify-title">短信验证码已发送至{{phone | filter_phone}}</div>
            <div class="form-input verify-area">
                <input type="text" v-model="passwordData.userMessageCode" class="input verify-input" placeholder="请输入短信验证码"/>
                <div class="time-end" v-show="time>0"><a class="btn btn-gray">倒计时{{time}}</a></div>
                <div class="resend-comfirm" v-show="time==0">
                    <a class="btn btn-primary" @click="resendMessage">重新发送</a>
                </div>
            </div>
            <div class="form-row">
                <a class="btn btn-primary" @click="verifyPhone">下一步</a>
            </div>
        </div>
        <div class="setting-newpassword" v-show="passwordShow==3">
            <div class="newpassword-title">密码长度6-20位，建议字母、数字与标点的组合来提高帐号安全度</div>
            <div class="form-row">
                <input type="password" v-model="passwordData.newPassword" class="input" placeholder="请输入密码"/>
            </div>
            <div class="form-row">
                <input type="password" v-model="passwordData.confirmPassword" class="input" placeholder="请再次输入密码"/>
            </div>
            <div class="form-row">
                <a class="btn btn-primary" @click="settingPassword">下一步</a>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/password_model'
    export default{
        data(){
            this.model=model(this)
            return{
                time:60,
                passwordShow:1,
                phone:'', 
                passwordData:{
                    userMessageCode:'',
                    newPassword:'',
                    confirmPassword:'',
                    id:''
                }
            }
        },
        methods:{
            times(){
                let t;
                this.time--;
                t = setTimeout(this.times, 1000);
                if ( this.time <= 0 ){
                    clearTimeout(t);
                }
            },
            verifyIdentity(){
                this.model.sendMessage().then((res)=>{
                    if(res.data.code==0){
                        this.times();
                        this.passwordShow=2;
                        this.passwordData.id=res.data.data;
                    }
                })
            },
            resendMessage(){
                this.model.sendMessage().then((res)=>{
                    if (res.data.code==0) {
                        this.passwordData.id=res.data.data;
                        this.time=60;
                        this.times();
                    }
                });

            },
            verifyPhone(){
                let data={
                    id:this.passwordData.id,
                    userMessageCode:this.passwordData.userMessageCode
                }
                this.model.verifyMessage(data).then((res)=>{
                    if (res.data.code==0) {
                        this.passwordShow=3;
                        this.passwordData.id=res.data.data;
                    }
                })
            },
            settingPassword(){
                if(this.passwordData.setPassword != this.passwordData.newSetPassword){
                    dialog('info','新密码与确认密码不一致！');
                    return
                }
                let data={
                    id:this.passwordData.id,
                    newPassword:this.passwordData.newPassword,
                    confirmPassword:this.passwordData.confirmPassword
                }
                this.model.updatePassword(data).then((res)=>{
                    if (res.data.code==0) {
                        dialog('success','密码修改成功！');
                        setTimeout(()=>{
                            this.$router.go({'name':'login'});
                        },2000);
                        this.passwordData.id=res.data.data;
                    }else if(res.data.code==-1){
                        this.passwordShow=1;
                        this.passwordData.id="";
                    }
                })

            }
        },
        ready(){
            (!!JSON.parse(sessionStorage.getItem('loginList')).phone)?this.phone=JSON.parse(sessionStorage.getItem('loginList')).phone:null;
        }
    }
</script>