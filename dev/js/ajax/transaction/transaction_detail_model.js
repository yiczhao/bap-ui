/**
 * @description 交易明细查询接口
 * @author 郑杰
 * @date 2017.01.04
 */
 function model(_this) {
    return {
        /**
         * @description 获取活动的交易明细
         * @param data
         * @returns {*}
         */
        getDetailList(data) {
            return formDataRequest('./trade_query/detail/list').get(data)
        },
        /**
         * @description 获取各个活动的交易统计信息
         * @param data
         * @returns {*}
         */
        getTradeStatisticsSumList(data) {
            return formDataRequest('./trade_query/tradeSum/list').get(data)
        },
    }
}
module.exports = model
