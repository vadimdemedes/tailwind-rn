'use strict';

const create = require('./create');

const createHook = (React, ReactNative) => {
	return (tailwindStyles, screensConfig) => {
		if (!React || !React.useMemo) {
			throw new Error('Unsupported react version, useMemo hook not found');
		}

		if (!ReactNative || !ReactNative.useWindowDimensions) {
			throw new Error('Unsupported react-native version, useWindowDimensions hook not found');
		}

		return () => {
			const {width} = ReactNative.useWindowDimensions();
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

			return React.useMemo(() => {
				return create(tailwindStyles, breakpointsConfig);
			}, [tailwindStyles, cachekey]);
		};
	};
};

module.exports = createHook;
