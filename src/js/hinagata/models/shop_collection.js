var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var ShopModel = require('./shop_model.js');
module.exports = (function () {
	var ShopCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/shop/search",
		model: ShopModel,
		parse: function(response) {
			return response.shopList;
		},
		/**
		 * 位置情報を元に店舗を検索
		 */
		fetchWithGeoLocationInfo: function( longitude, latitude, options ){
			var options = options || {}; 
			options.getParams = {
				longitude: longitude,
				latitude: latitude,
				searchType: 0
			};

			return this.fetchWithAuthInfo( options );
		},
		/**
		 * フリーワードを指定しての検索
		 * 何も無い場合は全件取得します
		 */
		fetchWithFreeword: function( text, options ){
			var options = options || {}; 
			if( text ){options.getParams = { searchType: 2, keyword: text }; }
			return this.fetchWithAuthInfo( options );
		},
	});
	return ShopCollection;
})();
