/**
 * @description 公用数据接口
 * @author 赵俊涵
 * @date 2017.01.03
 */
export default function install(Vue) {
    var _m={
        /**
         * @description 获取省份列表
         * @param data
         * @returns {*}
         */
        getProvince() {
            return Vue.http.get('./area/province/list')
        },
        /**
         * @description 获取所有城市列表
         * @param data
         * @returns {*}
         */
        getAllcity() {
            return Vue.http.get('./area/allCity/list')
        },
        /**
         * @description 通过省份获取城市列表
         * @param data
         * @returns {*}
         */
        getCity(data) {
            return formDataRequest('./area/city/list').get(data)
        },

        /**
         * @description 活动列表查询
         * @param data
         * @returns {*}
         */
        getActivityList(data) {
            return Vue.http.post('./activity/list',data)
        }
    };
    Object.defineProperties(Vue.prototype, {
        $common_model: {get(){return _m}}
    })
}