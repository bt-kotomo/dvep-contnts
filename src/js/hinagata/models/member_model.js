var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var MemberModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/detail",
		parse: function(response) {
			this.barcode = response.barcode[0];
			var data = this.barcode.data;
			var type = this.barcode.type;
			var url = this.barcode.extras.account;

			if ( type === 0 ) {
				this.set('dataBarcode',
					(!_.isUndefined(data)) ? data : null,
					{silent: true});
			} else {
				this.set('dataBarcode',
					(!_.isUndefined(data) && !_.isNumber(data)) ? data : null,
					{silent: true});	
			}
			this.set('typeBarCode',
				(!_.isUndefined(type) && !_.isNumber(type)) ? type : null,
				{silent: true});
			this.set('urlBarCode',
				(!_.isUndefined(url)) ? url : null,
				{silent: true});

			return response;
		},
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
            return MemberModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return MemberModel;
})();
