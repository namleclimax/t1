/**
 * Created by Anh Tuan on 3/8/14.
 */

// namespacing

var html5rocks = {};
html5rocks.indexedDB = {};

// print error function
html5rocks.indexedDB.onerror = function (e) {
    console.log(e.value);
};

//Step 1. Opening the database
//Step 2. Creating an Object Store

html5rocks.indexedDB.open = function (onSuccessDoWhat, parameters) {
    var version = 1;
    var request = indexedDB.open("mycomic", version);

    // We can only create Object stores in a versionchange transaction.
    request.onupgradeneeded = function (e) {
        var db = e.target.result;

        // A versionchange transaction is started automatically.
        e.target.transaction.onerror = html5rocks.indexedDB.onerror;

        // if table/objectStore exist delete
        if (db.objectStoreNames.contains("currentlyRead")) {
            db.deleteObjectStore("currentlyRead");
        }

        // create new table/objectStore, comicid is primary key/keyPath
        var store = db.createObjectStore("currentlyRead",
            {keyPath: "comicid"});
    };

    request.onsuccess = function (e) {
        html5rocks.indexedDB.db = e.target.result;

        // ONLY ACCESS DB IN CALLBACK WHEN LOADED, OTHERWISE DB WILL BE UNDEFINED
        onSuccessDo(onSuccessDoWhat, parameters);
    };

    request.onerror = html5rocks.indexedDB.onerror;
};


//Step 3. Adding data to an object store

html5rocks.indexedDB.addCurrentlyRead = function (parameters) {
    var db = html5rocks.indexedDB.db;
    var trans = db.transaction(["currentlyRead"], "readwrite");
    var store = trans.objectStore("currentlyRead");

    // search for existed record
    var getRequest = store.get(parameters.comicid);

    getRequest.onerror = html5rocks.indexedDB.onerror;

    getRequest.onsuccess = function (e) {
        // Get the old value that we want to update
        var data = getRequest.result;

        // if no record found, create new
        if(typeof data === 'undefined') data = {};

        // only update value not undefined into database
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                data[key] = parameters[key];
            }
        }

        // insert/update DB
        var request = store.put(data);

        //request.onsuccess = function(e) {};
        request.onerror = html5rocks.indexedDB.onerror;
    };
};


//Step 4. Querying the data in a store.

html5rocks.indexedDB.listCurrentlyRead = function () {

    var db = html5rocks.indexedDB.db;
    var trans = db.transaction(["currentlyRead"], "readwrite");
    var store = trans.objectStore("currentlyRead");

    // Get everything in the store;
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;
        if (!!result == false)
            return;

        // actual render code
        var row = result.value;

        // don't display comic without chapter
        if (row.chapid != undefined && row.chapname != undefined) {
            $("#table-ds-truyen").append('<tr onclick="location.href=\'view.html?id=' + row.chapid + '&story=' +
                row.comicid + '\'" ><td>' + row.comicname + '</td><td>' + row.chapname + '</td></tr>');
        }

        // next row
        result.continue();
    };

    // hide loading screen
    $(".loading").hide();

    cursorRequest.onerror = html5rocks.indexedDB.onerror;
};


// enable debugging with websql shim, must include shim before this file
window.shimIndexedDB.__debug(true);


// ONLY ACCESS DB IN CALLBACK WHEN LOADED, OTHERWISE DB WILL BE UNDEFINED
function onSuccessDo(onSuccessDoWhat, parameters) {
    switch (onSuccessDoWhat) {
        case 'list':
            html5rocks.indexedDB.listCurrentlyRead();
            break;
        case 'add':
            html5rocks.indexedDB.addCurrentlyRead(parameters);
            break;
    }
}