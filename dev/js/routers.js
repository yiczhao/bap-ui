export default function (Vue,router){
    router.map({

    '/':{
        router_type:'root',
        name:'root',
        component: function(resolve){
            require(['./views/app.vue'],resolve)
        },
        subRoutes:{
            'login':{
                router_type:'login',
                name:'login',
                component: function(resolve){
                    require(['./views/login.vue'],resolve)
                }
            }
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