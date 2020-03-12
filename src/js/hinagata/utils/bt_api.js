// ビートレンドCRMのAPIを叩くメソッド群です

var ApplicanEx = require('./applican_ex');
module.exports = (function () {
	var BtApi = function(options){
		this.ApplicationId = options.ApplicationId;
		this.rootUrl = options.rootUrl;
		this.ContentsVersion = options.ContentsVersion;

		this.BundleId = applican.device.package_name;
		this.BundleVersion = "";
		this.Platform = applican.device.platform;
		this.PlatformVersion = applican.device.version;
		this.DeviceName = applican.device.name;
		this.ApplicanVersion = applican.device.applican;
		this.Uuid = applican.device.uuid;
		this.UuidRfc4122 = applican.device.uuid_rfc4122;
		this.RegistrationId = "";

		$.ajaxSetup({
			beforeSend: this.setupAjax
		});
	};
	BtApi.prototype = {
		setupAjax: function (xhr, settings) {
			xhr.done(function (data, status, xhr) {
				if (typeof xhr.getResponseHeader != 'function') {
					return;
				}
				var serverContentsVersion = xhr.getResponseHeader("X-Server-Contents-Version");
				if (App.btApi.ContentsVersion && serverContentsVersion && App.btApi.ContentsVersion < serverContentsVersion) {
					console.log("Application finish because old contents.");
					applican.notification.alert(
						AppConf.message.contentsVersionUp,
						function () { },
						AppConf.message.information,
						AppConf.message.yes);
					applican.finish();
				}
			});
			xhr.fail(function (xhr, status, err) {
				// if (xhr.status === 503) {
				// 	location.href = xhr.responseJSON.url;
				// }
				if (xhr.status === 503) {
					if ('url' in xhr) {
						var errorurl = xhr.responseJSON.url;
						if (_.isNull(errorurl) || _.isEmpty(errorurl)) {
							errorurl = AppConf.message.errorurl;
						}
					}
				}
			});
		},
		getDefaultAjaxHeaders: function () {
			var headers = {};
			headers["X-Client-Contents-Version"] = (this.ContentsVersion) ? this.ContentsVersion: null;
			headers["X-Bundle-Id"] = (this.BundleId) ? this.BundleId: null;
			headers["X-Bundle-Version"] = (this.BundleVersion) ? this.BundleVersion: null;
			headers["X-Platform"] = (this.Platform) ? this.Platform: null;
			headers["X-Platform-Version"] = (this.PlatformVersion) ? this.PlatformVersion: null;
			headers["X-Device-Name"] = (this.DeviceName) ? this.DeviceName: null;
			headers["X-Applican-Version"] = (this.ApplicanVersion) ? this.ApplicanVersion: null;
			headers["X-Uuid"] = (this.Uuid) ? this.Uuid: null;
			headers["X-Uuid-Rfc4122"] = (this.UuidRfc4122) ? this.UuidRfc4122: null;
			headers["X-Registration-Id"] = (this.RegistrationId) ? this.RegistrationId: null;
			return headers;
		},
		getAjaxAuthHeaders: function(){
			var headers= this.getDefaultAjaxHeaders();
			var appTypes = {};
			appTypes[ApplicanEx.consts.device.android] = 1;
			appTypes[ApplicanEx.consts.device.iOS] = 2;

			headers.ApplicationId = this.ApplicationId;
			headers["Content-Type"] = "application/json"
			if( App.getAuthInfo().token ){
				headers.Authorization = App.getAuthInfo().token;
			}
			// NOTE : 取得不能な場合（ブラウザ等）はandroidとして送信する
			headers.ApplicationType = appTypes[ applican.device.platform ] || 1;
			console.log(headers);
			return headers;
		},
		// ログインAPIを叩く
		login: function( userid, password ){
			var a = {};
			a.url = this.rootUrl + "/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { mailaddress: userid , password: password};
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS用ログインAPIを叩く
		loginSms: function( smstel, password ){
			var a = {};
			a.url = this.rootUrl + "/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {smstel: smstel, password: password, authType: "2"};
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS送信APIを叩く
		sendsms: function( smstel ){
			var msg = "30分以内に以下の6桁のパスワードを入力してログインしてください。\n"
			var a = {};
			a.url = this.rootUrl + "/sms/sendApp";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {tel: smstel, msg: msg};
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// シームレスログインAPIを叩く
		seamlessLogin: function( token ){
			console.log('seamlessLogin: ' + token);
			token = Buffer(token, 'base64').toString();
//			console.log('seamlessLoginBase64Dec: ' + token);
			token = decodeURIComponent(token);
//			console.log('seamlessLoginUrlDec: ' + token);
			var a = {};
			a.url = this.rootUrl + "/auth/seamless_login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { seamlessparam: token };
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// ログアウトAPIを叩く
		logout: function(){
			var a = {};
			a.url = this.rootUrl + "/auth/logout"
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			return $.ajax(a);
		},
		// options
		//  id,uCoupId,longitude,latitude
		// クーポン利用APIを叩く
		useCoupon: function( params ){
			var options = {};
			options.url = this.rootUrl + "/coupon/use";
			options.headers = this.getAjaxAuthHeaders();
			options.type = "POST"
			options.data = JSON.stringify({ id: params.id, uCoupId: params.uCoupId, longitude: params.longitude, latitude: params.latitude});
			console.log(options.data);
			return $.ajax( options );
		},
		// ポイントを利用してクーポンを取得するAPIを叩く
		exchangeCoupon: function( couponId ){
			var options = {};
			options.url = this.rootUrl + "/user/exchange_coupon";
			options.headers = this.getAjaxAuthHeaders();
			options.type = "POST"
			options.data = JSON.stringify({ couponId: couponId });
			return $.ajax( options );
		},

		// スタンプを取得するAPIを叩く
		getStamp: function( options ){
			var a = {}
			a.url = this.rootUrl + "/stamp/use";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({"latitude": options.latitude,"longitude": options.longitude });
			return $.ajax( a );
		},
		// livepass の registrationID をビートレンドCRMに登録する
		insert: function( args ){

			var a = {}
			a.url = this.rootUrl + "/notification/insert";
			if( AppConf.features.autoregist ){
				a.url = this.rootUrl + "/notification/regist";
			}
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"

			a.data = JSON.stringify({
				"registrationId": args.registrationId,
				//"old": args.registrationId,
			});
			return $.ajax( a );
		},

		// 情報表示済みであることをlivepassに伝える
		popInformation: function( args ){
			var a = {}
			a.url = this.rootUrl + "/information/pop";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"informationId": args.informationId,
				"registrationId": args.registrationId
			});
			return $.ajax( a );
		},
		// 新着情報を既読にする
		readInformation: function( args ){
			var a = {}
			a.url = this.rootUrl + "/information/read";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"informationId": args.informationId,
				"registrationId": args.registrationId
			});
			return $.ajax( a );
		}
	};
	return BtApi;

})();
