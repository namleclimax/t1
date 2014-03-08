var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase("MyComic", "1.0", "MyComic", dbSize);
}

html5rocks.webdb.createTable = function() {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS mycomic(comic_id INTEGER PRIMARY KEY ASC, comic_title TEXT, " +
        "views INTEGER, weekview INTEGER, lastchapterid INTEGER, lastchaptertitle TEXT)", []);
  });
};

html5rocks.webdb.addComic = function(comic_id,comic_title,comic_views,comic_weekview) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("INSERT INTO mycomic(comic_id, comic_title, views, weekview) VALUES (?,?,?,?)",
        [comic_id, comic_title,comic_views,comic_weekview],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
   });
};

html5rocks.webdb.onError = function(tx, e) {
  console.log("There has been an error: " + e.message);
};

html5rocks.webdb.onSuccess = function(tx, e) {
  // re-render the data.
  console.log("Store data success: " + e.message);
};

html5rocks.webdb.savelastread = function(comic_id, chapid, chaptitle) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM mycomic where comic_id = ?", [comic_id], function (tx, rs) {
        if(rs.rows.length > 0){
            tx.executeSql("UPDATE mycomic SET lastchapterid = ?, lastchaptertitle = ? WHERE comic_id = ?",
                [chapid, chaptitle, comic_id], function(){},html5rocks.webdb.onError);
        } else {
            tx.executeSql("INSERT INTO mycomic(comic_id, lastchapterid, lastchaptertitle) VALUES (?,?,?)",
                [comic_id, chapid, chaptitle], function(){},html5rocks.webdb.onError);
        }
    },html5rocks.webdb.onError);
  });
}

html5rocks.webdb.loadlastread = function() {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM mycomic", [], function (tx, rs) {
        for (var i=0; i < rs.rows.length; i++) {
            var value = {},
                chapid = rs.rows.item(i).lastchapterid,
                chaptitle = rs.rows.item(i).lastchaptertitle;
            if(chapid===null) continue;
            value.id = rs.rows.item(i).comic_id;
            value.title = rs.rows.item(i).comic_title;
            $("#table-ds-truyen").append('<tr onclick="location.href=\'view.html?id=' + chapid + '&story=' + value.id +
                '\'" ><td>' + value.title + '</td><td>' + chaptitle + '</td></tr>');
        }
        $(".loading").hide(); 
    },html5rocks.webdb.onError);
  });
};

function init() {
  html5rocks.webdb.open();
  html5rocks.webdb.createTable();
  //html5rocks.webdb.getAllTodoItems(loadTodoItems);
}
init();
function storeComictoDb(comic_id,comic_title,comic_views,comic_weekview) {
  html5rocks.webdb.addComic(comic_id,comic_title,comic_views,comic_weekview);
}

