import { API } from './api_path_constants'

export const auth = {
    checkToken: () => {
        return window.localStorage.getItem('authentication_token') != null ? true : false
    },
    clearToken: () => {
        API.token = null
        window.localStorage.clear('authentication_token')
    },
    getToken: () => {
        return window.localStorage.getItem('authentication_token')
    },
    getUserData: () => {
        return JSON.parse(window.localStorage.getItem('user'))
    },
    setUserData: (user) => {
        window.localStorage.setItem('user', JSON.stringify(user))
    }
}