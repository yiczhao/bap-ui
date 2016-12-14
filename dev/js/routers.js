export default function (Vue,router){
    router.map({
        '/':{
            router_type:'root',
            name:'root',
            component: function(resolve){
                require(['./views/app.vue'],resolve)
            },
            subRoutes:{
                /* 欢迎页面 */
                '/': {
                    name: 'welcome',
                    component: (resolve) => {
                        require(['./views/home.vue'], resolve)
                    }
                },
            }
        },
        /* 登录页面 */
        'login': {
            name: 'login',
            component: resolve => {
                require(['./views/login.vue'], res => {
                    resolve(res)
                })
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
        if(transition.to.name == 'root') {
        }
        transition.next()
    })
    
    router.afterEach(transition =>{

    })
}