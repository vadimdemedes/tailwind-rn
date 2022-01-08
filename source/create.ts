import evaluateStyle from './lib/evaluate-style';
import emToPx from './lib/em-to-px';
import matchesMediaQuery from './lib/matches-media-query';
import {Styles, Style, Environment} from './types';

// Font variant numeric utilities need a special treatment, because
// there can be many font variant classes and they need to be transformed to an array
const FONT_VARIANT_REGEX =
	/(oldstyle-nums|lining-nums|tabular-nums|proportional-nums)/;

const FONT_VARIANTS = [
	'oldstyle-nums',
	'lining-nums',
	'tabular-nums',
	'proportional-nums'
];

const addFontVariant = (style: Style, classNames: string) => {
	if (!FONT_VARIANT_REGEX.test(classNames)) {
		return;
	}

	const fontVariants: string[] = [];

	for (const fontVariant of FONT_VARIANTS) {
		if (classNames.includes(fontVariant)) {
			fontVariants.push(fontVariant);
		}
	}

	style['fontVariant'] = fontVariants;
};

// Letter spacing also needs a special treatment, because its value is set
// in em unit, that's why it requires a font size to be set too
const FONT_SIZE_REGEX = /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/;
const LETTER_SPACING_REGEX = /(tracking-[a-z]+)/;

const addLetterSpacing = (
	tailwindStyles: Styles,
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

	const letterSpacingUtility = tailwindStyles[letterSpacingClass];

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

	const fontSizeUtility = tailwindStyles[fontSizeClass];

	if (!fontSizeUtility) {
		return;
	}

	const {fontSize} = fontSizeUtility.style;

	if (typeof fontSize !== 'number') {
		return;
	}

	style['letterSpacing'] = emToPx(letterSpacing, fontSize);
};

const defaultMedia: Environment = {
	orientation: 'portrait',
	colorScheme: 'light',
	reduceMotion: false,
	width: 0,
	height: 0
};

const create = (
	tailwindStyles: Styles,
	environment: Environment = defaultMedia
) => {
	// Pass a list of class names separated by a space, for example:
	// "bg-green-100 text-green-800 font-semibold")
	// and receive a styles object for use in React Native views
	const tailwind = (classNames: string) => {
		const style: Style = {};

		if (!classNames) {
			return style;
		}

		addFontVariant(style, classNames);
		addLetterSpacing(tailwindStyles, style, classNames);

		const separateClassNames = classNames
			.replace(/\s+/g, ' ')
			.trim()
			.split(' ')
			.filter(className => {
				return (
					!className.startsWith('tracking-') &&
					!FONT_VARIANT_REGEX.test(className)
				);
			});

		for (const className of separateClassNames) {
			const tailwindStyle = tailwindStyles[className];

			if (!tailwindStyle) {
				console.warn(`Unsupported Tailwind class: "${className}"`);
				continue;
			}

			if (tailwindStyle.media) {
				if (matchesMediaQuery(tailwindStyle.media, environment)) {
					Object.assign(style, tailwindStyle.style);
				}
			} else {
				Object.assign(style, tailwindStyle.style);
			}
		}

		return evaluateStyle(style);
	};

	// Pass the class of a color (e.g. "bg-blue-500") and receive a color value (e.g. "#4399e1"),
	// or a color and opacity (e.g. "bg-black bg-opacity-50") and get a color with opacity (e.g. "rgba(0,0,0,0.5)")
	const getColor = (classNames: string) => {
		const style = tailwind(classNames) as {
			backgroundColor?: string;
			textColor?: string;
		};

		return style.backgroundColor ?? style.textColor;
	};

	return {tailwind, getColor};
};

export default create;
