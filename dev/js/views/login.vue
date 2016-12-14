<template>
    <div>
        登录页面
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {}
        },
        ready (){
            this.$http.post('./bams/login/login',{})
                .then((data)=>{
                    console.log(data.data);   
                })
        }
    }
</script>