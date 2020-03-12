var Backbone = require('backbone');
//var querystring = require('querystring');
var ShopListLayoutView = require('./shop_list_layout.js');
var ShopDetailLayout = require('./shop_detail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var ShopController = Backbone.Marionette.Controller.extend({

		showShopList: function( query ){
			var queryObj = querystring.parse(query || {});
			var shopListLayoutView = new ShopListLayoutView({ initialQuery: queryObj });
			shopListLayoutView.render();
			App.pageSlider.slidePage( shopListLayoutView );
			App.headerModel.applyViewHeaderConf( shopListLayoutView.headerConf );
		},
		showShopDetail: function( id ){
			var shopDetailLayout = new ShopDetailLayout( {shopId: id} );
			shopDetailLayout.render();
			App.pageSlider.slidePage( shopDetailLayout );
			App.headerModel.applyViewHeaderConf( shopDetailLayout.headerConf );
		},

	});

	var shopController = new ShopController();

	var ShopRouter = Backbone.Marionette.AppRouter.extend({
		controller: shopController,
		appRoutes: {
			"shop(?:query)" : "showShopList",
			"shop/:id" : "showShopDetail",
		}
	});

	return ShopRouter;

})();
