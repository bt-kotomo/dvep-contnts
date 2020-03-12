var Backbone = require('backbone');
module.exports = (function () {

	var rootCategory = {
		id: "root",
		name: "トップ",
	};

	var SearchConditionModel = Backbone.Model.extend({
		defaults: {
			mode: "geolocation",
			text: "",
			categories: [ rootCategory ],
		},
		initialize: function(){
			this.listenTo(this,'change:mode', this._onChangeMode);
		},
		changeMode: function(mode){
			this.set({
				mode: mode,
			});
		},
		setText: function( text ){
			this.set("text", text);
		},
		getParentObject: function(){
			var categories = this.get("categories");
			return categories[categories.length - 1];
		},
		pushParentObject: function( parentObj ){
			if( !parentObj || !parentObj.id || !parentObj.name ) { throw "不正なカテゴリオブジェクトを登録しようとしました" }
			var newCategories = this.get("categories");
			newCategories.push(parentObj);
			this.set({"categories": newCategories}); //change eventを出したい
			this.trigger("change:categories"); //arrayなので変わったと認識されない
			this.trigger("change"); //arrayなので変わったと認識されない
		},
		setCategoriesByCategoryCollection: function( categoryCollection ,query ){
			var categoryIds = query["category[]"] || [];
			var categories = categoryCollection.filter(function(v){
				return categoryIds.indexOf( v.id ) != -1;
			}).map( function(v){ return { id: v.get("id"), name: v.get("name")  }; } );

			if( !categories ){ return }
			console.log( categories );
			var newCategories = [ rootCategory ];
			this.set("categories", newCategories.concat(categories));
		},
		spliceCategory: function( level ){
			var newCategories = this.get("categories");
			newCategories.splice( level ); //
			this.trigger("change:categories"); //arrayなので変わったと認識されない
		},
		_onChangeMode: function(){
			this.set({
				categories: [ rootCategory ]
			});
			this.trigger("change:categories");
		}
	},{
	});
	return SearchConditionModel;
})();
