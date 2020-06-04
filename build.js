'use strict';
const css = require('css');
const cssToReactNative = require('css-to-react-native').default;
const remToPx = value => `${Number.parseFloat(value) * 16}px`;

function translateValues(value) {
	const translatedValue = value;

	if (translatedValue === 'transparent') {
		return 'rgba(0,0,0,0)';
	}

	if (typeof translatedValue !== 'string') {
		return translatedValue;
	}

	if (value.search(/^-?\d+$/) !== -1) {
		return Number.parseInt(translatedValue, 10);
	}

	if (value.search(/-?\.\d+$/) !== -1) {
		return Number.parseFloat(translatedValue);
	}

	if (value.search(/^\d+$/) !== -1) {
		return Number.parseInt(translatedValue, 10);
	}

	return translatedValue;
}

function convertShadow(rule) {
	if (rule.declarations.length > 1) {
		throw new Error(
			'tailwind-rn assums shadows are a box-shadow with a single shorthand value, something more complex was found'
		);
	}

	let color;
	let elevation;

	if (
		rule.declarations[0].value === 'none' ||
		rule.declarations[0].value.search(/inset/) !== -1
	) {
		return {
			shadowColor: 'rgba(0, 0, 0, 0)',
			shadowOffset: {width: 0, height: 0},
			shadowRadius: 0,
			shadowOpacity: 0,
			elevation: 0
		};
	}

	const results = rule.declarations[0].value.match(
		/^(\d+)p?x?\s(\d+)p?x?\s(\d+)p?x?\s(-?\d+)?p?x?\s?(rgba?\(.+?\))?(#[a-zA-Z\d]{3,8})?/
	);

	elevation = rule.declarations[0].value.match(/,(?:\s+)?(-?\d+)$/);

	color = results[5];

	elevation = elevation
		? translateValues(elevation[1])
		: translateValues(results[3]) / 2;

	if (typeof color === 'undefined') {
		color = results[6];
	}

	return {
		shadowColor: color,
		shadowOffset: {
			width: translateValues(results[1]),
			height: translateValues(results[2])
		},
		shadowRadius: translateValues(results[3]),
		shadowOpacity: 1,
		elevation: Math.round(elevation)
	};
}

const getStyles = rule => {
	const styles = rule.declarations
		.filter(({property, value}) => {
			// Skip line-height utilities without units
			if (property === 'line-height' && !value.endsWith('rem')) {
				return false;
			}

			return true;
		})
		.map(({property, value}) => {
			if (value.endsWith('rem')) {
				return [property, remToPx(value)];
			}

			if (property === 'font-family') {
				return [property, value.split(', ')[0]];
			}

			return [property, value];
		});

	return cssToReactNative(styles);
};

const supportedUtilities = [
	// Flexbox
	/^flex/,
	/^items-/,
	/^content-/,
	/^justify-/,
	/^self-/,
	// Display
	'hidden',
	'overflow-hidden',
	'overflow-visible',
	'overflow-scroll',
	// Position
	'absolute',
	'relative',
	// Top, right, bottom, left
	/^(inset-0|inset-x-0|inset-y-0)/,
	/^(top|bottom|left|right)-0$/,
	// Z Index
	/^z-\d+$/,
	// Padding
	/^(p.?-\d+|p.?-px)/,
	// Margin
	/^-?(m.?-\d+|m.?-px)/,
	// Width
	/^w-(\d|\/)+|^w-px|^w-full/,
	// Height
	/^(h-\d+|h-px|h-full)/,
	// Min/Max width/height
	/^(min-w-|max-w-|min-h-0|min-h-full|max-h-full)/,
	// Font size
	/^text-/,
	// Font style
	/^(not-)?italic$/,
	// Font weight
	/^font-/,
	// Letter spacing
	/^tracking-/,
	// Line height
	/^leading-\d+/,
	// Text align, color, opacity
	/^text-/,
	// Text transform
	'uppercase',
	'lowercase',
	'capitalize',
	'normal-case',
	// Background color
	/^bg-(transparent|black|white|gray|red|orange|yellow|green|teal|blue|indigo|purple|pink)/,
	// Background opacity
	/^bg-opacity-/,
	// Border color, style, width, radius, opacity
	/^(border|rounded)/,
	// Opacity
	/^opacity-/,
	// Pointer events
	/^pointer-events-/,
	/^shadow/,
	/^translate-/,
	/^scale-/,
	/^font-/
];

const isUtilitySupported = utility => {
	// Skip utilities with `currentColor` values
	if (['border-current', 'text-current'].includes(utility)) {
		return false;
	}

	// Skip inner shadows
	if (['shadow-outline', 'shadow-inner'].includes(utility)) {
		return false;
	}

	for (const supportedUtility of supportedUtilities) {
		if (typeof supportedUtility === 'string' && supportedUtility === utility) {
			return true;
		}

		if (supportedUtility instanceof RegExp && supportedUtility.test(utility)) {
			return true;
		}
	}

	return false;
};

module.exports = source => {
	const {stylesheet} = css.parse(source);

	// Mapping of Tailwind class names to React Native styles
	const styles = {};

	for (const rule of stylesheet.rules) {
		if (rule.type === 'rule') {
			for (const selector of rule.selectors) {
				const utility = selector.replace(/^\./, '').replace('\\/', '/');

				if (isUtilitySupported(utility)) {
					if (utility.startsWith('shadow')) {
						styles[utility] = convertShadow(rule);
					} else {
						styles[utility] = getStyles(rule);
					}
				}
			}
		}
	}

	// Additional styles that we're not able to parse correctly automatically
	styles.underline = {textDecorationLine: 'underline'};
	styles['line-through'] = {textDecorationLine: 'line-through'};
	styles['no-underline'] = {textDecorationLine: 'none'};

	return styles;
};
