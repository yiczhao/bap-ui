/**
 * Created by yiczhao on 2016/12/15.
 */
window.formDataRequest =(url)=>{
    return Vue.resource(url, null, null, {
        emulateJSON: true
    })
}
window.dialog=((types,mes)=>{
    switch (types){
        case 'error':
            swal({
                title: mes,
                type: "error",
                confirmButtonColor: "#2196F3"
            })
            break;
        case 'success':
            swal({
                title: mes,
                type:"success",
                confirmButtonColor: "#2196F3"
            })
            break;
        case 'info':
            swal({
                title: mes,
                type:"info",
                confirmButtonColor:"#00BCD4"
            })
            break;
        case 'successTime':
            swal({
                title: mes,
                type:"success",
                timer: 2000,
                confirmButtonColor: "#2196F3"
            })
            break;
        default:
            swal({
                title: '保存成功',
                type:"success",
                confirmButtonColor: "#2196F3"
            })
            break;
    }
})
window.stringify = (dater , format)=>{

    var year = dater.getFullYear()
    var month = dater.getMonth() + 1
    var date = dater.getDate()
    // var monthName = months[dater.getMonth()]

    format = format || 'YYYY-MM-DD'

    var map = {
        YYYY: year,
        // MMM: monthName,
        MM: ('0' + month).slice(-2),
        M: month,
        DD: ('0' + date).slice(-2),
        D: date
    }
    return format.replace(/Y+|M+|D+/g, function (str) {
        return map[str]
    })
}

window.onbeforeunload=()=>{
    localStorage.clear();
}
