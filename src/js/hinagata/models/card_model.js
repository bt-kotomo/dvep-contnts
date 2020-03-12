var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var CardModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/detail",
		parse: function(response) {
			this.extras = response.member[0].extras;
			this.issue = response.issue;

			var cardnum = _.findWhere(this.extras, {name : '会員番号'});
			this.set('cardnum',
				(!_.isUndefined(cardnum) && !_.isNumber(cardnum.value)) ? cardnum.value : null,
				{silent: true});

			var point = _.findWhere(this.extras, {name : '総ポイント_現在ポイント'});
			this.set('point',
				(!_.isUndefined(point) && !_.isNumber(point.value)) ? point.value : null,
				{silent: true});

			var rank = _.findWhere(this.extras, { name: '現在ランクID' });
			this.set('rank', (rank && rank.value) ? rank.value : null, { silent: true });
			
			// カード種別判定
			/* rank
			   1: premium
			   2: prestige
			   21: wdc
			   22: wdc_premium
			   23: wdc_prestige
			   other: members
			*/
			var cardtype = 'members';
			if ( !_.isNull(rank) && rank ) {
				switch ( parseInt(rank.value) ) {
					case 2:
						cardtype = 'premium';
						break;
					case 3:
						cardtype = 'prestige';
						break;
					case 21:
						cardtype = 'wdc_members';
						break;
					case 22:
						cardtype = 'wdc_premium';
						break;
					case 23:
						cardtype = 'wdc_prestige';
							break;
				};
			}
			this.set('cardtype', cardtype, {silent: true});

			var total = _.findWhere(this.extras, {name : '今年度累計購買金額'});			
			this.set('total',
				(!_.isUndefined(total) && !_.isNumber(total.value) && total.value != null) ? App.util.text.numberWithDelimiter(total.value) : 0,
				{ silent: true });
			
			var WDCserial = _.findWhere(this.extras, {name : 'WDCシリアル'});
			this.set('WDCserial',
				(!_.isUndefined(WDCserial) && !_.isNumber(WDCserial.value)) ? WDCserial.value : null,
				{ silent: true });
			
			var expiredpoint = _.findWhere(this.extras, {name : '失効予定ポイント'});
			this.set('expiredpoint',
				(!_.isUndefined(expiredpoint) && !_.isNumber(expiredpoint.value)) ? expiredpoint.value : null,
				{silent: true});
					
			
				// console.log("issue:" + this.issue);
			if (this.issue) {
				this.set('pinnum', this.issue.valuePinNo, {silent: true});
				// this.set('valueCardNo', this.issue.valueCardNo, {silent: true});
			}
			
			return response;
		},
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
            return CardModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return CardModel;
})();
