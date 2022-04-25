import request from '../utils/request'

export function getAttributeList(params) {
    return request({
        url: '/admin/attribute/getAttributes',
        method: 'get',
        params: params
    })
}

export function getAllList() {
    return request({
        url: '/admin/attribute/getAllListOfQuery',
        method: 'get'
    })
}
