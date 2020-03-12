// アプリケーション設定を記述
// browserifyでビルドした後でも変更可能なように、純粋なjsファイルとして記述
// window直下のグローバルオブジェクトとして AppConf を定義し、その下に設定を記述する。
// 雛形アプリ上では、実行時にwindow.AppConfが定義されているかどうかをチェックすること。
window.AppConf = {};

AppConf.core = {
	contentsVersion: "",                        // アプリ毎のコンテンツバージョンを設定します（リリース時のSVNリビジョン）
	// 本番環境
	applicationId: "bGHDFdmcGqFgJUAR",          // ApplicationId jrwxejxpy4c1yelo
	localStorageKey: "bGHDFdmcGqFgJUAR",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し

	// 本番のテスト環境
	// applicationId: "Tme42C0jlFTjZ10A",          // ApplicationId jrwxejxpy4c1yelo
	// localStorageKey: "Tme42C0jlFTjZ10A",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し

	// ステージング環境
	// applicationId: "BUzMIWRDP11Iv4Jv",          // ApplicationId jrwxejxpy4c1yelo
	// localStorageKey: "BUzMIWRDP11Iv4Jv",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
	// applicationId: "jw2Mim8s4iB9FicA",          // ApplicationId jrwxejxpy4c1yelo
	// localStorageKey: "jw2Mim8s4iB9FicA",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し

	debug: false,                               //
	defaultPerPage: 100,                         // NOTE: under development
	geolocationTimeout: 5000,                   // 位置情報取得のタイムアウト時間を設定
};

// sms、valuecard用
//AppConf.core = {
//	applicationId: "QufVSOh5uCazJWqf",          // ApplicationId jrwxejxpy4c1yelo
//	localStorageKey: "QufVSOh5uCazJWqf",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
//	debug: false,                               //
//	defaultPerPage: 100,                         // NOTE: under development
//	geolocationTimeout: 5000,                   // 位置情報取得のタイムアウト時間を設定
//};

AppConf.url = {
	appRoot: 'https://mdh.fm/btapi',            // APIのルートURL ex::https://mdh.fm/dtapi
	// appRoot: 'https://bt01.betrend.com/btapi',            // APIのルートURL for device(staging)
	// appRoot: 'http://dev.bemss.jp/btapi',            // APIのルートURL for local
	registerUser: 'http://google.co.jp',    // 会員登録URL
	modifyUserInfo: 'https://mdh.fm/e?kA803EXN2r',        // 会員情報変更URL
	term: 'http://google.co.jp',                  // 利用規約URL
	privacyPolicy: 'https://www.yokohamabay-sheraton.co.jp/privacy_policy.php',         // プライバシーポリシーURL
	forgetPassword: 'https://bemss.jp/ybs/mpc_forgot.php',        // パスワードを忘れた方はコチラのURL
	registerForm: 'https://mdh.fm/e?kA803EXN2l&blmid=%36%39%37%36',    // 空メールからの戻りが一つの場合、通常はこちらを使う
	registerFormCard: 'https://mdh.fm/e?kXXXXXXXX&smstid=xxx',    // sms認証の場合のみで使用、カード番号あり用のフォーム
	registerForms: {    // 空メールからの戻りが複数の場合(ftypeでの出しわけ時)でのみ使用
		'kA803EXN2l': "https://mdh.fm/e?kA803EXN2l&blmid=%36%39%37%36",
		'kA803EXN2h': "https://mdh.fm/e?kA803EXN2h",
	},
	website: 'https://www.yokohamabay-sheraton.co.jp/?utm_source=GP&utm_medium=GPtop&utm_campaign=GP_top',
	order: 'https://www.tablecheck.com/ja/shops/baysheratoncompass/reserve?utm_source=GP&utm_medium=GPtop&utm_campaign=GP_tablecheck',
	frequency: 'http://bemss.jp/dragonpointcard/cont104.php',
	cardMember: 'http://bemss.jp/ybs/cont101.php',
	appMember: 'http://bemss.jp/ybs/cont102.php',
	onlineshop: 'http://www.yokohamabay-sheraton-shop.com/?utm_source=GP&utm_medium=GPtop&utm_campaign=GP_onlineshop',
	membershipTerms: 'https://www.yokohamabay-sheraton.co.jp/img/other/gourmetpassport/kiyaku.pdf',
	twitter: 'https://twitter.com/yokohamsheraton',
	facebook: 'https://www.facebook.com/YokohamaBaySheraton',
	instagram: 'https://www.instagram.com/sheratonyokohama/',
	line: 'https://line.me/R/ti/p/%40goj6167r',
	wdcURL: 'https://mdh.fm/e?kA803EXS74',
};

