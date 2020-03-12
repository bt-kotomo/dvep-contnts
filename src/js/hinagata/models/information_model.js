var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var InformationModel = BaseModel.extend({
		idAttribute: "informationId",
		url: AppConf.url.appRoot + "/information/detail",
		mutators: {
		},
		parse: function(res){
			return res.information || res;
		},
		fetchSingleInformation: function( options ){
            App.util.cache.responseCache(this, "information_detail_" + this.get("informationId"), AppConf.expire.information.detail);
			var _options = _.extend( options || {}, { url: this.url + "?informationId=" + this.get("informationId") } );
			return this.fetchWithAuthInfo( _options );
		},
		fetchSingleInformationWithoutToken: function( registrationId, options ){
            App.util.cache.responseCache(this, "information_detail_" + this.get("informationId"), AppConf.expire.information.detail);
			var _options = _.extend( options || {}, {
				url: this.url + "?informationId=" + this.get("informationId") + "&registrationId=" + registrationId });
				return this.fetchWithoutAuthInfo( _options );
		},
	});

	return InformationModel;
})();
