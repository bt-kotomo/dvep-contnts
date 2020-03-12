var Backbone = require('backbone');

module.exports = (function() {

    var Poex02Layout = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
            customeBackAction: function() {
                location.href = '#poex01';
            }
        },
        template: require('./poex02_template.html'),
        ui: {
            poexItem: '.js-poexItem'
        },
        events: {
            'click @ui.poexItem': 'poexItemlink'
        },
        poexItemlink: function(e) {
            $this = $(e.currentTarget);
            $id = $this.data('id');
            location.href = '#poex03/' + $id;
        },
    });

    return Poex02Layout;
})();
