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
    }
}
module.exports = model