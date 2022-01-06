export default function tailwind(classNames: string): Record<string, string>;
export function getColor(color: string): string;
export function create(styles: Record<string, unknown>): {
	tailwind: (classNames: string) => Record<string, string>;
	getColor: (color: string) => string;
};
