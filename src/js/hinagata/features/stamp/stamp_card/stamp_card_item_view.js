var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var StampCardItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor3 ftcolor2", 
		attributes: function(){
			return { "data-index": this.model.get("id") + 1};
		},
		template: require('./stamp_card_item_template.html'),
	});

	return StampCardItemView;

})();
