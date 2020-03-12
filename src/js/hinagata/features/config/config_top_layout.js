var Backbone = require('backbone');
var CardModel = require('../../models/card_model.js');
module.exports = (function () {
	window.hoge = new CardModel();

	var ConfigTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./config_top_layout_template.html'),
		regions: {
		},
		ui: {
			"logoutBtn" : "#logout-btn",
			"updateUserBtn": "#update-user-btn",
			"wdcBtn" : "#wdc-btn",
			"WDCserial" : ".WDCserial"
		},
		events: {
			"click @ui.logoutBtn" : "execLogout",
			"click @ui.updateUserBtn": "openUpadateUserWindow",
			"click @ui.wdcBtn": "openWDCWindow",
		},
		initialize: function(){
			this.cardModel = new CardModel();
			App.util.bindProgressScreen(this, this.cardModel);
			this.listenTo(this.cardModel, 'sync', this._renderCard);
		},
		headerConf: {
			title: "設定",
            showBackButton: true,
            customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		onRender: function () {
			if (App.getAuthInfo().token) {
				this.cardModel.fetchWithAuthInfo();
			}
			App.util.hideProgressScreen();
		},
		_renderCard: function(){
			var WDCserial = this.cardModel.get("WDCserial");
			if ( WDCserial == null ) {
				this.ui.WDCserial.removeClass('hide');
			}
		},
		openUpadateUserWindow: function(){
			this.getSeamlessparam(function(seamlessparam, member) {
				location.href = App.util.text.addUrlParameters( AppConf.url.modifyUserInfo,['smid=' + seamlessparam, '_native_open_embedded'] );
			});
		},
		openWDCWindow: function() {
			this.getSeamlessparam(function(seamlessparam) {
				location.href = App.util.text.addUrlParameters( AppConf.url.wdcURL,['smid=' + seamlessparam, '_native_open_embedded'] );
			});
		},
		getSeamlessparam: function(callback) {
			var _this = this;
			this.cardModel.fetchWithAuthInfo().done(function(){

				var member = _this.cardModel.get("member")[0]
				if( !member ){
					return applican.notification.alert("ユーザ情報の取得に失敗しました。一度ログアウトして、ログインし直してください。", function(){}, "", "OK");
				}
				var seamlessparam = member.seamlessparam;
				seamlessparam = encodeURIComponent(seamlessparam);
				callback && callback(seamlessparam, member);
			})
		},
		execLogout: function(){
			var logoutRequest = function(){
				return App.util.bindCommonErrorHandling( App.btApi.logout(),{ ignoreStatuses: [401] } );
			};
			App.util.execWithProgressScreen( logoutRequest )
			.done( function(data){
				//cache
				App.util.storage.removeMember();

				// #7050 対応
				applican.notification.alert("ログアウトしました", App.doNothing, "", "OK");
				App.appModel.saveAsLogout();
				App.pageSlider.backAndRestartHistory();
				applican.webView.reload();
			}).fail(function(err){
				if(err.status === 401){
					applican.notification.alert("ログアウトしました", App.doNothing, "", "OK");
	                App.appModel.saveAsLogout();
	                App.pageSlider.backAndRestartHistory();
	                applican.webView.reload();
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		}
	});

	return ConfigTopLayoutView;
})();
