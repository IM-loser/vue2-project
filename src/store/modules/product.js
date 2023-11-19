/* 
    存储当前行的商品信息数据

*/
export default {
    namespaced:true,
    state:{
        rowData:{},//当前行的数据容器
        title:'添加',//标题信息
    },
    mutations:{
       changeRowData(state,payload){
        state.rowData = payload;
       },
       changeTitle(state,title){
        state.title = title
       } 
    }
}