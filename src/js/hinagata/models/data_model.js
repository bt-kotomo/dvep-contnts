var Backbone = require('backbone');
module.exports = (function () {
	var DataModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("data-temp"),
		idAttribute: "id",
		setUserId: function(memberId) {
			this.set("memberId", memberId);
			this.save();
		},
		setImageUrl: function(imageUrl) {
			this.set("imageUrl", imageUrl);
			this.save();
		},
		getUserId: function() {
			return this.get("memberId");
		},
		getImageUrl: function() {
			return this.get("imageUrl");
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

	return DataModel;

})();