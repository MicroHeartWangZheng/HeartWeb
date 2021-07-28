import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import FindPassword from '../components/FindPassword.vue'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import WantList from '../views/WantList.vue'
import FollowList from '../views/FollowList.vue'
import My from '../views/My.vue'
import UserDetail from '../views/UserDetail.vue'
import Vip from '../views/Vip.vue'
import Setting from '../views/Setting.vue'
import OrderList from '../views/OrderList.vue'
import MomentList from '../views/MomentList.vue'
import SetpOne from '../views/SetpOne.vue'
import UpdatePictures from '../views/UpdatePictures.vue'

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
          path: '/wantlist',
          component: WantList,
        },
        {
          path: '/followlist',
          component: FollowList,
        },
        {
          path: '/my',
          component: My,
        },
        {
          path: '/userdetail/:id',
          component: UserDetail,
        },
        {
          path: '/vip',
          component: Vip,
        },
        {
          path: '/setting',
          component: Setting,
        },
        {
          path: '/orderlist',
          component: OrderList,
        },
        {
          path: '/momentlist',
          component: MomentList,
        },
        {
          path: '/SetpOne',
          component: SetpOne
        },
        {
          path: '/UpdatePictures',
          component: UpdatePictures
        }
      ]
    },
  ]
})


const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//导航守卫 
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 来源路径
  //next 是一个函数 
  if (to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token');

  if (!token) return next('/login');
  next();
});

export default router
