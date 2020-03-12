var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var CouponMasterModel = BaseModel.extend({
		idAttribute: "id",
		url: AppConf.url.appRoot + "/coupon/detail",
		mutators: {
			isExchangeable: function(){
				if( !this.get("userPoint" )) return false; // 外部からセットされて居ない場合はfalse
				return this.get("userPoint") >= this.get("exchangePoint");
			},
		},
		fetchCoupon: function(options){
			var options = _.extend( options || {}, { url: this.url + "?id=" + this.get("id") } );
			return this.fetchWithAuthInfo( options );
		},
		parse: function(res){
			return res.coupon || res;
		},
		setUserPoint: function( point ){
			this.set("userPoint", point );
		}
	});

	return CouponMasterModel;
})();
