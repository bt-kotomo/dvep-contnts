var Backbone = require('backbone');
var ShopModel = require('../../models/shop_model.js');
var ShopDetailMainView = require('./shop_detail_main_view.js');
module.exports = (function () {

	var ShopDetailLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./shop_detail_layout_template.html'),
		regions: {
			"shopDetailRegion" : "#shop-detail-region"
		},
		ui: {
		},
		events: {
		},
		initialize: function( options ){
			this.shopModel = new ShopModel( {id: options.shopId } );
			App.util.bindProgressScreen(this, this.shopModel);
			this.listenTo(this.shopModel, 'sync', this._renderShop);
		},
		onRender: function(){
			this.shopModel.fetchShop();
		},
		_renderShop: function(){
			this.shopDetailRegion.show( new ShopDetailMainView({ model: this.shopModel}) );
		},
		headerConf: {
			title: "お店詳細",
			showBackButton: true,
		},
	});

	return ShopDetailLayout;
})();
