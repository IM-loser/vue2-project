/* 
    动态的路由导航
*/
//导入请求的接口方法
import {permission} from '@/api/index'
//导入前端定义好的完整的路由信息
import { menu } from '@/router/menu'
//导入路由 和基本的路由信息
import router,{baseRoutes} from '@/router/index'
//导入处理菜单导航的方法
import {rulesMenu} from '@/utils/common'
import {cloneDeep} from 'lodash'
export default {
    namespaced: true,
    state: {
        //定义动态导航容器---存储动态导航
        dyMenuList:[]
    },
    mutations: {
      //设置菜单导航-----------------------------
      setMenuList(state,payload){
        state.dyMenuList = payload
      },
      //清空菜单导航------------------------------
      removeMenuList(state){
        state.dyMenuList=[]
      }
    },
    actions:{
        //请求动态菜单导航信息的接口方法------token---------------------
       async getMenuList({commit,rootState}){
          console.log('rootState.login.userinfo.token',rootState.login.userinfo.token);
          let res = await permission({token:rootState.login.userinfo.token})
          console.log('后端返回的导航菜单内容:----',res.data.data);
          console.log('前端定义的导航菜单内容-----',menu);
          //处理前后端的菜单导航数组 根据后端返回的导航标识 匹配对应的真实的路由菜单导航
          //定义一个方法 处理数组--返回匹配好的菜单导航
          let myMenu= rulesMenu(menu,res.data.data)
          console.log('处理好的菜单导航',myMenu);

          //存储动态菜单导航-----------------
          commit('setMenuList',myMenu);

          //需要把匹配好的路由数据追加到 layout界面 baseRoutes=[{path:'/',name:Layout,childen:[{home},]}]
          let mybaseRoutes = cloneDeep(baseRoutes)
          mybaseRoutes[0].children.push(...myMenu)

          console.log('mybaseRoutes',mybaseRoutes);
          //[{path:'',layout,children:[{},{},{}]}]

          //添加到路由界面去
            return mybaseRoutes;

        }
    }
  };