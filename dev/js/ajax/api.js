export default function install(Vue) {
    var _o={};

    //- todo 活动分析pdf导出 data_analysis
    /**
     * @description 交易数据分析获取某个时间段的累计关键数据信息
     * @author 赵勇
     * @method POST
     */
    _o.getTradeDataTotal = './trade_data/total';
    /**
     * @description 交易数据分析获取某个时间段的交易总金额集合
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAmount = './trade_data/trade_amount/list';
    /**
     * @description 交易数据分析获取某个时间段的补贴总金额集合
     * @author 赵勇
     * @method POST
     */
    _o.getSubsidyAmount = './trade_data/subsidy_amount/list';
    /**
     * @description 交易数据分析获取某个时间段的交易总笔数集合
     * @author 赵勇
     * @method POST
     */
    _o.getTradeNum = './trade_data/trade_num/list';
    /**
     * @description 交易区域获取累计关键数据信息
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAreaTotal = './trade_area/total';
    /**
     * @description 交易区域获取交易金额排行
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAreaTotalAmountList = './trade_area/trade_amount/hot_list';
    /**
     * @description 交易区域获取交易笔数排行
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAreaNumList = './trade_area/trade_num/hot_list';
    /**
     * @description 交易时段分析
     * @author 赵勇
     * @method POST
     */
    _o.getTradePeriodTotal = './trade_period/total';
    /**
     * @description 商户数据累计关键数据
     * @author 赵勇
     * @method POST
     */
    _o.getMerchantTradeTotal = './merchant_data/total';
    /**
     * @description 商户数据获取交易金额
     * @author 赵勇
     * @method POST
     */
    _o.getMerchantTradeAmount = './merchant_data/trade_amount';
    /**
     * @description 商户数据获取交易笔数
     * @author 赵勇
     * @method POST
     */
    _o.getMerchantTradeCount = './merchant_data/trade_count';
    /**
     * @description 卡BIN获取卡BIN累计关键数据信息
     * @author 赵勇
     * @method POST
     */
    _o.getCardBINTotal = './card_bin/total';
    /**
     * @description 卡BIN获取卡BIN交易金额排行
     * @author 赵勇
     * @method POST
     */
    _o.getCardBINTradeAmountList = './card_bin/trade_amount/hot_list';
    /**
     * @description 卡BIN获取卡BIN交易笔数排行
     * @author 赵勇
     * @method POST
     */
    _o.getCardBINTradeNumList = './card_bin/trade_num/hot_list';
    /**
     * @description 单卡获取关键数据
     * @author 赵勇
     * @method POST
     */
    _o.getOneCardTotal = './one_card/total';
    /**
     * @description 单卡获取单卡参与次数数据
     * @author 赵勇
     * @method POST
     */
    _o.getOneCardSwipedCount = './one_card/swiped_count';
    /**
     * @description 查询活动所有数据
     * @author 赵勇
     * @method POST
     */
    _o.getinfoList = './activity/view/';
    /**
     * @description 交易查询导出
     * @author 赵勇
     * @method POST
     */
    _o.tradeSearchExport = './trade_query/statistics/list/excel/export?';
    /**
     * @description 交易明细导出
     * @author 赵勇
     * @method POST
     */
    _o.tradeDetailExport = './trade_query/detail/list/excel/export?';
    /**
     * @description 上传
     * @author 赵勇
     * @method POST
     */
    _o.uploadExcel = './upload/up_files_info';
    /**
     * @description 权益查询导出
     * @author 赵勇
     * @method POST
     */
    _o.latinosSearchExcel = './coupon/list/excel/export?';
    /**
     * @description 权益明细导出
     * @author 赵勇
     * @method POST
     */
    _o.latinosDetailExcel = './coupon/detail/list/excel/export?';

    Object.defineProperties(Vue.prototype, {
        $API: {get(){return _o}}
    })
}
