var Backbone = require('backbone');
var $ = require('jquery');
var moment = require('moment');
module.exports = (function () {
	var CouponItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./coupon_item_template.html'),
		templateHelpers: {
			expiresFormat: function( date ){
				return moment(date).format("YYYY年MM月DD日");
			},
		},
		onRender: function() {
			if (!AppConf.couponList.showAll && !this.model.canBeUsed())	this.$el.hide();
		}
	});

	return CouponItemView;

})();
