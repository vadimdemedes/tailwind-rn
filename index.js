
'use strict';
const React = require('react');
const ReactNative = require('react-native');
const _create = require('./src/create');
const _createHook = require('./src/create-hook')(React, ReactNative);
const defaultStyles = require('./styles.json');
const defaultScreens = require('./screens.json');

const {tailwind, getColor} = _create(defaultStyles, []);

let _useTailwind = null;
const useTailwind = () => {
	if (!_useTailwind) {
		_useTailwind = _createHook(defaultStyles, defaultScreens);
	}

	return _useTailwind();
};

module.exports = tailwind;
module.exports.default = tailwind;
module.exports.getColor = getColor;
module.exports.useTailwind = useTailwind;
module.exports.create = tailwindStyles => _create(tailwindStyles, []);
module.exports.createHook = (tailwindStyles, screensConfig) => _createHook(tailwindStyles, screensConfig);
