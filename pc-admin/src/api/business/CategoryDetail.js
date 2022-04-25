import request from '../utils/request'

export function getSubCategoryListById(params) {
    return request({
        url: '/admin/category/getSubCategoryListById',
        method: 'get',
        params: params
    })
}

export function getCategoryListByLevel(param) {
    return request({
        url: '/admin/category/getCategoryListByLevel',
        method: 'get',
        params: param
    })
}

export function getParentCategoryListByLevel(param) {
    return request({
        url: '/admin/category/getParentCategoryListByLevel',
        method: 'get',
        params: param
    })
}

export function getCategoryDetailById(params) {
    return request({
        url: '/admin/category/getCategoryById',
        method: 'get',
        params: params
    })
}

export function save(data) {
    return request({
        url: '/admin/category/saveOrUpdate',
        method: 'post',
        data: data
    })
}

export function getAllAttributes() {
    return request({
        url: '/admin/attribute/getAllAttribute',
        method: 'get',
    })
}