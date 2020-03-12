var Backbone = require('backbone');
var ShopListItemView = require('./shop_list_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var ShopListCollectionView = BaseCollectionView.extend({
		childView: ShopListItemView,
		tagName: 'ol',
		className: 'SHOPS'
	});
	return ShopListCollectionView;
})();
