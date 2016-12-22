<template>
    <div class="header" style="margin-bottom: 20px;">
        <div class="header-title">银行活动管理系统</div>
        <div class="header-infor">
            <div class="function-click">
                <a v-link="{'name':'login'}">登录</a>
            </div>
        </div>
    </div>
    <div class="password-config">
        <div class="bg">
            <div class="four-type">
                <div class="pr">
                    <div class="w265" :class="{'active':forgetShow=='1'}">1.输入账号</div>
                    <div class="triangle-right" :class="{'active':forgetShow=='1'}"></div>
                    <div class="triangle-right-white" v-if="forgetShow!=1"></div>
                </div>
                <div class="pr">
                    <div class="w265" :class="{'active':forgetShow=='2'}">2.验证身份</div>
                    <div class="triangle-right" :class="{'active':forgetShow=='2'}"></div>
                    <div class="triangle-right-white" v-if="forgetShow!=2"></div>
                </div>
                <div class="pr">
                    <div class="w265" :class="{'active':forgetShow=='3'}">3.验证密保手机</div>
                    <div class="triangle-right" :class="{'active':forgetShow=='3'}"></div>
                    <div class="triangle-right-white" v-if="forgetShow!=3"></div>
                </div>
                <div class="pr">
                    <div class="w265" :class="{'active':forgetShow=='4'}">4.设置新密码</div>
                </div>
            </div>
            <div class="forget-1" v-show="forgetShow==1">
                <div class="form-row">
                    <div class="form-label"><i>*</i>手机号码</div>
                    <div class="form-input"><input v-model="passwordData.curPassword" type="password" class="input" placeholder="请输入手机号"/></div>
                </div>
                <div class="form-row">
                    <div class="form-label"><i>*</i> 图片验证码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.newPassword" class="input input245" placeholder="请输入图片中的数字或字母"/></div>
                    <div class="img"><img :src="sysCodeImg"/></div>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword1">下一步</a>
                </div>
            </div>
            <div class="forget-2" v-show="forgetShow==2">
                <div class="form-row f18">
                    您正在为账号{{phoneNumber}}找回密码，为了保护账号安全，需要身份验证
                </div>
                <div class="form-row f18">
                    通过密保手机 <span>{{phoneNumber | filter_phone}}</span>验证
                    <a class="btn btn-primary" @click="savePassword">立即验证</a>
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
        .four-type{
            margin-bottom: 140px;
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
            margin-bottom: 50px;
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
                i{
                    color:red;
                    margin-right: 5px;
                }
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
    export default{
        data(){
            return{
                forgetShow:2,
                sysCodeImg:'',
                phoneNumber:'15927272625',
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