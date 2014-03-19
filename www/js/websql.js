var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

html5rocks.webdb.open = function () {
    var dbSize = 5 * 1024 * 1024; // 5MB
    html5rocks.webdb.db = openDatabase("mycomic", "1.0", "mycomic", dbSize);
};

html5rocks.webdb.onError = function (tx, e) {
    console.log("There has been an error: " + e.message);
};

html5rocks.webdb.onSuccess = function (tx, e) {
    console.log("Store data success: " + e.message);
};

html5rocks.webdb.createTable = function () {
    var db = html5rocks.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS currentlyRead (comicid INTEGER PRIMARY KEY ASC, comicname TEXT, " +
            "chapid INTEGER, chapname TEXT)");
    });
};

html5rocks.addComic = function (comicid, comicname) {
    var db = html5rocks.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM currentlyRead where comicid = ?", [comicid], function (tx, rs) {
            if (rs.rows.length > 0) {
                tx.executeSql("UPDATE currentlyRead SET comicname = ? WHERE comicid = ?",
                    [comicname , comicid], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);
            } else {
                tx.executeSql("INSERT INTO currentlyRead(comicid, comicname) VALUES (?,?)",
                    [comicid, comicname], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);
            }
        }, html5rocks.webdb.onError);
    });
};

html5rocks.savelastread = function (comicid, chapid, chaptitle) {
    var db = html5rocks.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM currentlyRead where comicid = ?", [comicid], function (tx, rs) {
            if (rs.rows.length > 0) {
                tx.executeSql("UPDATE currentlyRead SET chapid = ?, chapname = ? WHERE comicid = ?",
                    [chapid, chaptitle, comicid], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);
            } else {
                tx.executeSql("INSERT INTO currentlyRead(comicid, chapid, chapname) VALUES (?,?,?)",
                    [comicid, chapid, chaptitle], html5rocks.webdb.onSuccess, html5rocks.webdb.onError);
            }
        }, html5rocks.webdb.onError);
    });
};

html5rocks.listCurrentlyRead = function () {
    var db = html5rocks.webdb.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM currentlyRead", [], function (tx, rs) {
            for (var i = 0; i < rs.rows.length; i++) {
                var value = {},
                    chapid = rs.rows.item(i).chapid,
                    chaptitle = rs.rows.item(i).chapname;
                value.id = rs.rows.item(i).comicid;
                value.title = rs.rows.item(i).comicname;
                if (chaptitle == null || value.title == null) continue;
                $("#table-ds-truyen").append('<tr onclick="gotoView(' + chapid + ' ,' + value.id + ');" ><td>' +
                    value.title + '</td><td>' + chaptitle + '</td></tr>');
            }
            $(".loading").hide();
        }, html5rocks.webdb.onError);
    });
};

function init() {
    html5rocks.webdb.open();
    html5rocks.webdb.createTable();
}
init();

