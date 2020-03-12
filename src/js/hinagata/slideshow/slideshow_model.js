var Backbone = require('backbone');

module.exports = (function(){

	var SlideShowModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("slide-show"),
		idAttribute: "id",
		defaults: {
			id: AppConf.core.localStorageKey
		},
		getSlideInfo: function(){
			return this.get("slideInfo");
		},
		setSlideInfo: function( slideInfo ){
			var slideInfor = this.get("slideInfo");
			slideInfor = slideInfo;
			this.set("slideInfo", slideInfor);
			this.save();
		},
		safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				_this.trigger('ready', _this);
			});
		}
	});

	return SlideShowModel;


})();