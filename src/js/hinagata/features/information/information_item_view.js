var Backbone = require('backbone');
module.exports = (function () {
	var InformationItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: 'bdcolor1',
		template: require('./information_item_template.html'),
		templateHelpers: {
			formatDate: function(date){
				return date.split("-").join("/");
			}
		}
	});
	return InformationItemView;
})();
