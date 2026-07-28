var useState = React.useState;

var EBAY = “#0064d2”, TX = “#333”, MT = “#888”, CARD = “#f9f9f9”;

var BRANDS = [
{ jp: “モンブラン”, en: “MONTBLANC” }, { jp: “MONTBLANC”, en: “MONTBLANC” },
{ jp: “ペリカン”, en: “Pelikan” }, { jp: “Pelikan”, en: “Pelikan” },
{ jp: “パーカー”, en: “PARKER” }, { jp: “PARKER”, en: “PARKER” },
{ jp: “ティファニー”, en: “TIFFANY & Co.” }, { jp: “TIFFANY”, en: “TIFFANY & Co.” },
{ jp: “クロス”, en: “CROSS” }, { jp: “CROSS”, en: “CROSS” },
{ jp: “ラミー”, en: “LAMY” }, { jp: “LAMY”, en: “LAMY” },
{ jp: “パイロット”, en: “PILOT” }, { jp: “PILOT”, en: “PILOT” },
{ jp: “セーラー”, en: “SAILOR” }, { jp: “SAILOR”, en: “SAILOR” },
{ jp: “ウォーターマン”, en: “Waterman” }, { jp: “Waterman”, en: “Waterman” },
{ jp: “ビスコンティ”, en: “Visconti” }, { jp: “アウロラ”, en: “AURORA” },
{ jp: “ダンヒル”, en: “DUNHILL” }, { jp: “カランダッシュ”, en: “Caran d’Ache” },
{ jp: “プラチナ”, en: “PLATINUM” }
];

