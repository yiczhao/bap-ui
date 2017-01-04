/**
 * @description 活动管理接口
 * @author 赵俊涵
 * @date 2017.01.04
 */
function model(_this) {
    return {
        /**
         * @description 活动列表查询
         * @param data
         * @returns {*}
         */
        getList(data) {
            return _this.$http.post('./transfer/activity_configure/api/v1/activity/list',data)
        },
    }
}
module.exports = model