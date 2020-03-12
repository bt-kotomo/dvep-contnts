var Backbone = require('backbone');
module.exports = (function () {
	var AvailableCouponItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./available_coupon_item_template.html'),
		templateHelpers: {
		},
	});

	return AvailableCouponItemView;

})();
