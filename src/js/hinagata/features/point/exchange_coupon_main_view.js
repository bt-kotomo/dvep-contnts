var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {

	var ExchangeCouponMainView = Backbone.Marionette.ItemView.extend({
		template: require('./exchange_coupon_main_template.html'),
		exchangeStatusTemplate: require('./exchange_coupon_status_template.html'),
		ui:{
			"exchangeCouponBtn" : "#exchange-coupon-btn",
			"useCouponBtn" : ".use-coupon-button",
		},
		events:{
			"click @ui.exchangeCouponBtn" : "_exchangeCoupon",
		},
		initialize: function(){
			this.listenTo( this, 'exchange', this.onExchange);
			this.exchanged = false;
		},
		templateHelpers:{
			formatDate: function( dateTime ){
				if( !dateTime ) return "";
				return moment( dateTime ).format("YYYY/MM/DD HH:mm:ss");
			},
		},
		onRender: function(){
		},
		onExchange: function( data ){
			this.exchanged = true;
			this.ui.exchangeCouponBtn.addClass('DISABLE');
			this.ui.exchangeCouponBtn.html('交換済み');
			this._showExchangeStatus( data.coupon );
		},
		_exchangeCoupon: function( e ){
			e.preventDefault();
			if( this.exchanged ) return false;
			var _this = this;
			var requestAction = function(){
				return App.btApi.exchangeCoupon( _this.model.get("id") )
			};

			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ),{ ignoreStatuses: [403] })
				.done(function(data){
					console.log(data);
					_this.trigger('exchange', { coupon: data.coupon} );
				}).fail(function(err){
					if(err.status === 403){
						applican.notification.alert("ポイントを確認してください。", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
		},
		_showExchangeStatus: function(coupon){
			this.$('#exchange-status').html( this.exchangeStatusTemplate({
				exchangeDate: moment().format("YYYY/MM/DD HH:mm"),
				couponId: coupon.id,
				uCoupId: coupon.uCoupId,
			}));
			window.scrollTo(0,0);
		}

	});

	return ExchangeCouponMainView;

})();
