var defaultErrMsg = 'エラーが発生しました。<br>ページを再読み込みして下さい。';
var scratchErrMsg = {
		'0001': defaultErrMsg, // 不正なスクラッチID
		'0002': 'スクラッチ実施期間前です', // 有効期間前
		'0003': 'スクラッチ実施期間は終了しました。', // 有効期限切れ
		'0004': '既に利用されています。', // 全ユーザでのトータル回数上限オーバー
		'0005': '既に利用されています。', // 1ユーザでのトータル回数制限オーバー
		'0006': '本日は既に利用されています。', // 1日あたりの全ユーザの回数制限オーバー
		'0007': '本日は既に利用されています。', // 1日あたりの1ユーザの回数制限オーバー
		'0008': '現在実行できない時間帯です。', // 時間帯制限前
		'0009': '現在実行できない時間帯です。', // 時間帯制限後
		'0010': 'エラーが発生しました。<br>しばらく経って再度実行して下さい。', // 連続利用制限エラー
		'0011': '実行できません。', // 利用可能店舗エラー
		'0012': defaultErrMsg, // 当選最大数エラー（当選数の最大値に達している為にはずれ）
		"0013": "スクラッチ実施期間外です。", // 有効期間外
};				
var scratchConf = {
		/**
		 * type
		 * 0: scratchId
		 * 1: custId
		 * 2: shopId
		 */
		type: 1,
		scratchId: "",
		drawApi: "/scratch/draw",
		compApi: "/scratch/complete",
		retryFlg: false,
		bg : 'images/img1.png', // default image
		fg : 'images/img0.png', // scratch image

		// 本番環境 appID for honban
		apiHost: "https://mdh.fm/btapi",
		applicationId: "bGHDFdmcGqFgJUAR",
		custId: "A803EX",

		// 試験環境 appID for test
		// apiHost: "http://bt01.betrend.com/btapi",
		// applicationId: "jw2Mim8s4iB9FicA",
		// custId: "Z103BA",
		// custId: "A803E1", //stg
};