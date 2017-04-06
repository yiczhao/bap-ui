/**
 * @description 权益查询接口
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
            return formDataRequest('./transfer/activity_configure/api/v1/coupon/list').get(data)
        },
        /**
         * @description 获取权益总数
         * @param data
         * @returns {*}
         */
        getLationsTotal(data) {
            return formDataRequest('./transfer/activity_configure/api/v1/coupon/statistics').get(data);
        },
        /**
         * @description 获取银行信息
         * @param data
         * @returns {*}
         */
        getBankList(){
            return formDataRequest('./bank/bank_list').get()
        },
        /**
         * @description 活动上下线
         * @param data
         * @returns {*}
         */
        getOnOff(_id,_onoff){
            return formDataRequest('./transfer/activity_configure/api/v1/coupon/on-off/'+_id+'/'+_onoff).get();
        },
    }
}
module.exports = model