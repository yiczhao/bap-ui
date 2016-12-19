export default function install(Vue,router_proto) {
    Vue.http.options.emulateJSON = false;
    console.log( Vue.http.interceptors);
    Vue.http.interceptors.push({
        request (request) {
            console.log( request);
            let bamtoken=(!!sessionStorage.getItem('loginList')) ? JSON.parse(sessionStorage.getItem('loginList')).token : null;
            request.headers['X-auth-Token'] =bamtoken;
            return request;
        },
        response (response) {
            console.log( response);
            return response;
        }
    });
}