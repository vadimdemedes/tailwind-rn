import * as css from 'css';
import cssToReactNative, {StyleTuple} from 'css-to-react-native';
import remToPx from './lib/rem-to-px';
import {Styles} from './types';

const getStyles = (rule: css.Rule) => {
	const declarations = rule.declarations as Array<Required<css.Declaration>>;

	const styles: StyleTuple[] = declarations.map(({property, value}) => {
		if (typeof value === 'string' && value.endsWith('rem')) {
			return [property, remToPx(value)];
		}

		return [property, value];
	});

	return cssToReactNative(styles);
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

			styles[utility] = {
				style: getStyles(rule),
				media
			};
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
