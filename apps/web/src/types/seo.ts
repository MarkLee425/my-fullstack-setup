import type { Thing, WithContext } from "schema-dts";

export interface SeoProps extends Metadata {
	schemaMarkup?: WithContext<Thing>;
}

type Author = {
	url?: string | URL | undefined;
	name?: string | undefined;
};

type ReferrerEnum =
	| "no-referrer"
	| "origin"
	| "no-referrer-when-downgrade"
	| "origin-when-cross-origin"
	| "same-origin"
	| "strict-origin"
	| "strict-origin-when-cross-origin";
type ColorSchemeEnum =
	| "normal"
	| "light"
	| "dark"
	| "light dark"
	| "dark light"
	| "only light";
type ThemeColorDescriptor = {
	color: string;
	media?: string;
};
type ViewportLayout = {
	width?: string | number;
	height?: string | number;
	initialScale?: number;
	minimumScale?: number;
	maximumScale?: number;
	userScalable?: boolean;
	viewportFit?: "auto" | "cover" | "contain";
	interactiveWidget?: "resizes-visual" | "resizes-content" | "overlays-content";
};

type RobotsInfo = {
	index?: boolean | undefined;
	follow?: boolean | undefined;
	noarchive?: boolean | undefined;
	nosnippet?: boolean | undefined;
	noimageindex?: boolean | undefined;
	nocache?: boolean | undefined;
	notranslate?: boolean | undefined;
	indexifembedded?: boolean | undefined;
	nositelinkssearchbox?: boolean | undefined;
	unavailable_after?: string | undefined;
	"max-video-preview"?: number | string | undefined;
	"max-image-preview"?: "none" | "standard" | "large" | undefined;
	"max-snippet"?: number | undefined;
};

export type Robots = RobotsInfo & {
	googleBot?: string | RobotsInfo | undefined;
};