// モデル名の英訳辞書
var MODELS = [
{ jp: “ノブレス・オブリージュ”, en: “Noblesse Oblige” },
{ jp: “ノブレスオブリージュ”, en: “Noblesse Oblige” },
{ jp: “オブリージュ”, en: “Oblige” },
{ jp: “ノブレス”, en: “Noblesse” },
{ jp: “マイスターシュテュック”, en: “Meisterstuck” },
{ jp: “マイスターシュティック”, en: “Meisterstuck” },
{ jp: “マイスターシュック”, en: “Meisterstuck” },
{ jp: “ジェネレーション”, en: “Generation” },
{ jp: “スターウォーカー”, en: “StarWalker” },
{ jp: “ボエム”, en: “Boheme” },
{ jp: “カレラ”, en: “Carrera” },
{ jp: “モナコ”, en: “Monaco” },
{ jp: “スーベレーン”, en: “Souveran” },
{ jp: “ペリカーノ”, en: “Pelikano” },
{ jp: “セレブリティ”, en: “Celebry” },
{ jp: “ソネット”, en: “Sonnet” },
{ jp: “デュオフォールド”, en: “Duofold” },
{ jp: “ヴェクター”, en: “Vector” },
{ jp: “フロンティア”, en: “Frontier” },
{ jp: “インシグニア”, en: “Insignia” },
{ jp: “センチュリー”, en: “Century” },
{ jp: “タウンゼント”, en: “Townsend” },
{ jp: “アポジー”, en: “Apogee” },
{ jp: “エグゼクティブ”, en: “Executive” },
{ jp: “クラシック”, en: “Classic” },
{ jp: “サファリ”, en: “Safari” },
{ jp: “アルスター”, en: “AL-star” },
{ jp: “スクリブル”, en: “Scribble” },
{ jp: “ステュディオ”, en: “Studio” },
{ jp: “スタジオ”, en: “Studio” },
{ jp: “キャップレス”, en: “Capless” },
{ jp: “カスタム”, en: “Custom” },
{ jp: “エラボー”, en: “Elabo” },
{ jp: “プロフィット”, en: “Profit” },
{ jp: “レアリス”, en: “Realis” },
{ jp: “エキスパート”, en: “Expert” },
{ jp: “ヘミスフィア”, en: “Hemisphere” },
{ jp: “カレン”, en: “Carene” },
{ jp: “アトランティス”, en: “Atlantis” },
{ jp: “オプティマ”, en: “Optima” },
{ jp: “イプシロン”, en: “Ipsilon” },
{ jp: “ミケランジェロ”, en: “Michelangelo” },
{ jp: “エリート”, en: “Elite” },
{ jp: “エターナル”, en: “Eternal” },
{ jp: “ソリテール”, en: “Solitaire” },
{ jp: “ドゥエ”, en: “Doue” },
{ jp: “ディプロマット”, en: “Diplomat” },
{ jp: “レオナルド”, en: “Leonardo” },
{ jp: “ピアニッシモ”, en: “Pianissimo” },
{ jp: “スリムライン”, en: “Slimline” },
{ jp: “クレオパトラ”, en: “Cleopatra” },
{ jp: “エレガンス”, en: “Elegance” },
{ jp: “プレジデント”, en: “President” },
{ jp: “アンバサダー”, en: “Ambassador” },
{ jp: “クロノグラフ”, en: “Chronograph” },
{ jp: “アトラス”, en: “Atlas” },
{ jp: “エルサ”, en: “Elsa Peretti” },
{ jp: “Tクリップ”, en: “T-Clip” },
// 装飾・仕上げ・パターン
{ jp: “ダイヤモンドテクスチャー”, en: “Diamond Texture” },
{ jp: “ダイヤモンドカット”, en: “Diamond Cut” },
{ jp: “ダイヤカット”, en: “Diamond Cut” },
{ jp: “テクスチャー”, en: “Texture” },
{ jp: “ギョーシェ”, en: “Guilloche” },
{ jp: “バーレイ”, en: “Barley” },
{ jp: “ピンストライプ”, en: “Pinstripe” },
{ jp: “ストライプ”, en: “Striped” },
{ jp: “ヘアライン仕上げ”, en: “Hairline Finish” },
{ jp: “ヘアライン”, en: “Hairline” },
{ jp: “メッシュ”, en: “Mesh” },
{ jp: “チェック”, en: “Check” },
{ jp: “ヘリンボーン”, en: “Herringbone” },
{ jp: “エンボス”, en: “Embossed” },
{ jp: “彫金”, en: “Engraved” },
{ jp: “彫刻”, en: “Engraved” },
{ jp: “無地”, en: “Plain” },
{ jp: “ツイスト”, en: “Twist” },
{ jp: “スパイラル”, en: “Spiral” },
{ jp: “リブ”, en: “Ribbed” },
{ jp: “マット”, en: “Matte” },
{ jp: “光沢”, en: “Polished” },
{ jp: “ヴィンテージ”, en: “Vintage” },
{ jp: “ビンテージ”, en: “Vintage” },
{ jp: “スターリング”, en: “Sterling” },
{ jp: “パース”, en: “Purse” },
{ jp: “ポケット”, en: “Pocket” },
{ jp: “スリム”, en: “Slim” },
{ jp: “ミニ”, en: “Mini” },
{ jp: “コンパクト”, en: “Compact” },
{ jp: “レディース”, en: “Ladies” },
{ jp: “メンズ”, en: “Mens” },
{ jp: “初期型”, en: “Early Model” },
{ jp: “後期型”, en: “Late Model” },
{ jp: “限定”, en: “Limited Edition” },
{ jp: “記念”, en: “Commemorative” },
// 色
{ jp: “ティファニーブルー”, en: “Tiffany Blue” },
{ jp: “シャンパンゴールド”, en: “Champagne Gold” },
{ jp: “ローズゴールド”, en: “Rose Gold” },
{ jp: “パールホワイト”, en: “Pearl White” },
{ jp: “スカイブルー”, en: “Sky Blue” },
{ jp: “シルバー”, en: “Silver” },
{ jp: “ゴールド”, en: “Gold” },
{ jp: “ブラック”, en: “Black” },
{ jp: “ホワイト”, en: “White” },
{ jp: “ブルー”, en: “Blue” },
{ jp: “レッド”, en: “Red” },
{ jp: “グリーン”, en: “Green” },
{ jp: “ネイビー”, en: “Navy” },
{ jp: “ボルドー”, en: “Bordeaux” },
{ jp: “バーガンディ”, en: “Burgundy” },
{ jp: “ブラウン”, en: “Brown” },
{ jp: “グレー”, en: “Grey” },
{ jp: “ターコイズ”, en: “Turquoise” },
{ jp: “アクア”, en: “Aqua” },
{ jp: “ミント”, en: “Mint” },
{ jp: “エメラルド”, en: “Emerald” },
{ jp: “ローズ”, en: “Rose” },
{ jp: “ピンク”, en: “Pink” },
{ jp: “パープル”, en: “Purple” },
{ jp: “バイオレット”, en: “Violet” },
{ jp: “オレンジ”, en: “Orange” },
{ jp: “イエロー”, en: “Yellow” },
{ jp: “ベージュ”, en: “Beige” },
{ jp: “アイボリー”, en: “Ivory” },
{ jp: “シャンパン”, en: “Champagne” },
{ jp: “ブロンズ”, en: “Bronze” },
{ jp: “ガンメタル”, en: “Gunmetal” },
{ jp: “ツートン”, en: “Two-Tone” },
{ jp: “バイカラー”, en: “Two-Tone” },
{ jp: “グラデーション”, en: “Gradation” },
{ jp: “メタリック”, en: “Metallic” },
{ jp: “サテン”, en: “Satin” },
{ jp: “鏡面仕上げ”, en: “Mirror Finish” },
{ jp: “つや消し”, en: “Matte Finish” },
{ jp: “仕上げ”, en: “Finish” },
{ jp: “ライン”, en: “Line” },
// 一般的な外来語（分解用）
{ jp: “ダイヤモンド”, en: “Diamond” },
{ jp: “ダイヤ”, en: “Diamond” },
{ jp: “パターン”, en: “Pattern” },
{ jp: “デザイン”, en: “Design” },
{ jp: “フィニッシュ”, en: “Finish” },
{ jp: “コーティング”, en: “Coating” },
{ jp: “シルバープレート”, en: “Silver Plated” },
{ jp: “ゴールドプレート”, en: “Gold Plated” },
{ jp: “プレート”, en: “Plated” },
{ jp: “金メッキ”, en: “Gold Plated” },
{ jp: “銀メッキ”, en: “Silver Plated” },
{ jp: “メッキ”, en: “Plated” },
{ jp: “金張り”, en: “Gold Filled” },
{ jp: “銀張り”, en: “Silver Filled” },
{ jp: “張り”, en: “Filled” },
{ jp: “ボディ”, en: “Body” },
{ jp: “キャップ”, en: “Cap” },
{ jp: “クリップ”, en: “Clip” },
{ jp: “リング”, en: “Ring” },
{ jp: “バンド”, en: “Band” },
{ jp: “ノック”, en: “Click” },
{ jp: “レフィル”, en: “Refill” },
{ jp: “カートリッジ”, en: “Cartridge” },
{ jp: “コンバーター”, en: “Converter” },
{ jp: “ニブ”, en: “Nib” },
{ jp: “ペン先”, en: “Nib” },
{ jp: “ケース”, en: “Case” },
{ jp: “ボックス”, en: “Box” },
{ jp: “ポーチ”, en: “Pouch” },
{ jp: “セット”, en: “Set” },
{ jp: “ペア”, en: “Pair” },
{ jp: “モデル”, en: “Model” },
{ jp: “タイプ”, en: “Type” },
{ jp: “シリーズ”, en: “Series” },
{ jp: “エディション”, en: “Edition” },
{ jp: “コレクション”, en: “Collection” },
{ jp: “リミテッド”, en: “Limited” },
{ jp: “レア”, en: “Rare” },
{ jp: “プレミアム”, en: “Premium” },
{ jp: “ラグジュアリー”, en: “Luxury” },
{ jp: “モダン”, en: “Modern” },
{ jp: “レトロ”, en: “Retro” },
{ jp: “アンティーク”, en: “Antique” },
{ jp: “オリジナル”, en: “Original” },
{ jp: “スペシャル”, en: “Special” },
{ jp: “スタンダード”, en: “Standard” },
{ jp: “レギュラー”, en: “Regular” },
{ jp: “ラージ”, en: “Large” },
{ jp: “スモール”, en: “Small” },
{ jp: “ミディアム”, en: “Medium” },
{ jp: “ロング”, en: “Long” },
{ jp: “ショート”, en: “Short” },
{ jp: “スクエア”, en: “Square” },
{ jp: “ラウンド”, en: “Round” },
{ jp: “フラット”, en: “Flat” },
{ jp: “テーパー”, en: “Taper” },
{ jp: “ストレート”, en: “Straight” },
{ jp: “カーブ”, en: “Curve” },
{ jp: “エッジ”, en: “Edge” },
{ jp: “サーフェス”, en: “Surface” },
{ jp: “グリップ”, en: “Grip” },
{ jp: “バレル”, en: “Barrel” },
{ jp: “コーン”, en: “Cone” },
{ jp: “トップ”, en: “Top” },
{ jp: “エンブレム”, en: “Emblem” },
{ jp: “ロゴ”, en: “Logo” },
{ jp: “マーク”, en: “Mark” },
{ jp: “シリアル”, en: “Serial” },
{ jp: “ナンバー”, en: “Number” },
{ jp: “スター”, en: “Star” },
{ jp: “クラウン”, en: “Crown” },
{ jp: “ハート”, en: “Heart” },
{ jp: “フラワー”, en: “Flower” },
{ jp: “リーフ”, en: “Leaf” },
{ jp: “ウェーブ”, en: “Wave” },
{ jp: “ドット”, en: “Dot” },
{ jp: “グリッド”, en: “Grid” },
{ jp: “バー”, en: “Bar” },
{ jp: “ブロック”, en: “Block” },
{ jp: “プラチナ”, en: “Platinum” },
{ jp: “パラジウム”, en: “Palladium” },
{ jp: “チタン”, en: “Titanium” },
{ jp: “ブラス”, en: “Brass” },
{ jp: “クローム”, en: “Chrome” },
{ jp: “ロジウム”, en: “Rhodium” },
{ jp: “エナメル”, en: “Enamel” },
{ jp: “ラッカー”, en: “Lacquer” },
{ jp: “レジン”, en: “Resin” },
{ jp: “プラスチック”, en: “Plastic” },
{ jp: “レザー”, en: “Leather” },
{ jp: “ウッド”, en: “Wood” },
{ jp: “マーブル”, en: “Marble” },
{ jp: “パール”, en: “Pearl” },
{ jp: “クリスタル”, en: “Crystal” },
{ jp: “ストーン”, en: “Stone” },
{ jp: “ジュエリー”, en: “Jewelry” },
{ jp: “アクセサリー”, en: “Accessory” },
{ jp: “ビジネス”, en: “Business” },
{ jp: “オフィス”, en: “Office” },
{ jp: “ギフト”, en: “Gift” },
{ jp: “プレゼント”, en: “Present” },
{ jp: “アニバーサリー”, en: “Anniversary” },
{ jp: “クリスマス”, en: “Christmas” },
{ jp: “ブランド”, en: “Brand” },
{ jp: “メーカー”, en: “Maker” },
{ jp: “ジャパン”, en: “Japan” },
{ jp: “ドイツ”, en: “Germany” },
{ jp: “フランス”, en: “France” },
{ jp: “イタリア”, en: “Italy” },
{ jp: “アメリカ”, en: “USA” },
{ jp: “スイス”, en: “Switzerland” },
{ jp: “イギリス”, en: “UK” }
];

