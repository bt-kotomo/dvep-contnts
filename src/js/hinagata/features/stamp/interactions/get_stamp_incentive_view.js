var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var GetStampIncentiveView = Backbone.Marionette.ItemView.extend({
		template: require('./get_stamp_incentive_template.html'),
		ui: {
			"overlay" : ".overlay", 
			"closeBtn" : ".close-btn", 
			"showCouponButton" : ".show-coupon-btn"
		},
		events: {
			"click @ui.closeBtn" : "onCloseClick",
			"click @ui.showCouponButton" : "onShowCouponClick"
		},
		initialize: function(incentiveInfo){

			this.incentiveInfo = incentiveInfo;
			this.model = new Backbone.Model();
			this._setModelFromIncentiveInfo();
			// ポイントゲットの場合
			// クーポンゲットの場合
			// スタンプゲットの場合

			this.model.set("timestamp", moment().format('YYYY/MM/DD HH:mm:ss') );

		},
		onRender: function(){
			this.ui.overlay.removeClass('HIDE');
			var _this = this;
			setTimeout( function(){
				_this.ui.overlay.removeClass('INVISIBLE');
			}, 100);
		},
		_setModelFromIncentiveInfo: function(){
			switch (this.incentiveInfo.incentiveType + "" ){
				case "0" :
					this.model.set("type", "stamp");
				break;
				case "1" :
					this.model.set("type", "coupon");
				this.model.set("couponId", this.incentiveInfo.coupon.id );
				this.model.set("uCoupId", this.incentiveInfo.coupon.uCoupId );
				break;
				case "2" :
					this.model.set("type", "point");
				this.model.set("point", this.incentiveInfo.point );
				break;
			}
		},
		onCloseClick: function(e){
			e.preventDefault();
			this.ui.overlay.addClass('INVISIBLE');
			var _this = this;
			setTimeout( function(){
				_this.destroy();
			}, 400);
		},
		onShowCouponClick: function(){
			location.hash = "#coupon";
		},
	});
	return GetStampIncentiveView;
})();
