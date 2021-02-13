type TailwindRN = (classNames: string) => {[key: string]: string};
type TailwindRNColorHelper = (color: string) => string;
type TailwindRNInstance = {
	tailwind: TailwindRN;
	getColor: TailwindRNColorHelper;
};
type TailwindRNHook = () => TailwindRNInstance;

type TailwindRNScreenConfig = Readonly<{[key: string]: {min: number} }>;

declare const tailwindRN: TailwindRN;
export const getColor: TailwindRNColorHelper;
export const useTailwind: TailwindRNHook;

export function create(styles: object): TailwindRNInstance;
export function createHook(styles: object, screens: TailwindRNScreenConfig): TailwindRNHook;

export default tailwindRN;
