var Backbone = require('backbone');
var CouponModel = require('../../models/coupon_model.js');
var CouponCollection = require('../../models/coupon_collection.js');
var CouponDetailMainView = require('./coupon_detail_main_view.js');
var CouponDialogueItemView = require('./dialogue/coupon_dialogue_item_view.js');
module.exports = (function () {

	var CouponDetailLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./coupon_detail_layout_template.html'),
		regions: {
			"couponDetailRegion" : "#coupon-detail-region",
			"couponDialogueRegion": "#coupon-dialogue-region"
		},
		events:{
			"click #use_coupon": "use"
		},
		initialize: function(options){
			this.couponId = options.id;
			this.uCoupId  = options.uCoupId;

			this.couponModel = {};
			if ( this.uCoupId ) {
				this.couponCollection = new CouponCollection( { pagination: true } );
			} else {
				this.couponCollection = new CouponCollection({ couponId: this.couponId, pagination: true });
			}
			this.couponDetailMainView;

			this.couponDialogueItemView = new CouponDialogueItemView();

			App.util.bindProgressScreen(this, this.couponCollection );
			this.listenTo( this.couponCollection, 'page-info-has-been-set', this.fetchCouponAll );
			this.listenTo( this, "load:sync", this.onLoad );
			// this.listenTo( this.couponCollection , 'sync', this.renderMainFromCollection);

			var _this = this;
			this._fetchCoupons(true);
		},
		headerConf: {
			title: "クーポン詳細",
			showBackButton: true,
		},
		renderMainFromCollection: function(){
			var a;
			$('.page').removeClass('page-center');
			this.couponDialogueRegion.show( this.couponDialogueItemView );
			if ( this.couponCollection.length > 0 ) {
				if ( this.uCoupId ) {
					a = this.couponCollection.where({ uCoupId :this.uCoupId });
				} else {
					this.couponCollection.orderByExpires();
					a = this.couponCollection.where({ id :parseInt(this.couponId) });
				}
				// var a = this.couponCollection.where({ uCoupId :this.uCoupId });
				this.couponModel = a[0];
				if ( this.uCoupId ) {
					this.couponDetailMainView = new CouponDetailMainView( {model: this.couponModel , uCoupId: this.uCoupId} );
				} else {
					this.couponDetailMainView = new CouponDetailMainView( {model: this.couponModel , uCoupId: this.couponModel.uCoupId} );
				}
				// this.couponDetailRegion.show( new CouponDetailMainView( {model: this.couponModel , uCoupId: this.uCoupId} ) );
				this.couponDetailRegion.show( this.couponDetailMainView );
				this.setHeightDialogue();
			} else {
				this.setHeightDialogue();
				this.couponDialogueItemView.showDialogue("#couponErr3_dialogue", "エラー", "クーポンが存在しないか、配布されていません。");
				this.fixPosition();
			}
		},
		_fetchCoupons: function(remove){
			// ログインエラーが出る場合は公開クーポンを採りにいく
			// this.couponCollection.fetchWithAuthInfo({
			// 	on401: (function(_this){
			// 		return function(){
			// 			_this.couponCollection.fetchOpenCoupons();
			// 		};
			// 	})(this)
			// });
			this.couponCollection.fetchCouponAll({ remove: remove });
		},
		fetchCouponAll: function() {
			if( this.couponCollection.isAtLastPage() ) {
				this.renderMainFromCollection();
			} else {
				this._fetchCoupons(false);
			}
		},
		use: function(){
			this.couponDetailMainView.use();
		},
		onLoad:function(){
			$('.page').removeClass('page-center');
		},
		setHeightDialogue: function() {
			var h_window = $(window).height();
			if ( this.couponCollection.length > 0 ) {
				$('#showdialogue-coupon').css({'height' : $('#coupon-detail-region').height() + 40 + 'px'});
			} else {
				$('#showdialogue-coupon').css({'height' : h_window + 'px'});
			}
		},
		fixPosition: function() {
			var windowH = $(window).height();
			var dialogueH = ( windowH - $('#couponErr3_dialogue').height() ) / 2 ;
			$('#couponErr3_dialogue').css({'position':'fixed','top':dialogueH});
		}
	});

	return CouponDetailLayoutView;
})();
