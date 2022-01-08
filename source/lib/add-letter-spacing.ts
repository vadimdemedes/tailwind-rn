import {Utilities, Style} from '../types';
import emToPx from './em-to-px';

const FONT_SIZE_REGEX = /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/;
const LETTER_SPACING_REGEX = /(tracking-[a-z]+)/;

const addLetterSpacing = (
	utilities: Utilities,
	style: Style,
	classNames: string
) => {
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

	if (typeof letterSpacingClass !== 'string') {
		return;
	}

	const letterSpacingUtility = utilities[letterSpacingClass];

	if (!letterSpacingUtility) {
		return;
	}

	const {letterSpacing} = letterSpacingUtility.style;

	if (typeof letterSpacing !== 'string') {
		return;
	}

	const fontSizeClass = fontSizeMatches[0];

	if (typeof fontSizeClass !== 'string') {
		return;
	}

	const fontSizeUtility = utilities[fontSizeClass];

	if (!fontSizeUtility) {
		return;
	}

	const {fontSize} = fontSizeUtility.style;

	if (typeof fontSize !== 'number') {
		return;
	}

	style['letterSpacing'] = emToPx(letterSpacing, fontSize);
};

export default addLetterSpacing;
