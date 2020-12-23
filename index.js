'use strict';
const matchAll = require('match-all');

// Tailwind started using CSS variables for color opacity since v1.4.0,
// this helper adds a primitive support for these
const useVariables = object => {
	const newObject = {};

	for (const [key, value] of Object.entries(object)) {
		if (!key.startsWith('--')) {
			if (typeof value === 'string') {
				newObject[key] = value.replace(/var\(([a-zA-Z-]+)\)/, (_, name) => {
					return object[name];
				});
			} else {
				newObject[key] = value;
			}
		}
	}

	return newObject;
};

// Font variant numeric utilities need a special treatment, because
// there can be many font variant classes and they need to be transformed to an array
const FONT_VARIANT_REGEX = /(oldstyle-nums|lining-nums|tabular-nums|proportional-nums)/g;

const addFontVariant = (style, classNames) => {
	const matches = matchAll(classNames, FONT_VARIANT_REGEX).toArray();

	if (matches.length > 0) {
		style.fontVariant = matches;
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
			"Font size is required when applying letter spacing, e.g. 'text-lg tracking-tighter'" // eslint-disable-line quotes
		);
	}

	const letterSpacingClass = letterSpacingMatches[0];
	const {letterSpacing} = tailwindStyles[letterSpacingClass];
	const fontSizeClass = fontSizeMatches[0];
	const {fontSize} = tailwindStyles[fontSizeClass];

	style.letterSpacing = Number.parseFloat(letterSpacing) * fontSize;
};

const create = tailwindStyles => {
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
			.filter(className => !className.startsWith('tracking-'));

		for (const className of separateClassNames) {
			if (tailwindStyles[className]) {
				Object.assign(style, tailwindStyles[className]);
			} else {
				console.warn(`Unsupported Tailwind class: "${className}"`);
			}
		}

		return useVariables(style);
	};

	// Pass the name of a color (e.g. "blue-500") and receive a color value (e.g. "#4399e1"),
	// or a color and opacity (e.g. "black opacity-50") and get a color with opacity (e.g. "rgba(0,0,0,0.5)")
	const getColor = name => {
		const style = tailwind(name.split(' ').map(className => `bg-${className}`).join(' '));
		return style.backgroundColor;
	};

	return {tailwind, getColor};
};

const {tailwind, getColor} = create(require('./styles.json'));

module.exports = tailwind;
module.exports.default = tailwind;
module.exports.getColor = getColor;
module.exports.create = create;
