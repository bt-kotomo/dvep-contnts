var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var StampViewModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/stamp/detail",
		parse: function(res){
			return res.stamp;
		},
		isExchangeableForCoupon: function(){
			return this.get("stampRank1Type") + "" === "0";
		},
		isCouponOnly: function(){
			return this.get("checkType") + "" === "0";
		},
	});
	return StampViewModel;
})();
