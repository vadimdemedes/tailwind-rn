'use strict';
const styles = require('./styles.json');

// Pass a list of class names separated by a space, for example:
// "bg-green-100 text-green-800 font-semibold")
// and receive a styles object for use in React Native views
const tailwind = classNames => classNames.split(' ').reduce((currentStyles, className) => {
	if (!styles[className]) {
		console.warn(`Unsupported Tailwind class: "${className}"`);
	}

	return {...currentStyles, ...styles[className]};
}, {});

// Pass the name of a color (e.g. "blue-500") and receive a color value (e.g. "#4399e1")
const getColor = name => tailwind(`bg-${name}`).backgroundColor;

module.exports = tailwind;
module.exports.default = tailwind;
module.exports.getColor = getColor;