// カタカナ から ローマ字（辞書にない語のフォールバック）
var KANA_MAP = {
“キャ”: “kya”, “キュ”: “kyu”, “キョ”: “kyo”, “シャ”: “sha”, “シュ”: “shu”, “ショ”: “sho”,
“チャ”: “cha”, “チュ”: “chu”, “チョ”: “cho”, “ニャ”: “nya”, “ニュ”: “nyu”, “ニョ”: “nyo”,
“ヒャ”: “hya”, “ヒュ”: “hyu”, “ヒョ”: “hyo”, “ミャ”: “mya”, “ミュ”: “myu”, “ミョ”: “myo”,
“リャ”: “rya”, “リュ”: “ryu”, “リョ”: “ryo”, “ギャ”: “gya”, “ギュ”: “gyu”, “ギョ”: “gyo”,
“ジャ”: “ja”, “ジュ”: “ju”, “ジョ”: “jo”, “ビャ”: “bya”, “ビュ”: “byu”, “ビョ”: “byo”,
“ピャ”: “pya”, “ピュ”: “pyu”, “ピョ”: “pyo”,
“ファ”: “fa”, “フィ”: “fi”, “フェ”: “fe”, “フォ”: “fo”, “フュ”: “fyu”,
“ヴァ”: “va”, “ヴィ”: “vi”, “ヴェ”: “ve”, “ヴォ”: “vo”, “ヴ”: “v”,
“ティ”: “ti”, “ディ”: “di”, “デュ”: “du”, “トゥ”: “tu”, “ドゥ”: “du”,
“ウィ”: “wi”, “ウェ”: “we”, “ウォ”: “wo”, “シェ”: “she”, “ジェ”: “je”, “チェ”: “che”,
“ア”: “a”, “イ”: “i”, “ウ”: “u”, “エ”: “e”, “オ”: “o”,
“カ”: “ka”, “キ”: “ki”, “ク”: “ku”, “ケ”: “ke”, “コ”: “ko”,
“サ”: “sa”, “シ”: “shi”, “ス”: “su”, “セ”: “se”, “ソ”: “so”,
“タ”: “ta”, “チ”: “chi”, “ツ”: “tsu”, “テ”: “te”, “ト”: “to”,
“ナ”: “na”, “ニ”: “ni”, “ヌ”: “nu”, “ネ”: “ne”, “ノ”: “no”,
“ハ”: “ha”, “ヒ”: “hi”, “フ”: “fu”, “ヘ”: “he”, “ホ”: “ho”,
“マ”: “ma”, “ミ”: “mi”, “ム”: “mu”, “メ”: “me”, “モ”: “mo”,
“ヤ”: “ya”, “ユ”: “yu”, “ヨ”: “yo”,
“ラ”: “ra”, “リ”: “ri”, “ル”: “ru”, “レ”: “re”, “ロ”: “ro”,
“ワ”: “wa”, “ヲ”: “o”, “ン”: “n”,
“ガ”: “ga”, “ギ”: “gi”, “グ”: “gu”, “ゲ”: “ge”, “ゴ”: “go”,
“ザ”: “za”, “ジ”: “ji”, “ズ”: “zu”, “ゼ”: “ze”, “ゾ”: “zo”,
“ダ”: “da”, “ヂ”: “ji”, “ヅ”: “zu”, “デ”: “de”, “ド”: “do”,
“バ”: “ba”, “ビ”: “bi”, “ブ”: “bu”, “ベ”: “be”, “ボ”: “bo”,
“パ”: “pa”, “ピ”: “pi”, “プ”: “pu”, “ペ”: “pe”, “ポ”: “po”,
“ャ”: “ya”, “ュ”: “yu”, “ョ”: “yo”, “ッ”: “”, “ー”: “”
};

function kanaToRomaji(s) {
var out = “”;
var i = 0;
while (i < s.length) {
var two = s.substr(i, 2);
if (KANA_MAP[two] !== undefined) { out += KANA_MAP[two]; i += 2; continue; }
var one = s.substr(i, 1);
if (KANA_MAP[one] !== undefined) { out += KANA_MAP[one]; i += 1; continue; }
out += one; i += 1;
}
return out.charAt(0).toUpperCase() + out.slice(1);
}

var PENTYPES = [
{ jp: “多機能ペン”, en: “Multi Pen” },
{ jp: “シャープペンシル”, en: “Mechanical Pencil” },
{ jp: “シャープペン”, en: “Mechanical Pencil” },
{ jp: “ローラーボール”, en: “Rollerball Pen” },
{ jp: “ボールペン”, en: “Ballpoint Pen” },
{ jp: “万年筆”, en: “Fountain Pen” }
];

