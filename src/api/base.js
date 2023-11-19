//接口地址
//环境变量
let api = process.env.VUE_APP_BASE_URL;// /api
const base ={
    //首页
    // totalInfo:'/api/home/dataCount',//首页统计数据
    // orderinfo:"/api/home/orderinfo",//订单数据
    // format:"/api/home/format",//折线数据
    //打包
    totalInfo:api+'/home/dataCount',//首页统计数据
    orderinfo:api+"/home/orderinfo",//订单数据
    format:api+"/home/format",//折线数据

    //订单管理
    orderList:"/api/order/list",//订单列表 page
    changeStatus:"/api/order/changeStatus",//订单汇总 
    collect:"/api/order/collect",//汇总清单列表 page
    cancel:'/api/order/cancel',//撤销汇总 id
    detail:"/api/order/list/detail",//订单详情  id
    
}

//单一导出
export const host='http://localhost:7788';
//导出图片上传的url地址
export const uploadUrl='/api/upload';

export default base