// sms、valuecard用
//AppConf.url = {
//	appRoot: 'http://bt01.betrend.com/btapi',            // APIのルートURL for device(staging)
////	appRoot: 'https://mdh.fm/btapi',            // APIのルートURL ex::https://mdh.fm/dtapi
//	registerUser: 'http://google.co.jp',    // 会員登録URL
//	modifyUserInfo: 'https://bt01.betrend.com/e?kN102UDXbnj',        // 会員情報変更URL
//	term: 'http://google.co.jp',                  // 利用規約URL
//	privacyPolicy: 'http://google.co.jp',         // プライバシーポリシーURL
//	forgetPassword: 'http://google.co.jp',        // パスワードを忘れた方はコチラのURL
//	registerForm: 'https://bt01.betrend.com/e?kN102UDXbox&smstid=2993',    // 空メールからの戻りが一つの場合、通常はこちらを使う
//	registerFormCard: 'https://bt01.betrend.com/e?kN102UDXbni&smstid=2993',    // sms認証の場合のみで使用、カード番号あり用のフォーム
//	registerForms : {    // 空メールからの戻りが複数の場合(ftypeでの出しわけ時)でのみ使用
//		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
//		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
//	},
//};

AppConf.text = {
	shopName: "Porto",
};

/**
 * レイアウト関連の設定
 */
AppConf.layout = {
	navColumns: 3, // トップページのレイアウト 2カラムか3カラムか
	stamp: {
		initialStampCount: 10 // スタンプのカウント
	},
};

/**
 * 各種機能のON/OFF
 * NOTE: 現状はUIには反映されない（機能の読み込みのみ抑制:ボタン押しても動かない）
 * sms:sms認証
 * smart:valuecard
 */
AppConf.features = {
	config: true,
	coupon: true,
	stamp: true,
	shop: true,
	point: true,
	information: true,
	history: true,
	chirashi: true,
	scratch: false,
	autologin: true,
	slideshow: true,
	sms: false,
	smart: false,
	autoregist: false,
	member: true,
	menuRegis: true,
	sns: true
};

/**
 * livepass用
 */
AppConf.livePass = {
	"iOS": {
		apiKey: "6t0y3u66x84b11p3rfjar0c6c6zlonyv74j58jyfvysxe78l",
		apiSecret: "v05uxbg23xrnyoztw3i6woijqt45z50l",
		locationEnabled: true,
		notificationEnabled: true,
		senderId: "",
	},
	"Android": {
		apiKey: "ovjik16lg40iwiejusoaq30hg5pgrv5povey8zrw7fzqdvf9",
		apiSecret: "s1fpzaf747mjbxdqevq7w2uox4xo8q6v",
		locationEnabled: true,
		notificationEnabled: true,
		senderId: "921722704979",
	},
}

/**
 * valuecardの履歴に表示する取引種別コード
 */
AppConf.valuecard = {
	reqClassValues: {
		"4002": "入金",
		"4003": "利用",
		"4005": "入金取消",
		"4006": "利用取消",
		"4012": "クーポン入金",
		"4015": "クーポン取消",
		"4022": "ポイント加算",
		"4023": "ポイント利用",
		"4025": "ポイント加算取消",
		"4026": "ポイント利用取消",
		"4801": "入金(web)",
		"4802": "クーポン入金(web)",
		"4803": "利用(web)",
		"4805": "入金取消(web)",
		"4806": "利用取消(web)",
		"4809": "ボーナス入金(web)",
		"4899": "アクティベート",
		"9806": "合算(合算元)",
		"9807": "合算(合算先)",
	},
};