export type AlternateLinkDescriptor = {
	title?: string | undefined;
	url: string | URL;
};
type LangCode =
	| "aa"
	| "ab"
	| "ae"
	| "af"
	| "ak"
	| "am"
	| "an"
	| "ar"
	| "as"
	| "av"
	| "ay"
	| "az"
	| "ba"
	| "be"
	| "bg"
	| "bh"
	| "bi"
	| "bm"
	| "bn"
	| "bo"
	| "br"
	| "bs"
	| "ca"
	| "ce"
	| "ch"
	| "co"
	| "cr"
	| "cs"
	| "cu"
	| "cv"
	| "cy"
	| "da"
	| "de"
	| "dv"
	| "dz"
	| "ee"
	| "el"
	| "en"
	| "eo"
	| "es"
	| "et"
	| "eu"
	| "fa"
	| "ff"
	| "fi"
	| "fj"
	| "fo"
	| "fr"
	| "fy"
	| "ga"
	| "gd"
	| "gl"
	| "gn"
	| "gu"
	| "gv"
	| "ha"
	| "he"
	| "hi"
	| "ho"
	| "hr"
	| "ht"
	| "hu"
	| "hy"
	| "hz"
	| "ia"
	| "id"
	| "ie"
	| "ig"
	| "ii"
	| "ik"
	| "io"
	| "is"
	| "it"
	| "iu"
	| "ja"
	| "jv"
	| "ka"
	| "kg"
	| "ki"
	| "kj"
	| "kk"
	| "kl"
	| "km"
	| "kn"
	| "ko"
	| "kr"
	| "ks"
	| "ku"
	| "kv"
	| "kw"
	| "ky"
	| "la"
	| "lb"
	| "lg"
	| "li"
	| "ln"
	| "lo"
	| "lt"
	| "lu"
	| "lv"
	| "mg"
	| "mh"
	| "mi"
	| "mk"
	| "ml"
	| "mn"
	| "mr"
	| "ms"
	| "mt"
	| "my"
	| "na"
	| "nb"
	| "nd"
	| "ne"
	| "ng"
	| "nl"
	| "nn"
	| "no"
	| "nr"
	| "nv"
	| "ny"
	| "oc"
	| "oj"
	| "om"
	| "or"
	| "os"
	| "pa"
	| "pi"
	| "pl"
	| "ps"
	| "pt"
	| "qu"
	| "rm"
	| "rn"
	| "ro"
	| "ru"
	| "rw"
	| "sa"
	| "sc"
	| "sd"
	| "se"
	| "sg"
	| "si"
	| "sk"
	| "sl"
	| "sm"
	| "sn"
	| "so"
	| "sq"
	| "sr"
	| "ss"
	| "st"
	| "su"
	| "sv"
	| "sw"
	| "ta"
	| "te"
	| "tg"
	| "th"
	| "ti"
	| "tk"
	| "tl"
	| "tn"
	| "to"
	| "tr"
	| "ts"
	| "tt"
	| "tw"
	| "ty"
	| "ug"
	| "uk"
	| "ur"
	| "uz"
	| "ve"
	| "vi"
	| "vo"
	| "wa"
	| "wo"
	| "xh"
	| "yi"
	| "yo"
	| "za"
	| "zh"
	| "zu"
	| "af-ZA"
	| "am-ET"
	| "ar-AE"
	| "ar-BH"
	| "ar-DZ"
	| "ar-EG"
	| "ar-IQ"
	| "ar-JO"
	| "ar-KW"
	| "ar-LB"
	| "ar-LY"
	| "ar-MA"
	| "arn-CL"
	| "ar-OM"
	| "ar-QA"
	| "ar-SA"
	| "ar-SD"
	| "ar-SY"
	| "ar-TN"
	| "ar-YE"
	| "as-IN"
	| "az-az"
	| "az-Cyrl-AZ"
	| "az-Latn-AZ"
	| "ba-RU"
	| "be-BY"
	| "bg-BG"
	| "bn-BD"
	| "bn-IN"
	| "bo-CN"
	| "br-FR"
	| "bs-Cyrl-BA"
	| "bs-Latn-BA"
	| "ca-ES"
	| "co-FR"
	| "cs-CZ"
	| "cy-GB"
	| "da-DK"
	| "de-AT"
	| "de-CH"
	| "de-DE"
	| "de-LI"
	| "de-LU"
	| "dsb-DE"
	| "dv-MV"
	| "el-CY"
	| "el-GR"
	| "en-029"
	| "en-AU"
	| "en-BZ"
	| "en-CA"
	| "en-cb"
	| "en-GB"
	| "en-IE"
	| "en-IN"
	| "en-JM"
	| "en-MT"
	| "en-MY"
	| "en-NZ"
	| "en-PH"
	| "en-SG"
	| "en-TT"
	| "en-US"
	| "en-ZA"
	| "en-ZW"
	| "es-AR"
	| "es-BO"
	| "es-CL"
	| "es-CO"
	| "es-CR"
	| "es-DO"
	| "es-EC"
	| "es-ES"
	| "es-GT"
	| "es-HN"
	| "es-MX"
	| "es-NI"
	| "es-PA"
	| "es-PE"
	| "es-PR"
	| "es-PY"
	| "es-SV"
	| "es-US"
	| "es-UY"
	| "es-VE"
	| "et-EE"
	| "eu-ES"
	| "fa-IR"
	| "fi-FI"
	| "fil-PH"
	| "fo-FO"
	| "fr-BE"
	| "fr-CA"
	| "fr-CH"
	| "fr-FR"
	| "fr-LU"
	| "fr-MC"
	| "fy-NL"
	| "ga-IE"
	| "gd-GB"
	| "gd-ie"
	| "gl-ES"
	| "gsw-FR"
	| "gu-IN"
	| "ha-Latn-NG"
	| "he-IL"
	| "hi-IN"
	| "hr-BA"
	| "hr-HR"
	| "hsb-DE"
	| "hu-HU"
	| "hy-AM"
	| "id-ID"
	| "ig-NG"
	| "ii-CN"
	| "in-ID"
	| "is-IS"
	| "it-CH"
	| "it-IT"
	| "iu-Cans-CA"
	| "iu-Latn-CA"
	| "iw-IL"
	| "ja-JP"
	| "ka-GE"
	| "kk-KZ"
	| "kl-GL"
	| "km-KH"
	| "kn-IN"
	| "kok-IN"
	| "ko-KR"
	| "ky-KG"
	| "lb-LU"
	| "lo-LA"
	| "lt-LT"
	| "lv-LV"
	| "mi-NZ"
	| "mk-MK"
	| "ml-IN"
	| "mn-MN"
	| "mn-Mong-CN"
	| "moh-CA"
	| "mr-IN"
	| "ms-BN"
	| "ms-MY"
	| "mt-MT"
	| "nb-NO"
	| "ne-NP"
	| "nl-BE"
	| "nl-NL"
	| "nn-NO"
	| "no-no"
	| "nso-ZA"
	| "oc-FR"
	| "or-IN"
	| "pa-IN"
	| "pl-PL"
	| "prs-AF"
	| "ps-AF"
	| "pt-BR"
	| "pt-PT"
	| "qut-GT"
	| "quz-BO"
	| "quz-EC"
	| "quz-PE"
	| "rm-CH"
	| "ro-mo"
	| "ro-RO"
	| "ru-mo"
	| "ru-RU"
	| "rw-RW"
	| "sah-RU"
	| "sa-IN"
	| "se-FI"
	| "se-NO"
	| "se-SE"
	| "si-LK"
	| "sk-SK"
	| "sl-SI"
	| "sma-NO"
	| "sma-SE"
	| "smj-NO"
	| "smj-SE"
	| "smn-FI"
	| "sms-FI"
	| "sq-AL"
	| "sr-BA"
	| "sr-CS"
	| "sr-Cyrl-BA"
	| "sr-Cyrl-CS"
	| "sr-Cyrl-ME"
	| "sr-Cyrl-RS"
	| "sr-Latn-BA"
	| "sr-Latn-CS"
	| "sr-Latn-ME"
	| "sr-Latn-RS"
	| "sr-ME"
	| "sr-RS"
	| "sr-sp"
	| "sv-FI"
	| "sv-SE"
	| "sw-KE"
	| "syr-SY"
	| "ta-IN"
	| "te-IN"
	| "tg-Cyrl-TJ"
	| "th-TH"
	| "tk-TM"
	| "tlh-QS"
	| "tn-ZA"
	| "tr-TR"
	| "tt-RU"
	| "tzm-Latn-DZ"
	| "ug-CN"
	| "uk-UA"
	| "ur-PK"
	| "uz-Cyrl-UZ"
	| "uz-Latn-UZ"
	| "uz-uz"
	| "vi-VN"
	| "wo-SN"
	| "xh-ZA"
	| "yo-NG"
	| "zh-CN"
	| "zh-HK"
	| "zh-MO"
	| "zh-SG"
	| "zh-TW"
	| "zh-Hans"
	| "zh-Hant"
	| "zu-ZA"
	| `${Lowercase<string>}-${string}`;
