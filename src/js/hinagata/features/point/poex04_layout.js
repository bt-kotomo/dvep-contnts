var Backbone = require('backbone');

module.exports = (function() {

    var Poex04Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
        },
        template: require('./poex04_template.html'),
        templateHelpers: {
            items: [],
        },
        ui: {
            btnOk: '.btn-ok',
            amountEchange: '#amount-exchange'
        },
        events: {
            'click @ui.btnOk': 'processOK'
        },
        initialize: function(params) {
            this.params = params;
            var ids = this.params.id.split(',');
            var items = [];
            var ratio = _.findWhere(AppConf.pointExchange.ratio, { id: this.params.id.replace(' ', '') });

            _.each(ids, function(value, index) {
                var item = _.findWhere(AppConf.pointExchange.list, { id: value });
                item.value = ratio.value[index];
                items.push(item);
            });
            this.templateHelpers.items = items;
        },
        processOK: function(e) {
            if(this.ui.amountEchange.val()){
                AppConf.bclib.amountExchange = this.ui.amountEchange.val();
                location.href = '#poex05/' + this.params.id;
            }
        }

    });

    return Poex04Layout;
})();
