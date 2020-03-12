var DataModel = require('../../models/data_model.js');
var CardModel = require('../../models/card_model.js');
var ValueModel = require('../../models/value_model.js');
var PointModel = require('../../models/point_model.js');
var Backbone = require('backbone');
module.exports = (function () {
	var CouponBuyView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./member_item_view_template.html'),
		headerConf: {
			title: "アプリ会員証",
			showBackButton: true,
			showHomeButton: true,
		},
		ui: {
			"cardImage" : "#MEMBER-DETAIL .card-image",
			"couponValue" : "#coupon-value",
			"couponLimit" : "#coupon-limit",
			"totalValue" : "#total-value",
			"pointValue" : "#point-value",
            "memberIdBarcode": "#member-id-barcode",
			"memberIdString": "#member-id-string",
			"txtrank" : ".txtrank"
		},
		initialize: function() {
			this.cardModel = new CardModel();
			this.pointModel = new PointModel();

			App.util.bindProgressScreen(this, this.cardModel );
			this.listenTo(this.cardModel, 'sync', this._renderCard);

			App.util.bindProgressScreen(this, this.pointModel);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);

			// this.valueModel = new ValueModel();
			// this.listenTo(this.valueModel, 'sync', this._renderValue);

			this.dataModel = new DataModel( { id: AppConf.core.localStorageKey } );
			this.dataModel.safeFetch();
		},
		onRender: function() {
			var _this = this;
			this.cardModel.fetchWithAuthInfo({
				timeout: AppConf.timeout.member,
			})
			.fail(function(err){
				if ( err.status != 401 ) {
					if ( _this.dataModel ) {
						if ( _this.dataModel.getImageUrl() ) {
							_this.setUser(_this.dataModel.getImageUrl(), _this.dataModel.getUserId());
						} else {
							$(".box-bar-code").hide();
						}
					} else {
						$(".box-bar-code").hide();
					}
				}

				var img = './image/member/members.png';
				_this.ui.cardImage.attr('src', img);
			});

			this.pointModel.fetchWithAuthInfo({
				timeout: AppConf.timeout.member,
				on401: function(){}
			});
		},
		_renderCard: function() {
			var total = this.cardModel.get("total");
			if ( total && total !== null ) {
				this.ui.totalValue.html(total + ' <span class="text">円</span>');
			}

			var cardnum = this.cardModel.get('cardnum');
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			//var img = AppConf.url.appRoot.substr(0, lengthUrl) + '/cp/barcode/code128.cgi?nt=1&height=80&c=' + cardnum + '&.png';
			var img = AppConf.url.appRoot.substr(0, lengthUrl) + '/cp/barcode/qr.cgi?nt=1&height=80&text=' + cardnum + '&.png';

			if ( cardnum !== null ) {
				// this.setUser(img, cardnum);
				this.dataModel.setUserId(cardnum);
				this.imgBase64(img, cardnum);
			} else {
				$(".box-bar-code").hide();
			}

			var img = './image/member/' + this.cardModel.get("cardtype") + '.png';
			this.ui.cardImage.attr('src', img);

			// display 「WDC-」 カード番号 
			var rank = this.cardModel.get('rank');
			if(rank == '21' || rank == '22' || rank == '23'){
				this.ui.txtrank.removeClass('hide');
			}

			// expire day
			var expiredPoint = this.cardModel.get('expiredpoint');
			if (expiredPoint == 0 || !expiredPoint ){
				this.ui.couponValue.html(App.util.text.numberWithDelimiter(0) + ' <span class="text">pt</span>');
				this.ui.couponLimit.html('失効の予定ポイントはありません。');
			} else {
				var nowMonth = new Date().getMonth() + 1;
				var yearDisplay = null;
				if(nowMonth > 3 && nowMonth <= 12){
					yearDisplay = new Date().getFullYear() + 1;
				}else{
					yearDisplay = new Date().getFullYear();
				}
				this.ui.couponValue.html(App.util.text.numberWithDelimiter(expiredPoint) + ' <span class="text">pt</span>');
				this.ui.couponLimit.html(yearDisplay+'年3月31日まで');
			}
		},
		_renderPoint: function(){
			var point = this.pointModel.get("point");
			if ( point && point !== null ) {
				this.ui.pointValue.html(App.util.text.numberWithDelimiter(point) + ' <span class="text">pt</span>');
			}
		},
		imgBase64: function(src, cardnum){
			var _this = this;
			var canvas = document.createElement("canvas");
          	if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
            	return;
          	}
          	var image = new Image();
          	image.setAttribute('crossOrigin', 'anonymous');

          	image.src = src;
          	image.onload = function() {
            	// 画像をbase64にするためにCanvasを利用するので、
            	// クロスドメインの画像は無理かも。。
            	var canvas = document.createElement("canvas");
            	canvas.width = image.width;
            	canvas.height = image.height;
            	canvas.getContext('2d').drawImage(image, 0, 0);
            	var base64 = canvas.toDataURL();
            	var model = new DataModel( { id: AppConf.core.localStorageKey } );
            	model.safeFetch();
            	model.setImageUrl(base64);
            	_this.setUser(base64, cardnum);
			}
			image.onerror = function(){
                _this.setUser(_this.dataModel.getImageUrl(), _this.dataModel.getUserId());
            }
			image.src = src;
		},
		setUser: function(imgUrl, memberId) {
            this.ui.memberIdBarcode.attr('src', imgUrl);
			if ( memberId ) {
                this.ui.memberIdString.text(memberId);
			}
			$(".box-bar-code").show();
		},
	});

	return CouponBuyView;

})();
