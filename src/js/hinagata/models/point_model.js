var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var PointModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/point",
        fetchWithAuthInfo: function(options){
            App.util.cache.responseCache(this, "user_point_" + App.getAuthInfo().token, AppConf.expire.user.point);
            return PointModel.__super__.fetchWithAuthInfo.call(this, options);
        }
	});
	return PointModel;
})();
