import request from '../utils/request'

export function getValuesOfAttribute(param) {
    return request({
        url: '/admin/attribute/getValuesOfAttribute',
        method: 'get',
        param: param
    })
}

export function getAllList() {
    return request({
        url: '/admin/attribute/getAllListOfSave',
        method: 'get'
    })
}

export function saveOrUpdateAttribute(data) {
    return request({
        url: '/admin/attribute/saveOrUpdateAttribute',
        method: 'post',
        data: data
    })
}

export function getAttributeDetailById(param) {
    return request({
        url: '/admin/attribute/getAttributeById',
        method: 'get',
        params: param
    })
}