type UnmatchedLang = "x-default";
type HrefLang = LangCode | UnmatchedLang;
type Languages<T> = {
	[s in HrefLang]?: T | undefined;
};
type AlternateURLs = {
	canonical?: null | string | URL | AlternateLinkDescriptor | undefined;
	languages?:
		| Languages<null | string | URL | AlternateLinkDescriptor[]>
		| undefined;
	media?:
		| {
				[media: string]: null | string | URL | AlternateLinkDescriptor[];
		  }
		| undefined;
	types?:
		| {
				[types: string]: null | string | URL | AlternateLinkDescriptor[];
		  }
		| undefined;
};

type IconURL = string | URL;
type Icon = IconURL | IconDescriptor;
type IconDescriptor = {
	url: string | URL;
	type?: string | undefined;
	sizes?: string | undefined;
	color?: string | undefined;
	/** defaults to rel="icon" unless superseded by Icons map */
	rel?: string | undefined;
	media?: string | undefined;
	/**
	 * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority
	 */
	fetchPriority?: "high" | "low" | "auto" | undefined;
};
type Icons = {
	/** rel="icon" */
	icon?: Icon | Icon[] | undefined;
	/** rel="shortcut icon" */
	shortcut?: Icon | Icon[] | undefined;
	/**
	 * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
	 * rel="apple-touch-icon"
	 */
	apple?: Icon | Icon[] | undefined;
	/** rel inferred from descriptor, defaults to "icon" */
	other?: IconDescriptor | IconDescriptor[] | undefined;
};

export type OpenGraphType =
	| "article"
	| "book"
	| "music.song"
	| "music.album"
	| "music.playlist"
	| "music.radio_station"
	| "profile"
	| "website"
	| "video.tv_show"
	| "video.other"
	| "video.movie"
	| "video.episode";
export type OpenGraph =
	| OpenGraphWebsite
	| OpenGraphArticle
	| OpenGraphBook
	| OpenGraphProfile
	| OpenGraphMusicSong
	| OpenGraphMusicAlbum
	| OpenGraphMusicPlaylist
	| OpenGraphRadioStation
	| OpenGraphVideoMovie
	| OpenGraphVideoEpisode
	| OpenGraphVideoTVShow
	| OpenGraphVideoOther
	| OpenGraphMetadata;
