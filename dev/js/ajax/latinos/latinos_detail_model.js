/**
 * @description 权益明细接口
 * @author 郑杰
 * @date 2017.02.23
 */
function model(_this) {
    return {
        /**
         * @description 获取权益明细列表
         * @param data
         * @returns {*}
         */
        getLatinosCumulative(data) {
            return formDataRequest('./transfer/activity_configure/api/coupon/detail/list').get(data)
        },
        /**
         * @description 获取权益明细总数
         * @param data
         * @returns {*}
         */
        getLationsTotal(data) {
            return formDataRequest('./transfer/activity_configure/api/coupon/detail/statistics').get(data)
        },
        /**
         * @description 获取银行信息
         * @param data
         * @returns {*}
         */
        getBankList(){
            return formDataRequest('./bank/bank_list').get()
        }
    }
}
module.exports = model