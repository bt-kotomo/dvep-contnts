var Backbone = require('backbone');
var ChirashiListLayout = require("./chirashi_list_layout.js");
module.exports = (function () {

	var ChirashiController = Backbone.Marionette.Controller.extend({
		showChirashiList: function(){
			var chirashiLayout = new ChirashiListLayout();
			chirashiLayout.render();
			App.pageSlider.slidePage( chirashiLayout );
			App.headerModel.applyViewHeaderConf( chirashiLayout.headerConf );
		},
	});

	var chirashiController = new ChirashiController();

	var ChirashiRouter = Backbone.Marionette.AppRouter.extend({
		controller: chirashiController,
		appRoutes: {
			"chirashi" : "showChirashiList",
		}
	});

	return ChirashiRouter;

})();
