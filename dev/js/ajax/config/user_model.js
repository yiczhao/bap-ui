/**
 * @description 银行基本设置接口
 * @author 赵俊涵
 * @date 2016.12.16
 */
function model(_this) {
    return {
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        getUserList () {
            return formDataRequest('./user/list').get()
        },
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        getBankList () {
            return formDataRequest('./bank/bank_list').get()
        },
        getBanklevelList() {
            return formDataRequest('./bank/sub_bank_level_list').get()
        },
        getPrivilegesList() {
            return formDataRequest('./privilege/list').get()
        },
        addUser(data){
            return _this.$http.post('./user/add',data)
        },
        getUserInfo(id) {
            return formDataRequest('./user/info/'+id).get()
        },
    }
}
module.exports = model