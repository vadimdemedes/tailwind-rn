const React = require('react');
const {useColorScheme} = require('react-native');
const {
	useDimensions,
	useAccessibilityInfo,
	useDeviceOrientation
} = require('@react-native-community/hooks');
const TailwindContext = require('./tailwind-context');
const create = require('./create');

const TailwindProvider = ({styles, children}) => {
	const colorScheme = useColorScheme() || 'light';
	const {width, height} = useDimensions().window;
	const {reduceMotionEnabled: reduceMotion} = useAccessibilityInfo();
	const orientation = useDeviceOrientation().portrait
		? 'portrait'
		: 'landscape';

	const tailwind = React.useMemo(() => {
		return create(styles, {
			colorScheme,
			width,
			height,
			reduceMotion,
			orientation
		}).tailwind;
	}, [styles, colorScheme, width, height, reduceMotion, orientation]);

	return React.createElement(
		TailwindContext.Provider,
		{
			value: tailwind
		},
		children
	);
};

module.exports = TailwindProvider;
