var Backbone = require('backbone');
var CouponMasterModel = require('./coupon_master_model.js');
var BaseCollection = require('./base_collection.js');
module.exports = (function () {
	var CouponMasterCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/search",
		model: CouponMasterModel,
		parse: function(response) {
			return response.couponList;
		},
		fetchPointExchangeable: function(options){
			var _options = _.extend( options || {}, { url: this.url + "?type=2"} );
			return this.fetchWithAuthInfo( _options );
		}
	});
	return CouponMasterCollection;

})();
