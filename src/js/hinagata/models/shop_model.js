var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var ShopModel = BaseModel.extend({
		url: AppConf.url.appRoot + '/shop/detail',
		fetchShop: function(options){
			var options = _.extend( options || {}, { url: this.url + "?id=" + this.get("id") } );
			return this.fetchWithAuthInfo( options );
		},
		parse: function(res){
			return res.shop || res;
		},
	});
	return ShopModel;
})();
