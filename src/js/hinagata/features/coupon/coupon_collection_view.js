var Backbone = require('backbone');
var CouponItemView = require('./coupon_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var CouponCollectionView = BaseCollectionView.extend({
		childView: CouponItemView,
		tagName: 'ol',
		className: 'COUPONS'
	});
	return CouponCollectionView;
})();
