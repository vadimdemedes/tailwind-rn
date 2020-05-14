'use strict';
const path = require('path');
const fs = require('fs');
const css = require('css');
const cssToReactNative = require('css-to-react-native').default;
const pkgJson = require('tailwindcss/package.json');

const pkgPath = require.resolve('tailwindcss').replace(pkgJson.main, '');
const source = fs.readFileSync(path.join(pkgPath, pkgJson.style), 'utf8');
const {stylesheet} = css.parse(source);

const remToPx = value => `${parseFloat(value) * 16}px`;

const getStyles = rule => {
	const styles = rule.declarations
		.filter(({property, value}) => {
			// Skip line-height utilities without units
			if (property === 'line-height' && !value.endsWith('rem')) {
				return false;
			}
			// Skip CSS variable : currentColor
			if (value.endsWith("currentColor")) {
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
	/^font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)/,
	// Letter spacing
	/^tracking-/,
	// Line height
	/^leading-\d+/,
	// Text align, color
	/^text-/,
	// Text transform
	'uppercase',
	'lowercase',
	'capitalize',
	'normal-case',
	// Background color
	/^bg-(transparent|black|white|gray|red|orange|yellow|green|teal|blue|indigo|purple|pink)/,
	// Border color, style, width, radius
	/^(border|rounded)/,
	// Opacity
	/^opacity-/,
	// Pointer events
	/^pointer-events-/
];

const isUtilitySupported = utility => {
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

// Mapping of Tailwind class names to React Native styles
const styles = {};

for (const rule of stylesheet.rules) {
	if (rule.type === 'rule') {
		for (const selector of rule.selectors) {
			const utility = selector.replace(/^\./, '').replace('\\/', '/');

			if (isUtilitySupported(utility)) {
				styles[utility] = getStyles(rule);
			}
		}
	}
}

// Additional styles that we're not able to parse correctly automatically
styles.underline = {textDecorationLine: 'underline'};
styles['line-through'] = {textDecorationLine: 'line-through'};
styles['no-underline'] = {textDecorationLine: 'none'};

// Shadow
styles["shadow-xs"] = {
	shadowOffset: {
		width: 0,
		height: 0,
	},
	shadowRadius: 1,
	shadowColor: "rgba(0, 0, 0, 0.3)",
	shadowOpacity: 1
};
styles["shadow-sm"] = {
	shadowOffset: {
	  width: 0,
	  height: 1,
	},
	shadowRadius: 2,
	shadowColor: "rgba(0, 0, 0, 0.05)",
	shadowOpacity: 1
};
styles["shadow"] = {
	shadowOffset: {
	  width: 0,
	  height: 1,
	},
	shadowRadius: 3,
	shadowColor: "rgba(0, 0, 0, 0.2)",
	shadowOpacity: 1,
};
styles["shadow-md"] = {
	shadowOffset: {
	  width: 0,
	  height: 4,
	},
	shadowRadius: 6,
	shadowColor: "rgba(0, 0, 0, 0.1)",
	shadowOpacity: 1
};
styles["shadow-lg"] = {
	shadowOffset: {
	  width: 0,
	  height: 10,
	},
	shadowRadius: 15,
	shadowColor: "rgba(0, 0, 0, 0.15)",
	shadowOpacity: 1
};
styles["shadow-xl"] = {
	shadowOffset: {
	  width: 0,
	  height: 20,
	},
	shadowRadius: 25,
	shadowColor: "rgba(0, 0, 0, 0.12)",
	shadowOpacity: 1
};
styles["shadow-2xl"] = {
	shadowOffset: {
	  width: 0,
	  height: 25,
	},
	shadowRadius: 50,
	shadowColor: "rgba(0, 0, 0, 0.25)",
	shadowOpacity: 1
};
styles["shadow-outline"] = {
	borderWidth: 3,
	borderColor: "rgba(66, 153, 225, 0.5)",
	borderStyle: "solid"
};
styles["shadow-none"] = {
	shadowOffset: {
	  width: 0,
	  height: 0,
	},
	shadowRadius: 0,
	shadowColor: "black",
	shadowOpacity: 1
};

fs.writeFileSync(
	path.join(__dirname, 'styles.json'),
	JSON.stringify(styles, null, '\t')
);
