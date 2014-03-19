//only if indexedDB not supported use shim/polyfil
//if(typeof indexedDB == 'undefined'){
if(typeof openDatabase != 'undefined'){
    $('body').append('<script type="text/javascript" src="js/websql.js"></script>');
} else {
    $('body').append('<script type="text/javascript" src="js/indexeddb.js"></script>');
}