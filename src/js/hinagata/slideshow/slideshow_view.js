var Backbone = require('backbone');
var $ = require('jquery');
module.exports = (function () {
	var SlideshowItemView = Backbone.Marionette.ItemView.extend({
		template: require('./slideshow_template_view.html'),
		tagName: 'span',
		onLoadImage: function(e) {
			e.target.classList.add('fadeIn');
		},
		onRender: function() { 
			this.$('img').on('load', this.onLoadImage);
		}

	});

	return SlideshowItemView;

})();