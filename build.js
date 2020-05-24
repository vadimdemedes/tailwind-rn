'use strict';
const css = require('css');
const cssToReactNative = require('css-to-react-native').default;
const remToPx = value => `${Number.parseFloat(value) * 16}px`;

function translateValues(value) {
	let translatedValue = value;

	if (translatedValue === 'transparent') {
		return 'rgba(0,0,0,0)';
	}

	if (typeof translatedValue !== 'string') {
		return translatedValue;
	}

	if (value.search(/^-?[0-9]+$/) !== -1) {
		return parseInt(translatedValue);
	}

	if (value.search(/-?\.[0-9]+$/) !== -1) {
		return parseFloat(translatedValue);
	}

	if (value.search(/^[0-9]+$/) !== -1) {
		return parseInt(translatedValue);
	}

	return translatedValue;
}

function convertShadow(rule) {
	if (rule.declarations.length > 1) {
		throw new Error(
			'tailwind-rn assums shadows are a box-shadow with a single shorthand value, something more complex was found'
		);
	}

	let results, color, elevation;

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

	results = rule.declarations[0].value.match(
		/^([0-9]+)p?x?\s([0-9]+)p?x?\s([0-9]+)p?x?\s(-?[0-9]+)?p?x?\s?(rgba?\(.+?\))?(#[a-zA-Z0-9]{3,8})?/
	);

	elevation = rule.declarations[0].value.match(/,(?:\s+)?(-?[0-9]+)$/);

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
	/^font-(family|hairline|thin|light|normal|medium|semibold|bold|extrabold|black)/,
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
	/^shadow-/
];

const isUtilitySupported = utility => {
	// Skip utilities with `currentColor` values
	if (['border-current', 'text-current'].includes(utility)) {
		return false;
	}

	// skip inner shadows
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
					if (/^shadow-/.test(utility)) {
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
