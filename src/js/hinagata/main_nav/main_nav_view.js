var Backbone = require('backbone');
var MainNavCollectionView = require('./main_nav_collection_view.js');
var CardModel = require('../models/card_model.js');
var ValueModel = require('../models/value_model.js');
var MainNavModel = require('./main_nav_model.js');
var PointModel = require('../models/point_model.js');
var SlideShowModel = require('../slideshow/slideshow_model.js');
var SlideShowCollection = require('../slideshow/slideshow_collection.js');
var SlideShowCollectionView = require('../slideshow/slideshow_collection_view.js');

module.exports = (function () {
	var MainNavView = Backbone.Marionette.LayoutView.extend({
		template: function(){
			return (AppConf.layout.navColumns === 2)?  require('./main_nav_2col.html') : require('./main_nav.html');
		},
		headerConf: {
			title: "Applican Sample",
			showBackButton: false,
			hideHeader: true,
		},
		ui: {
			"pointValue" : ".point-value",
			"totalBalance" : ".total-point",
			"memberCard" : "#memberCard",
			// "scratchBtn" : "#scratch-btn",
		},
		events: {
			// "click @ui.scratchBtn" : "openScratchWindow",
		},
		regions: {
			"navRegion": "#main-nav-region",
			"slideRegion": ".slickSlider",
		},
		initialize: function(options){
			var _this = this;
			this.navCollection = options.navCollection;

			this.cardModel = new CardModel();
			App.util.bindProgressScreen(this, this.cardModel);
			this.listenTo(this.cardModel, 'sync', this._renderCard);

			this.slideCollection = new SlideShowCollection();
			this.initCollectionSlide( this );
			this.mainNavModel = new MainNavModel();
			this.slideModel = new SlideShowModel( { id: AppConf.core.localStorageKey } );
			this.pointModel = new PointModel();
			App.util.bindProgressScreen(this, this.mainNavModel);
			this.listenTo(this.mainNavModel, 'sync', this.localNotification);
			App.util.bindProgressScreen(this, this.pointModel);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);
			App.util.bindProgressScreen(this, this.slideCollection);
			this.listenTo(this.slideCollection, 'sync', this._renderSlide);
			// valuecard
			if( AppConf.features.smart ){
				this.valueModel = new ValueModel();
				this.listenTo(this.valueModel, 'sync', this._renderValue);
			}

			$(window).on('resize', _.bind(this.onResize, this));
			this.listenTo(this, 'load:sync', this.onLoad);
		},
		onRender: function(){
			var that = this;
			var collectionView = new MainNavCollectionView({ collection: this.navCollection });

			// this.cardModel.fetchWithAuthInfo({
			// 	on401: function(){
			// 		var img = './image/member/memberss.png';
			// 		that.ui.memberCard.attr('src', img);
			// 	}
			// });
			if (App.getAuthInfo().token) {
				this.cardModel.fetchWithAuthInfo();
			}
			if( App.getAuthInfo().token ){
				this.mainNavModel.fetchWithAuthInfo();
			}else{
				this.mainNavModel.fetchWithoutLogin( App.appModel.getPushToken() );
			};

			if( AppConf.features.smart ){
				// valuecard
				this.valueModel.fetchWithAuthInfo({
					on401: function(){}
				});
			}

			if(AppConf.core.debug){
				this.navRegion.show( collectionView );
			}
			
			this.pointModel.fetchWithAuthInfo({
				on401: function(){}
			});

		},
		_renderPoint: function(){
			this.ui.pointValue.html( App.util.text.numberWithDelimiter( this.pointModel.get("point")) );
		},
		_renderSlide: function(){
			this.slideRegion.show( new SlideShowCollectionView({ collection: this.slideCollection }) );
		},
		_renderCard: function(){
			var img = './image/member/' + this.cardModel.get("cardtype") + '_sm.png';
			this.ui.memberCard.attr('src', img);

			// var point = this.cardModel.get("point");
			// if ( point && point !== null ) {
			// 	this.ui.pointValue.html( App.util.text.numberWithDelimiter( point ) );
			// }
		},
		_renderValue: function() {
			var point  = this.valueModel.get('point');
			this.ui.pointValue.html( App.util.text.numberWithDelimiter( point ) );

			// var total = this.valueModel.get('total');
			// this.ui.totalBalance.html(App.util.text.numberWithDelimiter(total));
		},
		initCollectionSlide: function( options ){
			if ( AppConf.features.slideshow ){
				if( App.getAuthInfo().token ){
					this.slideCollection.fetchWithAuthInfo({
						on400: function(){
							options.setErrorSlideShow();
						}
					});
				} else {
					this.slideCollection.fetchWithoutAuthInfo({
						on400: function(){
							options.setErrorSlideShow();
						}
					});	
				}
			}
			// }else {
			// 	this.slideCollection.add( AppConf.slideshow.slideshowContentsList );
			// }
		},
		setErrorSlideShow: function() {
			$('#havedata').addClass('hide');
			$('#nodata').removeClass('hide');
			this.slideModel.safeFetch();
			if ( this.slideModel.getSlideInfo() ) {
				this.slideCollection.add( this.slideModel.getSlideInfo() );
			} else {
				this.slideCollection.add( AppConf.slideshow.slideshowContentsList );
			}
			this._renderSlide();
			$(window).bind('load', this.slideCollection.onLoad());
		},
		onResize: function(){
			var h_slider, h_window, h_menuContainer;
			h_window = $(window).height();
     		h_menuContainer = $('.menuContainer').height();
     		h_slider = h_window - h_menuContainer - 30;
     		
			$('.menuContainer').css({'top':'','position':''});
        	$('#master-container').css({'min-height' : window.innerHeight - 44 + 'px'});
        	$('.slickSlider').css({'height' : h_window - 44 + 'px'});
     		$('.slickSlider .slick-dots').css({'top' : h_slider + 'px'});
		},
		onLoad: function() {
        	var h_window = $(window).height();
			// display logo
			$('.logo-center').removeClass('hide');
			var h_slide = $(window).height() - $('.menuContainer').height();
			$(".inner-top").css({"height" :  h_slide + "px"})
	    },
		localNotification: function(){			
			var unReadCounts = this.mainNavModel.get("unReadCounts");

			App.util.badge.setBadgeAppIcon( unReadCounts );

			if ( unReadCounts >= 1 ) {
				//top-menu
				$('.badge-number').html( unReadCounts );
				$('.badge-number').addClass('show');
			}else {
				$('.badge-number').removeClass('show');
			}

			if ( applican.config.device_os === "ANDROID" ) {
				$(".badge-number").css("line-height","22px");
			}
		},
		// openScratchWindow: function(){
		// 	if( App.getAuthInfo().token ){
		// 		location.href = "./scratch/index.html";
		// 	}else{
		// 		this.pointModel.fetchWithAuthInfo();
		// 	}
		// },
	});

	return MainNavView;

})();
