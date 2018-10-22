import {auth} from './auth'

let BASE_URL = "http://localhost:3000/";
export const API = {
    token: null,
    createRequest: (controller, method) => (...params) => {
        const { path, options } = API[controller][method](...params);
        options.headers = {
            "Content-Type": "application/json; charset=utf-8",
            "X-User-Token": auth.getToken(),
            "X-User-Email": auth.getUserData() ? auth.getUserData().email : "",
        }
        return fetch(path, options);
    },
    users: {
        login: (email, password) => ({
            path: BASE_URL+'auth/sign_in',
            options: {
                method: 'POST',
                body: JSON.stringify({ user: { email, password }})
            }
        }),
        sign_up: (email, password, password_confirmation) => ({
            path: BASE_URL+'auth',
            options: {
                method: 'POST',
                body: JSON.stringify({ user: { email, password, password_confirmation }})
            }
        }),
        profile: (first_name, last_name, phone, city, country) => ({
            path: BASE_URL+`api/v1/users/${auth.getUserData().id}`,
            options: {
                method: 'PUT',
                body: JSON.stringify({user:{first_name, last_name, phone, city, country}})
            }
        })
    },
    surveys: {
        create_survey: (price_min, price_max, places, properties, completed) => ({
            path: BASE_URL+`api/v1/surveys`,
            options: {
                method: 'POST',
                body: JSON.stringify({survey: {price_min, price_max, places, properties, completed}})
            }
        }),
        update_survey: (price_min, price_max, places, properties, completed) => ({
            path: BASE_URL+`api/v1/surveys/${auth.getUserData().id}`,
            options: {
                method: 'PUT',
                body: JSON.stringify({survey: {price_min, price_max, places, properties, completed}})
            }
        }),
        get_survey: () => ({
            path: BASE_URL+`api/v1/surveys/${auth.getUserData().id}`,
            options: {
                method: 'GET',
            }
        })
    }
}
