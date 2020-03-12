var Backbone = require('backbone');
var AvailableCouponItemView = require('./available_coupon_item_view.js');
module.exports = (function () {
	var AvailableCouponCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: AvailableCouponItemView,
		tagName: 'ol',
		className: 'COUPONS'
	});
	return AvailableCouponCollectionView;
})();
