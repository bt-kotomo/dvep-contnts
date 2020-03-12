var Backbone = require('backbone');
var BaseCompositeView = require('../../views/base_composite_view.js');
var HistoryItemView = require('./history_item_view.js');
module.exports = (function () {
	var HistoryCollectionView = BaseCompositeView.extend({
		childView: HistoryItemView,
		initialize: function(options){
			// this.shopCollection = options.shopCollection;
			this.mode = options.mode;
		},
		childViewContainer: "ol.history-list",
		template: require("./history_collection_view_template.html"),
		onRender: function(){
			this.$( "." + this.mode + "-head" ).removeClass("HIDE");
		},
		buildChildView: function(child, ChildViewClass, childViewOptions){

			// child.set("shopName", this._getShopName( child ) );

			// build the final list of options for the childView class
			var options = _.extend({model: child}, childViewOptions);
			// create the child view instance
			var view = new ChildViewClass(options);
			// return it
			return view;
		},
		_getShopName: function( model ){
			/*if( !model.get("shopId") ){ return ""; }

			var shop = this.shopCollection.findWhere({ id: "" + model.get("shopId") } );
			return (shop)?  shop.get("name") : "";*/
			return model.get("shopName");
		},
	});
	return HistoryCollectionView;
})();
