/**
 * @description 交易明细查询接口
 * @author yicZhao
 * @date 2017.02.22
 */
function model(_this) {
    return {
        /**
         * @description 获取权益列表
         * @param data
         * @returns {*}
         */
        getLatinosCumulative(data) {
            return _this.$http.post('./transfer/activity_configure/api/coupon/list',data)
        },
        /**
         * @description 获取权益总数
         * @param data
         * @returns {*}
         */
        getLationsTotal(data) {
            return _this.$http.post('./transfer/activity_configure/api/coupon/list',data)
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