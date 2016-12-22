/**
 * [phone格式 过滤]
 * @param  {[type]} input     [输入值]
 */
export default function (val){
	console.log(val.replace(/(\d{3})(\d{5})(\d{3})/,"$1*****$3"));
	return  val.replace(/(\d{3})(\d{5})(\d{3})/,"$1*****$3")
}
