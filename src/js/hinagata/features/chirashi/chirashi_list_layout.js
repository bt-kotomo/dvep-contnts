var Backbone = require('backbone');
module.exports = (function () {

	var ChirashiListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./chirashi_list_layout_template.html'),
		regions: {
		},
		initialize: function(options){
		},
		headerConf: {
			title: "チラシ一覧",
			showBackButton: true,
		},
	});

	return ChirashiListLayout;
})();
