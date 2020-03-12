var Backbone = require('backbone');
var CouponMasterModel = require('./coupon_master_model.js');
var BaseCollection = require('./base_collection.js');
var BaseModel = require('./base_model.js');
module.exports = (function () {

	var CategoryModel = BaseModel.extend({
		idAttribute: "id",
		isShop: function(){
			return this.get("type") === "shop";
		},
	});

	var CategoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/shop/category",
		model: CategoryModel,
		parse: function(response) {
			return response.category;
		},
	});
	return CategoryCollection;

})();
