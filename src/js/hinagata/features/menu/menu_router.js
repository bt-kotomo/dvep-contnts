var Backbone = require('backbone');
var MenuTopLayoutView = require('./menu_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var MenuController = Backbone.Marionette.Controller.extend({
		showMenuRegis: function(){
			var menuTopLayoutView = new MenuTopLayoutView();
			menuTopLayoutView.render();
			App.pageSlider.slidePage( menuTopLayoutView );
			App.headerModel.applyViewHeaderConf( menuTopLayoutView.headerConf );
		}
	});

	var menuController = new MenuController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: menuController,
		appRoutes: {
			"menuRegis" : "showMenuRegis",
		}
	});

	return ConfigRouter;

})();
