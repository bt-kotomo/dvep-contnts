var CardModel = require('../../models/card_model.js');
var ValueModel = require('../../models/value_model.js');
var Backbone = require('backbone');
module.exports = (function () {

	var SmartMainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./smart_main_template.html'),
		regions: {
			"smartMainRegion": "#smart-main-region"
		},
		initialize: function(){
			this.cardModel = new CardModel();

			App.util.bindProgressScreen(this, this.cardModel );
			this.listenTo(this.cardModel, 'sync', this._renderSmart);

			this.valueModel = new ValueModel();
			this.listenTo(this.valueModel, 'sync', this._renderValue);
		},
		onRender: function(){
			this.cardModel.fetchWithAuthInfo();
			this.valueModel.fetchWithAuthInfo({
				on401: function(){
					;
				}
			});
		},
		headerConf: {
			title: "スマラボマネー 確認",
			showBackButton: true,
		},
		ui: {
			"cardnumText" : ".cardnum-text",
			"pinnumText" : ".pinnum-text",
			"cardnumImage" : "#cardnum-image",
			"smartText" : ".smart-text",
			"smartMoneyText" : ".smartmoney-text",
			"chargeValue" : "#charge-value",
			"chargeLimit" : "#charge-limit",
			"bonusValue" : "#bonus-value",
			"bonusLimit" : "#bonus-limit",
			"couponValue" : "#coupon-value",
			"couponLimit" : "#coupon-limit",
			"pinnum" : "#pinnum",
			"smartPointText" : ".smartpoint-text",
			"pointValue" : "#point-value",
			"pointLimit" : "#point-limit",
		},
		_renderSmart: function(){
			var cardnum = this.cardModel.get('cardnum');
			if (cardnum != null) {
				var barcodeUrl = 'http://advs.jp/cp/barcode/code128.cgi?nt=1&height=80&c=' + cardnum;

				this.ui.cardnumImage.attr('src', barcodeUrl);
			} else {
				this.ui.cardnumImage.addClass('HIDE');
			}
			this.ui.cardnumText.html(App.util.text.cardnumWithDelimiter(cardnum));
			var pinnum = this.cardModel.get('pinnum');
			if (pinnum != null && pinnum != "") {
				this.ui.pinnumText.html(pinnum);
			} else {
				this.ui.pinnum.addClass('HIDE');
			}
		},
		_renderValue: function(){
			var total = this.valueModel.get('total');
			var basic = this.valueModel.get('basic');
			var bonus = this.valueModel.get('bonus');
			var coupon = this.valueModel.get('coupon');
			var expireDateBasic = this.valueModel.get('expireDateBasic');
			var expireDateBonus = this.valueModel.get('expireDateBonus');
			var expireDateCoupon = this.valueModel.get('expireDateCoupon');
			var point = this.valueModel.get('point');
			var expireDatePoint = this.valueModel.get('expireDatePoint');

			this.ui.smartMoneyText.html(App.util.text.numberWithDelimiter(total) + '円');

			this.ui.chargeValue.html(App.util.text.numberWithDelimiter(basic) + '円');
			this.ui.chargeLimit.html(App.util.text.formatExpireDate(basic, expireDateBasic));

			this.ui.bonusValue.html(App.util.text.numberWithDelimiter(bonus) + '円');
			this.ui.bonusLimit.html(App.util.text.formatExpireDate(bonus, expireDateBonus));
			
			this.ui.couponValue.html(App.util.text.numberWithDelimiter(coupon) + '円');
			this.ui.couponLimit.html(App.util.text.formatExpireDate(coupon, expireDateCoupon));

			this.ui.smartPointText.html(App.util.text.numberWithDelimiter(point) + 'Ｐ');

			this.ui.pointValue.html(App.util.text.numberWithDelimiter(point) + 'Ｐ');
			this.ui.pointLimit.html(App.util.text.formatExpireDate(point, expireDatePoint));
		}
	});

	return SmartMainLayout;
})();
