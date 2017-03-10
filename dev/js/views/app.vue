<template>
    <header-component></header-component>
    <div class="content">
        <div class="content-main">
            <div class="content-left">
                <menu-component></menu-component>
            </div>
            <div class="content-right">
                <router-view></router-view>
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
        store,
        components:{
            HeaderComponent,MenuComponent,FooterComponent
        },
        created(){
        }
    }
</script>