export type Style = Record<string, unknown>;
export type Styles = Record<
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