var MATERIALS = [
{ jp: “シルバー925”, en: “Sterling Silver 925”, asset: “silver” },
{ jp: “スターリングシルバー”, en: “Sterling Silver 925”, asset: “silver” },
{ jp: “純銀”, en: “Sterling Silver 925”, asset: “silver” },
{ jp: “銀張り”, en: “Silver Filled”, asset: “silver” },
{ jp: “シルバーフィルド”, en: “Silver Filled”, asset: “silver” },
{ jp: “20K金張り”, en: “20K Gold Filled (Rolled Gold)”, short: “20K Gold Filled”, asset: “gold” },
{ jp: “18K金張り”, en: “18K Gold Filled (Rolled Gold)”, short: “18K Gold Filled”, asset: “gold” },
{ jp: “14K金張り”, en: “14K Gold Filled (Rolled Gold)”, short: “14K Gold Filled”, asset: “gold” },
{ jp: “12K金張り”, en: “12K Gold Filled (Rolled Gold)”, short: “12K Gold Filled”, asset: “gold” },
{ jp: “10K金張り”, en: “10K Gold Filled (Rolled Gold)”, short: “10K Gold Filled”, asset: “gold” },
{ jp: “金張り”, en: “Gold Filled (Rolled Gold)”, short: “Gold Filled”, asset: “gold” },
{ jp: “ゴールドフィルド”, en: “Gold Filled (Rolled Gold)”, short: “Gold Filled”, asset: “gold” },
{ jp: “ロールドゴールド”, en: “Rolled Gold”, asset: “gold” },
{ jp: “18K金メッキ”, en: “18K Gold Plated”, asset: “” },
{ jp: “14K金メッキ”, en: “14K Gold Plated”, asset: “” },
{ jp: “金メッキ”, en: “Gold Plated”, asset: “” },
{ jp: “ゴールドプレート”, en: “Gold Plated”, asset: “” },
{ jp: “銀メッキ”, en: “Silver Plated”, asset: “” },
{ jp: “シルバープレート”, en: “Silver Plated”, asset: “” },
{ jp: “ロジウムメッキ”, en: “Rhodium Plated”, asset: “” },
{ jp: “プラチナメッキ”, en: “Platinum Plated”, asset: “” },
{ jp: “ペン先18K”, en: “18K Gold Nib”, asset: “gold” },
{ jp: “ペン先14K”, en: “14K Gold Nib”, asset: “gold” },
{ jp: “高級レジン”, en: “Precious Resin”, asset: “” },
{ jp: “ラッカー”, en: “Lacquer Finish”, asset: “” },
{ jp: “カーボン”, en: “Carbon Fiber”, asset: “” },
{ jp: “セルロイド”, en: “Celluloid”, asset: “” },
{ jp: “ステンレス”, en: “Stainless Steel”, asset: “” },
{ jp: “マット樹脂”, en: “Matte Resin”, asset: “” },
{ jp: “メタル”, en: “Metal”, asset: “” }
];

var COLORS = [
{ jp: “ステンレスシルバー”, en: “Stainless Silver” },
{ jp: “シルバー×ゴールド”, en: “Silver and Gold” },
{ jp: “マットブラック”, en: “Matte Black” },
{ jp: “シルバー”, en: “Silver” }, { jp: “ゴールド”, en: “Gold” },
{ jp: “ブラック”, en: “Black” }, { jp: “ブルー”, en: “Blue” },
{ jp: “レッド”, en: “Red” }, { jp: “グリーン”, en: “Green” },
{ jp: “ホワイト”, en: “White” }
];

var COUNTRIES = [
{ jp: “ドイツ製”, en: “Germany” }, { jp: “GERMANY”, en: “Germany” },
{ jp: “日本製”, en: “Japan” }, { jp: “JAPAN”, en: “Japan” },
{ jp: “フランス製”, en: “France” }, { jp: “スイス製”, en: “Switzerland” },
{ jp: “イタリア製”, en: “Italy” }, { jp: “イギリス製”, en: “UK” },
{ jp: “アメリカ製”, en: “USA” }, { jp: “USA”, en: “USA” }
];

var SPECS = [
{ jp: “ツイスト式”, en: “Twist mechanism” },
{ jp: “ノック式”, en: “Click mechanism” },
{ jp: “カートリッジ式”, en: “Cartridge filling” },
{ jp: “コンバーター式”, en: “Converter filling” },
{ jp: “吸引式”, en: “Piston filling” }
];

var ACCS = [
{ jp: “ケース”, en: “original case” }, { jp: “袋”, en: “pouch” },
{ jp: “ギャランティ”, en: “guarantee card” }, { jp: “説明書”, en: “instruction manual” }
];

// 状態表記：日本語より良く見せない。海外クレーム対策で1段階下げる。
var CONDITIONS = [
{ jp: [“未使用品のデッドストック”, “未使用のデッドストック”], grade: “New Old Stock”, txt: “Unused old stock. Never used, but stored for a long period.” },
{ jp: [“使用感のほとんどない”], grade: “Excellent”, txt: “Very light signs of use. No significant flaws found.” },
{ jp: [“使用感の少ない”], grade: “Excellent”, txt: “Light signs of use. No significant flaws found.” },
{ jp: [“目立ったキズ等のない”], grade: “Very Good”, txt: “No prominent scratches, but light signs of use consistent with age are present.” },
{ jp: [“キズや凹み”, “凹み等あり”], grade: “Fair”, txt: “Visible scratches and small dents are present. Sold as a used vintage item.” },
{ jp: [“キズや汚れ等あり”, “汚れ等あります”], grade: “Fair”, txt: “Visible scratches and stains are present. Sold as a used vintage item.” },
{ jp: [“小キズ等ありますが、使用には問題”], grade: “Good”, txt: “Scratches from use are present. Functional, but shows visible wear.” },
{ jp: [“小キズ等ありますが”], grade: “Good”, txt: “Scratches from use are present, consistent with its age.” }
];

function findOne(t, list) { for (var i = 0; i < list.length; i++) if (t.indexOf(list[i].jp) >= 0) return list[i]; return null; }
function findAll(t, list) { var o = []; for (var i = 0; i < list.length; i++) if (t.indexOf(list[i].jp) >= 0) o.push(list[i]); return o; }
function pickField(t, label) { var m = t.match(new RegExp(”【” + label + “】([^\n]*)”)); return m ? m[1].trim() : “”; }
function extractEra(t) {
var m = t.match(/(\d{4})年代/); if (m) return m[1].replace(/(\d{3})\d/, “$1”) + “0s”;
var m2 = t.match(/(\d{4})s/); if (m2) return m2[1] + “s”;
return “”;
}

