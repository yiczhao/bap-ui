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
        /* 主容器 */
        '/index':{
            router_type:'index',
            name:'index',
            component: function(resolve){
                require(['./views/app.vue'],resolve)
            },
            subRoutes:{
                /* 欢迎页面 */
                '/': {
                    name: 'home',
                    component: (resolve) => {
                        require(['./views/home.vue'], resolve)
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
        if(transition.to.name == 'root') {
        }
        transition.next()
    })
    
    router.afterEach(transition =>{

    })
}