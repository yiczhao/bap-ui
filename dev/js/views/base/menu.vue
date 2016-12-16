<template>
    <div class="menu">
        菜单
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        methods:{
            getMenuHeight(){
                let availableHeight = document.body.clientHeight  - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight;
                document.querySelector('.content').style.height=availableHeight+'px';
            }
        },
        ready(){
            this.getMenuHeight();
            window.onresize=(()=>{
                this.getMenuHeight()
            })
        }
    }
</script>
