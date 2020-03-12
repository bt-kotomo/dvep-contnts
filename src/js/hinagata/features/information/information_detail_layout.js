var Backbone = require('backbone');
var InformationModel = require('../../models/information_model.js');
var InformationDetailMainView = require('./information_detail_main_view.js');
module.exports = (function () {
	var InformationDetailLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./information_detail_layout_template.html'),
		regions: {
			"informationMainRegion" : "#information-main-region"
		},
		initialize: function(options){
			if(App.util.storage.getStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken()) === undefined) {
				App.btApi.popInformation({
					informationId: options.informationId,
					registrationId: App.appModel.getPushToken(),
				})
				.done(function(res){
					App.util.storage.setStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken(), res, AppConf.expire.information.pop);
				})
				.fail(function(err){
					if(err.status === 403){
						App.util.storage.setStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken(), err, AppConf.expire.information.pop);
					}
				});
			}
			this.informationModel = new InformationModel( { informationId: options.informationId });
			this.listenTo( this.informationModel, 'sync', this._renderInformation );
		},
		headerConf: {
			title: "お知らせ詳細",
			showBackButton: true,
		},
		onRender: function(){
			this._fetchInformation();
			this._readInformation();
		},
		_renderInformation: function(){
			this.informationMainRegion.show( new InformationDetailMainView({
				model: this.informationModel
			}));
		},
		_readInformation: function(){
			var informationId = this.informationModel.get("informationId");
			if(App.util.storage.getStorage("information_read_" + informationId + "_" + App.appModel.getPushToken()) === undefined) {
				App.btApi.readInformation({
					informationId: informationId,
					registrationId: App.appModel.getPushToken(),
				})
				.done(function(res){
					App.util.badge.setBadgeAppIcon( res.unReadCounts );
					App.util.storage.setStorage("information_read_" + informationId + "_" + App.appModel.getPushToken(), res, AppConf.expire.information.read);
				})
				.fail(function(err){
					if(err.status === 403){
						App.util.storage.setStorage("information_read_" + informationId + "_" + App.appModel.getPushToken(), err, AppConf.expire.information.read);
					}
				});
			}
		},
		_fetchInformation: function(){
			var _this = this;
			var requestAction = function(){
				if( App.getAuthInfo().token ){
					return _this.informationModel.fetchSingleInformation();
				}else{
					return _this.informationModel.fetchSingleInformationWithoutToken( App.appModel.get("pushToken") );
				}
			};
			App.util.execWithProgressScreen( requestAction );
		},
		setBadgeAppIcon: function( unReadCounts ) {
			if ( unReadCounts >= 1 ) {
				applican.localNotification.setBadgeNum(1);
			}else {
				applican.localNotification.setBadgeNum(0);
			}
		}
	});

	return InformationDetailLayout;

})();
