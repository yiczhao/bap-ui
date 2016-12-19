<template>
    <div class="login login-container" id="test01">
        <div class="page-container">
            <form>
                <div class="center-container">
                    <div class="form-group">
                        <div class="group-title">
                            <span>请登录</span>
                        </div>
                        <div class="group-username">
                            <input id="login-usertype" class="login-usertype" type="text" name="" placeholder="用户名/手机号码/邮箱地址" v-model="username">
                            <div class="error-text username">
                                <label for="login-usertype">请输入用户名</label>
                            </div>
                        </div>
                        <div class="group-password">
                            <input id="login-passwordtype" class="login-passwordtype" type="password" name="" placeholder="密码" v-model="password">
                            <div class="error-text password">
                                <label for="login-passwordtype">请输入密码</label>
                            </div>
                        </div>
                        <div class="form-aboutPassword">
                            <label>
                                <input class="about-password" type="checkbox" checked="checked" name="" v-model="about">
                                <span>记住密码</span>
                            </label>
                            <a href="">忘记密码</a>
                        </div>
                        <div class="form-login">
                            <input class="Login" type="button" name="" value="登录" @click="login">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div style="line-height:20px">
            <p>账号输入：{{username}}</p>
            <p>密码输入：{{password}}</p>
            <p>记住密码值：{{about}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {
                groupUsername:"",
                groupPassword:"",
                aboutPassword:""
            }
        },
        methods:{
            login(){
                this.$http.post('./user/login',{'username':'admin','password':'admin'}).then((data)=>{
                    if(data.data.code===10000){
                        sessionStorage.setItem('loginList',JSON.stringify(data.data.result));
                        this.$router.go('index');
                    }
                    else{
                        dialog('error',data.data.message)
                    }
                })
            }
        },
        ready (){

        }
    }
</script>