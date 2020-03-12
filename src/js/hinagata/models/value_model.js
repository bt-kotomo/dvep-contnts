var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var ValueModel = BaseModel.extend({
		//urlRoot: "http://dev.bemss.jp/value-api" + "/user/value/detail.php",
		 urlRoot: "http://bt11.betrend.com/value-api" + "/user/value/detail.php",
		// urlRoot: AppConf.url.appRoot + "/user/value/detail",
		parse: function(response) {
			this.set('point', response.balancePoint, {silent: true});
			this.set('basic', response.balanceBasic, {silent: true});
			this.set('bonus', response.balanceBonus, {silent: true});
			this.set('coupon', response.balanceCoupon, {silent: true});
			this.set('total', response.balanceTotal, {silent: true});
			this.set('expireDateBasic', response.expireDateBasic, {silent: true});
			this.set('expireDateBonus', response.expireDateBonus, {silent: true});
			this.set('expireDateCoupon', response.expireDateCoupon, {silent: true});
			this.set('expireDatePoint', response.expireDatePoint, {silent: true});
			console.log('balancePoint:' + response.balancePoint + 'balanceBasic:' + response.balanceBasic + 'balanceBounus:' + response.balanceBounus + 'balanceCoupon:' + response.balanceCoupon);
			return response;
		},
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_value_detail_" + App.getAuthInfo().token, AppConf.expire.user.value.detail);
            return ValueModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return ValueModel;
})();
