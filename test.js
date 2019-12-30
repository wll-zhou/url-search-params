const URLSearchParams = require( './index' );

let params = new URLSearchParams( 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd=%E4%B8%AD%E6%96%87&rsv_spt=1&oq=2%2526lt%253B&rsv_pq=d5c66ae400015533&rsv_t=b65az5FYuYV55iSQvz4Ycu0C4dIjI5MMIZ%2BVkhMIuFc8PdIg%2FuhFcGgNMLLni%2FhIzVKU&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=2&rsv_sug1=2&rsv_sug7=100&rsv_sug2=0&inputT=2558&rsv_sug4=2775' );

console.log( params.paramValue );
params.sort();
for ( let [key, value] of params ) {
    console.log(key, value );
}
