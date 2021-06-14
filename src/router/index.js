import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import FindPassword from '../components/FindPassword.vue'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Message from '../views/Message.vue'
import Moment from '../views/Moment.vue'
import My from '../views/My.vue'
import UserDetail from '../views/UserDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/findpassword',
            component: FindPassword
        },
        {
            path: '/home',
            component: Home,
            redirect: '/users',
            children: [{
                    path: '/users',
                    component: Users,
                },
                {
                    path: '/moment',
                    component: Moment,
                },
                {
                    path: '/message',
                    component: Message,
                },
                {
                    path: '/my',
                    component: My,
                },
                {
                    path: '/userDetail',
                    component: UserDetail,
                }
            ]
        },
    ]
})

//导航守卫 
router.beforeEach((to, from, next) => {
    // //to 将要访问的路径
    // //from 来源路径
    // //next 是一个函数 
    // if (to.path === '/login') return next();
    // const token = window.sessionStorage.getItem('token');

    // if (!token) return next('/login');
    next();
});

export default router