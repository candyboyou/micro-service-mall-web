import request from '../utils/request'

export function getAllParamList() {
    return request({
        url:'/admin/commodity/getAllParamList',
        method:'get'
    })
}

export function getCommodityList(params) {
    return request({
        url:'/admin/commodity/paginateGetCommodities',
        method:'get',
        params: params
    })
}