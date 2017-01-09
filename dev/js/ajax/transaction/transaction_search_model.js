/**
 * @description 交易明细查询接口
 * @author 郑杰
 * @date 2017.01.04
 */
 function model(_this) {
    return {
        /**
         * @description 获取活动的交易查询
         * @param data
         * @returns {*}
         */
        getList(data) {
            return formDataRequest('./transfer/data_analysis/das/api/v1/trade_query/statistics/list').get(data)
        },
        /**
         * @description 获取各个活动的交易统计信息
         * @param data
         * @returns {*}
         */
        getTradeStatisticsSumList(data) {
            return formDataRequest('./transfer/data_analysis/das/api/v1/trade_query/statisticsSum/list').get(data)
        },
        /**
         * @description 获取发起方银行信息
         * @param data
         * @returns {*}
         */
         getBankList(data){
            return formDataRequest('./bank/bank_list').get(data)
         }
    }
}
module.exports = model