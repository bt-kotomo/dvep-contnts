var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var RegisterLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./register_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			var sid = options.id;
			var ftype = options.ftype;

			var url = "";
			if (ftype != null && ftype != "") {
				url = AppConf.url.registerForms[ftype];
			} else {
				url = AppConf.url.registerForm;
			}
			console.log( "ftype:" + ftype );

			if (url != null && url != "") {
				url += '&SID=' + sid;
			location.href = url + '&_native_open_embedded';
			}
		},
		headerConf: {
			title: "会員登録",
			showBackButton: true,

		},
		onRender: function(){
			App.util.hideProgressScreen();
//			App.pageSlider.backAndRestartHistory();
		},
	});

	return RegisterLayoutView;
})();
