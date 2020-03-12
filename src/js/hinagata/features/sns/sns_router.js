var Backbone = require('backbone');
var SnsTopLayoutView = require('./sns_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var SnsController = Backbone.Marionette.Controller.extend({
		showSns: function(){
			var snsTopLayoutView = new SnsTopLayoutView();
			snsTopLayoutView.render();
			App.pageSlider.slidePage( snsTopLayoutView );
			App.headerModel.applyViewHeaderConf( snsTopLayoutView.headerConf );
		}
	});

	var snsController = new SnsController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: snsController,
		appRoutes: {
			"sns" : "showSns",
		}
	});

	return ConfigRouter;

})();
