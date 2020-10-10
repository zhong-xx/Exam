import axios from 'axios'
import qs from 'qs'

let myAxios = axios.create({
    baseURL: 'http://3463z0p267.goho.co/exam'
})

export function login (loginname, loginpwd, code) {
    return myAxios.post('/adminlogin', qs.stringify({
        loginname,
        loginpwd,
        code
    }))
}
