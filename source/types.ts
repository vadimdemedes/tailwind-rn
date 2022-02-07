import {ColorSchemeName} from 'react-native';

export type Style = Record<string, unknown>;
export type Utilities = Record<
	string,
	{
		style: Style;
		media?: string;
	}
>;
export interface Environment {
	orientation: 'portrait' | 'landscape';
	colorScheme: ColorSchemeName;
	reduceMotion: boolean;
	width: number;
	height: number;
}
