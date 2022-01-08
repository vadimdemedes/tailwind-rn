import * as React from 'react';
import {useColorScheme} from 'react-native';
import {
	useDimensions,
	useAccessibilityInfo,
	useDeviceOrientation
} from '@react-native-community/hooks';
import TailwindContext from './tailwind-context';
import create from './create';
import {Styles} from './types';

interface Props {
	styles: Styles;
}

const TailwindProvider: React.FC<Props> = ({styles, children}) => {
	const colorScheme = useColorScheme() ?? 'light';
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
			reduceMotion: Boolean(reduceMotion),
			orientation
		}).tailwind;
	}, [styles, colorScheme, width, height, reduceMotion, orientation]);

	return (
		<TailwindContext.Provider value={tailwind}>
			{children}
		</TailwindContext.Provider>
	);
};

export default TailwindProvider;
