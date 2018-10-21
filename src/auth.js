import { API } from './api_path_constants'

export const auth = {
    checkToken: () => {
        return API.token != null ? true : window.localStorage.getItem('authentication_token') != null ? true : false
    },
    clearToken: () => {
        API.token = null
        window.localStorage.clear('authentication_token')
    }
}