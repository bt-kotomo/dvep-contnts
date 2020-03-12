var Backbone = require('backbone');
module.exports = (function () {
	var InformationDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./information_detail_main_template.html'),
		templateHelpers: {
			formatDate: function(date){
				return date.split("-").join("/");
			}
		},
	});
	return InformationDetailMainView;
})();
