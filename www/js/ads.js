var ad_type = "";
var admod_andoid = "";
var admod_ios = "";
var ad_img = "";
var ad_target = "";
var inmobi_conf = {
    siteid: "d38ec5331bbd437ea6ca02e19b411bec",
    slot: "15",
    test: false,
    manual: true
};

$(document).ready(function () {
    $.ajax({
        url: "http://comic.apptruyen.com/ads.php",
        dataType: 'jsonp',
        success: function (data) {
            ad_type = data.ads;
			if (ad_type == "admod"){
				 admod_andoid = data.admod_andoid;
                 admod_ios = data.admod_ios;
			}else if (ad_type == "inmobi"){
				$("#maxads-footer").show();
				$("#maxads").hide();
				 var newConfig = {
					siteid : data.siteid,
					slot :  data.slot_number,
					test: false
					};
				_inmobi.getNewAd(document.getElementById('inmobile-ad-slot'), newConfig);
			}else if (ad_type =="maxads"){
				$("#maxads").html('<img onclick="location.href=\'' + data.target + '\'" src="' + data.img + '" />');
                $("#maxads-footer").show();
				$("#inmobile-ad-slot").hide();
			}
        },
        error: function () {
            alert("Error");
        }
    });

    //myInterval = setInterval(load_advertising, 2000);
    function load_advertising() {
        admob = window.sessionStorage.getItem("admob");
        if (admod_andoid != "" && admob != "true") {
            window.sessionStorage.setItem("admob", "true");
            addBanner(admod_andoid);
        } else {
            load_image_ads();
        }
    }

    function load_image_ads() {
        $("#maxads").html("<a onclick=\"navigator.app.loadUrl('" + ad_target + "', { openExternal:true });\"><img src='" + ad_img + "'></a>");
        $("#maxads-footer").show();
        clearInterval(myInterval);
    }

    function addBanner(publisherId) {
        var successCreateBannerView = function () {
            myadmob.requestAd({'isTesting': true}, success, error);
        };
        var success = function () {
        };
        var error = function (message) {
        };
        var options = {
            'publisherId': publisherId,
            'adSize': myadmob.AD_SIZE.BANNER
        }

        myadmob.createBannerView(options, successCreateBannerView, error);
    }


});