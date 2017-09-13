/**
 * @description 活动分析接口
 * @author 郑杰
 * @date 2016.12.29
 */
function model(_this) {
 	return {
 		/**
         * @description 交易数据分析获取某个时间段的交易总金额集合
         * @param id
         * @returns {*}
         */
         getTotal(data){
         	return formDataRequest('./trade_data/total').get(data)
         },
          /**
         * @description 获取商户交易笔数排行
         * @param id
         * @returns {*}
         */
         getTradeAreaNumList(data){
         	return formDataRequest('./home/merchant/topten').get(data)
         },
         /**
         * @description 获取卡BIN交易笔数排行
         * @param id
         * @returns {*}
         */
         getCardBINTradeNumList(data){
         	return formDataRequest('./home/cardbin/topten').get(data)
         }
	}
}
 module.exports = model