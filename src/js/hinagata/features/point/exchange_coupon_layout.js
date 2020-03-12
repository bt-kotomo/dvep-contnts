var Backbone = require('backbone');
var CouponMasterModel = require('../../models/coupon_master_model.js');
var ExchangeCouponMainView = require('./exchange_coupon_main_view.js');
var PointModel = require('../../models/point_model.js');
var $ = require('jquery');
module.exports = (function () {

	var ExchangeCouponLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./exchange_coupon_layout_template.html'),
		regions: {
			'exchangeCouponRegion' : "#exchange-coupon-region",
			'exchangeStatusRegion' : "#exchange-status-region"
		},
		initialize: function( options ){
			var options = options || {};
			this.couponMasterModel = new CouponMasterModel({ id: options.id });
			this.pointModel = new PointModel();
			this.listenToOnce(this.couponMasterModel ,'sync-with-point',this._renderCoupon );
			this._fetchCoupon();
		},
		onRender: function(){
		},
		headerConf: {
			title: "ポイントクーポン詳細",
			showBackButton: true,
		},
		_fetchCoupon: function(){
			var _this = this;
			var requestAction = function(){
				return $.when( _this.couponMasterModel.fetchCoupon(), _this.pointModel.fetchWithAuthInfo())
				.done(function(data,data2){
					_this.couponMasterModel.setUserPoint( _this.pointModel.get("point") );
					_this.couponMasterModel.trigger('sync-with-point');
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ));
		},
		_renderCoupon: function(){
			this.exchangeCouponRegion.show( new ExchangeCouponMainView({ model: this.couponMasterModel }) );
		},
	});

	return ExchangeCouponLayout;
})();
