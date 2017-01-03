/**
 * Created by Administrator on 17/01/03.
 */

function model(_this){
	return {
		/**
		 * @description 分支行列表
		 * @param
		 * @returns {*}
		 */
		getBranchBankList(){
			return formDataRequest('./bank/bank_list').get()
		}

	}
}
module.exports = model;
