////////////////////////////////////////
// applican の読み込み完了まで待機
document.addEventListener("deviceready", onDeviceReady, false);

// applican 準備完了
function onDeviceReady(){
	w = $(window).width();
	h = $(window).height();
	ow = $(window).outerWidth();
	oh = $(window).outerHeight();
//	console.log("w="+w+",h="+h+"/ow="+ow+",oh="+oh);
	w = ow;
	h = oh;
	$('#content').css({'height': h});
	$('.scratchpad').css({'left': ( w - 240 ) / 2, 'top': ( h - 240 ) / 2});
	$('#get').css({'left': ( w - 230 ) / 2, 'top': ( h - 230 ) / 2});
	if ( h < 500 ) {
		$('#btnMainWrpper').css({'left': ( w - 250 ) / 2, 'top': h / 2 + 155});
		$('.bg_txt').css({'padding-top': '10%'});
		$('#alt-link').css({'padding-top': '08px'});
		$('#demo2').css({'top': '120px'});
	} else {
		if ( h >= 500 && h < 600 ){
			$('#btnMainWrpper').css({'left': ( w - 250 ) / 2, 'top': h / 2 + 190});
			if ( applican.config.device_os === "ANDROID" ) {
				$('#demo2').css({'top': '183px'});
			}else{
				$('#demo2').css({'top': '165px'});
			}
		}else if(h >= 600 && h < 700){	
			if ( applican.config.device_os === "ANDROID" ) {
				$('#btnMainWrpper').css({'left': ( w - 250 ) / 2, 'top': h / 2 + 220});
				$('#demo2').css({'top': '200px'});
			}else{
				$('#btnMainWrpper').css({'left': ( w - 250 ) / 2, 'top': h / 2 + 240});
				$('#demo2').css({'top': '215px'});
			}
		}else if( h >= 700 ){
			$('#btnMainWrpper').css({'left': ( w - 250 ) / 2, 'top': h / 2 + 270});
			$('#demo2').css({'top': '255px'});
		}		
	}
	$("#btnReturn").css({"margin-bottom": 15});
	$('#btnMainWrpper').show();
}
