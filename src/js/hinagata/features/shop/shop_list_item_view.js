var Backbone = require('backbone');
module.exports = (function () {
	var ShopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor1",
		template: require('./shop_list_item_template.html'),
		templateHelpers: {
		},
	});

	return ShopListItemView;

})();
