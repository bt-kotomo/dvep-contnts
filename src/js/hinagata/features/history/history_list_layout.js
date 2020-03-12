var Backbone = require('backbone');
var HistoryCollection = require('../../models/history_collection.js');
var HistoryCollectionView = require('./history_collection_view.js');
// var ShopCollection = require('../../models/shop_collection.js');
module.exports = (function () {

	var HistoryMode = {
		coupon: "coupon",
		stamp: "stamp",
		point: "point",
	};

	var HistoryListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./history_list_layout_template.html'),
		regions: {
			"historyListRegion" : "#history-list-region",
		},
		ui: {
			"modeSwitchBtn" : ".mode-switch-btn",
		},
		events: {
			"click @ui.modeSwitchBtn" : "_onModeSwitchBtnClick",
		},
		initialize: function(options){
			this.mode = HistoryMode.point;
			this.historyCollection = new HistoryCollection();
			// this.shopCollection = new ShopCollection();
			this.listenTo( this, 'collections:sync', this._renderHistoryList);
		},
		onRender: function(){
			this._fetchAll();
		},
		_onModeSwitchBtnClick: function(e){
			e.preventDefault();
			var $target = this.$(e.currentTarget);
			var mode = $target.data('mode');
			this.mode = mode;
			this._fetchAll();
			this.ui.modeSwitchBtn.removeClass('active');
			$target.addClass('active');
			App.util.style.toInactive( this.ui.modeSwitchBtn );
			App.util.style.toActive( $target );
		},
		_fetchAll: function( mode ){
			var fetchHistory;
			switch( this.mode ){
				case HistoryMode.coupon :
					fetchHistory = _.bind( this.historyCollection.fetchCouponHistory, this.historyCollection);
				break;
				case HistoryMode.stamp:
					fetchHistory = _.bind( this.historyCollection.fetchStampHistory, this.historyCollection);
				break;
				case HistoryMode.point :
					fetchHistory = _.bind( this.historyCollection.fetchPointHistory, this.historyCollection);
				break;
			}

			var _this = this;
			var requestAction = function(){
				/*return $.when( fetchHistory(),
											_this.shopCollection.fetchWithAuthInfo()
										 ).done(function(){
											 _this.trigger('collections:sync');
										 });*/
				return $.when( fetchHistory()).done(function(){
											 _this.trigger('collections:sync');
										 });
			};
			App.util.execWithProgressScreen( requestAction );
		},
		headerConf: {
			title: "利用履歴",
			showBackButton: true,
		},
		_renderHistoryList: function(){
			this.historyListRegion.show( new HistoryCollectionView({
				collection: this.historyCollection,
				// shopCollection: this.shopCollection,
				mode: this.mode
			}));
		},
	});

	return HistoryListLayout;
})();
