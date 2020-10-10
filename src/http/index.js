import { login } from './user'
import { getSelectList } from './select'
import { getFillList } from './fill'

import axios from 'axios'
export let myAxios = axios.create({
    baseURL: 'http://3463z0p267.goho.co/exam'
})

myAxios.interceptors.request.use((config)=> {
    var token = sessionStorage.getItem('jwttoken');
    if(token !== null ) {
        config.headers.token = token
    }
    return config
})

const Http = {
    login,
    getSelectList,
    getFillList
}

export default Http