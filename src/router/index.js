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
import LookList from '../views/LookList.vue'
import Message from '../views/Message.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: Home,
      redirect: '/users',
      children: [{
          path: '/users',
          component: Users,
          meta: {
            title: '用户列表'
          }
        },
        {
          path: '/wantlist',
          component: WantList,
          meta: {
            title: '申请列表'
          }
        },
        {
          path: '/followlist',
          component: FollowList,
          meta: {
            title: '关注列表'
          }
        },
        {
          path: '/looklist',
          component: LookList,
          meta: {
            title: '来访列表'
          }
        },
        {
          path: '/my',
          component: My,
          meta: {
            title: '我的主页'
          }
        },
        {
          path: '/userdetail/:id',
          component: UserDetail,
          meta: {
            title: '用户资料'
          }
        },
        {
          path: '/vip',
          component: Vip,
          meta: {
            title: '购买VIP'
          }
        },
        {
          path: '/setting',
          component: Setting,
          meta: {
            title: '设置'
          }
        },
        {
          path: '/orderlist',
          component: OrderList,
          meta: {
            title: '订单列表'
          }
        },
        {
          path: '/momentlist',
          component: MomentList,
          meta: {
            title: '动态列表'
          }
        },
        {
          path: '/SetpOne',
          component: SetpOne,
          meta: {
            title: '完善资料'
          }
        },
        {
          path: '/UpdatePictures',
          component: UpdatePictures,
          meta: {
            title: '上传图片'
          }
        }, {
          path: '/message',
          component: Message,
          meta: {
            title: '消息列表'
          }
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
