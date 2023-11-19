/* 
动态菜单-全部的菜单导航 除了首页登录
*/
//商品管理
const Product = () => import("@/views/product/Index.vue");
const List = () => import("@/views/product/list/Index.vue");
const Category = () => import("@/views/product/category/Index.vue");
const AddProduct =()=>import('@/views/product/list/AddProduct.vue')
//订单
const Order = () =>import('@/views/order/Index.vue')
const OrderList = () =>import('@/views/order/list/Index.vue')
const Collect = () =>import('@/views/order/collect/Index.vue')
const Contract=()=>import('@/views/order/contract/Index.vue')
//广告
const Advert = () =>import('@/views/advert/Index.vue')
const AdvertList = () =>import('@/views/advert/list/Index.vue')

//系统管理
import SystemManage from '@/views/SystemManage'
import department from '@/views/SystemManage/department'
import role from '@/views/SystemManage/role'

export const menu = [
  {
    path: "/product", //产品管理
    name: "product",
    component: Product,
    redirect: "/product/list",
    meta: {
      title: "产品管理",
    },
    children: [
      {
        path: "list", //访问路径： /product/list
        name: "list",
        component: List,
        meta: {
          title: "产品列表",
        },
      },
      {
        path: "category",
        name: "category",
        component: Category,
        meta: {
          title: "产品分类",
        },
      },
      {
        path: "add-product", //商品添加--编辑-查看  /product/product-page
        name: "ProductPage",
        component: AddProduct,
        meta: {
          //配置高亮标识
          // activeMenu: "/product/list",//获取path
          activeMenu: "list",//获取name
          title: "添加商品",
        },
      },
    ],
  },
  {
    path: "/order", //订单管理
    name: "order",
    component: Order,
    redirect: "/order/order-list",
    meta: {
      title: "订单管理",
    },
    children: [
      {
        path: "order-list",
        name: "order-list",
        component: OrderList,
        meta: {
          title: "订单列表",
        },
      },
      {
        path: "collect",
        name: "collect",
        component: Collect,
        meta: {
          title: "汇总清单",
        },
      },
      {
        path: "contract",
        name: "contract",
        component: Contract,
        meta: {
          title: "订单审核",
        },
      },
    ],
  },
  {
    path: "/advert", //广告管理
    name: "advert",
    component: Advert,
    meta: {
      title: "广告分类",
    },
    children: [
      {
        path: "advert-list",
        name: "advert-list",
        component: AdvertList,
        meta: {
          title: "广告列表",
        },
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: SystemManage,
    redirect: "/system/role",
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "role",
        name: "role",
        component: role,
        meta: {
          title: "角色管理",
        },
      },
      {
        path: "department",
        name: "department",
        component: department,
        meta: {
          title: "部门管理",
        },
      },
    ],
  },
];
