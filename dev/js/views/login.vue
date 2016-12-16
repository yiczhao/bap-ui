<template>
    <div class="login_container" id="test01">
        <div class="page_container">
            <form>
                <div class="center_container">
                    <div class="form-group">
                        <div class="groupTitle">
                            <span>请登录</span>
                        </div>
                        <div class="groupUsername">
                            <input id="LoginUserType" class="LoginUserType" type="text" name="" placeholder="用户名/手机号码/邮箱地址" v-model="groupUsername">
                            <div class="errorText username">
                                <label for="LoginUserType">请输入用户名</label>
                            </div>
                        </div>
                        <div class="groupPassword">
                            <input id="LoginPasswordType" class="LoginPasswordType" type="password" name="" placeholder="密码" v-model="groupPassword">
                            <div class="errorText password">
                                <label for="LoginPasswordType">请输入密码</label>
                            </div>
                        </div>
                        <div class="form-aboutPassword">
                            <label>
                                <input class="aboutPassword" type="checkbox" checked="checked" name="" v-model="aboutPassword">
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
            <p>账号输入：{{groupUsername}}</p>
            <p>密码输入：{{groupPassword}}</p>
            <p>记住密码值：{{aboutPassword}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {}
        },
        methods:{
            login(){
                this.$http.post('./bams/login/login',{}).then((data)=>{
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