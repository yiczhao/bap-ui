<template>
    <div class="header">
        头部模板
        <a @click="loginOut">退出</a>
    </div>
</template>
<script>
    export default{
        created(){
        },
        data(){
            return{
            }
        },
        methods:{
            loginOut(){
                this.$http.post('./user/logout').then((data)=>{
                    if(data.data.code===0){
                        sessionStorage.clear();
                        this.$router.go({'name':'login'});
                    }
                    else{
                        dialog('error',data.data.message)
                    }
                })
            }
        }
    }
</script>
