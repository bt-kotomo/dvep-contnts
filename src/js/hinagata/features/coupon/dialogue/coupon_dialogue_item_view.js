var Backbone = require('backbone');
module.exports = (function () {
	var CouponDialogueItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_dialogue_item_template.html'),
		events: {
			"click .close_dialogue": "close_dialogue"
		},
		close_dialogue: function(e){
			var _this = $(e.currentTarget);
			var data_id = _this.attr("data-id");
			$('#showdialogue-coupon').removeClass('show');
			$('#' + data_id).removeClass('show');
			switch ( data_id ){
				case "couponErr1_dialogue","couponErr2_dialogue" :
					App.doNothing();
					break;
				case "couponErr3_dialogue":
					location.hash = "coupon";
					App.pageSlider.overWriteLastHistory("");
					break;
			}
		},
		showDialogue: function(element,title, msg) {
			$("#showdialogue-coupon, " + element).addClass("show");
			$("#couponErr3_dialogue .title").html(title);
			$("#couponErr3_dialogue .text").html(msg);
		}
	});

	return CouponDialogueItemView;

})();
