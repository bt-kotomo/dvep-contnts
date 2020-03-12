var Backbone = require('backbone');
var moment = require('moment');
var StampViewModel = require('../../models/stamp_view_model');
var StampCardCollectionView = require('./stamp_card/stamp_card_collection_view.js');
var StampCardCollection = require('./stamp_card/stamp_card_collection.js');
var GetStampIncentiveView = require('./interactions/get_stamp_incentive_view.js');
module.exports = (function () {

    var StampDownLayoutView = Backbone.Marionette.LayoutView.extend({

        template: require('./stamp_down_layout_template.html'),        
        initialize: function(){
         /*   var _this = this;
            this.stampCardCollection = {};
            this.stampViewModel = new StampViewModel();
            App.util.bindProgressScreen( this, this.stampViewModel);
            this.listenTo( this.stampViewModel, 'sync', this._setUpStampCard );
            this.listenTo( this.stampViewModel, 'sync', this._renderStampInfo );
*/

        },
        onRender: function(){
            // this.stampViewModel.fetchWithAuthInfo();
            App.util.hideProgressScreen();
        },
        headerConf: {
            title: "スタンプ",
            showBackButton: true,
        },
        _setUpStampCard: function(){


            // 画面上部のテキスト処理
            var benefitText = ( this.stampViewModel.isExchangeableForCoupon() )? "スペシャルクーポン" : "ポイント";
            this.$('.stampRank1TypeText').text( benefitText );
            this.$('.stampRank1MaxText').text( this.stampViewModel.get("stampRank1Max") );
            this.$('#stamp-note').html( this.stampViewModel.get("note") );

            // スタンプを押すボタンの表示/非表示
            if( this.stampViewModel.isCouponOnly() ){
                this.ui.getStampButton.addClass("hide");
            }

            // スタンプカードの描写
            this.stampCardCollection = StampCardCollection.generate(
                this.stampViewModel.get("useCounts"),
                this.stampViewModel.get("stampRank1ImageUrl"),
                this.stampViewModel.get("stampRank1Max")
            );
            this._renderStampCard();
            this.listenTo( this.stampCardCollection, 'add', this._renderStampCard );
        },
        _renderStampInfo: function(){
            var limited = this.stampViewModel.get("useCondInterval");
            this.$(".use-cond-interval").html( ( limited )? "あり" : "なし");
            // 当日制限あり/かつ最終利用日が当日の場合は事前にスタンプボタンを非表示とする
            if( limited && App.util.date.isToday( new Date( this.stampViewModel.get("finalUseDate")))){
                this.ui.getStampButton.text("取得済み");
                this.ui.getStampButton.addClass("disabledButton");
                this.ui.getStampButton.prop("disabled", "true");
            }
        },
        _renderStampCard: function(){
            this.stampCardRegion.show( new StampCardCollectionView({collection: this.stampCardCollection}));
        },
        _getStamp: function(e){
            var _this = this;
            // 位置情報を取得
            App.util.execWithProgressScreen(function(){
                return App.applican.getCurrentPositionPromiss();
            }).done( function( result ){
                // 成功したらスタンプ取得リクエストを投げる
                var location = {
                    longitude: result.coords.longitude,
                    latitude: result.coords.latitude
                };
                App.util.execWithProgressScreen( function (){
                    return App.btApi.getStamp(location);
                }).done(function(data){
                    _this._showStampInteraction( data );
                    var newCount = data.stamp.useCounts;
                    if( newCount === 0 ){
                        _this.stampViewModel.fetchWithAuthInfo();
                    }else{
                        _this.stampCardCollection.findWhere({ id: newCount - 1 } ).set("image", _this.stampViewModel.get("stampRank1ImageUrl"))
                        _this._renderStampCard();
                        _this.ui.getStampButton.addClass('HIDE');
                    }
                }).fail(function(){
                    applican.notification.alert("最寄りの店舗が見つからないため、スタンプを取得できません。", App.doNothing, "", "OK");
                });
            }).fail(function(err){
                applican.notification.alert("位置情報の取得に失敗しました。", App.doNothing, "", "OK");
            });
        },
        _showStampInteraction: function( incentiveInfo ){
            this.stampInteractionRegion.show( new GetStampIncentiveView( incentiveInfo ) );
        },
    });

    return StampDownLayoutView;
})();
