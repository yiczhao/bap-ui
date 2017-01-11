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
         	return _this.$http.get('./transfer/data_analysis/das/api/v1/trade_data/total',data)
         },
          /**
         * @description 获取商户交易笔数排行
         * @param id
         * @returns {*}
         */
         getTradeAreaNumList(data){
         	return _this.$http.get('./transfer/data_analysis/das/api/v1/home/merchant/topten',data)
         },
         /**
         * @description 获取卡BIN交易笔数排行
         * @param id
         * @returns {*}
         */
         getCardBINTradeNumList(data){
         	return _this.$http.get('./transfer/data_analysis/das/api/v1/home/cardbin/topten',data)
         }
	}
}
 module.exports = model