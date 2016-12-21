export default function (Vue,router){
    router.map({
        /* 登录页面 */
        '/login': {
            name: 'login',
            component: resolve => {
                require(['./views/login.vue'], res => {
                    resolve(res)
                })
            }
        },
        /* 忘记密码页面 */
        '/forget-password': {
            name: 'forget-password',
            component: resolve => {
                require(['./views/config/forget-password.vue'], res => {
                    resolve(res)
                })
            }
        },
        /* 主容器 */
        '/index':{
            router_type:'index',
            name:'index',
            component: function(resolve){
                require(['./views/app.vue'],resolve)
            },
            subRoutes:{
                /* 欢迎页面 */
                'home': {
                    name: 'home',
                    router_type:'home',
                    component: (resolve) => {
                        require(['./views/home.vue'], resolve)
                    }
                },
                /* 银行基本设置页面 */
                'bank-config': {
                    name: 'bank-config',
                    router_type:'config',
                    component: (resolve) => {
                        require(['./views/config/bank-config.vue'], resolve)
                    }
                },
                /* 密码设置页面 */
                'password-config': {
                    name: 'password-config',
                    router_type:'config',
                    component: (resolve) => {
                        require(['./views/config/password-config.vue'], resolve)
                    }
                },
                /* 权限设置页面 */
                'auth-config': {
                    name: 'auth-config',
                    router_type:'config',
                    component: (resolve) => {
                        require(['./views/config/auth-config.vue'], resolve)
                    }
                },
            }
        },
        /* 404路由 */
        '*': {
            name:'404',
            component: function(resolve){
                router.go({ name: 'login'})
            }
        }
    })

    router.beforeEach(transition =>{
        if(!sessionStorage.getItem('loginList')&&transition.to.name!=='forget-password'){
            router.go('login');
        }
        transition.next()
    })
    
    router.afterEach(transition =>{

    })
}