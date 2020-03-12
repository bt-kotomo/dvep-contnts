var Backbone = require('backbone');
module.exports = (function () {

	var ScratchMainLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./scratch_main_layout_template.html'),
		regions: {
		},
		initialize: function(options){
		},
		headerConf: {
			title: "スクラッチ",
			showBackButton: true,
		},
	});

	return ScratchMainLayout;
})();
