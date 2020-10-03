'use strict';
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
	const matches = [...classNames.matchAll(FONT_VARIANT_REGEX)].map(
		match => match[0]
	);

	if (matches.length > 0) {
		style.fontVariant = matches;
	}
};

const create = styles => {
	// Pass a list of class names separated by a space, for example:
	// "bg-green-100 text-green-800 font-semibold")
	// and receive a styles object for use in React Native views
	const tailwind = classNames => {
		const style = {};

		if (!classNames) {
			return style;
		}

		addFontVariant(style, classNames);

		for (const className of classNames
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ')) {
			if (styles[className]) {
				Object.assign(style, styles[className]);
			} else {
				console.warn(`Unsupported Tailwind class: "${className}"`);
			}
		}

		return useVariables(style);
	};

	// Pass the name of a color (e.g. "blue-500") and receive a color value (e.g. "#4399e1")
	const getColor = name => {
		const style = tailwind(`bg-${name}`);
		return style.backgroundColor;
	};

	return {tailwind, getColor};
};

const {tailwind, getColor} = create(require('./styles.json'));

module.exports = tailwind;
module.exports.default = tailwind;
module.exports.getColor = getColor;
module.exports.create = create;
