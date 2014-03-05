var ad_type = "";
var admod_andoid = "";
var admod_ios = "";
var ad_img = "";
var ad_target = "";
$(document).ready(function() { 
	
	//load admob bang interval
	
	$.ajax({
		 url:"http://comic.apptruyen.com/ads.php",
		 dataType: 'jsonp', 
		 success:function(data){
			ad_type = data.ads;
			if (ad_type == "admob"){
				admod_andoid = data.admod_andoid;
				admod_ios = data.admod_ios;
			}else{
				ad_img = data.img;
				ad_target = data.target;
			}
		 },
		 error:function(){
			 alert("Error");
		 },
	});
	
	//myInterval =  setInterval(load_advertising,3000);
	function load_advertising(){
		if (admod_andoid != "") {
		}else{
			load_image_ads();
		}
	}
	function load_image_ads(){
		$("#maxads").html("<a onclick=\"navigator.app.loadUrl('" + ad_target + "', { openExternal:true });\"><img src='" + ad_img + "'></a>");
		$("#maxads-footer").show();
		clearInterval(myInterval);
	}

});