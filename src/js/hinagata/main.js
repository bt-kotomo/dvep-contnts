
var ModalAlertView = require('./modals/alert/modal_alert_view');
var ModalConfirmView = require('./modals/confirm/modal_confirm_view');

window.App = {};

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackButton, false);

function onDeviceReady() {

	// ############## Native API start #################
	native.config = {
		device_os: "ANDROID",
	};
	native.device.package_name = "com.betrend.dev.dvep";
	// パッケージ名が変更
	native.localNotification = native.localnotification;
	window.applican = native;
	// ############## Native API end #################

	if (!window.AppConf) {

		// ############## Native API start #################
		native.config = {
			device_os: "ANDROID",
		};
		native.device = {};
		native.device.package_name = "com.betrend.dev.dvep";
		// modify package names
		native.localNotification = native.localnotification;
		window.applican = native;
		// ############## Native API end #################

		applican.notification.alert("アプリ設定が読み込まれていません", function() { return false; }, "title", "OK");
		return;
	}
	
	App = require('./app.js');
	var modalConfirmView = new ModalConfirmView();
	var modalAlertView = new ModalAlertView();
	window.native.notification.alert = function(message, alertCallback, title, buttonName) {
		modalAlertView.show({ title: title, text: message, okButton: buttonName });
	}
	window.native.notification.confirm = function(message, confirmCallback, title, buttonName) {
		var buttons = [];
		if (buttonName) {
			buttons = buttonName.split(',');
		}
		modalConfirmView.show({ title: title, text: message, okButton: buttons[0], cancelButton: buttons[0] ? buttons[0] : null }).then(function(res) {
			if (res === 1) {
				confirmCallback && confirmCallback(1);
			}
		});
	}
	App.start();
};
// Android戻るボタンサポート(TOPで終了)
function onBackButton() {
	var url = document.location.href;
	if (url.match("(.+/index.html$|.+/index.html#$)")) {
		applican.notification.confirm(
			"アプリを終了しますか？", onFinish, "終了", "終了する,キャンセル");
	} else {
		history.back();
	}
}

function onFinish(num) {
	if (num == 1) {
		applican.finish();
	}
}
