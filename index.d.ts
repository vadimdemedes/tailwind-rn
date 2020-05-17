export default function tailwind(classNames: string): {[key: string]: string};
export function getColor(color: string): string;
export function create(
	styles: object
): {
	tailwind: (classNames: string) => {[key: string]: string};
	getColor: (color: string) => string;
};
