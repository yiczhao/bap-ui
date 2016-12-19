/**
 * @description 银行基本设置接口
 * @author 赵俊涵
 * @date 2016.12.16
 */
function model(_this) {
    return {
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        getUserList () {
            return formDataRequest('./user/list').get()
        },
    }
}
module.exports = model