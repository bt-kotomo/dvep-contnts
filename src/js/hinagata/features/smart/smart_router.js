var Backbone = require('backbone');
var SmartMainLayout = require("./smart_main_layout.js");
module.exports = (function () {

	var SmartController = Backbone.Marionette.Controller.extend({
		showSmartMainView: function(){
			var smartMainLayout = new SmartMainLayout();
			smartMainLayout.render();
			App.pageSlider.slidePage( smartMainLayout );
			App.headerModel.applyViewHeaderConf( smartMainLayout.headerConf );
		},
	});

	var smartController = new SmartController();
	var SmartRouter = Backbone.Marionette.AppRouter.extend({
		controller: smartController,
		appRoutes: {
			"smart" : "showSmartMainView",
		}
	});

	return SmartRouter;

})();
