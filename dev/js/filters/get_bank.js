export default  (value,data) => {
	let str='';
	if(!data.length){
		return str
	}
	_.map(data,(val)=>{
		if(val.uuid==value){
			str=val.shortName;
		}
	})
	return str;
}

