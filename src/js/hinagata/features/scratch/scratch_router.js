var Backbone = require('backbone');
var ScratchMainLayout = require("./scratch_main_layout.js");
module.exports = (function () {

	var ScratchController = Backbone.Marionette.Controller.extend({
		showScratchMain: function(){
			var scratchMainLayout = new ScratchMainLayout();
			scratchMainLayout.render();
			App.pageSlider.slidePage( scratchMainLayout );
			App.headerModel.applyViewHeaderConf( scratchMainLayout.headerConf );
		},
	});

	var scratchController = new ScratchController();

	var ScratchRouter = Backbone.Marionette.AppRouter.extend({
		controller: scratchController,
		appRoutes: {
			"scratch" : "showScratchMain",
		}
	});

	return ScratchRouter;

})();