type Locale = string;
type OpenGraphMetadata = {
	determiner?: "a" | "an" | "the" | "auto" | "" | undefined;
	title?: string | undefined;
	description?: string | undefined;
	emails?: string | Array<string> | undefined;
	phoneNumbers?: string | Array<string> | undefined;
	faxNumbers?: string | Array<string> | undefined;
	siteName?: string | undefined;
	locale?: Locale | undefined;
	alternateLocale?: Locale | Array<Locale> | undefined;
	images?: OGImage | Array<OGImage> | undefined;
	audio?: OGAudio | Array<OGAudio> | undefined;
	videos?: OGVideo | Array<OGVideo> | undefined;
	url?: string | URL | undefined;
	countryName?: string | undefined;
	ttl?: number | undefined;
};
export type OpenGraphWebsite = OpenGraphMetadata & {
	type: "website";
};
type OpenGraphArticle = OpenGraphMetadata & {
	type: "article";
	publishedTime?: string | undefined;
	modifiedTime?: string | undefined;
	expirationTime?: string | undefined;
	authors?: null | string | URL | Array<string | URL> | undefined;
	section?: null | string | undefined;
	tags?: null | string | Array<string> | undefined;
};
type OpenGraphBook = OpenGraphMetadata & {
	type: "book";
	isbn?: null | string | undefined;
	releaseDate?: null | string | undefined;
	authors?: null | string | URL | Array<string | URL> | undefined;
	tags?: null | string | Array<string> | undefined;
};
type OpenGraphProfile = OpenGraphMetadata & {
	type: "profile";
	firstName?: null | string | undefined;
	lastName?: null | string | undefined;
	username?: null | string | undefined;
	gender?: null | string | undefined;
};
type OpenGraphMusicSong = OpenGraphMetadata & {
	type: "music.song";
	duration?: null | number | undefined;
	albums?:
		| null
		| string
		| URL
		| OGAlbum
		| Array<string | URL | OGAlbum>
		| undefined;
	musicians?: null | string | URL | Array<string | URL> | undefined;
};
type OpenGraphMusicAlbum = OpenGraphMetadata & {
	type: "music.album";
	songs?:
		| null
		| string
		| URL
		| OGSong
		| Array<string | URL | OGSong>
		| undefined;
	musicians?: null | string | URL | Array<string | URL> | undefined;
	releaseDate?: null | string | undefined;
};
type OpenGraphMusicPlaylist = OpenGraphMetadata & {
	type: "music.playlist";
	songs?:
		| null
		| string
		| URL
		| OGSong
		| Array<string | URL | OGSong>
		| undefined;
	creators?: null | string | URL | Array<string | URL> | undefined;
};
type OpenGraphRadioStation = OpenGraphMetadata & {
	type: "music.radio_station";
	creators?: null | string | URL | Array<string | URL> | undefined;
};
type OpenGraphVideoMovie = OpenGraphMetadata & {
	type: "video.movie";
	actors?:
		| null
		| string
		| URL
		| OGActor
		| Array<string | URL | OGActor>
		| undefined;
	directors?: null | string | URL | Array<string | URL> | undefined;
	writers?: null | string | URL | Array<string | URL> | undefined;
	duration?: null | number | undefined;
	releaseDate?: null | string | undefined;
	tags?: null | string | Array<string> | undefined;
};
type OpenGraphVideoEpisode = OpenGraphMetadata & {
	type: "video.episode";
	actors?:
		| null
		| string
		| URL
		| OGActor
		| Array<string | URL | OGActor>
		| undefined;
	directors?: null | string | URL | Array<string | URL> | undefined;
	writers?: null | string | URL | Array<string | URL> | undefined;
	duration?: null | number | undefined;
	releaseDate?: null | string | undefined;
	tags?: null | string | Array<string> | undefined;
	series?: null | string | URL | undefined;
};
type OpenGraphVideoTVShow = OpenGraphMetadata & {
	type: "video.tv_show";
};
type OpenGraphVideoOther = OpenGraphMetadata & {
	type: "video.other";
};
type OGImage = string | OGImageDescriptor | URL;
type OGImageDescriptor = {
	url: string | URL;
	secureUrl?: string | URL | undefined;
	alt?: string | undefined;
	type?: string | undefined;
	width?: string | number | undefined;
	height?: string | number | undefined;
};
type OGAudio = string | OGAudioDescriptor | URL;
type OGAudioDescriptor = {
	url: string | URL;
	secureUrl?: string | URL | undefined;
	type?: string | undefined;
};
type OGVideo = string | OGVideoDescriptor | URL;
type OGVideoDescriptor = {
	url: string | URL;
	secureUrl?: string | URL | undefined;
	type?: string | undefined;
	width?: string | number | undefined;
	height?: string | number | undefined;
};
type OGSong = {
	url: string | URL;
	disc?: number | undefined;
	track?: number | undefined;
};
type OGAlbum = {
	url: string | URL;
	disc?: number | undefined;
	track?: number | undefined;
};
type OGActor = {
	url: string | URL;
	role?: string | undefined;
};

