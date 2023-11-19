import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/Index.vue";
import Login from "@/views/login/Index.vue";
import Home from "@/views/home/Home.vue";
//点击跳转同一个路径
// 在VueRouter上配置路由跳转，在router中的index.js中加上以下代码，注意加在use之前
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => {})
};


Vue.use(VueRouter);
//路由信息 哪个属性key看到  this.$route.matched=[{一级路由信息},{二级路由信息},...{当前路由信息}]

export const baseRoutes=[
  {
    path: "/",
    component: Layout,
    meta:{
      title:'首页',
      isLogin:true,//是否需要登录
    },
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta:{
          title:'首页'
        },
      },
      //首页下面的菜单导航内容----动态添加------------
     
    ],
  },
  {
    path:'*',
    redirect:'/'
  }
]

export const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  
];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

/* 
解决：退出登录再登录后 控制台路由命名重复警告问题

  发现自己的name并没有重名,那么一般是后台动态路由导致的报错警告。
  动态路由一般来说是通过后端接口返回拿到数据，然后在路由守卫router.beforeEach 中进行添加。
  addRoutes 方法仅仅是帮你注入新的路由，并没有帮你剔除其它路由。

*/

const createRouter  =() => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router;
