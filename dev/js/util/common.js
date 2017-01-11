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

window.buildParams=function( prefix, obj, traditional, add ) {
    let name;
    let rbracket = /\[\]$/;
    if ( _.isArray( obj ) ) {

        // Serialize array item.
        _.map( obj, function( i, v ) {
            if ( traditional || rbracket.test( prefix ) ) {

                // Treat each array item as a scalar.
                add( prefix, v );

            } else {

                // Item is non-scalar (array or object), encode its numeric index.
                buildParams(
                    prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                    v,
                    traditional,
                    add
                );
            }
        } );

    } else if ( !traditional && typeof( obj ) === "object" ) {

        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
        }

    } else {

        // Serialize scalar item.
        add( prefix, obj );
    }
}
window.paramData = function( a, traditional ) {
    let prefix,
        s = [],
        r20 = /%20/g,
        add = function( key, value ) {

            // If value is a function, invoke it and return its value
            value =( value == null ? "" : value );
            s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
        };
    if ( _.isArray( a ) ) {
        _.map( a, function() {
            add( this.name, this.value );
        } );

    } else {

        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            buildParams( prefix, a[ prefix ], traditional, add );
        }
    }

    // Return the resulting serialization
    return s.join( "&" ).replace( r20, "+" );
};
