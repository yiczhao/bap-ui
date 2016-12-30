/**
 * @description 活动基本设置接口
 * @author 赵俊涵
 * @date 2016.12.16
 */
function model(_this) {
    return {
        /**
         * @description 查看详情
         * @param data
         * @returns {*}
         */
        addBasic(data) {
            return _this.$http.post('./transfer/activity_configure/api/v1/activity/base-add',data)
        },
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        getAddList (_id) {
            return formDataRequest('./transfer/activity_configure/api/v1/activity/base/'+_id).get()
        },
    }
}
module.exports = model