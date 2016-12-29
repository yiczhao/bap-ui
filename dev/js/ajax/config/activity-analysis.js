/**
 * @description 活动分析接口
 * @author 郑杰
 * @date 2016.12.29
 */
function model(_this) {
 	return {
 		/**
         * @description 获取某个时间段的交易总金额集合
         * @param id
         * @returns {*}
         */
         getTradeAmount(){
         	return formDataRequest('./trade_data/trade_amount/list').get()
         },
         /**
         * @description 获取某个时间段的交易总金额集合
         * @param id
         * @returns {*}
         */
         getMerchantTradeAmount(){
         	return formDataRequest('./merchant_data/trade_amount').get()
         }
 	}
 }
 module.exports = model