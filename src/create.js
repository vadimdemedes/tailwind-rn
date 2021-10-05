'use strict';

// Used to reference rules without breakpoint prefix
const defaultBreakpointKey = '__default';

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
const addFontVariant = (style, separateClassNames, prefix) => {
	const regex = new RegExp(`^${prefix}(oldstyle-nums|lining-nums|tabular-nums|proportional-nums)$`);

	const matches = separateClassNames
		.filter(className => regex.test(className))
		.map(className => className.replace(prefix, ''));

	if (matches.length > 0) {
		style.fontVariant = matches;
	}
};

// Letter spacing also needs a special treatment, because its value is set
// in em unit, that's why it requires a font size to be set too
const addLetterSpacing = (style, letterSpacing) => {
	if (!letterSpacing) {
		return;
	}

	if (!style || !style.fontSize) {
		throw new Error(
			"Font size is required when applying letter spacing, e.g. 'text-lg tracking-tighter'" // eslint-disable-line quotes
		);
	}

	style.letterSpacing = Number.parseFloat(letterSpacing) * style.fontSize;
};

const create = (tailwindStyles, breakpointsConfig) => {
	const screenNames = breakpointsConfig
		.map(breakpoint => breakpoint.name);

	const supportedScreens = [
		defaultBreakpointKey,
		...breakpointsConfig
			.filter(breakpoint => breakpoint.actif)
			.map(breakpoint => breakpoint.name)
	];

	const breakpointPrefixRegex = new RegExp(`^(${screenNames.join('|')}):`);

	// Pass a list of class names separated by a space, for example:
	// "bg-green-100 text-green-800 font-semibold")
	// and receive a styles object for use in React Native views
	const tailwind = classNames => {
		const style = {};

		if (!classNames) {
			return style;
		}

		const separateClassNames = classNames
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ');

		const classNamesByScreens = separateClassNames.reduce((acc, className) => {
			const screen = screenNames.find(_screen => className.startsWith(`${_screen}:`)) || defaultBreakpointKey;

			if (!acc[screen]) {
				acc[screen] = [];
			}

			acc[screen].push(className);

			return acc;
		}, {});

		let letterSpacingClassName = null;

		for (const screen of supportedScreens) {
			if (!classNamesByScreens[screen]) {
				continue;
			}

			// Adding font variant for each supported screen
			// since the supported screens are sorted,
			// font variant rules of bigger screens will always override those of smaller ones
			const breakpointPrefix = defaultBreakpointKey === screen ? '' : `${screen}:`;
			addFontVariant(style, separateClassNames, breakpointPrefix);

			for (const screenCalssName of classNamesByScreens[screen]) {
				const className = screenCalssName.replace(breakpointPrefixRegex, '');
				if (!tailwindStyles[className]) {
					console.warn(`Unsupported Tailwind class: "${screenCalssName}"`);
				} else if (className.startsWith('tracking-')) {
					letterSpacingClassName = className;
				} else {
					Object.assign(style, tailwindStyles[className]);
				}
			}
		}

		// Add Letter spacing at last to be sure that we dont miss fontSize rule
		if (letterSpacingClassName) {
			addLetterSpacing(style, tailwindStyles[letterSpacingClassName].letterSpacing);
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

module.exports = create;
