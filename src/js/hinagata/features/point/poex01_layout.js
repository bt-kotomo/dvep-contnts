var Backbone = require('backbone');
var PointModel = require('../../models/point_model.js');
var ModalPoex = require('../../modals/point_exchance/modal_poex.js');
var ModalPoex02 = require('../../modals/point_exchance/modal_poex02.js');
var ModalPoex03 = require('../../modals/point_exchance/modal_poex03.js');
var ModalPoex04 = require('../../modals/point_exchance/modal_poex04.js');
module.exports = (function() {
    return PointExchance01 = Backbone.Marionette.LayoutView.extend({
        headerConf: {
            title: "ポイント交換",
            showBackButton: true,
            headerPoex: true,
            customeBackAction: function() {
                location.href = '#config';
            }
        },
        template: require('./poex01_template.html'),
        ui: {
            "poexLogin": ".poex-login",
            "poexConfirm": ".poex-confirm",
            "poexConnectPoint": ".poex-connect-point",
        },
        events: {
            "click @ui.poexLogin": "openModalLogin",
            "click @ui.poexConfirm": "openModalConfirm",
        },
        initialize: function() {
            this.pointModel = new PointModel();
            this.modalPoex = new ModalPoex();
            this.modalPoex02 = new ModalPoex02();
            this.modalPoex03 = new ModalPoex03();
            this.modalPoex04 = new ModalPoex04();

            App.util.bindProgressScreen(this, this.pointModel);
            this.listenTo(this.pointModel, 'sync', this.renderPoint);
            document.addEventListener(native.EventTypes.WEBVIEW_CLOSED, evt => {
                // 閉じるときの URL (_native_open_internal で開いた WebView を _native_close で閉じたときのみ格納)
                console.log('WebView closed. url = ' + evt.url);
                // ログイン完了処理
                native.bclib.didOpenUrlPromise().then(() => {
                    console.log('didOpenUrl()');
                }).catch(error => {
                    console.log(error);
                });
            });
            if (!AppConf.bclib.isFirstInit) {
                this.bclibInit();
                AppConf.bclib.isFirstInit = true;
            } else {
                this.getDvepPoint();
            }
        },
        onRender: function() {
            this.pointModel.fetchWithAuthInfo({
                on401: function() { }
            });
        },
        renderPoint: function() {
            var point = this.pointModel.get('point');
            this.ui.poexConnectPoint.find('.poex-point .js-point').text(App.util.text.numberWithDelimiter(point));
            var options = _.findWhere(AppConf.pointExchange.list, { id: AppConf.bclib.user });
            options.point = point;
        },
        openModalLogin: function(e) {
            var _this = this;
            $this = $(e.currentTarget);
            // $this.parents('.poex-list').addClass('disabled-click');
            var $id = _this.currentId = $this.data('id');
            var options = _.findWhere(AppConf.pointExchange.list, { id: $id });

            if (!$this.hasClass('active')) {
                /* _this.modalPoex.show(options).then(function(res) {
                    if (res == 1) {
                        $this.addClass('active');
                    }
                    $this.parents('.poex-list').removeClass('disabled-click');
                }); */
                _this.bclibLogin();
            } else {
                _this.modalPoex02.show(options).then(function(res) {
                    if (res == 1) {
                        $this.removeClass('active');
                    }
                    $this.parents('.poex-list').removeClass('disabled-click');
                });
            }
        },
        openModalConfirm: function(e) {
            var _this = this;
            $this = $(e.currentTarget);
            $this.parents('.poex-list').addClass('disabled-click');
            native.bclib.getUnusedAddressPromise().then(address => {
                // address = 'address';
                console.log(`getUnusedAddress() successful. address = ${address}`);
                _this.modalPoex03.show({ address: address }).then(function(res) {
                    if (res == 1) {
                        var status = App.util.text.copyTextToClipboard(address);
                        if (status) {
                            _this.modalPoex04.show({ address: address }).then(function(res) {
                                $this.parents('.poex-list').removeClass('disabled-click');
                                _this.getDvepPoint();
                            });
                        } else {
                            var iosText = applican.config.device_os === "IOS" ? '※iOS更新に伴い、' : '';
                            applican.notification.alert(iosText + "PIN番号のコピーに失敗しました。\nPIN番号は、手入力でお願いいたします。", App.doNothing, "", "OK");
                        }
                    } else {
                        $this.parents('.poex-list').removeClass('disabled-click');
                    }
                });
            }).catch(error => {
                console.log(`getUnusedAddress() failure. error = ${JSON.stringify(error)}`);
            });

        },
        onDestroy: function() {
            this.modalPoex.onDestroy();
            this.modalPoex02.onDestroy();
            this.modalPoex03.onDestroy();
            this.modalPoex04.onDestroy();
        },
        bclibInit: function() {
            var _this = this;
            const options = {
                hostname: AppConf.bclib.hostname,
                pubkey: AppConf.bclib.pubkey,
                onOpenUrl: (url) => {
                    console.log('login url: ' + url);
                    // ログイン URL 処理
                    window.location.href = url + "&_native_open_embedded"; // Chrome Custom Tab
                    // window.location.href = url + "&_native_open_internal"; // アプリ内 WebView (ただし、自力で閉じる必要あり)
                },
                onBalanceChanged: () => {
                    console.log('balance changed.');
                    _this.getDvepPoint();
                },
            };
            native.bclib.init(options);
        },
        bclibLogin: function() {
            var _this = this;
            const options = {
                pointName: _this.currentId
            };
            native.bclib.loginPromise(options).then(function(res) {
                console.log(_this.currentId + ' login successful.');
                var options = _.findWhere(AppConf.pointExchange.list, { id: _this.currentId });
                options.active = 1;
                $('#poex-item-' + _this.currentId).addClass('active');
            }).catch(function(err) {
                console.log(_this.currentId + ' login failure.');
            });
        },
        getDvepPoint: function() {
            var _this = this;
            const options = {
                includeUnconfirmed: true,
            };
            native.bclib.getBalancePromise(options).then(function(balance) {
                console.log('getBalance() successful. ' + JSON.stringify(balance));
                balance.forEach((item, index) => {
                    var options = _.findWhere(AppConf.pointExchange.list, { id: item.assetName });
                    options.point = parseInt(item.amountString);
                    options.assetId = item.assetId;
                    $('#poex-item-' + item.assetName + ' .js-point').text(App.util.text.numberWithDelimiter(options.point));
                });
            }).catch(function(error) {
                console.log('getBalance() failure. error = ' + JSON.stringify(error));
            });
        }
    });
})();