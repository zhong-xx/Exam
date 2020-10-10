import axios from 'axios'

let myAxios = axios.create({
    baseURL: 'http://3463z0p267.goho.co/exam'
})

myAxios.interceptors.request.use((config)=> {
    var token = sessionStorage.getItem('jwttoken');
    if(token !== null ) {
        config.headers.token = token
    }
    return config
})

function getSelectList (pageNum, pageSize, lanId) {
    return myAxios.get('/findChoice', {
        params: {
            pageNum,
            pageSize,
            lanId
        }
    })
}

export { getSelectList }