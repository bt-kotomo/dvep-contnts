var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var ShopCollection = require('../../models/shop_collection.js');
var SearchConditionModel = require('./search_box/search_condition_model.js');
var ShopSearchConditionView = require('./search_box/search_condition_view.js');
var ShopListCollectionView = require('./shop_list_collection_view.js');
var CategoryCollection = require('../../models/category_collection.js');
var CategoryListMain = require('./category_view/category_list_main.js');

module.exports = (function () {

	var ShopListLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./shop_list_layout_template.html'),
		regions: {
			"searchControllerRegion" : "#shop-search-controller-region",
			"shopListRegion" : "#shop-list-region"
		},
		ui: {
		},
		events: {
		},
		initialize: function(options){
			var options = options || {};
			this.initialQuery = options.initialQuery;
			this.listenTo( this, 'condition:ready', this._onConditionReady );
		},
		onRender: function(){
			this.shopCollection = new ShopCollection();
			this.categoryCollection = new CategoryCollection();
			App.util.bindProgressScreen( this, this.categoryCollection );
			App.util.bindProgressScreen( this, this.shopCollection );

			this.searchConditionModel = new SearchConditionModel();
			this._buildConditionModelFromQuery( this.initialQuery );
		},
		_bindEvents: function(){
			this.listenTo(this.categoryCollection, 'sync', this._renderCategories );
			this.listenTo(this.shopCollection, 'sync', this._renderShops );
			this.listenTo(this.searchConditionModel, 'change:mode', this._onModeChange );
			this.listenTo(this.searchConditionModel, 'change', this._onConditionChange );
		},
		_onConditionChange: function(){
			// 検索条件をpageSliderのhistoryに格納する事で、遷移先から「戻る」
			// で戻ってきた場合に検索条件を復元できるようにしておく
			var o = {};
			o.mode = this.searchConditionModel.get("mode");
			o.text = encodeURI( this.searchConditionModel.get("text"));
			o.category = this.searchConditionModel.get("categories").map(function(v){ return v.id });
			App.pageSlider.overWriteLastHistory( "#shop?" + $.param(o) );
		},
		_onConditionReady: function(){
			this._bindEvents();
			this._renderSearchBox();
			this._onModeChange(); //別のメソッドを用意すること
		},
		_buildConditionModelFromQuery: function( query ){
			if( !query.mode ){
				this.trigger('condition:ready');
				return;
			}
			this.searchConditionModel.changeMode( query.mode );

			var _this = this;
			if( this.searchConditionModel.get("mode") === "category" ){
				this.categoryCollection.fetchWithAuthInfo().done(function(){
					_this.searchConditionModel.setCategoriesByCategoryCollection( _this.categoryCollection, query );
					_this.trigger('condition:ready');
				});
			}else{
				console.log(query.text);
				this.searchConditionModel.set("text", decodeURI( query.text ) );
				this.trigger('condition:ready');
			}
		}, 
		headerConf: {
			title: "お店一覧",
			showBackButton: true,
		},
		_renderSearchBox: function(){
			this.searchControllerRegion.show( new ShopSearchConditionView({
				model: this.searchConditionModel
			}));
		},
		_renderShops: function(){
			this.shopListRegion.show( new ShopListCollectionView({
				collection: this.shopCollection
			}));
		},
		_renderCategories: function(){
			this.shopListRegion.show( new CategoryListMain({
				collection: this.categoryCollection,
				conditionModel: this.searchConditionModel
			}));
		},
		_fetchShops: function(){
			App.util.showProgressScreen();
			switch( this.searchConditionModel.get("mode") ){
				case "category":
					this.categoryCollection.fetchWithAuthInfo();
				break;
				case "geolocation":
					this._searchWithGeoLocation();
				break;
				case "freeword":
					this._searchWithFreeword();
				break;
			}
		},
		_onModeChange: function(){
			this._fetchShops();
		},
		_searchWithFreeword: function(){
			this.shopCollection.fetchWithFreeword( this.searchConditionModel.get("text") );
		},
		_searchWithGeoLocation: function(){
			var _this = this;
			var geolocationSuccess = function( res ){
				var coords = res.coords;
				_this.shopCollection.fetchWithGeoLocationInfo( coords.longitude , coords.latitude );
			};
			applican.geolocation.getCurrentPosition( geolocationSuccess , function( err ){
				applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.util.hideProgressScreen,"","OK");
			},{ timeout: AppConf.core.geolocationTimeout} );

		},
	});

	return ShopListLayoutView;
})();