// 長い語から順にマッチさせる（部分一致による誤分割を防ぐ）
var MODELS_SORTED = MODELS.slice().sort(function (a, b) { return b.jp.length - a.jp.length; });

function translateModel(jp) {
if (!jp) return { en: “”, romanized: “”, leftover: “” };

var words = jp.split(/[\u30fb\s\u3000,\u3001]+/).filter(function (x) { return x; });
var out = [], romanized = [], leftover = [];

function decompose(w) {
var parts = [], romaji = [];
var rest = w;
var buf = “”;
var guard = 0;

```
function flushBuf() {
  if (!buf) return;
  if (/^[\u30A0-\u30FF]+$/.test(buf)) {
    var r = kanaToRomaji(buf);
    parts.push(r);
    romaji.push({ jp: buf, en: r });
  } else {
    parts.push(buf);
  }
  buf = "";
}

while (rest.length > 0 && guard++ < 200) {
  var hit = null;
  for (var i = 0; i < MODELS_SORTED.length; i++) {
    if (MODELS_SORTED[i].jp.length >= 2 && rest.indexOf(MODELS_SORTED[i].jp) === 0) {
      hit = MODELS_SORTED[i]; break;
    }
  }
  if (hit) {
    flushBuf();
    parts.push(hit.en);
    rest = rest.slice(hit.jp.length);
  } else {
    buf += rest.charAt(0);
    rest = rest.slice(1);
  }
}
flushBuf();
return { parts: parts, romaji: romaji };
```

}

for (var n = 0; n < words.length; n++) {
var w = words[n];

```
if (/^[A-Za-z0-9#&.\-]+$/.test(w)) { out.push(w); continue; }

var d = decompose(w);
var hasUntranslatable = false;
for (var z = 0; z < d.parts.length; z++) {
  if (/[\u3041-\u3096\u4E00-\u9FFF]/.test(d.parts[z])) { hasUntranslatable = true; break; }
}
if (hasUntranslatable) {
  var okParts = [];
  for (var z2 = 0; z2 < d.parts.length; z2++) {
    if (/[\u3041-\u3096\u4E00-\u9FFF]/.test(d.parts[z2])) leftover.push(d.parts[z2]);
    else okParts.push(d.parts[z2]);
  }
  if (okParts.length) out.push(okParts.join(" "));
  for (var q0 = 0; q0 < d.romaji.length; q0++) {
    romanized.push(d.romaji[q0].jp + "\u2192" + d.romaji[q0].en);
  }
  continue;
}

if (d.parts.length) {
  out.push(d.parts.join(" "));
  for (var q = 0; q < d.romaji.length; q++) {
    romanized.push(d.romaji[q].jp + "\u2192" + d.romaji[q].en);
  }
}
```

}

return {
en: out.join(” “).replace(/\s+/g, “ “).trim(),
romanized: romanized.join(”\u3001”),
leftover: leftover.join(” “)
};
}

