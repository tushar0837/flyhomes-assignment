let BASE_URL = "http://localhost:3000/";

export const API = {
    token: null,
    createRequest: (controller, method) => (...params) => {
        const { path, options } = API[controller][method](...params);
        options.headers = {
            "Content-Type": "application/json; charset=utf-8",
            // "authentication_token": this.token
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
        questionaire_data: (title, text) => ({
            path: BASE_URL+'articles',
            options: {
                method: 'POST',
                body: JSON.stringify({title: title, text: text})
            }
        })
    },
}
