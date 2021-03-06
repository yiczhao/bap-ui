/**
 * [proxy_mock 代理、mock]
 * @param  {[type]} Vue [Vue]
 */
export function proxy_mock (Vue) {
    Vue.config.debug = false
    if (APP_ENV === 'dev') {
        require(['./proxy-mock'], function ({
            proxy_mock_core
        }) {
            proxy_mock_core(Vue)
        })
    }
}
