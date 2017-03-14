<template>
    <header-component></header-component>
    <div class="content">
        <div class="content-main">
            <div class="content-left">
                <menu-component></menu-component>
            </div>
            <div class="content-right">
                <title-component></title-component>
                <div :class="{'main-content':hasPadding}"><router-view></router-view></div>
                <loading></loading>
            </div>
        </div>
    </div>
    <footer-component></footer-component>
</template>
<script type="text/javascript">
    import HeaderComponent from './base/header.vue'
    import MenuComponent from './base/menu.vue'
    import store from '../vuex/store'
    import FooterComponent from './base/footer.vue'
    import TitleComponent from './base/titles.vue'
    export default{
        data(){
            return{
            }
        },
        store,
        vuex: {
            getters: {
                hasPadding ({ titles }) {
                    if(titles.titles=='数据总览'||titles.titles=='创建活动'){
                        return false;
                    }
                    return true;
                }
            }
        },
        components:{
            HeaderComponent,MenuComponent,FooterComponent,TitleComponent
        },
        created(){
        }
    }
</script>