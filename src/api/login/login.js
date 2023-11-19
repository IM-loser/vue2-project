//定义接口----
import axios from '@/utils/request'
//环境变量
let api = process.env.VUE_APP_BASE_URL;// /api
console.log('api',api);
const base = {
  //登录
  // login: "/api/login", //登录接口 user pwd---post
  // permission: "/api/permission", //用户权限 token

  //打包项目
  login: api+"/login", //登录接口 user pwd---post
  permission: api+"/permission", //用户权限 token

};

//定义方法
/* 
  登录
  { user, pwd}
  */
export function login(params) {
  return axios.post(base.login, params);
}
/* 
    用户权限--返回导航内容
    params={token:''}
  */
export function permission(params) {
  return axios.get(base.permission, {
    params,
  });
}


