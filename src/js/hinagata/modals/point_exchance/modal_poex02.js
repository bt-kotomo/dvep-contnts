var Backbone = require('backbone');
var $ = require('jquery');

module.exports = (function () {

    return ModalPoex02 = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_poex02.html');
        },
        id: 'modal02',
        className: 'modal-v1 hide fadeIn',
        ui: {
            'title': '.js-title',
            'logo': '.js-logo',
            'btnOK': '.js-btnOK',
            'btnCancel': '.js-btnCancel',
            'assetId': '.js-asset-id'
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
        updateOptions: function(options){
            var _default = {
                title: '',
                logo: '',
                assetId: 'XXXXXXXXXXXXX'
            };
            var _options = _.extend(_default, options);

            this.ui.title.text(_options.title);
            this.ui.logo.attr('src', _options.logo);
            this.ui.assetId.text(_options.assetId);
        },
        show: function (options) {

            this.updateOptions(options);

            $('#' + this.id).removeClass('hide');
            // hide all other modals
            var _this = this;
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
