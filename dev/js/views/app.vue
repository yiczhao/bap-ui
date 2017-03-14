<template>
    <header-component></header-component>
    <div class="content">
        <div class="content-main">
            <div class="content-left">
                <menu-component></menu-component>
            </div>
            <div class="content-right">
                <div v-show="!!title" class="page-title">{{title}}</div>
                <div class="main-content"><router-view></router-view></div>
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
    export default{
        data(){
            return{
            }
        },
        vuex: {
            getters: {
                title ({ titles }) {
                    return titles.titles
                }
            }
        },
        store,
        components:{
            HeaderComponent,MenuComponent,FooterComponent
        },
        created(){
        }
    }
</script>