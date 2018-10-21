// import {API_PATHS} from './api_path_constants'
// export const backend = {
//     poke: (apiName, options) => {
//         // options = {
//         //     success_callback: (response) => {

//         //     },
//         //     failure_callback: (response) => {

//         //     }
//         // }
//         let api = API_PATHS.apis[apiName].path
//         let headers = {
//             "Content-Type": "application/json; charset=utf-8"
//         }
//         let internal_options = {
//             method: API_PATHS.apis[apiName].method,
//             headers: headers,
//             body: options.bodyData

//         }
//         if(API_PATHS.apis[apiName].token_required){
//             headers.append("authentication_token", "")
//         }
//         fetch(api, internal_options).then(res => res.json()).then(response => {
//             // console.log(response)
//             options.success_callback(response)
//         })
//     }
// }