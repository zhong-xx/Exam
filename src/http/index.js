import { login } from './user'
import { getSelectList, addSelect, updateSelect, deleteSelect } from './select'
import { getFillList, addFill, updateFill, deleteFill } from './fill'
import { getJudgeList, addJudge, updateJudge, deleteJudge } from './judge'

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
    addSelect,
    updateSelect,
    deleteSelect,

    getFillList,
    addFill,
    updateFill,
    deleteFill,
    
    getJudgeList,
    addJudge,
    updateJudge,
    deleteJudge
}

export default Http