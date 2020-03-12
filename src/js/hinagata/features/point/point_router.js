var Backbone = require('backbone');
var PointMainLayout = require("./point_main_layout.js");
var ExchangeCouponLayout = require("./exchange_coupon_layout.js");
var Poex01Layout = require("./poex01_layout.js");
var Poex02Layout = require("./poex02_layout.js");
var Poex03Layout = require("./poex03_layout.js");
var Poex04Layout = require("./poex04_layout.js");
var Poex05Layout = require("./poex05_layout.js");

module.exports = (function () {

	var PointController = Backbone.Marionette.Controller.extend({
        showPointMainView: function(){
            var pointMainLayout = new PointMainLayout();
            pointMainLayout.render();
            App.pageSlider.slidePage( pointMainLayout );
            App.headerModel.applyViewHeaderConf( pointMainLayout.headerConf );
        },
        showExchangeCoupon: function(id){
            var options = { id: id };
            var exchangeCouponLayout = new ExchangeCouponLayout( options );
            exchangeCouponLayout.render();
            App.pageSlider.slidePage( exchangeCouponLayout );
            App.headerModel.applyViewHeaderConf( exchangeCouponLayout.headerConf );
        },
        showPoex01View: function(){
            var poexLayout = new Poex01Layout();
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex02View: function(){
            var poexLayout = new Poex02Layout();
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex03View: function(id){
            var poexLayout = new Poex03Layout({ id: id });
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex04View: function(id){
            var poexLayout = new Poex04Layout({ id: id });
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
        showPoex05View: function(id){
            var poexLayout = new Poex05Layout({ id: id });
            poexLayout.render();
            App.pageSlider.slidePage( poexLayout );
            App.headerModel.applyViewHeaderConf( poexLayout.headerConf );
        },
    });

	var pointController = new PointController();
	var PointRouter = Backbone.Marionette.AppRouter.extend({
		controller: pointController,
		appRoutes: {
			"point" : "showPointMainView",
            "point/exchange_coupon/:id" : "showExchangeCoupon",
            "poex01" : "showPoex01View",
            "poex02" : "showPoex02View",
            "poex03/:id" : "showPoex03View",
            "poex04/:id" : "showPoex04View",
            "poex05/:id" : "showPoex05View",
		}
	});

	return PointRouter;

})();
