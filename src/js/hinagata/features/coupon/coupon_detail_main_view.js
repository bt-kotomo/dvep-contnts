var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {

	var CouponDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_detail_main_template.html'),
		useStatusTemplate: require('./coupon_detail_use_template.html'),
		QRTemplate: require('./coupon_detail_qr_template.html'),
		events:{
			// "click #use-btn" : "use",
			"click #use-btn": "show_dialogue_confirm"
		},
		initialize: function(options){
			this.dialogueFlg;
			this.listenTo(this.model, 'change', this.render );
		},
		templateHelpers:{
			formatDate: function( dateTime ){
				if( !dateTime ) return "";
				return moment( dateTime ).format("YYYY/MM/DD HH:mm:ss");
			},
			limitConditionText: function(){
				var condition = this.limitCode;
				return {
					"1":"既に" + this.useCondLimit + "名様にご利用頂きました", /* 先着制限 */
					"2":"ご利用有り難うございました", /* 回数制限 */
					"3":"本日分は既にご利用済みです", /* 同日利用制限 */
				}[condition] || "利用済み";
			}
		},
		show_dialogue_confirm: function(){
			var confirmDsp = this.model.get("confirmationDisp");
			if ( confirmDsp === "1" ){
				this.dialogueFlg = "1";
				$("#showdialogue-coupon, #confirm_dialogue").addClass("show");
				this.fixPosition( this.dialogueFlg );
			}else{
				this.use();
			}
		},
		remove_dialogue_confirm: function(){
			$("#showdialogue-coupon, #confirm_dialogue").removeClass("show");
		},
		use: function(){
			if( this.model.needGEOLocationToUse() ){
				// 位置情報を取得した後にリクエストを投げる
				var options = {};
				var _this = this;

				App.util.showProgressScreen();
				App.applican.getCurrentPositionPromiss(options)
				.done(function(rtn){ 
					var longitude = rtn.coords.longitude;
					var latitude = rtn.coords.latitude;
					_this._postUseRequest({longitude: longitude, latitude: latitude } );
				})
				.fail(function(err){ 
					// Geolocationがマストで無い場合はそのまま投げる
					if( _this.model.canBeUsedWithoutGEOLocation() ){
						_this._postUseRequest();
					}else{
						// applican.notification.alert("位置情報取得に失敗しました", App.util.hideProgressScreen,"","OK");
						_this.remove_dialogue_confirm();
						_this.dialogueFlg = "2";
						App.util.hideProgressScreen();
						$("#showdialogue-coupon, #couponErr1_dialogue").addClass("show");
						_this.fixPosition( _this.dialogueFlg );
					}
				});
			}else{
				this._postUseRequest();
			}
		},
		_postUseRequest: function( options ){
			var _this = this;
			var _options = options || {};
			var requestAction = function(){ 
				return App.btApi.useCoupon({ 
					id: _this.model.get("id"),
					uCoupId: _this.model.get("uCoupId"),
					longitude: _options.longitude,
					latitude: _options.latitude
				}).done(function(res){
					_this.model.use(); // レンダリングは change イベントに頼る
					_this.remove_dialogue_confirm();
					_this._showUseStatus( _this._buildStatusOptionsFromUseResponse( res ) );
					window.scrollTo(0, 0);
				}).fail(function(err){
					if(err.status === 403){
						// applican.notification.alert("最寄りの店舗が見つからないため、クーポンを利用できません。", App.doNothing, "", "OK");
						_this.remove_dialogue_confirm();
						_this.dialogueFlg = "3";
						$("#showdialogue-coupon, #couponErr2_dialogue").addClass("show");
						_this.fixPosition( _this.dialogueFlg );
					}
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ),
				{ignoreStatuses: [404,403]}
			);
		},
		onRender: function(){
			this.stickit();
		},
		_buildStatusOptionsFromUseResponse: function( res ){

			var useDateTime = Number( new Date() );
			var shopName = (res.shop)? res.shop.name : "";
			var qr = res.qrData;
			var rtn =  {
				useDateTime: useDateTime,
				shopName: shopName,
				qr: qr
			};

			// TODO: この情報 + uCouopIDをローカルストレージに入れる事で、リロード対策を行いたい 
			// 30秒以内に同じ画面を開いた場合は消しコミ画面を表示する仕様を提案する
			// 問題はQRで、これはワンタイムとかそういうものではないか注意

			return rtn;

		},

		_showUseStatus: function( params ){

			var params = params || {};
			// QR
			if( params.qr ){
				var obj = {};
				obj.color = "000000";
				obj.qr = encodeURIComponent(params.qr);
				var $parent = this.$el.parents("#COUPON-DETAIL");
				$parent.append( this.QRTemplate( obj ) );
				var h_window = $(window).height() - 44;
				var h_coupon_detail = $("#COUPON-DETAIL").height();
				if ( h_window > h_coupon_detail ) {
					$(".qrOverlay").css({"height": h_window});
				} else {
					$(".qrOverlay").css({"height": h_coupon_detail});
				}
				$parent.addClass("disable-scroll");
			}else{
				// それ以外
				var obj = {};
				obj.useDateTime = moment( params.useDateTime ).format("YYYY/MM/DD HH:mm:ss");
				obj.shopName = params.shopName || "-";
				this.$('#use-status-view').append( this.useStatusTemplate( obj ));
			}
		},

		fixPosition:function(dialogueFlg){
			var dialogueH;
			var windowH = $(window).height();
			switch ( dialogueFlg ){
				case "1" :
					dialogueH = ( windowH - $('#confirm_dialogue').height() ) / 2 ;
					$('#confirm_dialogue').css({'position':'fixed','top': dialogueH});
					break;
				case "2" :
					dialogueH = ( windowH - $('#couponErr1_dialogue').height() ) / 2 ;
					$('#couponErr1_dialogue').css({'position':'fixed','top':dialogueH});
					break;
				case "3" :
					dialogueH = ( windowH - $('#couponErr2_dialogue').height() ) / 2 ;
					$('#couponErr2_dialogue').css({'position':'fixed','top':dialogueH});
					break;
			}
		}

	});

	return CouponDetailMainView;

})();
