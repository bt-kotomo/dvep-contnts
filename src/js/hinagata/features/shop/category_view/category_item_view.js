var Backbone = require('backbone');
module.exports = (function () {
	var CategoryItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor1",
		template: require('./category_item_template.html'),
		events: {
			"click" : "onSelect"
		},
		templateHelpers: {
		},
		onSelect: function(e){
			e.preventDefault();
			if( this.model.isShop() ){
				location.hash = "shop/" + this.model.get("id");
			}else{
				this.trigger('select:category', this.model);
			}
		},
	});

	return CategoryItemView;

})();
