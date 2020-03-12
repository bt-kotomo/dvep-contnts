var Backbone = require('backbone');
var Collection = require('../../models/coupon_collection.js');
var CouponCollectionView = require('./coupon_collection_view.js');
module.exports = (function () {

	var CouponLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./coupon_layout_template.html'),
		regions: {
			'couponRegion' : '#couponsRegion'
		},
		ui:{
			"moreButton": ".more-button",
		},
		events: {
			"click @ui.moreButton": function(){ this._fetchCoupons({ remove: false }); },
		},
		initialize: function(){
			this.collection = new Collection({pagination: true});
			this.collectionView = new CouponCollectionView({collection: this.collection});

			App.util.bindProgressScreen(this, this.collection );
			this.listenTo( this.collection , 'sync', this.renderCollection);
			this.listenTo( this.collection, 'page-info-has-been-set', this._renderPageNation );

			var _this = this;
			this._fetchCoupons({remove: true});
		},
		headerConf: {
			title: "クーポン",
			showBackButton: true,
		},
		_renderPageNation: function(){
			if( this.collection.isAtLastPage() ){
				this.ui.moreButton.addClass("hide");
			}else{
				this.ui.moreButton.removeClass("hide");
			}
		},
		_fetchCoupons: function( options ){
			// ログインエラーが出る場合は公開クーポンを採りにいく
			this.collection.fetchWithAuthInfo({
				remove: options.remove,
				on401: (function(_this){
					return function(){
						_this.collection.fetchOpenCoupons({ remove: options.remove});
					};
				})(this)
			});
		},
		renderCollection: function(){
			this.couponRegion.show( this.collectionView );
		},
	});

	return CouponLayoutView;
})();
