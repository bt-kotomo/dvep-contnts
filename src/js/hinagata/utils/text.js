var moment = require('moment');

module.exports = (function () {

	var TextUtil = {
		nl2br: function(str){
			if(!str) return "";
			return str.replace(/[\n\r]/g, "<br />");
		}, 
		numberWithDelimiter: function( number ){
			return String(number).toString().replace(/(\d)(?=(\d\d\d)+$)/g , '$1,');
		},
		cardnumWithDelimiter: function( cardnum ){
			if (!_.isString(cardnum)) {
				return '登録されていません';
			}

			return String(cardnum).toString().replace(/(\d)(?=(\d\d\d\d)+$)/g , '$1 ');
		},
		formatDate: function(dateTime){
			return moment(dateTime).format('YYYY年MM月DD日まで');
		},
		formatExpireDate: function(number, dateTime){
			if (number == 0 || !_.isNumber(dateTime)) {
				return '';
			}
			return '(' + this.formatDate(dateTime) + ')';
		},
		formatExpireDate1: function(number, dateTime){
			if (number == 0 || !_.isNumber(dateTime)) {
				return '';
			}
			return '(' + this.formatDate(dateTime) + 'まで有効)';
		},
		addUrlParameters: function(url, params){
			if (params instanceof Array) {
				url += (url.indexOf('?') == -1) ? '?':'&';
				url += params.join('&');
			}
			return url;
		},
		copyTextToClipboard: function(text, callback) {
			var id = "mycustom-clipboard-textarea-hidden-id";
			var existsTextarea = document.getElementById(id);

			if (!existsTextarea) {
				var textarea = document.createElement("textarea");
				textarea.id = id;
				textarea.style.position = 'fixed';
				textarea.style.top = 0;
				textarea.style.left = 0;

				// Ensure it has a small width and height. Setting to 1px / 1em
				// doesn't work as this gives a negative w/h on some browsers.
				textarea.style.width = '1px';
				textarea.style.height = '1px';

				// We don't need padding, reducing the size if it does flash render.
				// textarea.style.padding = 0;

				// // Clean up any borders.
				textarea.style.border = 'none';
				textarea.style.outline = 'none';
				textarea.style.boxShadow = 'none';
				document.querySelector("body").appendChild(textarea);
				existsTextarea = document.getElementById(id);
				existsTextarea.value = text;
				if (applican.config.device_os === "IOS") {
					var editable = textarea.contentEditable;
					var readOnly = textarea.readOnly;

					textarea.contentEditable = true;
					textarea.readOnly = false;

					var range = document.createRange();
					range.selectNodeContents(textarea);

					var selection = window.getSelection();
					selection.removeAllRanges();
					selection.addRange(range);

					textarea.setSelectionRange(0, 999999);
					textarea.contentEditable = editable;
					textarea.readOnly = readOnly;
				} else {
					existsTextarea.select();
				}

				// Avoid flash of white box if rendered for any reason.
				textarea.style.background = 'transparent';

			}


			var status = document.execCommand('copy');
			if (!status) {
				callback && callback("Cannot copy text");
			} else {
				callback && callback("The text is now on the clipboard");
			}
			existsTextarea.parentElement.removeChild(existsTextarea);
			return status;
		},
	};
	return TextUtil;

})();
