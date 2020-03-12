var Backbone = require('backbone');

module.exports = (function() {

    var Poex02Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
        },
        template: require('./poex03_template.html'),
        templateHelpers: {
            itemSelected: {}
        },
        ui: {
            poexItem: '.js-poexItem'
        },
        events: {
            'click @ui.poexItem': 'poexItemlink'
        },
        initialize: function(params) {
            this.params = params;
            var item = _.findWhere(AppConf.pointExchange.list, { id: this.params.id });
            this.templateHelpers.itemSelected = item;
        },
        poexItemlink: function(e) {
            $this = $(e.currentTarget);
            $id = $this.data('id');
            location.href = '#poex04/' + this.params.id + ',' + $id;
        },
    });

    return Poex02Layout;
})();
