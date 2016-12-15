<template>
    <div>
        登录页面
        <a @click="login">登录</a>
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