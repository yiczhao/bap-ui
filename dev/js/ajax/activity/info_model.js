/**
 * @description 活动详情接口
 * @author 赵俊涵
 * @date 2017.01.06
 */
function model(_this) {
    return {
        /**
         * @description 查询活动所有数据
         * @param data
         * @returns {*}
         */
        getinfoList (_id) {
            return formDataRequest('./transfer/activity_configure/api/v1/activity/view/'+_id).get()
        },
        /**
         * @description 查询活动信息
         * @param data
         * @returns {*}
         */
        searchReceive (_id){
            return formDataRequest('./transfer/activity_configure/api/v1/favorconfig/'+_id).get()
        }
    }
}
module.exports = model