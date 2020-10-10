import { myAxios } from './index'

export function getFillList (pageNum, pageSize, lanId) {
    return myAxios.get('/findComplete', {
        params: {
            pageNum,
            pageSize,
            lanId
        }
    })
}

function updateFill () {

}