import {
	useAccessibilityInfo,
	useDeviceOrientation,
	useDimensions
} from '@react-native-community/hooks';
import * as React from 'react';
import {useColorScheme, ColorSchemeName} from 'react-native';

import create from './create';
import TailwindContext from './tailwind-context';
import {Utilities} from './types';

interface Props {
	utilities: Utilities;
	theme?: ColorSchemeName;
}

const TailwindProvider: React.FC<Props> = ({utilities, theme, children}) => {
	const colorScheme = theme ?? useColorScheme() ?? 'light';
	const {width, height} = useDimensions().window;
	const {reduceMotionEnabled: reduceMotion} = useAccessibilityInfo();
	const orientation = useDeviceOrientation().portrait
		? 'portrait'
		: 'landscape';

	const tailwind = React.useMemo(() => {
		return create(utilities, {
			colorScheme,
			width,
			height,
			reduceMotion: Boolean(reduceMotion),
			orientation
		});
	}, [utilities, colorScheme, width, height, reduceMotion, orientation]);

	return (
		<TailwindContext.Provider value={tailwind}>
			{children}
		</TailwindContext.Provider>
	);
};

export default TailwindProvider;
