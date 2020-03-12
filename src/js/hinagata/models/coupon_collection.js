var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var CouponModel = require('./coupon_model.js');
module.exports = (function () {
	var CouponCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/list",
		model: CouponModel,
		initialize: function(options){
			if ( options ) {
				this.couponId = options.couponId;
				this.pagination = options.pagination;
			}
		},
		comparator: function(model) {
			if ( this._order_by === "giveDate" ) {
				return -1 * model.get("giveDate"); // NOTE: the minus!
			} else {
				return model.get("expires");
			}
		},
		parse: function(response) {
			return response.couponList.map(function(item) {
				var imageUrl = item.couponImageUrl;
				if (imageUrl && imageUrl.indexOf('https') == -1 && imageUrl.indexOf('http') > -1) {
					item.couponImageUrl = imageUrl.replace('http', 'https');
				}
				return item;
			});;
		},
		fetchCouponAll: function(options) {			
			var _this = this;
			if ( this.couponId ) {
				return this.fetchWithAuthInfo({
					url: _this.url + "?coupId=" + _this.couponId,
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			} else {
				return this.fetchWithAuthInfo({
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			}			
		},
		fetchOpenCoupons: function(options){
			var _options = {};
			if ( this.couponId ) {
				_options = _.extend( options || {}, { url: this.url + "?type=0&coupId=" + this.couponId} );
			} else {
				_options = _.extend( options || {}, { url: this.url + "?type=0"} );
			}
			return this.fetchWithAuthInfo( _options );
		},
		orderByExpires: function() {
			this._order_by = "expires";
			this.sort();
		},
		_order_by: "giveDate"
	});
	return CouponCollection;
})();
