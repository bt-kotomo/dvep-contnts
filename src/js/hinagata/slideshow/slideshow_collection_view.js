var Backbone = require('backbone');
var SlideShowItemView = require('./slideshow_view.js');
module.exports = (function () {
	var SlideShowCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SlideShowItemView
	});

	return SlideShowCollectionView;

})();
