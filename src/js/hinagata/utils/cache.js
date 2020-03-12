/**
 * レスポンスデータを有効期限付きでキャッシュする仕組み
 */

var Backbone = require('backbone');
var moment = require("moment");
module.exports = (function () {

	var CacheUtil = {
		responseCache: function(cls, key, expire){
			// キャッシュ用のロジックを入れてBackbone.syncをオーバーライドする
			var originalSync = cls.sync;
			cls.sync = function(method, model, options) {
				if (method === "read") {
					// 通信成功時のコールバック関数をコピー
					var originalSuccess = options.success;

					var cache = App.util.storage.getStorage(key);
					if (cache !== undefined) {
						// localStorage内の検索を行い、キャッシュデータを使って処理を継続させる
						var CacheModel = Backbone.Model.extend({
							localStorage: new Backbone.LocalStorage(AppConf.core.localStorageKey),
							id: key,
						});
						var cacheModel = new CacheModel();
						options.success = function(collection) {
							originalSuccess(cache);
						};
						return originalSync(method, cacheModel, options);
					} else {
						// キャッシュがなければオリジナルのBackbone.syncでAPI通信を行う
						// さらにレスポンスを保存してから成功時のコールバックを呼び出すよう上書き
						options.success = function(collection) {
							App.util.storage.setStorage(key, collection, expire);
							originalSuccess(collection);
						};
						return originalSync(method, model, options);
					}
				} else {
					// read 以外のsave等はキャッシュしないためオリジナルのBackbone.syncを呼び出す
					return originalSync(method, model, options);
				}
			};
		},
		clearCache: function(key){
			App.util.storage.remove(key);
		},
	};
	return CacheUtil;
})();
