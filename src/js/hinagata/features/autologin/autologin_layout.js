var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var AutoLoginLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./autologin_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			this.token = options.id;
			var userid = '';
			var password = '';
			var smstel = '';
			
			if( AppConf.features.sms ){
				var auth = App.getAuthInfo();
				smstel = auth.smstel;
				password = auth.password;
			} else {
				userid = '';
				password = '';
			}

			this.userModel = new UserModel();
			App.util.bindProgressScreen(this, this.userModel );

			_this = this;
			var loginRequest = function(){
//				console.log('loginRequest');
//				console.log(_this.token);
				return App.util.bindCommonErrorHandling(
					App.btApi.seamlessLogin( _this.token ),
					{ ignoreStatuses: [404] }
				);
			};

			// ログインリクエストを実行
			App.util.execWithProgressScreen( loginRequest )
			.done( function(data){
				// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
				if( AppConf.features.sms ){
					App.appModel.setAuthAndSave( { smstel: smstel, password: "", token: data.accessToken } );
					App.vent.trigger( 'app-login' , { smstel: smstel, password: password, token: data.accessToken });
				} else {
					App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken } );
					App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken });
				}
				applican.notification.alert("登録完了しました", function(){}, "", "OK");
				App.pageSlider.backAndRestartHistory();
				applican.webView.reload();
			}).fail(function(err){
				if(err.status === 404){
					applican.notification.alert("ログインできません", App.doNothing, "", "OK");
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		},
		headerConf: {
			title: "アプリログイン",
			showBackButton: true,

		},
		onRender: function(){
//			this.ui.seamlessValue.html(this.token);
			App.util.hideProgressScreen();
		},
	});

	return AutoLoginLayoutView;
})();
