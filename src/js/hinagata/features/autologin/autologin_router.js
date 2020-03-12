var Backbone = require('backbone');
var AutoLoginLayoutView = require('./autologin_layout.js');
var RegisterLayoutView = require('./register_layout.js');
var AutoLoginSmsLayoutView = require('./autologinsms_layout.js');

var querystring = require('querystring');
module.exports = (function () {

	var AutoLoginController = Backbone.Marionette.Controller.extend({
		showAutoLogin: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var autologinLayoutView = new AutoLoginLayoutView({
				id: id
			});
			autologinLayoutView.render();
			App.pageSlider.slidePage( autologinLayoutView );
			App.headerModel.applyViewHeaderConf( autologinLayoutView.headerConf );
		},
		showRegister: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var registerLayoutView = new RegisterLayoutView({
				id: id,
				ftype: queryObj.ftype
			});
			registerLayoutView.render();
			App.pageSlider.slidePage( registerLayoutView );
			App.headerModel.applyViewHeaderConf( registerLayoutView.headerConf );
		},
		showAutoLoginSms: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var autologinsmsLayoutView = new AutoLoginSmsLayoutView({
				id: id
	});
			autologinsmsLayoutView.render();
			App.pageSlider.slidePage( autologinsmsLayoutView );
			App.headerModel.applyViewHeaderConf( autologinsmsLayoutView.headerConf );
		},
	});

	var autologinController = new AutoLoginController();

	var AutoLoginRouter = Backbone.Marionette.AppRouter.extend({
		controller: autologinController,
		appRoutes: {
			"autologin/:id(?:query)" : "showAutoLogin",
			"register/:id(?:query)" : "showRegister",
			"autologinsms/:id(?:query)" : "showAutoLoginSms",
		}
	});

	return AutoLoginRouter;

})();
