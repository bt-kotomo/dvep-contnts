var Backbone = require('backbone');
module.exports = (function () {
	var CouponModel = Backbone.Model.extend({
		idAttribute: "uCoupId",
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			canBeUsed: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.canBeUsed();
				}
			},
			isBeforeTerm: {
				get: function(){
					return this.isBeforeTerm();
				}
			},
			isMemberOnly: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.isMemberOnly();
				}
			},
		},
		use: function(){
			this.set({"finalUseDate": Number( new Date() ),"limitCode": "9"});
		},
		withinAvailableSpan: function( currentDate ){
			console.log( this.get("finalUseDate") );
			return currentDate - this.get("finalUseDate") <= 30000;
		},
		canBeUsed: function() {
			return this.get( "limitCode" ) + "" === "0";
		},
		isBeforeTerm: function(){
			if (this.get("usePeriodStartDate") === null) return false; // 日付による期間指定ではない場合
			return Number( new Date() ) < this.get("usePeriodStartDate");
		},
		isMemberOnly: function(){
			return this.get("memberOnly") + "" === "1";
		},
		needGEOLocationToUse: function(){
			var useType = this.get("useType");
			return useType + "" === "1" ||  useType + "" === "2";
		},
		canBeUsedWithoutGEOLocation: function(){
			var useType = this.get("useType");
			return useType + "" !== "2";
		},

	});

	return CouponModel;
})();
