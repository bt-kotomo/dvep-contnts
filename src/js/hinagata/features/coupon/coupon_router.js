var Backbone = require('backbone');
var QouponLayoutView = require('./coupon_layout.js');
var QouponDetailLayoutView = require('./coupon_detail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var CouponController = Backbone.Marionette.Controller.extend({
		showCouponIndex: function(){
			var couponLayoutView = new QouponLayoutView();
			couponLayoutView.render();
			App.pageSlider.slidePage( couponLayoutView );
			App.headerModel.applyViewHeaderConf( couponLayoutView.headerConf );
		},
		showCouponDetail: function( id, query ){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var couponDetailLayoutView = new QouponDetailLayoutView({
				id: id,
				uCoupId: queryObj.uCoupId
			});
			couponDetailLayoutView.render();
			App.pageSlider.slidePage( couponDetailLayoutView );
			App.headerModel.applyViewHeaderConf( couponDetailLayoutView.headerConf );
			couponDetailLayoutView.trigger("load:sync");
		}
	});

	var couponController = new CouponController();

	var CouponRouter = Backbone.Marionette.AppRouter.extend({
		controller: couponController,
		appRoutes: {
			"coupon" : "showCouponIndex",
			"coupon/:id(?:query)" : "showCouponDetail",
		}
	});

	return CouponRouter;

})();
