function gotoView(chapterid, comicid){

    localStorage.setItem('chapterid', chapterid);
    localStorage.setItem('comicid', comicid);
    window.location = 'view.html';

//    // if iOS/Android (support WebSQL)
//    if(typeof openDatabase != 'undefined'){
//        window.location = 'view.html?comicid=' + comicid + '&chapterid=' + chapterid;
//
//    // if WP8 (IndexedDB)
//    } else {
//        localStorage.setItem('chapterid', chapterid);
//        localStorage.setItem('comicid', comicid);
//        window.location = 'view.html';
//    }
}