type Twitter =
	| TwitterSummary
	| TwitterSummaryLargeImage
	| TwitterPlayer
	| TwitterApp
	| TwitterMetadata;
type TwitterMetadata = {
	site?: string | undefined;
	siteId?: string | undefined;
	creator?: string | undefined;
	creatorId?: string | undefined;
	description?: string | undefined;
	title?: string | undefined;
	images?: TwitterImage | Array<TwitterImage> | undefined;
};
export type TwitterSummary = TwitterMetadata & {
	card: "summary";
};
type TwitterSummaryLargeImage = TwitterMetadata & {
	card: "summary_large_image";
};
type TwitterPlayer = TwitterMetadata & {
	card: "player";
	players: TwitterPlayerDescriptor | Array<TwitterPlayerDescriptor>;
};
type TwitterApp = TwitterMetadata & {
	card: "app";
	app: TwitterAppDescriptor;
};
type TwitterAppDescriptor = {
	id: {
		iphone?: string | number | undefined;
		ipad?: string | number | undefined;
		googleplay?: string | undefined;
	};
	url?:
		| {
				iphone?: string | URL | undefined;
				ipad?: string | URL | undefined;
				googleplay?: string | URL | undefined;
		  }
		| undefined;
	name?: string | undefined;
};
type TwitterImage = string | TwitterImageDescriptor | URL;
type TwitterImageDescriptor = {
	url: string | URL;
	alt?: string | undefined;
	secureUrl?: string | URL | undefined;
	type?: string | undefined;
	width?: string | number | undefined;
	height?: string | number | undefined;
};
type TwitterPlayerDescriptor = {
	playerUrl: string | URL;
	streamUrl: string | URL;
	width: number;
	height: number;
};
type ResolvedTwitterImage = {
	url: string | URL;
	alt?: string | undefined;
	secureUrl?: string | URL | undefined;
	type?: string | undefined;
	width?: string | number | undefined;
	height?: string | number | undefined;
};
type ResolvedTwitterSummary = {
	site: string | null;
	siteId: string | null;
	creator: string | null;
	creatorId: string | null;
	description: string | null;
	title: string;
	images?: Array<ResolvedTwitterImage> | undefined;
};

type Facebook = FacebookAppId | FacebookAdmins;
type FacebookAppId = {
	appId: string;
	admins?: never | undefined;
};
type FacebookAdmins = {
	appId?: never | undefined;
	admins: string | string[];
};

type Pinterest = PinterestRichPin;
type PinterestRichPin = {
	richPin: string | boolean;
};

type Verification = {
	google?: null | string | number | (string | number)[] | undefined;
	yahoo?: null | string | number | (string | number)[] | undefined;
	yandex?: null | string | number | (string | number)[] | undefined;
	me?: null | string | number | (string | number)[] | undefined;
	other?:
		| {
				[name: string]: string | number | (string | number)[];
		  }
		| undefined;
};

type AppleWebApp = {
	capable?: boolean | undefined;
	title?: string | undefined;
	startupImage?: AppleImage | Array<AppleImage> | undefined;
	statusBarStyle?: "default" | "black" | "black-translucent" | undefined;
};
type AppleImage = string | AppleImageDescriptor;
type AppleImageDescriptor = {
	url: string;
	media?: string | undefined;
};

type FormatDetection = {
	telephone?: boolean | undefined;
	date?: boolean | undefined;
	address?: boolean | undefined;
	email?: boolean | undefined;
	url?: boolean | undefined;
};

type ItunesApp = {
	appId: string;
	appArgument?: string | undefined;
};

type AppLinks = {
	ios?: AppLinksApple | Array<AppLinksApple> | undefined;
	iphone?: AppLinksApple | Array<AppLinksApple> | undefined;
	ipad?: AppLinksApple | Array<AppLinksApple> | undefined;
	android?: AppLinksAndroid | Array<AppLinksAndroid> | undefined;
	windows_phone?: AppLinksWindows | Array<AppLinksWindows> | undefined;
	windows?: AppLinksWindows | Array<AppLinksWindows> | undefined;
	windows_universal?: AppLinksWindows | Array<AppLinksWindows> | undefined;
	web?: AppLinksWeb | Array<AppLinksWeb> | undefined;
};
type AppLinksApple = {
	url: string | URL;
	app_store_id?: string | number | undefined;
	app_name?: string | undefined;
};
type AppLinksAndroid = {
	package: string;
	url?: string | URL | undefined;
	class?: string | undefined;
	app_name?: string | undefined;
};
type AppLinksWindows = {
	url: string | URL;
	app_id?: string | undefined;
	app_name?: string | undefined;
};
type AppLinksWeb = {
	url: string | URL;
	should_fallback?: boolean | undefined;
};

