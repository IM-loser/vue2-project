import axios from '@/utils/request'
const base = {
  //产品管理
  projectList: "/api/goods/projectList", //产品列表
  search: "/api/goods/search", //搜索接口
  deleteItemById: "/api/goods/deleteItemById", //删除商品操作
  selectItemCategoryByParentId:
    "/api/goods/itemCategory/selectItemCategoryByParentId", //商品类目

  //图片上传接口
  uploadUrl: "/api/upload",
  insertTbItem: "/api/goods/item/insertTbItem", //添加商品
  batchDelete: "/api/goods/batchDelete", //批量删除
  updateTbItem: "/api/goods/item/updateTbItem", //修改商品

  //产品分类
  itemCategory: "/api/itemCategory",
  insertItemCategory: "/api/itemCategory/insertItemCategory", //新增子类目录名称 cid name
  deleteContentCategoryById: "/api/content/deleteContentCategoryById", //删除类名 id
  updateCategory: "/api/itemCategory/updateCategory", //修改类目 id name
  insertCategory: "/api/itemCategory/insertCategory", //新增一级分类名称 name
};

//导出方法
export default {
  /* 
    产品列表 page
  */
  projectList(params) {
    return axios.get(base.projectList, { params });
  },
  /* 
    搜索接口
    params={search:xx}
  */
  search(params) {
    return axios.get(base.search, { params });
  },
  /* 
    删除操作 id
  */
  deleteItemById(params) {
    return axios.get(base.deleteItemById, { params });
  },
  /* 
    商品类目
      params={type:cid}
    */
  selectItemCategoryByParentId(params) {
    return axios.get(base.selectItemCategoryByParentId, { params });
  },
  /* 
    添加商品
    params={title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
*/

  insertTbItem(params) {
    return axios.get(base.insertTbItem, { params });
  },
  /* 
  批量删除
    {ids:字符串--id}
  */
  batchDelete(params) {
    return axios.get(base.batchDelete, { params });
  },
  /* 
  修改商品
   params={id,title, image, sellPoint, price, cid, category, num, descs, paramsInfo}
  */
  updateTbItem(params) {
    return axios.get(base.updateTbItem, { params });
  },

  /* 
     产品列表分类
    */
  itemCategory() {
    return axios.get(base.itemCategory);
  },
  /* 
    新增子级类目
    params={cid name}
  */
  insertItemCategory(params) {
    return axios.get(base.insertItemCategory, { params });
  },
  /* 
      修改类目
      {id,name}
    */
  updateCategory(params) {
    return axios.get(base.updateCategory, { params });
  },

  /* 
      删除类目
      {id}
      */
  deleteContentCategoryById(params) {
    return axios.get(base.deleteContentCategoryById, { params });
  },
  /* 
      一级类目新增
      {name}
       */
  insertCategory(params) {
    return axios.get(base.insertCategory, { params });
  },

};
