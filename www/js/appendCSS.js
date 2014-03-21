if(typeof openDatabase != 'undefined'){
    $('head').append('<link href="./css/bootstrap.min.css" rel="stylesheet">');
} else {
    $('head').append('<link href="./css/bootstrap.wp8.min.css" rel="stylesheet">');
}