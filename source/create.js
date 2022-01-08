'use strict';
const evaluateStyle = require('./lib/evaluate-style');
const emToPx = require('./lib/em-to-px');
const matchesMediaQuery = require('./lib/matches-media-query');

// Font variant numeric utilities need a special treatment, because
// there can be many font variant classes and they need to be transformed to an array
const FONT_VARIANT_REGEX =
	/(oldstyle-nums|lining-nums|tabular-nums|proportional-nums)/;
const FONT_VARIANTS = [
	'oldstyle-nums',
	'lining-nums',
	'tabular-nums',
	'proportional-nums'
];

const addFontVariant = (style, classNames) => {
	if (!FONT_VARIANT_REGEX.test(classNames)) {
		return;
	}

	style.fontVariant = [];

	for (const fontVariant of FONT_VARIANTS) {
		if (classNames.includes(fontVariant)) {
			style.fontVariant.push(fontVariant);
		}
	}
};

// Letter spacing also needs a special treatment, because its value is set
// in em unit, that's why it requires a font size to be set too
const FONT_SIZE_REGEX = /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/;
const LETTER_SPACING_REGEX = /(tracking-[a-z]+)/;

const addLetterSpacing = (tailwindStyles, style, classNames) => {
	const letterSpacingMatches = LETTER_SPACING_REGEX.exec(classNames);

	if (!letterSpacingMatches) {
		return;
	}

	const fontSizeMatches = FONT_SIZE_REGEX.exec(classNames);

	if (!fontSizeMatches) {
		throw new Error(
			"Font size is required when applying letter spacing, e.g. 'text-lg tracking-tighter'"
		);
	}

	const letterSpacingClass = letterSpacingMatches[0];
	const {letterSpacing} = tailwindStyles[letterSpacingClass].style;
	const fontSizeClass = fontSizeMatches[0];
	const {fontSize} = tailwindStyles[fontSizeClass].style;

	style.letterSpacing = emToPx(letterSpacing, fontSize);
};

const defaultMedia = {
	orientation: 'portrait',
	colorScheme: 'light',
	reduceMotion: false
};

const create = (tailwindStyles, media = defaultMedia) => {
	// Pass a list of class names separated by a space, for example:
	// "bg-green-100 text-green-800 font-semibold")
	// and receive a styles object for use in React Native views
	const tailwind = classNames => {
		const style = {};

		if (!classNames) {
			return style;
		}

		addFontVariant(style, classNames);
		addLetterSpacing(tailwindStyles, style, classNames);

		const separateClassNames = classNames
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ')
			.filter(className => {
				return (
					!className.startsWith('tracking-') &&
					!FONT_VARIANT_REGEX.test(className)
				);
			});

		for (const className of separateClassNames) {
			if (tailwindStyles[className]) {
				const tailwindStyle = tailwindStyles[className];

				if (tailwindStyle.media) {
					if (matchesMediaQuery(tailwindStyle.media, media)) {
						Object.assign(style, tailwindStyle.style);
					}
				} else {
					Object.assign(style, tailwindStyle.style);
				}
			} else {
				console.warn(`Unsupported Tailwind class: "${className}"`);
			}
		}

		return evaluateStyle(style);
	};

	// Pass the class of a color (e.g. "bg-blue-500") and receive a color value (e.g. "#4399e1"),
	// or a color and opacity (e.g. "bg-black bg-opacity-50") and get a color with opacity (e.g. "rgba(0,0,0,0.5)")
	const getColor = classNames => {
		const style = tailwind(classNames);
		return style.backgroundColor || style.textColor;
	};

	return {tailwind, getColor};
};

module.exports = create;
module.exports.default = create;