function convertListing(jpTitle, jpBody, tested) {
var all = jpTitle + “\n” + jpBody;

// ブランド判定：タイトル優先。本文は「プラチナメッキ」等を除いてから見る。
var bodyForBrand = jpBody.split(“プラチナメッキ”).join(””).split(“プラチナ仕上げ”).join(””).split(“プラチナコーティング”).join(””);
var brand = findOne(jpTitle, BRANDS) || findOne(bodyForBrand, BRANDS);

// ペン種は「タイトル優先」。本文の他出品誤検出を防ぐ。
var penType = findOne(jpTitle, PENTYPES);
var penTypeSource = “タイトル”;
if (!penType) {
var typeField = pickField(jpBody, “タイプ”);
if (typeField) { penType = findOne(typeField, PENTYPES); penTypeSource = “【タイプ】欄”; }
}
if (!penType) {
penType = findOne(jpBody.slice(0, 200), PENTYPES);
penTypeSource = “本文冒頭”;
}
var penCandidates = findAll(jpTitle + “\n” + jpBody.slice(0, 200), PENTYPES);
var penAmbiguous = penCandidates.length > 1;

function resolveField(label, list, fallbackText) {
var fv = pickField(jpBody, label);
if (!fv) {
var h2 = findOne(fallbackText, list);
return h2 ? { en: h2.en, short: h2.short || h2.en, raw: “”, obj: h2 } : { en: “”, short: “”, raw: “”, obj: null };
}

```
var outside = fv.replace(/[\uff08(][^\uff09)]*[\uff09)]/g, "").trim();
var inside = (fv.match(/[\uff08(]([^\uff09)]*)[\uff09)]/) || [])[1] || "";
var core = outside || fv;

for (var e1 = 0; e1 < list.length; e1++) {
  if (list[e1].jp === core || list[e1].jp === fv) {
    return { en: list[e1].en, short: list[e1].short || list[e1].en, raw: fv, obj: list[e1] };
  }
}

var tr = translateModel(core);
var covered = !tr.romanized && !tr.leftover;
var hit = findOne(core, list) || findOne(inside, list) || findOne(fv, list);

if (tr.en && covered) {
  return { en: tr.en, short: (hit && hit.short) || tr.en, raw: fv, obj: hit };
}
if (hit) return { en: hit.en, short: hit.short || hit.en, raw: fv, obj: hit };
if (tr.en) return { en: tr.en, raw: fv, obj: null, romanized: tr.romanized, leftover: tr.leftover };
return { en: "", raw: fv, obj: null };
```

}

var matR = resolveField(“素材”, MATERIALS, all);
var material = matR.obj;
var materialEn = matR.en;

var colR = resolveField(“カラー”, COLORS, all);
var colorEn = colR.en;

var country = findOne(all, COUNTRIES);
var era = extractEra(all);
var specs = findAll(all, SPECS);
var accs = findAll(all, ACCS);

var modelJp = pickField(jpBody, “モデル”);
if (!modelJp) {
var t = jpTitle;
t = t.replace(/\d{4}s?◆?/g, “”);
BRANDS.forEach(function (b) { t = t.split(b.jp).join(” “); });
PENTYPES.forEach(function (p) { t = t.split(“高級” + p.jp).join(” “).split(p.jp).join(” “); });
COUNTRIES.forEach(function (c) { t = t.split(c.jp).join(” “); });
modelJp = t.replace(/[（）()]/g, “ “).replace(/\s+/g, “ “).trim();
}
var mt = translateModel(modelJp);
var model = mt.en;

var priceField = pickField(jpBody, “定価”);
var mgmtMatch = jpBody.match(/\b(\d{8})\b/);
var mgmt = mgmtMatch ? mgmtMatch[1] : “”;

var cond = null, condSrc = “”;
for (var i = 0; i < CONDITIONS.length && !cond; i++) {
for (var j = 0; j < CONDITIONS[i].jp.length; j++) {
if (jpBody.indexOf(CONDITIONS[i].jp[j]) >= 0) {
cond = CONDITIONS[i];
condSrc = CONDITIONS[i].jp[j];
break;
}
}
}
if (!cond) {
cond = { grade: “Used”, txt: “Sold as a used item. Please refer to the photos for the exact condition.” };
condSrc = “（状態の記述が見つからず、既定値を使用）”;
}

var parts = [];
if (era) parts.push(“Vintage “ + era);
if (brand) parts.push(brand.en);
if (model) parts.push(model);
var materialShort = matR.short || materialEn;
var modelLow = (model || “”).toLowerCase();
if (materialShort && materialShort !== “Metal” && modelLow.indexOf(materialShort.toLowerCase()) < 0) parts.push(materialShort);
if (penType) parts.push(penType.en);
// 素材名に同じ色が入っている場合はタイトルで重複させない
var matLow = (materialShort || “”).toLowerCase();
if (colorEn && matLow.indexOf(colorEn.toLowerCase()) < 0) parts.push(colorEn);
if (country) parts.push(country.en);
var title = parts.join(” “).replace(/\s+/g, “ “).trim();
while (title.length > 80 && parts.length > 3) { parts.splice(parts.length - 1, 1); title = parts.join(” “).replace(/\s+/g, “ “).trim(); }
if (title.length > 80) title = title.slice(0, 80).trim();

var L = [], PAIRS = [];
function add(en, jp) {
L.push(en);
if (en !== “”) PAIRS.push({ en: en, jp: jp || “” });
}

var bn = brand ? brand.en : “”;
var pt = penType ? penType.en : “Pen”;

add((bn + “ “ + model).trim() + “ \u2014 “ + pt,
(brand ? brand.jp : “”) + “ “ + modelJp + “、” + (penType ? penType.jp : “”));
add(””);

if (era) {
add(“Vintage “ + era + “ model. Discontinued and no longer in production.”,
era + “頃のヴィンテージモデル。現在は生産終了・廃盤。”);
add(””);
}
if (material && material.asset === “gold”) {
add(materialEn + “. With rising gold prices, this piece also holds value as an asset.”,
materialEn + “。金価格の高騰により、資産としての価値もあります。”);
add(””);
} else if (material && material.asset === “silver”) {
add(materialEn + “. With rising silver prices, this piece also holds value as an asset.”,
materialEn + “。銀価格の高騰により、資産としての価値もあります。”);
add(””);
}

add(”== SPECIFICATIONS ==”, “【仕様】”);
if (bn) add(“Brand: “ + bn, “【ブランド】” + brand.jp);
if (model) add(“Model: “ + model, “【モデル】” + modelJp);
if (priceField) add(“Original retail price: JPY “ + priceField.replace(/[^\d,]/g, “”),
“【定価】” + priceField + “円”);
add(“Type: “ + pt, “【タイプ】” + (penType ? penType.jp : “”));
if (materialEn) add(“Material: “ + materialEn, “【素材】” + (matR.raw || (material ? material.jp : “”)));
if (colorEn) add(“Color: “ + colorEn, “【カラー】” + (colR.raw || “”));
if (country) add(“Made in: “ + country.en + (era ? “ (” + era + “)” : “”),
“【製造】” + country.jp + (era ? “（” + era + “）” : “”));
if (specs.length) add(“Mechanism: “ + specs.map(function (s) { return s.en; }).join(” / “),
“【仕様】” + specs.map(function (s) { return s.jp; }).join(”・”));
if (accs.length) add(“Included: “ + accs.map(function (a) { return a.en; }).join(”, “),
“【付属品】” + accs.map(function (a) { return a.jp; }).join(”、”));
add(””);

add(”== CONDITION: “ + cond.grade + “ ==”, “【状態】” + cond.grade);
add(cond.txt, “日本語原文：” + condSrc);

var isMech = penType && (penType.en === “Ballpoint Pen” || penType.en === “Rollerball Pen” || penType.en === “Mechanical Pencil” || penType.en === “Multi Pen”);
var mechName = “The mechanism”;
var mechJp = “機構”;
if (specs.length) {
if (specs[0].jp === “ツイスト式”) { mechName = “The twist mechanism”; mechJp = “ツイスト機構”; }
else if (specs[0].jp === “ノック式”) { mechName = “The click mechanism”; mechJp = “ノック機構”; }
}
var refillDepleted = jpBody.indexOf(“替芯の交換”) >= 0;

if (tested && isMech) {
add(mechName + “ has been tested and operates smoothly.”,
mechJp + “の動作を確認済みです。（チェックをONにしたため）”);
if (refillDepleted) add(“The refill is depleted, so please replace it before use.”,
“ご使用の際には替芯の交換をお願いします。”);
} else if (refillDepleted) {
add(“The refill is depleted, so please replace it before use.”,
“ご使用の際には替芯の交換をお願いします。”);
add(“The mechanism has not been fully tested. Please refer to the photos and ask if you have any questions.”,
“機構の動作は未確認です。（チェックがOFFのため）”);
} else if (isMech) {
add(“This item has not been fully tested and is sold as-is. Please refer to the photos and ask if you have any questions.”,
“未確認のため現状渡しです。（チェックがOFFのため）”);
}
if (jpBody.indexOf(“多少の汚れ”) >= 0) {
add(“The included accessories show stains or wear from age.”,
“付属品には多少の汚れ等があります。”);
}
add(””);
add(“This is a pre-owned vintage item and is sold as-is. Please review all photos carefully, as they are part of the description. If you have any concerns about the condition, please ask before purchasing.”,
“中古のヴィンテージ品のため現状渡しです。写真も説明の一部ですのでご確認ください。状態にご不安があればご購入前にお尋ねください。（クレーム対策の定型文）”);
add(””);
add(“Feel free to ask any questions. Thank you for looking!”,
“ご質問お気軽にどうぞ。ご覧いただきありがとうございます。”);
if (mgmt) { add(””); add(”[ “ + mgmt + “ ]”, “管理番号”); }

return {
title: title,
body: L.join(”\n”).replace(/\n{3,}/g, “\n\n”).trim(),
pairs: PAIRS,
detected: {
brand: brand ? brand.en : “(未検出)”,
modelJp: modelJp || “(未検出)”,
model: model || “(未検出)”,
romanized: mt.romanized,
leftover: mt.leftover,
penTypeSource: penTypeSource,
penAmbiguous: penAmbiguous,
penCandidates: penCandidates.map(function (x) { return x.jp; }).join(”、”),
penType: penType ? penType.en : “(未検出)”,
material: materialEn || “(未検出)”,
color: colorEn || “(未検出)”,
colorRaw: colR.raw,
materialRaw: matR.raw,
country: country ? country.en : “(未検出)”,
era: era || “(未検出)”,
condition: cond.grade
}
};
}

