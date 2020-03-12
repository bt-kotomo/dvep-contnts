/**
 * 有効期限付きでObjectデータをlocalStorageへ保存する仕組み
 */

var moment = require("moment");
module.exports = (function () {

	var StorageUtil = {
		setStorage: function(key, value, expire){
			try {
				expire = isNaN(expire) ? 0 : expire;
				expire = (new Date).getTime() + expire * 1000;
				var data = {
					expire: expire,
					value: JSON.stringify(value)
				};
				localStorage.setItem(AppConf.core.localStorageKey + '-' + key, JSON.stringify(data));
			} catch(e){
			}
		},
		getStorage: function(key){
			try {
				var data = localStorage[AppConf.core.localStorageKey + '-' + key];
				if (data === undefined) {
					return undefined;
				}
				data = JSON.parse(data);
				if (data.expire > (new Date).getTime()) {
					return JSON.parse(data.value);
				} else {
					localStorage.removeItem(AppConf.core.localStorageKey + '-' + key);
					return undefined;
				}
			} catch(e){
				return undefined;
			}
		},
		remove: function(key){
			try {
				localStorage.removeItem(AppConf.core.localStorageKey + '-' + key);
			} catch(e){
			}
		},
		removeMember: function(){
			try {
				localStorage.removeItem('data-temp');
				localStorage.removeItem('data-temp-' + AppConf.core.localStorageKey);
			} catch(e){
			}
		},
	};
	return StorageUtil;
})();
