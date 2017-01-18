/**
 * @description 活动规则设置接口
 * @author 赵俊涵
 * @date 2016.12.16
 */
function model(_this) {
    return {
        /**
         * @description 活动规则设置
         * @param data
         * @returns {*}
         */
        addRule(data) {
            return _this.$http.post('./transfer/activity_configure/api/v1/activity/rule',data)
        },
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        geteditList (_id) {
            return formDataRequest('./transfer/activity_configure/api/v1/activity/view/'+_id).get()
        },
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        getcardBin () {
            return formDataRequest('./transfer/activity_configure/api/v1/card-bins').get()
        },
    }
}
module.exports = model