function Lbl(p) { return <span style={{ display: “block”, fontSize: 11, color: EBAY, marginBottom: 4, marginTop: 12, letterSpacing: “0.08em”, fontFamily: “monospace”, fontWeight: “bold” }}>{p.children}</span>; }

function TA(p) { return <textarea style={{ width: “100%”, padding: “9px 12px”, background: “#fff”, border: “1px solid #ccc”, borderRadius: 4, color: TX, fontSize: 13, fontFamily: “inherit”, outline: “none”, lineHeight: 1.7, boxSizing: “border-box”, resize: “vertical”, minHeight: p.minH || 60 }} value={p.value} onChange={p.onChange} placeholder={p.placeholder || “”} />; }

function Sec(p) {
var st = useState(p.defaultOpen !== false);
var open = st[0], setOpen = st[1];
return <div style={{ background: CARD, border: “1px solid #e0e0e0”, borderRadius: 8, marginBottom: 12, overflow: “hidden” }}>
<div onClick={function () { setOpen(!open); }} style={{ fontSize: 11, letterSpacing: “0.15em”, color: EBAY, padding: “14px 16px”, fontFamily: “monospace”, fontWeight: “bold”, borderBottom: open ? “1px solid #e0e0e0” : “none”, cursor: “pointer”, display: “flex”, justifyContent: “space-between”, alignItems: “center”, userSelect: “none” }}>
<span>{p.title}</span>
<span style={{ fontSize: 13, transform: open ? “rotate(90deg)” : “none”, transition: “transform 0.2s” }}>▶</span>
</div>
{open && <div style={{ padding: 16 }}>{p.children}</div>}

  </div>;
}

function App() {
var s1 = useState(””), jpTitle = s1[0], setJpTitle = s1[1];
var s2 = useState(””), jpBody = s2[0], setJpBody = s2[1];
var s3 = useState(””), enTitle = s3[0], setEnTitle = s3[1];
var s4 = useState(””), enBody = s4[0], setEnBody = s4[1];
var s5 = useState(null), detected = s5[0], setDetected = s5[1];
var s6 = useState([]), pairs = s6[0], setPairs = s6[1];
var s7 = useState(false), showPairs = s7[0], setShowPairs = s7[1];
var s8 = useState(false), tested = s8[0], setTested = s8[1];
var s9 = useState(””), toast = s9[0], setToast = s9[1];
var s10 = useState(false), toastOn = s10[0], setToastOn = s10[1];

function showToast(m) { setToast(m); setToastOn(true); setTimeout(function () { setToastOn(false); }, 2200); }

function run() {
if (!jpTitle && !jpBody) { showToast(“⚠ タイトルか本文を入力してください”); return; }
var r = convertListing(jpTitle, jpBody, tested);
setEnTitle(r.title); setEnBody(r.body); setDetected(r.detected); setPairs(r.pairs || []); setShowPairs(false);
showToast(“✓ 変換しました”);
}

function copyTxt(t, l) { navigator.clipboard.writeText(t); showToast(“✓ “ + l + “をコピー”); }

// Google翻訳で英文を日本語に訳す。URLが長すぎる場合はコピー方式に切り替える。
function openGoogleTranslate() {
var txt = (enBody || “”).trim();
if (!txt) { showToast(“⚠ 説明文がありません”); return; }

```
var enc = encodeURIComponent(txt);
var url = "https://translate.google.com/?sl=en&tl=ja&op=translate&text=" + enc;

if (url.length <= 1900) {
  window.open(url, "_blank");
  return;
}

try {
  navigator.clipboard.writeText(txt);
  showToast("✓ コピーしました。翻訳画面に貼り付けてください");
} catch (e) {
  showToast("⚠ 手動でコピーしてください");
}
setTimeout(function () {
  window.open("https://translate.google.com/?sl=en&tl=ja&op=translate", "_blank");
}, 600);
```

}

var titleLen = enTitle.length;
var over = titleLen > 80;

return (
<div style={{ background: “#fff”, color: TX, fontFamily: “‘Hiragino Kaku Gothic ProN’,sans-serif”, minHeight: “100vh”, paddingBottom: 80 }}>
<style>{”* { box-sizing: border-box; }”}</style>

```
  <div style={{ background: "linear-gradient(135deg,#001a33,#003d7a)", padding: "18px 16px 14px", textAlign: "center" }}>
    <div style={{ fontSize: 24, marginBottom: 3 }}>🇯🇵 → 🌐</div>
    <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#7fb3e8", marginBottom: 3, fontFamily: "monospace" }}>EBAY TEXT CONVERTER</div>
    <h1 style={{ fontSize: 16, margin: 0, color: "#fff", letterSpacing: "0.08em" }}>日本語出品 → eBay英語</h1>
  </div>

  <div style={{ padding: 14, maxWidth: 640, margin: "0 auto" }}>

    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: MT, marginBottom: 5, fontWeight: "bold" }}>日本語タイトル</div>
      <TA value={jpTitle} onChange={function (e) { setJpTitle(e.target.value); }} placeholder="1990s◆モンブラン 高級ボールペン ノブレス MONTBLANC ドイツ製" minH={64} />
      <div style={{ fontSize: 11, color: MT, marginBottom: 5, marginTop: 12, fontWeight: "bold" }}>日本語 説明文</div>
      <TA value={jpBody} onChange={function (e) { setJpBody(e.target.value); }} placeholder="メルカリの説明文をそのまま貼り付け" minH={170} />
      {(jpTitle || jpBody) && <button onClick={function () { setJpTitle(""); setJpBody(""); setEnTitle(""); setEnBody(""); setDetected(null); setPairs([]); }} style={{ width: "100%", padding: 9, border: "1px solid #ccc", borderRadius: 6, background: "#fafafa", color: MT, fontSize: 12, cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>入力をクリア</button>}
    </div>

    <div onClick={function () { setTested(!tested); }} style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", border: "1px solid " + (tested ? "#66bb6a" : "#ddd"), borderRadius: 6, background: tested ? "#f1f8e9" : "#fff", cursor: "pointer", marginBottom: 12 }}>
      <span style={{ width: 18, height: 18, border: "2px solid " + (tested ? "#2e7d32" : "#bbb"), borderRadius: 4, background: tested ? "#2e7d32" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 12, fontWeight: "bold" }}>{tested && "✓"}</span>
      <span style={{ fontSize: 13, color: tested ? "#2e7d32" : "#555" }}>機構の動作を確認した<span style={{ fontSize: 11, color: MT }}>（未確認ならOFF）</span></span>
    </div>

    <button onClick={run} style={{ width: "100%", padding: 16, border: "none", borderRadius: 8, background: EBAY, color: "#fff", fontSize: 16, fontFamily: "inherit", cursor: "pointer", fontWeight: "bold", letterSpacing: "0.05em", boxShadow: "0 2px 8px rgba(0,100,210,0.3)" }}>
      🌐 eBay英語に変換する
    </button>

    {detected && (detected.penAmbiguous || detected.leftover) && <div style={{ marginTop: 12, padding: "12px 14px", background: "#ffebee", border: "1px solid #ef5350", borderRadius: 8, fontSize: 12, color: "#c62828", lineHeight: 1.8 }}>
      {detected.penAmbiguous && <div>⚠ ペンの種類が複数見つかりました。<strong>{detected.penType}</strong> と判定。違えば下で直してください。</div>}
      {detected.leftover && <div style={{ marginTop: detected.penAmbiguous ? 6 : 0 }}>⚠ <strong>「{detected.leftover}」</strong>は英訳できませんでした。</div>}
    </div>}

    {enTitle && <div style={{ marginTop: 16 }}>

      {detected && <Sec title="── 読み取り結果を確認" defaultOpen={false}>
        <div style={{ fontSize: 12, lineHeight: 1.75, color: "#455a64" }}>
          <div>Brand　　　{detected.brand}</div>
          <div>Model　　　{detected.model}</div>
          <div>Type　　　　<strong>{detected.penType}</strong> <span style={{ fontSize: 10, color: MT }}>({detected.penTypeSource})</span></div>
          <div>Material　　{detected.material}{detected.materialRaw && <span style={{ fontSize: 10, color: MT }}>　（{detected.materialRaw}）</span>}</div>
          <div>Color　　　{detected.color}{detected.colorRaw && <span style={{ fontSize: 10, color: MT }}>　（{detected.colorRaw}）</span>}</div>
          <div>Made in　　{detected.country}</div>
          <div>Era　　　　{detected.era}</div>
          <div>Condition　<strong>{detected.condition}</strong></div>
        </div>
        {detected.romanized && <div style={{ marginTop: 10, padding: "9px 11px", background: "#e3f2fd", borderRadius: 5, fontSize: 11, color: "#0d47a1", lineHeight: 1.7 }}>
          ローマ字化した部分：<strong>{detected.romanized}</strong>
        </div>}
      </Sec>}

      <div style={{ background: "#fff", border: "2px solid " + EBAY, borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ background: EBAY, color: "#fff", padding: "9px 14px", fontSize: 12, fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>TITLE</span>
          <span style={{ fontSize: 11, opacity: 0.9, background: over ? "#c62828" : "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 10 }}>{titleLen} / 80</span>
        </div>
        <div style={{ padding: 14 }}>
          <TA value={enTitle} onChange={function (e) { setEnTitle(e.target.value); }} minH={70} />
          {over && <div style={{ fontSize: 11, color: "#c62828", marginTop: 6, fontWeight: "bold" }}>⚠ 80文字を超えています</div>}
          <button onClick={function () { copyTxt(enTitle, "タイトル"); }} style={{ width: "100%", padding: 15, border: "none", borderRadius: 8, background: EBAY, color: "#fff", fontSize: 15, cursor: "pointer", marginTop: 10, fontWeight: "bold", fontFamily: "inherit" }}>📋 タイトルをコピー</button>
        </div>
      </div>

      <div style={{ background: "#fff", border: "2px solid " + EBAY, borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ background: EBAY, color: "#fff", padding: "9px 14px", fontSize: 12, fontWeight: "bold" }}>DESCRIPTION</div>
        <div style={{ padding: 14 }}>
          <TA value={enBody} onChange={function (e) { setEnBody(e.target.value); }} minH={300} />
          <button onClick={function () { copyTxt(enBody, "説明文"); }} style={{ width: "100%", padding: 15, border: "none", borderRadius: 8, background: EBAY, color: "#fff", fontSize: 15, cursor: "pointer", marginTop: 10, fontWeight: "bold", fontFamily: "inherit" }}>📋 説明文をコピー</button>

          <button onClick={openGoogleTranslate} style={{ width: "100%", padding: 14, border: "2px solid #34a853", borderRadius: 8, background: "#fff", color: "#188038", fontSize: 14, cursor: "pointer", marginTop: 8, fontWeight: "bold", fontFamily: "inherit" }}>
            🌐 Google翻訳で日本語に訳す
          </button>

          {pairs.length > 0 && <button onClick={function () { setShowPairs(!showPairs); }} style={{ width: "100%", padding: 11, border: "1px solid #b0bec5", borderRadius: 8, background: showPairs ? "#eceff1" : "#fff", color: "#546e7a", fontSize: 12, cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>
            {showPairs ? "▲ 対訳表を閉じる" : "対訳表を見る（元の日本語との対応）"}
          </button>}

          {showPairs && <div style={{ marginTop: 8, border: "1px solid #cfd8dc", borderRadius: 6, overflow: "hidden" }}>
            {pairs.map(function (pr, i) {
              var isHead = pr.en.indexOf("==") === 0;
              return <div key={i} style={{ padding: isHead ? "4px 8px" : "5px 8px", borderTop: i === 0 ? "none" : "1px solid #f0f0f0", background: isHead ? "#eceff1" : "#fff" }}>
                <div style={{ fontSize: 11, color: "#1a237e", lineHeight: 1.35, fontWeight: isHead ? "bold" : "normal" }}>{pr.en}</div>
                <div style={{ fontSize: 10, color: "#78909c", lineHeight: 1.35 }}>{pr.jp || "（定型文）"}</div>
              </div>;
            })}
          </div>}
        </div>
      </div>

      <div style={{ padding: "12px 14px", background: "#fff8e1", border: "1px solid #ffca28", borderRadius: 8, fontSize: 12, color: "#5d4037", lineHeight: 1.7 }}>
        <strong>出品前チェック</strong><br />
        ・CONDITION が実物より良く書かれていないか<br />
        ・カタカナやローマ字が残っていないか<br />
        ・傷の箇所が写真で確認できるか
      </div>
    </div>}
  </div>

  <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#37474f", color: "white", padding: "10px 22px", borderRadius: 20, fontSize: 13, opacity: toastOn ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none", zIndex: 100, whiteSpace: "nowrap" }}>{toast}</div>
</div>
```

);
}

ReactDOM.createRoot(document.getElementById(“root”)).render(<App />);
