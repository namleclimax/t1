function gotoView(chapterid, comicid){
    localStorage.setItem('chapterid', chapterid);
    localStorage.setItem('comicid', comicid);
    window.location = 'view.html';
}

html5rocks.listCurrentlyRead();