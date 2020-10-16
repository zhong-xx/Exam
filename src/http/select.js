import { myAxios } from './index'
import qs from 'qs'

export function getSelectList (pageNum, pageSize, lanId) {
    return myAxios.get('/findChoice', {
        params: {
            pageNum,
            pageSize,
            lanId
        }
    })
}

export function addSelect (params) {
    return myAxios.post('/addChoice', qs.stringify({
        ...params
    }))
}

export function updateSelect (params) {
    return myAxios.post('/editChoice', qs.stringify({
        ...params
    }))
}

export function deleteSelect (id) {
    return myAxios.post('/removeChoice', qs.stringify({
        id
    }))
}