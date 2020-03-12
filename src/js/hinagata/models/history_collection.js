var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
var BaseCollection = require('./base_collection.js');
module.exports = (function () {

	var HistoryModel = BaseModel.extend({
		mutators: {
			isCouponHistory : {
				get: function(){
					return this.get("type") + "" === HistoryModel.type.coupon;
				}
			},
			isStampHistory : {
				get: function(){
					return this.get("type") + "" === HistoryModel.type.stamp;
				}
			},
			isPointHistory : {
				get: function(){
					return this.get("type") + "" === HistoryModel.type.point;
				}
			}

		}
	});
	HistoryModel.type = {
		coupon: "0",
		stamp: "1",
		point: "2",
	};


	var HistoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/user/history",
		model: HistoryModel,
		parse: function(response) {
			return response.history;
		},
		fetchCouponHistory: function( options ){
			var _options = _.extend( options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.coupon } );
			return this.fetchWithAuthInfo( _options );
		},
		fetchStampHistory: function( options ){
			var _options = _.extend( options || {}, { url: this.url + "?type=" + HistoryModel.type.stamp} );
			return this.fetchWithAuthInfo( _options );
		},
		fetchPointHistory: function( options ){
			var _options = _.extend( options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.point} );
			return this.fetchWithAuthInfo( _options );
		},
	});
	return HistoryCollection;

})();
