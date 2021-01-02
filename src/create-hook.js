'use-strict';
const create = require('./create');

const createHook = (tailwindStyles, screensConfig, useWindowDimensions) => {
	if (!useWindowDimensions) {
		throw new Error('Unsupported react native version, useWindowDimensions hook not found');
	}

	return () => {
		const {width} = useWindowDimensions();
		const breakpointsConfig = Object.keys(screensConfig)
			.sort((a, b) => screensConfig[a].min - screensConfig[b].min)
			.map(key => {
				const breakpoint = screensConfig[key];

				return {
					name: key,
					actif: width >= breakpoint.min
				};
			});

		return create(tailwindStyles, breakpointsConfig);
	};
};

module.exports = createHook;
