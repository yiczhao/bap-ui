export default function install(Vue) {
    var _o={};

    //- todo 登陆 login
    /**
     * @description 交易数据分析获取某个时间段的累计关键数据信息
     * @author aaa
     * @method POST
     */
    _o.getTradeDataTotal = './transfer/data_analysis/das/api/v1/trade_data/total?';
    /**
     * @description 交易数据分析获取某个时间段的累计关键数据信息
     * @author aaa
     * @method POST
     */
    _o.login = './transfer/data_analysis/das/api/v1/trade_data/total?';
    /**
     * @description 交易数据分析获取某个时间段的累计关键数据信息
     * @author aaa
     * @method POST
     */
    _o.login = './transfer/data_analysis/das/api/v1/trade_data/total?';

    Object.defineProperties(Vue.prototype, {
        $API: {get(){return _o}}
    })
}
