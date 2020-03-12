var Backbone = require('backbone');
var InformationListLayout = require("./information_list_layout.js");
var InformationDetailLayout = require("./information_detail_layout.js");
module.exports = (function () {

	var InformationController = Backbone.Marionette.Controller.extend({
		showInformationList: function(){
			var informationLayout = new InformationListLayout();
			informationLayout.render();
			App.pageSlider.slidePage( informationLayout );
			App.headerModel.applyViewHeaderConf( informationLayout.headerConf );
		},
		showInformationDetail: function( id ){
			var informationDetailLayout = new InformationDetailLayout({ informationId: id });
			informationDetailLayout.render();
			App.pageSlider.slidePage( informationDetailLayout );
			App.headerModel.applyViewHeaderConf( informationDetailLayout.headerConf );
		},
	});

	var informationController = new InformationController();

	var InformationRouter = Backbone.Marionette.AppRouter.extend({
		controller: informationController,
		appRoutes: {
			"information" : "showInformationList",
			"information/:id" : "showInformationDetail",
		}
	});

	return InformationRouter;

})();
