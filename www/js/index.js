var myadmob;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		//myadmob = admob;
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        $.ajax({
            url: "https://drive.google.com/file/d/0BxiSPCgEtiuGSnFkcC1sZVd5ZTA/edit?usp=sharing",
            dataType: 'text',
            success: function (data) {
                alert(data);
            }
        });
    }




};
$.ajax({
    url: "http://comic.apptruyen.com/phoneApp/remote.json",
    dataType: 'jsonp',
    success: function (data) {
        alert(data);
    }
});