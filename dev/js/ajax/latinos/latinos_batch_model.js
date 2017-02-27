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
        batchNext(data) {
            return _this.$http.post('./transfer/activity_configure/api/v1/coupon/detail/list',data)
        },
        /**
         * @description 获取权益明细列表
         * @param data
         * @returns {*}
         */
        getBatchList(_id){
            return formDataRequest('./transfer/activity_configure/api/v1/activity/view/'+_id).get()
        }
    }
}
module.exports = model