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
         getTradeAmount(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_data/trade_amount/list').get(data)
         },
         /**
         * @description 交易数据分析获取某个时间段的补贴总金额集合
         * @param id
         * @returns {*}
         */
         getSubsidyAmount(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_data/subsidy_amount/list').get(data)
         },
         /**
         * @description 交易数据分析获取某个时间段的累计关键数据信息
         * @param id
         * @returns {*}
         */
         getTradeDataTotal(){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_data/total').get()
         },
         /**
         * @description 交易数据分析获取某个时间段的交易总笔数集合
         * @param id
         * @returns {*}
         */
         getTradeNum(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_data/trade_num/list').get(data)
         },
         /**
         * @description 交易区域获取累计关键数据信息
         * @param id
         * @returns {*}
         */
         getTradeAreaTotal(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_area/total').get(data)
         },
         /**
         * @description 交易区域获取交易金额排行
         * @param id
         * @returns {*}
         */
         getTradeAreaTotalAmountList(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_area/trade_amount/hot_list').get(data)
         },
          /**
         * @description 交易区域获取交易笔数排行
         * @param id
         * @returns {*}
         */
         getTradeAreaNumList(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_area/trade_num/hot_list').get(data)
         },
          /**
         * @description 交易时段分析
         * @param id
         * @returns {*}
         */
         getTradePeriodTotal(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/trade_period/total').get(data)
         },
         /**
         * @description 商户数据累计关键数据
         * @param id
         * @returns {*}
         */
         getMerchantTradeTotal(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/merchant_data/total').get(data)
         },
         /**
         * @description 商户数据获取交易金额
         * @param id
         * @returns {*}
         */
         getMerchantTradeAmount(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/merchant_data/trade_amount').get(data)
         },
         /**
         * @description 商户数据获取交易笔数
         * @param id
         * @returns {*}
         */
         getMerchantTradeCount(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/merchant_data/trade_count').get(data)
         },
         /**
         * @description 卡BIN获取卡BIN累计关键数据信息
         * @param id
         * @returns {*}
         */
         getCardBINTotal(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/card_bin/total').get(data)
         },
         /**
         * @description 卡BIN获取卡BIN交易金额排行
         * @param id
         * @returns {*}
         */
         getCardBINTradeAmountList(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/card_bin/trade_amount/hot_list').get(data)
         },
         /**
         * @description 卡BIN获取卡BIN交易笔数排行
         * @param id
         * @returns {*}
         */
         getCardBINTradeNumList(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/card_bin/trade_num/hot_list').get(data)
         },
         /**
         * @description 单卡获取关键数据
         * @param id
         * @returns {*}
         */
         getOneCardTotal(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/one_card/total').get(data)
         },
         /**
         * @description 单卡获取单卡参与次数数据
         * @param id
         * @returns {*}
         */
         getOneCardSwipedCount(data){
         	return formDataRequest('./transfer/data_analysis/das/api/v1/one_card/swiped_count').get(data)
         }
	}
}
 module.exports = model