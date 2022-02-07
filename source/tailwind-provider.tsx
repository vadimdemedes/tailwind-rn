import * as React from 'react';
import {useColorScheme, ColorSchemeName} from 'react-native';
import {
	useDimensions,
	useAccessibilityInfo,
	useDeviceOrientation
} from '@react-native-community/hooks';
import TailwindContext from './tailwind-context';
import create from './create';
import {Utilities} from './types';

interface Props {
	utilities: Utilities;
	colorScheme?: ColorSchemeName;
}

const TailwindProvider: React.FC<Props> = ({
	utilities,
	colorScheme: overrideColorScheme,
	children
}) => {
	const colorScheme = useColorScheme() ?? 'light';
	const {width, height} = useDimensions().window;
	const {reduceMotionEnabled: reduceMotion} = useAccessibilityInfo();
	const orientation = useDeviceOrientation().portrait
		? 'portrait'
		: 'landscape';

	const tailwind = React.useMemo(() => {
		return create(utilities, {
			colorScheme: overrideColorScheme ?? colorScheme,
			width,
			height,
			reduceMotion: Boolean(reduceMotion),
			orientation
		});
	}, [
		utilities,
		colorScheme,
		overrideColorScheme,
		width,
		height,
		reduceMotion,
		orientation
	]);

	return (
		<TailwindContext.Provider value={tailwind}>
			{children}
		</TailwindContext.Provider>
	);
};

export default TailwindProvider;
