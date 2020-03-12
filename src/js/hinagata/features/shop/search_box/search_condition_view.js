var Backbone = require('backbone');
module.exports = (function () {
	var ShopSearchConditionView = Backbone.Marionette.ItemView.extend({
		template: require('./search_condition_template.html'),
		ui: {
			"freeWordTab" : ".free-word-tab",
			"geoTab" : ".geo-tab",
			"categoryTab" : ".category-tab",
			"tabBtn" : ".tab-btn",
			"freewordSearchBtn" : "#free-word-search-btn",
			"freewordTextInput" : "[name=free-word]",
			"freewordTextBlock" : ".freeword-text-block",
		},
		events: {
			"click @ui.freeWordTab" : "onTabClick",
			"click @ui.geoTab" : "onTabClick",
			"click @ui.categoryTab" : "onTabClick",
			"click @ui.freewordSearchBtn" : "onFreeWordBtnClick",
		},
		initialize: function(){
			this.listenTo( this.model ,'change', this.render );
		},
		onRender: function(){
			var $target;
			App.util.style.toInactive( this.ui.tabBtn );
			this.ui.freewordTextBlock.addClass("HIDE");
			switch (this.model.get("mode")){
				case "category":
					$target = this.ui.categoryTab;
				break;
				case "geolocation":
					$target = this.ui.geoTab;
				break;
				case "freeword":
					$target = this.ui.freeWordTab;
				this.ui.freewordTextBlock.removeClass("HIDE");
				break;
			}
			App.util.style.toActive( $target );
		},
		onTabClick: function(e){
			e.preventDefault();
			var mode = this.$(e.target).attr("data-mode");
			this.model.changeMode(mode);
		},
		onFreeWordBtnClick: function(e){
			e.preventDefault();
			this.model.setText( this.ui.freewordTextInput.val() );
			this.model.trigger('change:mode');
		}
	});
	return ShopSearchConditionView;

})();
