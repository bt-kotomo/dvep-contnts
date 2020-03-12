var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var InformationModel = require('./information_model.js');
module.exports = (function () {
	var unReadCounts = {};
	
	window.InformationCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/information/list",
		model: InformationModel,
		parse: function(response) {
			unReadCounts = response.unReadCounts;
			return response.information.map(function(item) {
				var imageUrl = item.imageUrl;
				if (imageUrl && imageUrl.indexOf('https') == -1 && imageUrl.indexOf('http') > -1) {
					item.imageUrl = imageUrl.replace('http', 'https');
				}
				return item;
			});
		},
		fetchWithoutLogin: function( registrationId , options){
			var options = _.extend( options || {}, { url: this.url + "?registrationId=" + registrationId } );
			return this.fetchWithoutAuthInfo( options );
		},
		getUnReadCounts: function() {
			return unReadCounts;
		}
	});
	return InformationCollection;
})();