interface Metadata {
	/**
	 * The base path and origin for absolute URLs in various metadata fields.
	 *
	 * @remarks
	 * When relative URLs (for Open Graph images, alternates, etc.) are used, they are composed with this base.
	 * If not provided, Next.js will populate a default value based on environment variables.
	 */
	metadataBase?: null | URL | undefined;
	/**
	 * The document title.
	 *
	 * @remarks
	 * The title can be a simple string (e.g., `"My Blog"`) or an object with:
	 * - `default`: A fallback title for child segments.
	 * - `template`: A title template (e.g., `"%s | My Website"`) applied to child titles.
	 * - `absolute`: A title that overrides parent templates.
	 *
	 * @example
	 * ```tsx
	 * // As a simple string:
	 * title: "My Blog"
	 *
	 * // As a template object:
	 * title: { default: "Dashboard", template: "%s | My Website" }
	 *
	 * // Using absolute value (ignores parent template):
	 * title: { absolute: "My Blog", template: "%s | My Website" }
	 * ```
	 */
	title?: null | string | undefined;
	/**
	 * The document description, and optionally the Open Graph and Twitter descriptions.
	 *
	 * @example
	 * ```tsx
	 * description: "My Blog Description"
	 * // Renders: <meta name="description" content="My Blog Description" />
	 * ```
	 */
	description?: null | string | undefined;
	/**
	 * The application name.
	 *
	 * @example
	 * ```tsx
	 * applicationName: "My Blog"
	 * // Renders: <meta name="application-name" content="My Blog" />
	 * ```
	 */
	applicationName?: null | string | undefined;
	/**
	 * The authors of the document.
	 *
	 * @example
	 * ```tsx
	 * authors: [{ name: "Next.js Team", url: "https://nextjs.org" }]
	 * // Renders:
	 * // <meta name="author" content="Next.js Team" />
	 * // <link rel="author" href="https://nextjs.org" />
	 * ```
	 */
	authors?: null | Author | Array<Author> | undefined;
	/**
	 * The generator used for the document.
	 *
	 * @example
	 * ```tsx
	 * generator: "Next.js"
	 * // Renders: <meta name="generator" content="Next.js" />
	 * ```
	 */
	generator?: null | string | undefined;
	/**
	 * The keywords for the document.
	 *
	 * @remarks
	 * When an array is provided, keywords are flattened into a comma-separated string.
	 *
	 * @example
	 * ```tsx
	 * keywords: "nextjs, react, blog"
	 * // or
	 * keywords: ["react", "server components"]
	 * ```
	 */
	keywords?: null | string | Array<string> | undefined;
	/**
	 * The referrer setting for the document.
	 *
	 * @example
	 * ```tsx
	 * referrer: "origin"
	 * // Renders: <meta name="referrer" content="origin" />
	 * ```
	 */
	referrer?: null | ReferrerEnum | undefined;
	/**
	 * The theme color for the document.
	 *
	 * @example
	 * ```tsx
	 * themeColor: "#000000"
	 * // Renders <meta name="theme-color" content="#000000" />
	 *
	 * themeColor: { media: "(prefers-color-scheme: dark)", color: "#000000" }
	 * // Renders <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
	 *
	 * themeColor: [
	 *  { media: "(prefers-color-scheme: dark)", color: "#000000" },
	 *  { media: "(prefers-color-scheme: light)", color: "#ffffff" }
	 * ]
	 * // Renders <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
	 * // Renders <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
	 * ```
	 */
	themeColor?:
		| null
		| string
		| ThemeColorDescriptor
		| ThemeColorDescriptor[]
		| undefined;
	/**
	 * The color scheme for the document.
	 *
	 * @example
	 * ```tsx
	 * colorScheme: "dark"
	 * // Renders <meta name="color-scheme" content="dark" />
	 * ```
	 */
	colorScheme?: null | ColorSchemeEnum | undefined;
	/**
	 * The viewport setting for the document.
	 *
	 */
	viewport?: null | string | ViewportLayout | undefined;
	/**
	 * The creator of the document.
	 *
	 * @example
	 * ```tsx
	 * creator: "Next.js Team"
	 * // Renders: <meta name="creator" content="Next.js Team" />
	 * ```
	 */
	creator?: null | string | undefined;
	/**
	 * The publisher of the document.
	 *
	 * @example
	 * ```tsx
	 * publisher: "Vercel"
	 * // Renders: <meta name="publisher" content="Vercel" />
	 * ```
	 */
	publisher?: null | string | undefined;
	/**
	 * The robots setting for the document.
	 *
	 * @remarks
	 * Can be a string (e.g., "index, follow") or an object with more granular rules.
	 *
	 * @example
	 * ```tsx
	 * robots: "index, follow"
	 * // or
	 * robots: { index: true, follow: true }
	 * ```
	 *
	 * @see https://developer.mozilla.org/docs/Glossary/Robots.txt
	 */
	robots?: null | string | Robots | undefined;
	/**
	 * The canonical and alternate URLs for the document.
	 *
	 * @remarks
	 * This field allows defining a canonical URL as well as alternate URLs (such as for multiple languages).
	 *
	 * @example
	 * ```tsx
	 * alternates: {
	 *   canonical: "https://example.com",
	 *   languages: {
	 *     "en-US": "https://example.com/en-US"
	 *   }
	 * }
	 * ```
	 */
	alternates?: null | AlternateURLs | undefined;
	/**
	 * The icons for the document. Defaults to rel="icon".
	 *
	 * @remarks
	 * You can specify a simple URL or an object to differentiate between icon types (e.g., apple-touch-icon).
	 *
	 * @example
	 * ```tsx
	 * icons: "https://example.com/icon.png"
	 * // or
	 * icons: {
	 *   icon: "https://example.com/icon.png",
	 *   apple: "https://example.com/apple-icon.png"
	 * }
	 * ```
	 *
	 * @see https://developer.mozilla.org/docs/Web/HTML/Attributes/rel#attr-icon
	 */
	icons?: null | IconURL | Array<Icon> | Icons | undefined;
	/**
	 * A web application manifest, as defined in the Web Application Manifest specification.
	 *
	 * @example
	 * ```tsx
	 * manifest: "https://example.com/manifest.json"
	 * // Renders: <link rel="manifest" href="https://example.com/manifest.json" />
	 * ```
	 *
	 * @see https://developer.mozilla.org/docs/Web/Manifest
	 */
	manifest?: null | string | URL | undefined;
	/**
	 * The Open Graph metadata for the document.
	 *
	 * @remarks
	 * Follows the Open Graph protocol to enrich link previews.
	 *
	 * @example
	 * ```tsx
	 * openGraph: {
	 *   type: "website",
	 *   url: "https://example.com",
	 *   title: "My Website",
	 *   description: "My Website Description",
	 *   siteName: "My Website",
	 *   images: [{ url: "https://example.com/og.png" }]
	 * }
	 * ```
	 *
	 * @see https://ogp.me/
	 */
	openGraph?: null | OpenGraph | undefined;
	/**
	 * The Twitter metadata for the document.
	 *
	 * @remarks
	 * - Used for configuring Twitter Cards and can include details such as `card`, `site`, and `creator`.
	 * - Notably, more sites than just Twitter (now X) use this format.
	 *
	 * @example
	 * ```tsx
	 * twitter: {
	 *   card: "summary_large_image",
	 *   site: "@site",
	 *   creator: "@creator",
	 *   images: "https://example.com/og.png"
	 * }
	 * ```
	 */
	twitter?: null | Twitter | undefined;
	/**
	 * The Facebook metadata for the document.
	 *
	 * @remarks
	 * Specify either `appId` or `admins` (but not both) to configure Facebook integration.
	 *
	 * @example
	 * ```tsx
	 * facebook: { appId: "12345678" }
	 * // Renders <meta property="fb:app_id" content="12345678" />
	 * // or
	 * facebook: { admins: ["12345678"] }
	 * // Renders <meta property="fb:admins" content="12345678" />
	 * ```
	 */
	facebook?: null | Facebook | undefined;
	/**
	 * The Pinterest metadata for the document to choose whether opt out of rich pin data.
	 *
	 * @example
	 * ```tsx
	 * pinterest: { richPin: true }
	 * // Renders <meta name="pinterest-rich-pin" content="true" />
	 * ```
	 */
	pinterest?: null | Pinterest;
	/**
	 * The common verification tokens for the document.
	 *
	 * @example
	 * ```tsx
	 * verification: { google: "1234567890", yandex: "1234567890", "me": "1234567890" }
	 * // Renders <meta name="google-site-verification" content="1234567890" />
	 * // <meta name="yandex-verification" content="1234567890" />
	 * // <meta name="me" content="@me" />
	 * ```
	 */
	verification?: Verification | undefined;
	/**
	 * The Apple web app metadata for the document.
	 *
	 * @example
	 * ```tsx
	 * appleWebApp: { capable: true, title: "My Website", statusBarStyle: "black-translucent" }
	 * ```
	 *
	 * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
	 */
	appleWebApp?: null | boolean | AppleWebApp | undefined;
	/**
	 * Indicates whether devices should interpret certain formats (such as telephone numbers) as actionable links.
	 *
	 * @example
	 * ```tsx
	 * formatDetection: { telephone: false }
	 * // Renders: <meta name="format-detection" content="telephone=no" />
	 * ```
	 */
	formatDetection?: null | FormatDetection | undefined;
	/**
	 * The metadata for the iTunes App.
	 *
	 * @remarks
	 * Adds the `name="apple-itunes-app"` meta tag.
	 *
	 * @example
	 * ```tsx
	 * itunes: { app: { id: "123456789", affiliateData: "123456789", appArguments: "123456789" } }
	 * // Renders <meta name="apple-itunes-app" content="app-id=123456789, affiliate-data=123456789, app-arguments=123456789" />
	 * ```
	 */
	itunes?: null | ItunesApp | undefined;
	/**
	 * A brief description of the web page.
	 *
	 * @remarks
	 * Rendered as the `abstract` meta tag. This is *not recommended* as it is superseded by `description`.
	 *
	 * @example
	 * ```tsx
	 * abstract: "My Website Description"
	 * // Renders <meta name="abstract" content="My Website Description" />
	 * ```
	 */
	abstract?: null | string | undefined;
	/**
	 * The Facebook AppLinks metadata for the document.
	 *
	 * @example
	 * ```tsx
	 * appLinks: {
	 *   ios: { appStoreId: "123456789", url: "https://example.com" },
	 *   android: { packageName: "com.example", url: "https://example.com" }
	 * }
	 *
	 * // Renders
	 * <meta property="al:ios:app_store_id" content="123456789" />
	 * <meta property="al:ios:url" content="https://example.com" />
	 * <meta property="al:android:package" content="com.example" />
	 * <meta property="al:android:url" content="https://example.com" />
	 * ```
	 */
	appLinks?: null | AppLinks | undefined;
	/**
	 * The archives link rel property.
	 *
	 * @example
	 * ```tsx
	 * archives: "https://example.com/archives"
	 * // Renders <link rel="archives" href="https://example.com/archives" />
	 * ```
	 */
	archives?: null | string | Array<string> | undefined;
	/**
	 * The assets link rel property.
	 *
	 * @example
	 * ```tsx
	 * assets: "https://example.com/assets"
	 * // Renders <link rel="assets" href="https://example.com/assets" />
	 * ```
	 */
	assets?: null | string | Array<string> | undefined;
	/**
	 * The bookmarks link rel property.
	 *
	 * @remarks
	 * Although technically against the HTML spec, this is used in practice.
	 *
	 * @example
	 * ```tsx
	 * bookmarks: "https://example.com/bookmarks"
	 * // Renders <link rel="bookmarks" href="https://example.com/bookmarks" />
	 * ```
	 */
	bookmarks?: null | string | Array<string> | undefined;
	/**
	 * The pagination link rel properties.
	 *
	 * @example
	 * ```tsx
	 * pagination: {
	 *   previous: "https://example.com/items?page=1",
	 *   next: "https://example.com/items?page=3"
	 * }
	 *
	 * // Renders
	 * <link rel="prev" href="https://example.com/items?page=1" />
	 * <link rel="next" href="https://example.com/items?page=3" />
	 * ```
	 *
	 * @see https://developers.google.com/search/blog/2011/09/pagination-with-relnext-and-relprev
	 */
	pagination?: {
		previous?: null | string | URL | undefined;
		next?: null | string | URL | undefined;
	};
	/**
	 * The category meta name property.
	 *
	 * @example
	 * ```tsx
	 * category: "My Category"
	 * // Renders <meta name="category" content="My Category" />
	 * ```
	 */
	category?: null | string | undefined;
	/**
	 * The classification meta name property.
	 *
	 * @example
	 * ```tsx
	 * classification: "My Classification"
	 * // Renders <meta name="classification" content="My Classification" />
	 * ```
	 */
	classification?: null | string | undefined;
	/**
	 * Arbitrary name/value pairs for additional metadata.
	 *
	 * @remarks
	 * Use this field to define custom meta tags that are not directly supported.
	 *
	 * @example
	 * ```tsx
	 * other: { custom: ["meta1", "meta2"] }
	 * ```
	 */
	other?: {
		[name: string]: string | number | Array<string | number>;
	};
}
