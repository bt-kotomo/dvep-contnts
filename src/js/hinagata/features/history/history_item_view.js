var Backbone = require('backbone');
var HistoryItemView = require('./history_item_view.js');
var moment = require('moment');
module.exports = (function () {
	var HistoryItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: function(modelSerializedData){
			if( modelSerializedData.isCouponHistory ){ return require('./history_item_coupon_template.html')(modelSerializedData); }
			if( modelSerializedData.isStampHistory ){ return require('./history_item_stamp_template.html')(modelSerializedData); }
			if( modelSerializedData.isPointHistory ){ return require('./history_item_point_template.html')(modelSerializedData); }
		},
		templateHelpers: {
			formatDate: function(dateTime){
				return moment(dateTime).format('YYYY/MM/DD');
			},
			formatTime: function(dateTime){
				return moment(dateTime).format('H:mm');
			},
			pointTypeSign: function( pointType ){
				return {
					0: "+",
					1: "-",
				}[pointType];
			},
			priceOrPoint: function(price, point){
				if (price == 0) {
					if (point < 0) {
						point = point * -1;
					}
					return point;
				} else {
					// price
					if (price < 0) {
						price = price * -1;
					}
					return price;
				}
			},
			getReqClassValue: function(reqClass){
				reqClassValue = AppConf.valuecard.reqClassValues[reqClass];
				if (reqClassValue == null) {
					reqClassValue = reqClass;
				}
				return reqClassValue;
			},
			priceOrPointSign: function(price, pointType){
				return "";
			},
			priceOrPointDelimiter: function(price){
				if (price == 0) {
					return "Ｐ";
				} else {
					return "円";
				}
			},
		},
	});
	return HistoryItemView;
})();
