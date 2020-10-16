import { myAxios } from './index'
import qs from 'qs'

export function getJudgeList (pageNum, pageSize, lanId) {
    return myAxios.get('/findJudge', {
        params: {
            pageNum,
            pageSize,
            lanId
        }
    })
}

export function addJudge(params) {
    return myAxios.post('/addJudge', qs.stringify({
        ...params
    }))
}

export function updateJudge(params) {
    return myAxios.post('/editJudge', qs.stringify({
        ...params
    }))
}

export function deleteJudge(id) {
    return myAxios.post('/removeJudge', qs.stringify({
        id
    })) 
}