import {Style} from '../types';

const regex = /(oldstyle-nums|lining-nums|tabular-nums|proportional-nums)/;

const utilities = [
	'oldstyle-nums',
	'lining-nums',
	'tabular-nums',
	'proportional-nums'
];

const addFontVariant = (style: Style, classNames: string) => {
	if (!regex.test(classNames)) {
		return;
	}

	const fontVariant: string[] = [];

	for (const utility of utilities) {
		if (classNames.includes(utility)) {
			fontVariant.push(utility);
		}
	}

	style['fontVariant'] = fontVariant;
};

export default addFontVariant;
