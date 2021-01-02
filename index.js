
'use strict';
const {useWindowDimensions} = require('react-native');
const _create = require('./src/create');
const _createHook = require('./src/create-hook');
const defaultStyles = require('./styles.json');
const defaultScreens = require('./screens.json');

const {tailwind, getColor} = _create(defaultStyles, []);

let _useTailwind = null;
const useTailwind = () => {
	if (!_useTailwind) {
		_useTailwind = _createHook(defaultStyles, defaultScreens, useWindowDimensions);
	}

	return _useTailwind();
};

module.exports = tailwind;
module.exports.default = tailwind;
module.exports.getColor = getColor;
module.exports.useTailwind = useTailwind;
module.exports.create = tailwindStyles => _create(tailwindStyles, []);
module.exports.createHook = (tailwindStyles, screensConfig, dimensionsHook = useWindowDimensions) => _createHook(tailwindStyles, screensConfig, dimensionsHook);
