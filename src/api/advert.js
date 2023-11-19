//订单接口
// host:'http://localhost:9898',
import axios from '@/utils/request'

//接口列表
//广告分类管理
export const selectContentCategoryByParentId='/api/advert/content/selectContentCategoryByParentId'
//广告分类管理 增加子导航
export const insertContentCategory='/api/advert/content/insertContentCategory'
//广告分类管理 修改子导航
export const updateContentCategory='/api/advert/content/updateContentCategory'
//广告分类管理 删除子导航 pid
export const deleteContentCategoryById='/api/advert/content/deleteContentCategoryById'
//广告分类管理 内容增加
export const insertTbContent='/api/advert/content/insertTbContent'
//广告分类管理 内容删除 /content/deleteContentByIds
export const deleteContentByIds='/api/advert/content/deleteContentByIds'
//内容分类管理 内容查询
export const selectTbContentAllByCategoryId='/api/advert/content/selectTbContentAllByCategoryId'



//广告分类管理 id
export function getselectContentCategoryByParentId(params){
    return axios.get(selectContentCategoryByParentId,{params})
}

//广告分类管理 增加子导航
export function getinsertContentCategory(params){
    return axios.get(insertContentCategory,{params})
}

//广告分类管理 修改子导航
export function getupdateContentCategory(params){
    return axios.get(updateContentCategory,{params})
}

//广告分类管理 删除子导航 pid
export function getdeleteContentCategoryById(params){
    return axios.get(deleteContentCategoryById,{params})
}

//广告分类管理 内容增加
/* 
    const pid = req.query.pid;
    const name = req.query.name;
    const contentUrl = req.query.url;
    const image = req.query.image;
     */
export function getinsertTbContent(params){
    return axios.get(insertTbContent,{params})
}

//广告分类管理 内容删除 id
export function getdeleteContentByIds(params){
    return axios.get(deleteContentByIds,{params})
}


//内容分类管理 内容查询 pid
export function getselectTbContentAllByCategoryId(params){
    return axios.get(selectTbContentAllByCategoryId,{params})
}
