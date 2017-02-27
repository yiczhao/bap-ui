<template>
    <div class="login login-container" id="test01">
        <div class="container">
            <div class="header">
                <div class="header-left">
                    <div class="header-logo"></div>
                    <div class="header-text">·</div>
                    <div class="header-text">银行管理后台</div>
                </div>
                <!-- <div class="header-right">
                    <div>语言选择</div>
                    <div class="change-language chinese" :style="color=='1'?'background-color:#424242':'background-color:transparent'"><span>中文</span></div>
                    <div class="change-language english" :style="color=='0'?'background-color:#424242':'background-color:transparent'"><span>English</span></div>
                </div> -->
            </div>
            <div class="section">
                <div class="section-title">致力于构建支付增值平台</div>
                <div class="section-infor">卡说利用现代金融技术和互联网技术手段，以智能POS终端和移动支付终端为载体，融合多种支付方式，搭建一个全方位资源整合的支付增值。</div>
                <div class="section-about">
                    <div><span></span>平台体系</div>
                    <div><span></span>专业服务</div>
                    <div><span></span>卡说版图</div>
                </div>
                <div class="section-type">
                    <div class="type-title">用户登录
                    </div>
                    <div class="type-into username"><input class="input" type="text" placeholder="手机号/账户名" v-model="loginData.name" @keyup.enter="login"></div>
                    <div class="type-into password"><input class="input" type="password" placeholder="请输入您的密码" v-model="loginData.password" @keyup.enter="login"></div>
                    <div class="type-into check">
                        <span class="input-check"><input class="input" type="text" placeholder="请输入数字或字母" v-model="loginData.usrImgCode" @keyup.enter="login"></span>
                        <span class="img"><img :src="sysCodeImg"></span>
                        <span class="icon icon-spinner" @click="getusrImgCode"></span></div>
                    <div class="save-password">
                        <ks-switch :disable="false" @change="autoType" :def-checked="true" color="#2196F3" size="mini" :checked.sync="checked"></ks-switch><span>记住密码</span>
                    </div>
                </div>
                <div class="section-login"><input class="btn btn-primary" type="button" name="" value="登 录" @click="login"></div>
                <div class="forget-password">
                    <a v-link="{'name':'forget-password'}">忘记密码</a>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-container">
                <div class="footer-title">上海新卡说信息技术有限公司</div>
                <div class="footer-infor">
                    <div>
                        <span>上海市杨浦区黄兴路2077号蓝天大厦1901室</span>
                        <span>400 0192 266</span>
                        <span>service@kashuo.com</span>
                    </div>
                    <div>
                        <span>赣ICP备11001642号-1</span>
                        <span>赣工商网备第201011300310427299号</span>
                        <span>南昌网安备案第3601010110</span>
                    </div>
                    <div>
                        <span>©2010-2016 kashuo.com</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
        data (){
            return {
                loginData:{
                    name:'',
                    password:'',
                    usrImgCode:'',
                    id:'',
                },
                checked:false,
                color:1,
                sysCodeImg:'',
                usrImgCode:'',
            }
        },
        methods:{
            login(){
                if(!this.loginData.usrImgCode){
                  dialog('info','未输入验证码') ;
                  return
                };
                if(this.usrImgCode.toLowerCase()!==this.loginData.usrImgCode.toLowerCase()){
                    dialog('info','请输入正确的验证码！') ;
                    return
                }
                let data={
                    name:this.loginData.name,
                    password:this.loginData.password,
                    verifyID:this.id,
                    verifyCode:this.loginData.usrImgCode,
                }
                this.$http.post('./user/login',data).then((data)=>{
                    if(data.data.code===0){
                        sessionStorage.setItem('loginList',JSON.stringify(data.data.data));
                        sessionStorage.setItem('menuList',JSON.stringify(data.data.data.privilegeList));
                        if (this.checked) {
                            localStorage.setItem('userInfor',JSON.stringify(this.loginData));
                        }
                        this.$router.go({'name':'home'});
                    }
                });
            },
            autoType(){
                if (!this.checked) {
                    localStorage.clear();
                }
            },
            getusrImgCode(){
                formDataRequest('./verify/create_img_code').get().then((res)=>{
                    if(res.data.code===0){
                        this.sysCodeImg="data:image/png;base64,"+res.data.data.image;
                        this.usrImgCode=res.data.data.sysImgCode;
                        this.loginData.id=res.data.data.id;
                    }
                })
            },
        },
        ready (){
            if (!!localStorage.getItem('userInfor')) {
                this.$set('loginData',JSON.parse(localStorage.getItem('userInfor')));
                this.checked=true;
            }
            sessionStorage.clear()
            this.getusrImgCode();
        }
    }
</script>