/**
 * 拦截器
 * @author yiczhao
 */
export default function install(Vue,router_proto) {
    Vue.http.options.emulateJSON = false;
    Vue.http.interceptors.push({
        request (request) {
            return request;
        },
        response (response) {
            return response;
        }
    });
}