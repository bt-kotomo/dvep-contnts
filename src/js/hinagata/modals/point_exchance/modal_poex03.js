var Backbone = require('backbone');
var $ = require('jquery');

module.exports = (function () {

    return ModalPoex03 = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_poex03.html');
        },
        id: 'modal03',
        className: 'modal-v1 hide fadeIn',
        ui: {
            "btnOK": ".btn-ok",
            "btnCancel": '.btn-cancel',
            'resonaAddress': '.js-resona-address'
        },
        templateHelpers: {

        },
        events: function () {
            return (applican.config.device_os === "IOS") ?
                {
                    "touchend @ui.btnCancel": "cancel",
                    "touchend @ui.btnOK": "confirmSuccess",
                } :
                {
                    "click @ui.btnCancel": "cancel",
                    "click @ui.btnOK": "confirmSuccess",
                }
        },
        initialize: function () {
            $('body').append(this.render().el);
        },
        show: function (options) {
            $('#' + this.id).removeClass('hide');
            var _this = this;
            this.ui.resonaAddress.text(options.address);
            var then = function (successCallback) {
                _this.successCallback = successCallback;
            }
            return {
                then: then
            };
        },
        hide: function () {
            $('#' + this.id).addClass('hide');
            // reset all setting
            this.reset();
        },
        cancel: function () {
            this.successCallback(0);
            this.hide();
        },
        confirmSuccess: function () {
            this.successCallback(1);
            this.hide();
        },
        reset: function () {
            this.successCallback = null;
        },
        onDestroy: function () {
            // remove hitap DOM
            this.$el.remove();
        }
    });

})();
