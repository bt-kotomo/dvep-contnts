var Backbone = require('backbone');
var StampTopLayoutView = require('./stamp_top_layout.js');
var StampDownLayoutView = require('./stamp_down_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var StampController = Backbone.Marionette.Controller.extend({
		showStampTop: function(){
			// location.href="#stamp-down";
			var stampTopLayoutView = new StampTopLayoutView();
			stampTopLayoutView.render();
			App.pageSlider.slidePage( stampTopLayoutView );
			App.headerModel.applyViewHeaderConf( stampTopLayoutView.headerConf );
		},
		showStampDown: function(){
			var stampDownLayoutView = new StampDownLayoutView();
			stampDownLayoutView.render();
			App.pageSlider.slidePage( stampDownLayoutView );
			App.headerModel.applyViewHeaderConf( stampDownLayoutView.headerConf );
		}
	});

	var stampController = new StampController();

	var StampRouter = Backbone.Marionette.AppRouter.extend({
		controller: stampController,
		appRoutes: {
			"stamp" : "showStampTop",
			"stamp-down" : "showStampDown",
		}
	});

	return StampRouter;

})();
