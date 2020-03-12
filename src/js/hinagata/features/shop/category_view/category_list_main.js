var Backbone = require('backbone');
var CategoryCollectionView = require('./category_collection_view.js');
var CategoryCollection = require('../../../models/category_collection.js');

module.exports = (function () {

	var CategoryListMain = Backbone.Marionette.LayoutView.extend({

		template: require('./category_list_main_template.html'),
		regions: {
			"listRegion" : ".list",
			"selectedCategoriesRegion" : "#selected-categories",
		},
		initialize: function(options){
			this.conditionModel = options.conditionModel;
			this.listenTo( this.conditionModel, 'change:categories', this._renderCategories );
		},
		onRender: function(){
			this._renderSelectedCategories();
			this._renderCategories();
		},
		_renderCategories: function(){
			var parent = this.conditionModel.getParentObject();
			this.listRegion.show( new CategoryCollectionView({
				collection: new CategoryCollection( this.collection.where({ "parentId": parent.id }) ),
				conditionModel: this.conditionModel
			}));
		},
		_renderSelectedCategories: function(){
			this.selectedCategoriesRegion.show( new SelectedCategoryCollectionView( { conditionModel: this.conditionModel} ) );
		},
	});

	var SelectedCategoryItemView = Backbone.Marionette.ItemView.extend({
		initialize: function(options){
			this.level = options.level; 
		},
		tagName: "li",
		ui: {
			"offset" : ".offset"
		},
		events: {
			"click": "onSelect"
		}, 
		onRender: function(){
			this.ui.offset.css("width", (this.level - 1) * 20 + "px");

		},
		template: require('./selected_categories_template.html'),
		onSelect: function(e){
			e.preventDefault();
			this.trigger("select:breadcrumbs", this.level);
		}
	});

	var SelectedCategoryCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SelectedCategoryItemView,
		tagName: "ol",
		className: "SELECTED-CATEGORIES bdcolor1",
		initialize: function( options ){
			this.conditionModel = options.conditionModel;
			console.log(this.conditionModel.attributes);
			this.collection = this._buildCategoryCollection();
			this.listenTo( this.conditionModel, 'change:categories', this._onCategoryChange);
		},
		childViewOptions: function(model, index){
			return {
				level: index + 1 
			};
		},
		childEvents: {
			"select:breadcrumbs" : function( itemView, level ){
				this.conditionModel.spliceCategory( level );
			}
		},
		_buildCategoryCollection: function(){
			return new Backbone.Collection( this.conditionModel.get("categories") );
		},
		_onCategoryChange: function(){
			this.collection = this._buildCategoryCollection();
			this.render();
		}
	});

	return CategoryListMain;
})();
