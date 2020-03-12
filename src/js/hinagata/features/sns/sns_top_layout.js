var Backbone = require('backbone');

module.exports = (function () {
	var SnsTopLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./sns_top_layout_template.html'),
		headerConf: {
			title: "SNSアカウント",
			showBackButton: true,
			showHomeButton: true,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
	});

	return SnsTopLayoutView;
})();
