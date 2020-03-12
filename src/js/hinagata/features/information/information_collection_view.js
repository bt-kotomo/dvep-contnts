var Backbone = require('backbone');
var BaseCollectionView = require('../../views/base_collection_view.js');
var InformationItemView = require('./information_item_view.js');
module.exports = (function () {
	var InformationCollectionView = BaseCollectionView.extend({
		childView: InformationItemView,
		tagName: 'ol',
		className: 'INFORMATION-LIST',
	});

	return InformationCollectionView;
})();
