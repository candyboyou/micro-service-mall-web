import request from '../utils/request'

export function getCategoryList(params) {
    return request({
        url: '/admin/category/getCategories',
        method: 'get',
        params: params
    })
}

export function getAllList() {
    return request({
        url:'/admin/category/getAllList',
        method:'get',
    })
}