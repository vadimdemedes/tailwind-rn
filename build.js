'use strict';
const css = require('css');
const cssToReactNative = require('css-to-react-native').default;

const remToPx = value => `${Number.parseFloat(value) * 16}px`;

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

const unsupportedProperties = new Set([
	'box-sizing',
	'float',
	'clear',
	'object-fit',
	'object-position',
	'overflow-x',
	'overflow-y',
	'-webkit-overflow-scrolling',
	'overscroll-behavior',
	'overscroll-behavior-x',
	'overscroll-behavior-y',
	'visibility',
	'order',
	'grid-template-columns',
	'grid-column',
	'grid-column-start',
	'grid-column-end',
	'grid-template-rows',
	'grid-row',
	'grid-row-start',
	'grid-row-end',
	'grid-auto-flow',
	'grid-auto-columns',
	'grid-auto-rows',
	'gap',
	'column-gap',
	'row-gap',
	'justify-items',
	'justify-self',
	'place-content',
	'place-items',
	'place-self',
	'font-family',
	'list-style-type',
	'list-style-position',
	'text-decoration',
	'vertical-align',
	'white-space',
	'word-break',
	'background-attachment',
	'background-clip',
	'background-position',
	'background-repeat',
	'background-size',
	'background-image',
	'border-collapse',
	'table-layout',
	'box-shadow',
	'transition-property',
	'transition-duration',
	'transition-timing-function',
	'transition-delay',
	'animation',
	'transform',
	'transform-origin',
	'appearance',
	'cursor',
	'outline',
	'resize',
	'user-select',
	'fill',
	'stroke',
	'stroke-width'
]);

const isUtilitySupported = (utility, rule) => {
	// Skip utilities with pseudo-selectors
	if (utility.includes(':')) {
		return false;
	}

	// Skip unsupported utilities
	if (
		[
			'clearfix',
			'antialiased',
			'subpixel-antialiased',
			'sr-only',
			'not-sr-only'
		].includes(utility) ||
		/^(space|placeholder|from|via|to|divide)-/.test(utility) ||
		/^-?(scale|rotate|translate|skew)-/.test(utility)
	) {
		return false;
	}

	// Skip utilities with unsupported properties
	for (const {property, value} of rule.declarations) {
		if (unsupportedProperties.has(property)) {
			return false;
		}

		if (property === 'display' && !['flex', 'none'].includes(value)) {
			return false;
		}

		if (
			property === 'overflow' &&
			!['visible', 'hidden', 'scroll'].includes(value)
		) {
			return false;
		}

		if (property === 'position' && !['absolute', 'relative'].includes(value)) {
			return false;
		}

		if (property === 'line-height' && !value.endsWith('rem')) {
			return false;
		}

		if (
			value === 'auto' ||
			value.endsWith('vw') ||
			value.endsWith('vh') ||
			value === 'currentColor'
		) {
			return false;
		}
	}

	return true;
};

module.exports = source => {
	const {stylesheet} = css.parse(source);

	// Mapping of Tailwind class names to React Native styles
	const styles = {};

	for (const rule of stylesheet.rules) {
		if (rule.type === 'rule') {
			for (const selector of rule.selectors) {
				const utility = selector.replace(/^\./, '').replace('\\', '');

				if (isUtilitySupported(utility, rule)) {
					styles[utility] = getStyles(rule);
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
