var PointModel = require('../../models/point_model.js');
var CouponCollection = require('../../models/coupon_master_collection.js');
var AvailableCouponCollectionView = require('./available_coupon_collection_view.js');
var Backbone = require('backbone');
module.exports = (function () {

	var PointMainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./point_main_template.html'),
		regions: {
			"availableCouponRegion": "#available-coupon-region"
		},
		initialize: function(){
			this.couponCollection = new CouponCollection();
			this.pointModel = new PointModel();

			App.util.bindProgressScreen(this, this.couponCollection );
			this.listenTo(this.couponCollection, 'sync', this._renderCoupons);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);
		},
		onRender: function(){
			this.couponCollection.fetchPointExchangeable();
			this.pointModel.fetchWithAuthInfo();
		},
		headerConf: {
			title: "ポイント",
			showBackButton: true,
		},
		_renderCoupons: function(){
			console.log( this.couponCollection);
			this.availableCouponRegion.show( new AvailableCouponCollectionView({
				collection: this.couponCollection
			}));
		},
		_renderPoint: function(){
			var point = App.util.text.numberWithDelimiter( this.pointModel.get("point") );
			this.$('.point-text').html( point );
		}
	});

	return PointMainLayout;
})();
