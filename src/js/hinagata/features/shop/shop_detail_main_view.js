var Backbone = require('backbone');
var moment = require('moment');
var ApplicanEx = require('../../utils/applican_ex');
module.exports = (function () {

	var ShopDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./shop_detail_main_template.html'),
		ui: {
			"routeBtn" : ".route-btn",
			"mapBtn" : ".map-btn",
		},
		events:{
			"click @ui.routeBtn" : "_showGoogleRouteWindow",
			"click @ui.mapBtn" : "_openMapApplication"
		},
		initialize: function(){
		},
		onRender: function(){
		},
		_showGoogleRouteWindow: function(){

			var _this = this;
			App.applican.getCurrentPositionPromiss()
			.done( function( geoRes ){
				var href = "https://www.google.com/maps/dir/";
				href += geoRes.coords.latitude + ",";
				href += geoRes.coords.longitude + "/";
				href += _this.model.get( "latitude" ) + ",";
				href += _this.model.get( "longitude" ) + "/";
				location.href =  href + "?_native_open_embedded";
			}).fail( function(err){
				applican.notification.alert("位置情報取得に失敗しました", App.util.hideProgressScreen,"","OK");
			});
		},
		_openMapApplication: function(){
			var mapUrl = {};
		  mapUrl[ ApplicanEx.consts.device.iOS ] = "maps:q=" + this.model.get("latitude") + "," + this.model.get("longitude"),
			mapUrl[ ApplicanEx.consts.device.android ] = "http://maps.google.com/maps?q=" + this.model.get("latitude") + "," + this.model.get("longitude") + "&_native_open_external",
			location.href = mapUrl[ applican.device.platform ]; 
		},
	});

	return ShopDetailMainView;

})();
