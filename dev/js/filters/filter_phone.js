/**
 * [phone格式 过滤]
 * @param  {[type]} input     [输入值]
 */
export default function (str){
	var reg = /^(\d{3})\d+(\d{4})$/;
		str = str.replace(reg, "$1****$2");
	return  str
	// return  val.replace(/(\d{3})(\d{5})(\d{3})/,"$1*****$3")
}
