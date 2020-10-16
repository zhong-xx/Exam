import { myAxios } from './index'
import qs from 'qs'

export function getFillList (pageNum, pageSize, lanId) {
    return myAxios.get('/findComplete', {
        params: {
            pageNum,
            pageSize,
            lanId
        }
    })
}

export function addFill (params) {
    return myAxios.post('/addComplete', qs.stringify({
        ...params
    }))
}

export function updateFill (params) {
    return myAxios.post('/editComplete', qs.stringify({
        ...params
    }))
}

export function deleteFill (id) {
    return myAxios.post('/removeComplete', qs.stringify({
        id
    }))
}