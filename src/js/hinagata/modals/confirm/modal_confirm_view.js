var Backbone = require('backbone');
module.exports = (function() {
	var ModalConfirmView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_confirm.html');
		},
		className: 'modal-confirm',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"cancelBtn": '.cancel-btn',
			"title": '.title',
			"text": '.text',
		},
		events: function() {
			return (applican.config.device_os === "IOS") ?
				{
					"touchend @ui.cancelBtn": "cancel",
					"touchend @ui.OKBtn": "confirmSuccess",
				} :
				{
					"click @ui.cancelBtn": "cancel",
					"click @ui.OKBtn": "confirmSuccess",
				}
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			this.ui.title.text(options.title);
			this.ui.text.html(options.text);
			options.okButton && this.ui.OKBtn.text(options.okButton);
			options.cancelButton && this.ui.cancelBtn.text(options.cancelButton);
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
		cancel: function() {
			this.successCallback(0);
			this.hide();
		},
		confirmSuccess: function() {
			this.successCallback(1);
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

	return ModalConfirmView;

})();
