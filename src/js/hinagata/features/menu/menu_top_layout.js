var Backbone = require('backbone');

module.exports = (function () {
	var MenuTopLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./menu_top_layout_template.html'),
		initialize: function() {
		},
		headerConf: {
			title: "メニュー",
			showBackButton: true,
			showHomeButton: true,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
	});

	return MenuTopLayoutView;
})();
