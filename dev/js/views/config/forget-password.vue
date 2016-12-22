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
                    <div class="form-input"><input v-model="passwordData.phone" maxlength="11" v-limitnumber="passwordData.phone" type="text" class="input" placeholder="请输入手机号"/></div>
                </div>
                <div class="form-row">
                    <div class="form-label"><i>*</i> 图片验证码</div>
                    <div class="form-input"><input type="text" v-model="passwordData.usrImgCode" class="input input245" placeholder="请输入图片中的数字或字母"/></div>
                    <div class="img"><img :src="sysCodeImg"/>{{usrImgCode}}</div>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword(1)">下一步</a>
                </div>
            </div>
            <div class="forget-2" v-show="forgetShow==2">
                <div class="form-row f18">
                    您正在为账号{{passwordData.phone}}找回密码，为了保护账号安全，需要身份验证
                </div>
                <div class="form-row f18">
                    通过密保手机{{passwordData.phone | filter_phone}}验证
                    <a class="btn btn-primary" @click="savePassword(2)">立即验证</a>
                </div>
            </div>
            <div class="forget-3" v-show="forgetShow==3">
                <div class="form-row f18">
                    短信验证码已发送至{{passwordData.phone | filter_phone}}
                </div>
                <div class="form-row">
                    <div class="form-label">
                        <input type="text" v-model="passwordData.userMessageCode" class="input" placeholder="请输入短信验证码"/>
                        <a class="btn btn-gray" v-show="time>0">倒计时{{time}}</a>
                        <a class="btn btn-primary" @click="getUserMessageCode" v-show="time==0">重发验证码</a>
                    </div>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword(3)">立即验证</a>
                </div>
            </div>
            <div class="forget-4" v-show="forgetShow==4">
                <div class="form-row f18">
                    密码长度6-20位，建议字母、数字与标点的组合来提高帐号安全度
                </div>
                <div class="form-row">
                    <div class="form-label"><i>*</i>请输入密码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.newPassword" class="input" placeholder="请输入新密码"/></div>
                </div>
                <div class="form-row">
                    <div class="form-label"><i>*</i>请再次确认密码</div>
                    <div class="form-input"><input type="password" v-model="passwordData.confirmPassword" class="input" placeholder="请再次输入新密码"/></div>
                </div>
                <div class="form-row">
                    <a class="btn btn-primary" @click="savePassword(4)">提交</a>
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
                width: 110px;
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
        .forget-3{
            .form-label{
                width: 450px;
                .input{
                    width: 250px;
                }
            }
            .btn{
                display: inline-block;
                line-height: 100%;
                box-sizing:border-box;
                width: 100px;
            }
        }
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                time:60,
                forgetShow:1,
                id:'',
                sysCodeImg:'',
                usrImgCode:'',
                passwordData:{
                    usrImgCode:'',
                    phone:'',
                    userMessageCode:'',
                    newPassword:'',
                    confirmPassword:''
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
            getusrImgCode(){
                formDataRequest('./bank/create_img_code').get().then((res)=>{
                    if(res.data.code===0){
                        this.sysCodeImg=res.data.data.sysCodeImg;
                        this.usrImgCode=res.data.data.usrImgCode;
                        this.id=res.data.data.id;
                    }
                })
            },
            getUserMessageCode(){
                let data={
                    id:this.id
                }
                this.$http.post('./bank/send_message_code',data)
            },
            savePassword(_num){
                switch (_num){
                    case 1:
                        if(!this.passwordData.phone){
                            dialog('info','请输入手机号！');
                            return;
                        }
                        if(!this.passwordData.usrImgCode){
                            dialog('info','请输入验证码！');
                            return;
                        }
                        if(this.usrImgCode!=this.passwordData.usrImgCode){
                            this.getusrImgCode();
                            dialog('info','验证码不正确请重新输入！');
                            return;
                        }
                        this.$http.post('./bank/verify_img_code',this.passwordData).then((res)=>{
                            if(res.data.code==0){
                                this.forgetShow=2;
                            }
                        })
                        break;
                    case 2:
                        let data={
                            id:this.id
                        }
                        this.$http.post('./bank/send_message_code',data).then((res)=>{
                            if(res.data.code==0){
                                this.forgetShow=3;
                                this.times();
                            }
                        })
                        break;
                    case 3:
                        if(!this.passwordData.userMessageCode){
                            dialog('info','请输入验证码！');
                            return;
                        }
                        let data1={
                            id:this.id,
                            phone:this.phone,
                            userMessageCode:this.passwordData.userMessageCode
                        }
                        this.$http.post('./bank/verify_img_code',data1).then((res)=>{
                            if(res.data.code==0){
                                this.forgetShow=4;
                            }
                        })
                        break;
                    case 4:
                        if(!this.passwordData.newPassword|| !this.passwordData.confirmPassword){
                            dialog('info','请输入密码！');
                            return;
                        }
                        if(this.passwordData.newPassword!==this.passwordData.confirmPassword){
                            dialog('info','两次密码输入不一致！');
                            return;
                        }
                        let data2={
                            id:this.id,
                            phone:this.phone,
                            newPassword:this.passwordData.newPassword,
                            confirmPassword:this.passwordData.confirmPassword
                        }
                        this.$http.post('./user/update_password',data2).then((res)=>{
                            if(res.data.code==0){
                                dialog('success',res.data.message)
                                setTimeout(()=>{
                                    this.$router.go({'name':'login'});
                                },2000)
                            }else{
                                this.forgetShow=1;
                                this.getusrImgCode();
                            }
                        })
                        break;
                }
            }
        },
        ready(){
            this.getusrImgCode();
        }
    }
</script>