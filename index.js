'use strict';
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

const create = styles => {
	// Pass a list of class names separated by a space, for example:
	// "bg-green-100 text-green-800 font-semibold")
	// and receive a styles object for use in React Native views
	const tailwind = classNames => {
		const object = {};

		if (!classNames) {
			return object;
		}

		for (const className of classNames.replace(/\s+/g, ' ').trim().split(' ')) {
			if (styles[className]) {
				Object.assign(object, styles[className]);
			} else {
				console.warn(`Unsupported Tailwind class: "${className}"`);
			}
		}

		return useVariables(object);
	};

	// Pass the name of a color (e.g. "blue-500") and receive a color value (e.g. "#4399e1")
	const getColor = name => {
		const object = tailwind(`bg-${name}`);
		return object.backgroundColor;
	};

	return {tailwind, getColor};
};

const {tailwind, getColor} = create(require('./styles.json'));

module.exports = tailwind;
module.exports.default = tailwind;
module.exports.getColor = getColor;
module.exports.create = create;
