var Backbone = require('backbone');
var MemberItemView = require('./member_item_view.js');
module.exports = (function () {

	var MemberController = Backbone.Marionette.Controller.extend({

		showMember: function(){
			var memberView = new MemberItemView();
			memberView.render();
			App.pageSlider.slidePage( memberView );
			App.headerModel.applyViewHeaderConf( memberView.headerConf );
		}
	});

	var memberController = new MemberController();

	var MemberRouter = Backbone.Marionette.AppRouter.extend({
		controller: memberController,
		appRoutes: {
			"member" : "showMember"
		}
	});

	return MemberRouter;

})();
