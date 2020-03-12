var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var AutoLoginLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./autologinsms_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			var userId = options.id;
			var auth = App.getAuthInfo();
			var smstel = auth.smstel;
			var password = auth.password;
			var tokentemp = auth.tokentemp;

			this.userModel = new UserModel();
			App.util.bindProgressScreen(this, this.userModel );

			if (tokentemp) {
				App.appModel.setAuthAndSave( { smstel: smstel, password: "", token: tokentemp } );
				App.pageSlider.backAndRestartHistory();
				App.vent.trigger( 'app-login' , { smstel: smstel, password: password, token: tokentemp });
				applican.notification.alert("登録完了しました", function(){}, "", "OK");
				applican.webView.reload();
			} else {
				applican.notification.alert("ログインできません", App.doNothing, "", "OK");
			}
		},
		headerConf: {
			title: "アプリログイン",
			showBackButton: true,

		},
		onRender: function(){
//			this.ui.seamlessValue.html(this.token);
			App.util.hideProgressScreen();
		},
	});

	return AutoLoginLayoutView;
})();
