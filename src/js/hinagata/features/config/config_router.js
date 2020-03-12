var Backbone = require('backbone');
var ConfigTopLayoutView = require('./config_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var ConfigController = Backbone.Marionette.Controller.extend({
		showConfigTop: function(){
			var configTopLayoutView = new ConfigTopLayoutView();
			configTopLayoutView.render();
			App.pageSlider.slidePage( configTopLayoutView );
			App.headerModel.applyViewHeaderConf( configTopLayoutView.headerConf );
		}
	});

	var configController = new ConfigController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: configController,
		appRoutes: {
			"config" : "showConfigTop",
		}
	});

	return ConfigRouter;

})();
