// Libraries
// 
window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

// App Core
var Router = require('./router');
var AppModel = require('./models/app_model');
var MainLayout = require('./main_layout.js');
var HeaderModel = require('./header/header_model.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

// Features
var ConfigRouter = require( './features/config/config_router' );
var CouponRouter = require( './features/coupon/coupon_router' );
var StampRouter = require('./features/stamp/stamp_router');
var ShopRouter = require('./features/shop/shop_router');
var PointRouter = require('./features/point/point_router');
var HistoryRouter = require('./features/history/history_router');
var InformationRouter = require('./features/information/information_router');
var AutoLoginRouter = require('./features/autologin/autologin_router');
var SmartRouter = require('./features/smart/smart_router');
var MemberRouter = require('./features/member/member_router');
var MenuRouter = require('./features/menu/menu_router');
var SnsRouter = require('./features/sns/sns_router');

//////////
// DEMO Features
var ScratchRouter = require( './features/scratch/scratch_router' );
var ChirashiRouter = require( './features/chirashi/chirashi_router' );

// UTILS
var TextUtil = require('./utils/text');
var StyleUtil = require('./utils/style.js');
var DebugUtil = require('./utils/debug.js');
var DateUtil = require('./utils/date.js');
var BadgeUtil = require('./utils/badge');
var BtApi = require('./utils/bt_api');
var ApplicanEx = require('./utils/applican_ex');
var StorageUtil = require('./utils/storage.js');
var CacheUtil = require('./utils/cache.js');

/**
 * 雛形アプリのメインオブジェクト
 * グローバルにインスタンスを配置する想定
 * Backbone.Marionette.Application
 */
module.exports = (function () {
	var mainApp = new Backbone.Marionette.Application();

	// util メソッド定義
	mainApp.util = {};
	// Text 
	mainApp.util.text = TextUtil;
	// Style
	mainApp.util.style = StyleUtil;
	// Debug
	mainApp.util.debug = DebugUtil;
  	// Date
	mainApp.util.date = DateUtil;
	// Badge
	mainApp.util.badge = BadgeUtil;
	// Applican
	mainApp.applican = new ApplicanEx();
	// BT API
	mainApp.btApi = new BtApi( {
		ApplicationId : AppConf.core.applicationId,
		rootUrl: AppConf.url.appRoot,
		ContentsVersion : AppConf.core.contentsVersion,
	});
    // Storage
    mainApp.util.storage = StorageUtil;
    // Cache
    mainApp.util.cache = CacheUtil;

	// ヘッダの内容はAppで管理
	mainApp.headerModel = new HeaderModel();

	// Appスタート
	// onDeviceReadyにてapp.startされる
	mainApp.onStart = function(){

		this.appModel = new AppModel(); 
		mainApp.listenTo( this.appModel, 'ready', function(model){

			// registration id 関連の処理
			mainApp.applican.getBtPushTokenPromise().done(function(result){

				var old = model.getPushToken(); 
				var registrationId = result.registrationId;

				// BtApi に registrationId を保存
				mainApp.btApi.RegistrationId = registrationId;

				// LivepassのRegistrationIDをCRMに登録
                if(App.util.storage.getStorage("notification_insert_" + registrationId) === undefined) {
                    mainApp.btApi.insert({
                        registrationId: registrationId,
                        old: old
                    })
                        .done(function(data){
                            if(AppConf.features.autoregist && App.getAuthInfo().token !== data.accessToken){
                                mainApp.appModel.setAuthAndSave( { userid: "", token: data.accessToken } );
                            }
                            App.util.storage.setStorage("notification_insert_" + registrationId, data, AppConf.expire.notification.insert);
                        })
                        .fail(function(){
                            applican.notification.alert(
                                AppConf.message.registrationIdUpdateFailure,
                                function(){},
                                AppConf.message.information,
                                AppConf.message.yes);
                        });
                }

				model.set("pushToken", result.registrationId );
				model.save();

				// Livepassのセッティングを適用
				mainApp.applican.livepassSetSettingsPromise()
				.fail(function(d){ console.log("Livepass 設定情報反映エラー"); console.log(d);})
				.done(function(d){ console.log("Livepass 設定情報反映成功"); console.log(d);}) 
			});

			var neverShownTutorial = !model.get("tutorialShown");
			model.set({ tutorialShown: true });
			model.save().done(function(){
				if( neverShownTutorial ){
					setTimeout( function(){
						location.href = "./features/tutorial/tutorial.html";
					}, 2000);
				}
			});

		});

		this.appModel.safeFetch();

		this.mainLayout = new MainLayout( {el: $('#main-layout')} );
		this.mainLayout.render();
		this.pageSlider = new PageSlider({
			container: $('#master-container'),
			initialHistory: [""]
		});

		// features
		var router = new Router();
		var configRouter = (AppConf.features.config)? new ConfigRouter() : void(0);
		var couponRouter = (AppConf.features.coupon)? new CouponRouter() : void(0);
		var stampRouter = (AppConf.features.stamp)? new StampRouter() : void(0);
		var shopRouter = (AppConf.features.shop)? new ShopRouter() : void(0);
		var pointRouter = (AppConf.features.point)? new PointRouter() : void(0);
		var historyRouter = (AppConf.features.history)? new HistoryRouter() : void(0);
		var informationRouter = (AppConf.features.information)? new InformationRouter() : void(0);
		var autologinRouter = (AppConf.features.autologin)? new AutoLoginRouter() : void(0);
		var chirashiRouter = (AppConf.features.chirashi)? new ChirashiRouter() : void(0);
		var scratchRouter = (AppConf.features.scratch)? new ScratchRouter() : void(0);
		var smartRouter = (AppConf.features.smart)? new SmartRouter() : void(0);
		var memberRouter = (AppConf.features.member)? new MemberRouter() : void(0);
		var menuRouter = (AppConf.features.menuRegis)? new MenuRouter() : void(0);
		var snsRouter = (AppConf.features.sns)? new SnsRouter() : void(0);

		Backbone.history.start();



		$(window).on("scroll" , function(e)
								 {
									 var bottomPos = 100;

									 var scrollHeight = $(document).height();
									 var scrollPosition = $(window).height() + $(window).scrollTop();

									 //スクロールが下に行った時の処理
									 if (scrollPosition > scrollHeight - bottomPos)
										 {
											 App.vent.trigger("reach:bottom");
                       //TODO: debug
										 }
								 });



	};



	mainApp.addAuthenticationHeaderToXHR = function(xhr){
		var auth = mainApp.getAuthInfo();
		xhr.setRequestHeader('Authorization', auth.token || "dummy" );
		mainApp.addApplicationHeaderToXHR(xhr);
	};
	mainApp.addApplicationHeaderToXHR = function(xhr){
		xhr.setRequestHeader('ApplicationId', AppConf.core.applicationId );
		mainApp.initializeXHR(xhr);
	};

	mainApp.initializeXHR = function(xhr){
		// default http header setting
		_.each(mainApp.btApi.getDefaultAjaxHeaders(), function(value, key, list){
			xhr.setRequestHeader(key, value);
		});

		// setup Ajax
		App.btApi.setupAjax(xhr);
	};

	mainApp.vent.on('app-login', function( data ){
		// do nothing for now
	});

	mainApp.getAuthInfo = function(){
		return mainApp.appModel.get("auth");
	};



	// ローディング表示用のDOMをSTRINGで返す
	mainApp.util.injectProgressScreenDom = function(){
		return require('./progress_screen.html')();
	};

	// ローディングを表示する
	mainApp.util.showProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').addClass('show').addClass('visible');
		mainApp.mainLayout.$('.progress-image').css({"margin-top" : (100 + window.scrollY) + "px"});
	};
	// ローディングを非表示にする
	mainApp.util.hideProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').removeClass('visible');
		setTimeout(function(){
			mainApp.mainLayout.$('.progress-screen').removeClass('show');
		}, 220);
	};
	// リクエストの前にLoadingスクリーンを表示し、エラーまたは正常終了で消してくれる
	// 引数 : jqXHRオブジェクトを返す関数オブジェクト
	mainApp.util.execWithProgressScreen = function( reqFunction ){
		// Execution
		mainApp.util.showProgressScreen();
		return reqFunction()
		.done(function(){
			mainApp.util.hideProgressScreen();
		}).fail(function(){
			mainApp.util.hideProgressScreen();
		});
	};
	// model/collectionのリクエスト発行時にローディングスクリーンを表示し、
	// 正常、異常終了時に非表示にする
	mainApp.util.bindProgressScreen = function( view, modelOrCollection ){
		view.listenTo( modelOrCollection, 'request' , mainApp.util.showProgressScreen );
		view.listenTo( modelOrCollection, 'sync' , mainApp.util.hideProgressScreen );
		view.listenTo( modelOrCollection, 'error' , mainApp.util.hideProgressScreen );
	};

	// ajaxリクエストを返す処理に、デフォルトのエラーハンドリングを付与する
	// 引数 
	// jqXHR : jqXHRオブジェクト
	// options: ignoreStatuses - ex. [ 401, 402, 403 ]
	//          afterHandling - function which you wish to execute after common err handling
	mainApp.util.bindCommonErrorHandling =  function(jqXHR, options){
		var options = options || {};
		var ignoreStatuses = _.union(options.ignoreStatuses, [503]) || [503];
		var afterAlertCallback = options.afterAlertCallback || App.doNothing;

		return jqXHR.fail( function(err){
			// err.status が ignoreStatusesに含まれている場合は何もしない
			if( ignoreStatuses.indexOf(err.status) === -1){
				applican.notification.alert("エラーが発生しました。", afterAlertCallback, "", "OK");
			}
			if( options.afterHandling ){ options.afterHandling(); }
		});
	};

	mainApp.util.number = {
		roundEx: function( number, digitsAfterDecimalPoint ){
			var offset = Math.pow(10, digitsAfterDecimalPoint);
			return Math.round( number * offset  ) / offset
		},
	};

  mainApp.doNothing = function(){};

	return mainApp;

})();
