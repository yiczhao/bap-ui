<template>
    <div>
        主路由
        <router-view ></router-view>
    </div>
</template>
<script type="text/javascript">
    export default {
        data (){
            return {}
        },
        ready (){
            this.$http.post('./bams/login/login',{})
        }
    }
</script>