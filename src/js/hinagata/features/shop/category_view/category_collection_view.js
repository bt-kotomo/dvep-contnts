var Backbone = require('backbone');
var BaseCollectionView = require('../../../views/base_collection_view.js');
var CategoryItemView = require('./category_item_view.js');
module.exports = (function () {
	var CategoryCollectionView = BaseCollectionView.extend({
		childView: CategoryItemView,
		tagName: 'ol',
		className: 'CATEGORIES',
		initialize: function( options ){
			this.conditionModel = options.conditionModel; // SearchConditionModel
		},
		childEvents: {
			"select:category" : function( childView, model ){
				this.conditionModel.pushParentObject({ id: model.get("id"), name: model.get("name") });
			},
		},

	});
	return CategoryCollectionView;
})();