/**
 * DEMO用の設定
 */
AppConf.demo = {
	// チラシ機能の設定
	chirashi: {
		viewer: "http://bt11.betrend.com/chirashi/index.php",

		chirashi1: {
			imageUrl: "http://bt21.betrend.com/test/chirashi/mrk09/flyer_1.jpg",
			thumbnailUrl: "http://bt21.betrend.com/test/chirashi/mrk09/thumb_1.jpg",
			title: "チラシサンプル 7/14〜7/17 1",
		},
		chirashi2: {
			imageUrl: "http://bt21.betrend.com/test/chirashi/mrk09/flyer_2.jpg",
			thumbnailUrl: "http://bt21.betrend.com/test/chirashi/mrk09/thumb_2.jpg",
			title: "チラシサンプル 7/14〜7/17 2",
		},
	},
};

/**
クーポン一覧の設定
**/
AppConf.couponList = {
	// 利用不可クーポンも含め全て表示する
	showAll: true,
};

AppConf.slideshow = {
	autoplaySpeed: 2000,
	speed: 2000,
	slideshowContentsList: [
		{
			linkUrl: "",
			webviewFlag: "0",
			imageUrl: ""
		}
	]
};

AppConf.member = {
	showData: true
};

/**
 * 表示メッセージ設定
 **/
AppConf.message = {
	information: "お知らせ",
	contentsVersionUp: "コンテンツが更新されています。\n再度アプリを起動しコンテンツを更新してください。\n＊はいを押すとアプリを終了します。",
	registrationIdUpdateFailure: "通信に失敗しました。\n通信状況をご確認ください。",
	yes: "はい",
	errorurl: "https://advs.jp/cp/app/common/maintenance.html",
	timeoutFailure: "通信に失敗しました。\n通信状況をご確認ください。",
};

/**
 * レスポンスデータをキャッシュする期限設定
 **/
AppConf.expire = {
	user: {
		detail: 60,
		point: 60,
		value: {
			detail: 60,
		},
	},
	notification: {
		insert: 300,
	},
	information: {
		detail: 300,
		pop: 300,
		read: 300,
	},
};

AppConf.timeout = {
	page: 15000, // set timeout for all page
	member: 5000, // set timeout for member page
};

AppConf.bclib = {
	hostname: "pns.dvep.jp:7868",
	pubkey: "0295cc8ea77b641a855f602b229c8e2392955bd82849df7230d22ff929dbbf9b94",
	saison: 'saisonpoint',
	au: 'aupoint',
	resona:'resonapoint',
	user: 'userpoint',
	amountExchange: 0
}

//point exchance
AppConf.pointExchange = {
	list: [
		{
			id: AppConf.bclib.saison,
			title: '永久不滅ポイント',
			logo: './image/poex/01.png',
			addition: 'poex-login', //popup login
			group: 1,
			point: 0,
			active: 0,
			assetId: ''
		},
		{
			id: AppConf.bclib.au,
			title: 'au WALLETポイント',
			logo: './image/poex/02.png',
			addition: 'poex-login', //popup login
			group: 2,
			point: 0,
			active: 0,
			assetId: ''
		},
		{
			id: AppConf.bclib.resona,
			title: 'りそなクラブポイント',
			logo: './image/poex/03.png',
			addition: 'poex-confirm', //popup confirm
			group: 1,
			point: 0,
			active: 1,
			assetId: ''
		},
		{
			id: AppConf.bclib.user,
			title: 'グルメパスポートポイント',
			logo: './image/poex/04.png',
			addition: 'poex-connect-point',
			group: 2,
			point: 0,
			active: 1,
			assetId: ''
		}
	],
	ratio: [
		{
			id: AppConf.bclib.saison + "," + AppConf.bclib.au,
			value: [1, 5]
		},
		{
			id: AppConf.bclib.saison + "," + AppConf.bclib.user,
			value: [1, 5]
		},
		{
			id: AppConf.bclib.resona + "," + AppConf.bclib.au,
			value: [1, 1]
		},
		{
			id: AppConf.bclib.resona + "," + AppConf.bclib.user,
			value: [1, 1]
		}
	]
}
