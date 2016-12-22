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
            <div class="verify-title">您正在为账号15995408888找回密码，为了保护账号安全，需要身份验证</div>
            <div class="verify-area">
                <div class="phone-icon"><img src="../../../img/phone.png" alt=""></div>
                <div class="verify-way">通过密保手机159******888验证</div>
                <div class="verify-next">
                    <a class="btn btn-primary" @click="verifyIdentity">立即验证</a>
                </div>
            </div>

        </div>
        <div class="verify-phone" v-show="passwordShow==2">
            <div class="verify-title">短信验证码已发送至159******888</div>
            <div class="form-input verify-area">
                <input type="text" v-model="passwordData.userMessageCode" class="input verify-input" placeholder="请输入短信验证码"/>
                <div class="time-end" v-show="time>0"><a class="btn btn-primary">倒计时{{time}}</a></div>
                <div class="resend-comfirm" v-show="time==0">
                    <a class="btn btn-primary" @click="resendMessage">重新发送</a>
                </div>
                <div>{{passwordData.userMessageCode}}</div>
            </div>
            <div class="form-row">
                <a class="btn btn-primary" @click="verifyPhone">下一步</a>
            </div>
        </div>
        <div class="setting-newpassword" v-show="passwordShow==3">
            <div class="newpassword-title">密码长度6-20位，建议字母、数字与标点的组合来提高帐号安全度</div>
            <div class="form-row">
                <input type="password" v-model="passwordData.newPassword" class="form-input" placeholder="请输入密码"/>
            </div>
            <div class="form-row">
                <input type="password" v-model="passwordData.comfirmPassword" class="form-input" placeholder="请再次输入密码"/>
            </div>
            <div class="form-row">
                <a class="btn btn-primary" @click="settingPassword">下一步</a>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    .password-config{
        .four-type{
            width:795px;
            margin:20px auto 40px auto;
            overflow: hidden;
            div{
                text-align: center;
                float: left;
            }
        }
        .pr{
            position: relative;
        }
        .w265{
            width: 265px;
            border: 1px solid #ddd;
            height:50px;
            line-height: 50px;
            box-sizing: border-box;
            color:#000;
        }
        .w265.active{
            border: 1px solid #2196F3;
            background: #2196F3;
            color:#fff;
        }
        .triangle-right {
            position: absolute;
            z-index: 2;
            right:-25px;
            width: 0;
            height: 0;
            border-top: 25px solid transparent;
            border-left: 25px solid #ddd;
            border-bottom: 25px solid transparent;
        }
        .triangle-right-white {
            position: absolute;
            z-index: 3;
            right: -24px;
            width: 0;
            height: 0;
            border-top: 24px solid transparent;
            border-left: 25px solid #fff;
            border-bottom: 24px solid transparent;
            top: 1px;
        }
        .triangle-right.active{
            border-left: 25px solid #2196F3;
        }
        .bg{
            background:#fff;
            width:1060px;
            height: 600px;
            margin: 0px auto;
        }
        .f18{
            font-size: 18px;
        }
        .form-row{
            text-align: center;
            overflow: hidden;
            div{
                display: inline-block;
                float: left;
                line-height: 35px;
            }
            .form-label{
                width: 100px;
                margin-right: 10px;
                text-align: right;
                margin-left: 265px;
            }
            .form-input{
                input{
                    width: 350px;
                }
                .input245{
                    width: 245px;
                }
            }
            .img{
                width: 95px;
                border: 1px solid #dadada;
                border-radius: 3px;
                height: 33px;
                margin-left: 10px;
            }
            .btn{
                width: 200px;
            }
        }
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/config/password_model'
    export default{
        data(){
            this.model=model(this)
            return{
                time:60,
                passwordShow:1,
                passwordData:{
                    userMessageCode:'',
                    newPassword:'',
                    comfirmPassword:'',
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
                this.$http.post('./user/send_message_code').then((res)=>{
                    if(res.data.code==0){
                        this.times();
                        this.passwordShow=2;
                        this.passwordData.id=res.data.data;
                    }
                })
            },
            resendMessage(){
                this.$http.post('./user/send_message_code')
            },
            verifyPhone(){
                console.log(this.id)
                let data={
                    id:this.passwordData.id,
                    userMessageCode:this.passwordData.userMessageCode
                }
                this.$http.post('./user/verify_message_code',data).then((res)=>{
                    if (res.data.code==0) {
                        this.passwordShow=3;
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
                    comfirmPassword:this.passwordData.comfirmPassword
                }
                this.$http.post('./user/update_password',data).then((res)=>{
                    if (res.data.code==0) {
                        dialog('success','密码修改成功！');
                        setTimeout(()=>{
                            this.$router.go({'name':'login'});
                        },2000)
                    }else{
                        this.passwordShow=1;
                    }
                })

            },
            // savePassword(){
            //     this.$http.post('./user/reset_password',this.passwordData).then((res)=>{
            //         if(res.data.code==0){
            //             dialog('success',res.data.message);
            //         }else{
            //             dialog('error',res.data.message);
            //         }
            //     })
            // }
        },
        ready(){
        }
    }
</script>