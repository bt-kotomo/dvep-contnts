/**
 * 雛形アプリにおけるスタイル操作を共通かしたメソッド群を提供
 * 主に template.css に対応したスタイルを付与するメソッドで構成
 */
module.exports = (function () {

	var StyleUtil = {
		toActive: function( $target ){
			$target.removeClass("btftcolor2").removeClass("btbgcolor2");
			$target.addClass("btftcolor1").addClass("btbgcolor1");
		},
		toInactive: function( $target ){
			$target.removeClass("btftcolor1").removeClass("btbgcolor1");
			$target.addClass("btftcolor2").addClass("btbgcolor2");
		},
	};

	return StyleUtil;

})();
