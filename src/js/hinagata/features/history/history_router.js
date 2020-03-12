var Backbone = require('backbone');
var HistoryListLayout = require("./history_list_layout.js");
module.exports = (function () {

	var HistoryController = Backbone.Marionette.Controller.extend({
		showHistoryList: function(){
			var historyLayout = new HistoryListLayout();
			historyLayout.render();
			App.pageSlider.slidePage( historyLayout );
			App.headerModel.applyViewHeaderConf( historyLayout.headerConf );
		},
	});

	var historyController = new HistoryController();

	var HistoryRouter = Backbone.Marionette.AppRouter.extend({
		controller: historyController,
		appRoutes: {
			"history" : "showHistoryList",
		}
	});

	return HistoryRouter;

})();
