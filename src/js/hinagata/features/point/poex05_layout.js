var Backbone = require('backbone');
module.exports = (function() {

    var Poex05Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
        },
        template: require('./poex05_template.html'),
        ui: {
            btnOk: '.js-confirm-exchange',
        },
        events: {
            'click @ui.btnOk': 'processOK'
        },
        templateHelpers: {
            items: [],
        },
        initialize: function(params) {
            this.params = params;
            var ids = this.ids = this.params.id.split(',');
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
            e.preventDefault();
            var _this = this;
            const options = {
                sourcePoint: _this.ids[0],
                sourceAmount: AppConf.bclib.amountExchange,
                destPoint: _this.ids[1],
            };
            console.log('exchange ' + JSON.stringify(options));
            native.bclib.executeTransactionPromise(options).then(() => {
                console.log(`executeTransaction() successful.`);
                window.location.hash = 'poex01';
            }).catch(error => {
                console.log(`executeTransaction() failure. error = ${JSON.stringify(error)}`);
            });
        }
    });

    return Poex05Layout;
})();
