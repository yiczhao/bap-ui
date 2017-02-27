/**
 * @description 批量送权益接口
 * @author 赵俊涵
 * @date 2017.02.24
 */
function model(_this) {
    return {
        /**
         * @description 批量权益提交
         * @param data
         * @returns {*}
         */
        getMessage(_id) {
            return _this.$http.post('./transfer/activity_configure/api/coupon/message/'+_id);
        },
        /**
         * @description 批量权益提交
         * @param data
         * @returns {*}
         */
        submitUser(data) {
            return _this.$http.post('./transfer/activity_configure/api/v1/coupon/give',data)
        },
        /**
         * @description 获取权益明细列表
         * @param data
         * @returns {*}
         */
        batchNext(data){
            return formDataRequest('./user/rights/phone/read_excel').get(data)
        }
    }
}
module.exports = model