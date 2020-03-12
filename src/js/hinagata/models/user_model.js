var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var UserModel = BaseModel.extend({
        urlRoot: AppConf.url.appRoot + "/user/detail",
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
            return UserModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return UserModel;
})();
