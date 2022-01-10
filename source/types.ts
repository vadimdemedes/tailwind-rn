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
	colorScheme: 'light' | 'dark';
	reduceMotion: boolean;
	width: number;
	height: number;
}
