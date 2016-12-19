export default function install(Vue,router_proto) {
    Vue.http.options.emulateJSON = false;
    console.log( Vue.http.interceptors);
    Vue.http.interceptors.push({
        request (request) {
            console.log( request);
            return request;
        },
        response (response) {
            console.log( response);
            return response;
        }
    });
}