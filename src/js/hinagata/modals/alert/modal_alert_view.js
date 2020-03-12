var Backbone = require('backbone');
module.exports = (function() {
	var ModalAlertView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_alert.html');
		},
		className: 'modal-alert',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"title": '.title',
			"text": '.text',
			"closeBtn": ".close-circle-btn",
			"dialogue": "#dialogue"
		},
		events: {
			"click @ui.OKBtn": "handleOKClick",
			"click @ui.closeBtn": "handleOKClick",
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			this.ui.dialogue.addClass(options.class || '');
			if(options.title){
				this.ui.title.html(options.title || '');
				this.ui.title.removeClass('hide');
			} else {
				this.ui.title.addClass('hide');
			}
			this.ui.text.html(options.text || '');
			options.okButton && this.ui.OKBtn.text(options.okButton);
		},
		show: function(options) {
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.renderContent(options);
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		handleOKClick: function() {
			this.successCallback && this.successCallback(1);
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			this.$el.remove();
		}
	});

	return ModalAlertView;

})();
