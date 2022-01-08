import * as css from 'css';
import cssToReactNative, {StyleTuple} from 'css-to-react-native';
import remToPx from './lib/rem-to-px';
import {Styles} from './types';

const getStyles = (rule: css.Rule) => {
	const styles: StyleTuple[] = (
		rule.declarations as Array<Required<css.Declaration>>
	)
		.filter(({property, value}) => {
			// Skip line-height utilities without units
			if (property === 'line-height') {
				return typeof value === 'string' && value.endsWith('rem');
			}

			return true;
		})
		.map(({property, value}) => {
			if (typeof value === 'string' && value.endsWith('rem')) {
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
	'font-variant-numeric',
	'list-style-type',
	'list-style-position',
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

const supportedPropertiesWithAuto = new Set([
	'align-self',
	'pointer-events',
	'margin-top',
	'margin-right',
	'margin-bottom',
	'margin-left'
]);

const isUtilitySupported = (utility: string, rule: css.Rule) => {
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

	if (!Array.isArray(rule.declarations)) {
		return false;
	}

	// Skip utilities with unsupported properties
	for (const declaration of rule.declarations) {
		const {property, value} = declaration as Required<css.Declaration>;

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
			(value === 'auto' && !supportedPropertiesWithAuto.has(property)) ||
			value.endsWith('vw') ||
			value.endsWith('vh') ||
			value === 'currentColor'
		) {
			return false;
		}

		if (property === 'text-decoration-line' && value === 'overline') {
			return false;
		}
	}

	return true;
};

const build = (source: string) => {
	const {stylesheet} = css.parse(source);

	// Mapping of Tailwind class names to React Native styles
	const styles: Styles = {};

	if (!stylesheet) {
		return styles;
	}

	const addRule = (rule: css.Rule, media?: string) => {
		if (!Array.isArray(rule.selectors)) {
			return;
		}

		for (const selector of rule.selectors) {
			const utility = selector.replace(/^\./, '').replace(/\\/g, '');

			if (isUtilitySupported(utility, rule)) {
				styles[utility] = {
					style: getStyles(rule),
					media
				};
			}
		}
	};

	for (const rule of stylesheet.rules) {
		if (rule.type === 'rule') {
			addRule(rule);
		}

		if (rule.type === 'media') {
			const mediaRule = rule as Required<css.Media>;

			for (const childRule of mediaRule.rules) {
				if (childRule.type === 'rule') {
					addRule(childRule, mediaRule.media);
				}
			}
		}
	}

	return styles;
};

export default build;
