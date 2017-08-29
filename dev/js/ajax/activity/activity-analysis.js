/**
 * @description 活动分析接口
 * @author 郑杰
 * @date 2016.12.29
 */
function model(_this) {
 	return {
         /**
         * @description 交易数据分析获取某个时间段的累计关键数据信息
         * @param id
         * @returns {*}
         */
         getTradeDataTotal(data){
             let datas={
                 startDate:getDates().today,
                 endDate:getDates().today,
                 compareFlag:data.compareFlag,
                 activityID:data.activityID,
                 bankUuidString:data.bankUuidString,
             }
         	return formDataRequest('./trade_data/total').get(datas)
         },
        /**
         * @description 交易数据分析获取某个时间段的累计关键数据信息
         * @param id
         * @returns {*}
         */
        getTradeDataTotalAll(data){
            let datas={
                compareFlag:data.compareFlag,
                activityID:data.activityID,
                bankUuidString:data.bankUuidString,
            }
            return formDataRequest('./trade_data/total').get(datas)
        },
         /**
         * @description 交易数据分析获取某个时间段的交易总金额集合
         * @param id
         * @returns {*}
         */
         getTradeAmount(data){
            return formDataRequest('./trade_data/trade_amount/list').get(data)
         },
         /**
         * @description 交易数据分析获取某个时间段的补贴总金额集合
         * @param id
         * @returns {*}
         */
         getSubsidyAmount(data){
            return formDataRequest('./trade_data/subsidy_amount/list').get(data)
         },
         /**
         * @description 交易数据分析获取某个时间段的交易总笔数集合
         * @param id
         * @returns {*}
         */
         getTradeNum(data){
         	return formDataRequest('./trade_data/trade_num/list').get(data)
         },
         /**
         * @description 交易区域获取累计关键数据信息
         * @param id
         * @returns {*}
         */
         getTradeAreaTotal(data){
         	return formDataRequest('./trade_area/total').get(data)
         },
         /**
         * @description 交易区域获取交易金额排行
         * @param id
         * @returns {*}
         */
         getTradeAreaTotalAmountList(data){
         	return formDataRequest('./trade_area/trade_amount/hot_list').get(data)
         },
          /**
         * @description 交易区域获取交易笔数排行
         * @param id
         * @returns {*}
         */
         getTradeAreaNumList(data){
         	return formDataRequest('./trade_area/trade_num/hot_list').get(data)
         },
          /**
         * @description 交易时段分析
         * @param id
         * @returns {*}
         */
         getTradePeriodTotal(data){
         	return formDataRequest('./trade_period/total').get(data)
         },
         /**
         * @description 商户数据累计关键数据
         * @param id
         * @returns {*}
         */
         getMerchantTradeTotal(data){
         	return formDataRequest('./merchant_data/total').get(data)
         },
         /**
         * @description 商户数据获取交易金额
         * @param id
         * @returns {*}
         */
         getMerchantTradeAmount(data){
         	return formDataRequest('./merchant_data/trade_amount').get(data)
         },
         /**
         * @description 商户数据获取交易笔数
         * @param id
         * @returns {*}
         */
         getMerchantTradeCount(data){
         	return formDataRequest('./merchant_data/trade_count').get(data)
         },
         /**
         * @description 卡BIN获取卡BIN累计关键数据信息
         * @param id
         * @returns {*}
         */
         getCardBINTotal(data){
         	return formDataRequest('./card_bin/total').get(data)
         },
         /**
         * @description 卡BIN获取卡BIN交易金额排行
         * @param id
         * @returns {*}
         */
         getCardBINTradeAmountList(data){
         	return formDataRequest('./card_bin/trade_amount/hot_list').get(data)
         },
         /**
         * @description 卡BIN获取卡BIN交易笔数排行
         * @param id
         * @returns {*}
         */
         getCardBINTradeNumList(data){
         	return formDataRequest('./card_bin/trade_num/hot_list').get(data)
         },
         /**
         * @description 单卡获取关键数据
         * @param id
         * @returns {*}
         */
         getOneCardTotal(data){
         	return formDataRequest('./one_card/total').get(data)
         },
         /**
         * @description 单卡获取单卡参与次数数据
         * @param id
         * @returns {*}
         */
         getOneCardSwipedCount(data){
         	return formDataRequest('./one_card/swiped_count').get(data)
         },
         /**
         * @description 查询活动所有数据
         * @param data
         * @returns {*}
         */
        getinfoList (_id) {
            return formDataRequest('./transfer/activity_configure/api/v1/activity/view/'+_id).get()
        },
        /**
         * @description 获取银行信息
         * @param data
         * @returns {*}
         */
        getBankByUuid (data) {
            return formDataRequest('./bank/uuid').get(data)
        }
	}
}
 module.exports = model