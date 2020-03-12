var Backbone = require('backbone');
var InformationCollection = require('../../models/information_collection.js');
var InformationCollectionView = require('./information_collection_view.js');
module.exports = (function () {
	var InformationListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./information_list_layout_template.html'),
		regions: {
			"informationListRegion" : "#information-list-region"
		},

		// TODO : behaviorに移せるのならば移す
		ui:{
			"moreButton": ".more-button",
		},
		events: {
			"click @ui.moreButton": function(){ this._fetchInformation({ remove: false }); },
		},
		initialize: function(options){
			this.informationCollection = new InformationCollection({ pagination: true });
			this.listenTo( this.informationCollection, 'sync', this._onFetch );
			this.listenTo( this.informationCollection, 'page-info-has-been-set', this._renderPageNation );
		},
		headerConf: {
			title: "お知らせ一覧",
			showBackButton: true,
		},
		onRender: function(){
			this._fetchInformation({remove: true});
		},
		_onFetch: function(){
			this._renderInformationList();
			var unReadCounts = this.informationCollection.getUnReadCounts();
			App.util.badge.setBadgeAppIcon( unReadCounts );
		},

		_renderPageNation: function(){
			if( this.informationCollection.isAtLastPage() ){
				this.ui.moreButton.addClass("hide");
			}else{
				this.ui.moreButton.removeClass("hide");
			}
		},

		_renderInformationList: function(){
			this.informationListRegion.show( new InformationCollectionView({
				collection: this.informationCollection
			}));
		},
		// options :
		//   remove : true/false #trueは初期ロード、falseで追加ロード
		_fetchInformation: function( options ){
			var _this = this;
			var requestAction = function(){
				if( App.getAuthInfo().token ){
					return _this.informationCollection.fetchWithAuthInfo({remove: options.remove });
				}else{
					return _this.informationCollection.fetchWithoutLogin( App.appModel.getPushToken(), {remove: options.remove} );
				}
			};
			App.util.execWithProgressScreen( requestAction )
		},
	});

	return InformationListLayout;

})();
