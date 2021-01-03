'use strict';

const create = require('./create');

const createHook = (tailwindStyles, screensConfig, useWindowDimensions, useMemo) => {
	if (!useMemo) {
		throw new Error('Unsupported react version, useMemo hook not found');
	}

	if (!useWindowDimensions) {
		throw new Error('Unsupported react-native version, useWindowDimensions hook not found');
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
		const cachekey = breakpointsConfig.map(breakpoint => `${breakpoint.name}=${breakpoint.actif}`);

		return useMemo(() => {
			return create(tailwindStyles, breakpointsConfig);
		}, [tailwindStyles, cachekey]);
	};
};

module.exports = createHook;
