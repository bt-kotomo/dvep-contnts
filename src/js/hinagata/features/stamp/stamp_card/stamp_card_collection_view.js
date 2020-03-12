var Backbone = require('backbone');
var StampCardItemView = require('./stamp_card_item_view');
module.exports = (function () {
	var StampCardCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: StampCardItemView,
		tagName: 'ol',
		className: 'STAMPCARD'
	});
	return StampCardCollectionView;
})();
