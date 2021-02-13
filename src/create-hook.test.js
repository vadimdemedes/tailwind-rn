import test from 'ava';
import createHook from './create-hook';
import defaultStyles from '../styles.json';
import defaultScreens from '../screens.json';

const getMockedTailwind = ({width}) => {
	const ReactMock = {useMemo: fn => fn()};
	const ReactNativeMock = {useWindowDimensions: () => ({width})};
	const mockedCreateHook = createHook(ReactMock, ReactNativeMock);

	const useTailwind = mockedCreateHook(defaultStyles, defaultScreens);
	const {tailwind} = useTailwind();

	return tailwind;
};

test('without breakpoints', t => {
	const tailwind = getMockedTailwind({width: 0});

	t.deepEqual(tailwind('text-blue-500 unknown'), {
		color: 'rgba(59, 130, 246, 1)'
	});

	t.deepEqual(tailwind('text-base tracking-tighter'), {
		fontSize: 16,
		letterSpacing: -0.8,
		lineHeight: 24
	});

	t.deepEqual(tailwind('text-base tracking-tight'), {
		fontSize: 16,
		letterSpacing: -0.4,
		lineHeight: 24
	});

	t.deepEqual(tailwind('text-base tracking-normal'), {
		fontSize: 16,
		letterSpacing: 0,
		lineHeight: 24
	});

	t.deepEqual(tailwind('text-base tracking-wide'), {
		fontSize: 16,
		letterSpacing: 0.4,
		lineHeight: 24
	});

	t.deepEqual(tailwind('text-base tracking-wider'), {
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	t.deepEqual(tailwind('text-base tracking-widest'), {
		fontSize: 16,
		letterSpacing: 1.6,
		lineHeight: 24
	});
});

test('get styles for one breakpoint class', t => {
	let tailwind = getMockedTailwind({width: 639});
	t.deepEqual(tailwind('text-base tracking-widest sm:tracking-wider'), {
		fontSize: 16,
		letterSpacing: 1.6,
		lineHeight: 24
	});

	tailwind = getMockedTailwind({width: 640});
	t.deepEqual(tailwind('text-base tracking-widest sm:tracking-wider'), {
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	tailwind = getMockedTailwind({width: 1536});
	t.deepEqual(tailwind('text-base tracking-widest md:tracking-wider'), {
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	tailwind = getMockedTailwind({width: 1536});
	t.deepEqual(tailwind('text-base tracking-widest lg:tracking-wider'), {
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	tailwind = getMockedTailwind({width: 1536});
	t.deepEqual(tailwind('text-base tracking-widest xl:tracking-wider'), {
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	tailwind = getMockedTailwind({width: 1536});
	t.deepEqual(tailwind('text-base tracking-widest 2xl:tracking-wider'), {
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});
});

test('get styles for multiple breakpoint class', t => {
	// Default => blue widest
	let tailwind = getMockedTailwind({width: 639});
	t.deepEqual(tailwind('2xl:tracking-tight text-base text-blue-500 tracking-widest sm:tracking-wider md:tracking-wide xl:text-green-200 lg:text-red-500'), {
		color: 'rgba(59, 130, 246, 1)',
		fontSize: 16,
		letterSpacing: 1.6,
		lineHeight: 24
	});

	// Sm => blue wider
	tailwind = getMockedTailwind({width: 767});
	t.deepEqual(tailwind('2xl:tracking-tight text-base text-blue-500 tracking-widest sm:tracking-wider md:text-red-500 xl:text-green-500 lg:tracking-wide'), {
		color: 'rgba(59, 130, 246, 1)',
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	// Md => red wider
	tailwind = getMockedTailwind({width: 1023});
	t.deepEqual(tailwind('2xl:tracking-tight text-base text-blue-500 tracking-widest sm:tracking-wider md:text-red-500 xl:text-green-500 lg:tracking-wide'), {
		color: 'rgba(239, 68, 68, 1)',
		fontSize: 16,
		letterSpacing: 0.8,
		lineHeight: 24
	});

	// Lg => red wide
	tailwind = getMockedTailwind({width: 1279});
	t.deepEqual(tailwind('2xl:tracking-tight text-base text-blue-500 tracking-widest sm:tracking-wider md:text-red-500 xl:text-green-500 lg:tracking-wide'), {
		color: 'rgba(239, 68, 68, 1)',
		fontSize: 16,
		letterSpacing: 0.4,
		lineHeight: 24
	});

	// Xl => green wide
	tailwind = getMockedTailwind({width: 1535});
	t.deepEqual(tailwind('2xl:tracking-tight text-base text-blue-500 tracking-widest sm:tracking-wider md:text-red-500 xl:text-green-500 lg:tracking-wide'), {
		color: 'rgba(16, 185, 129, 1)',
		fontSize: 16,
		letterSpacing: 0.4,
		lineHeight: 24
	});

	// 2xl => green tight
	tailwind = getMockedTailwind({width: 1537});
	t.deepEqual(tailwind('2xl:tracking-tight text-base text-blue-500 tracking-widest sm:tracking-wider md:text-red-500 xl:text-green-500 lg:tracking-wide'), {
		color: 'rgba(16, 185, 129, 1)',
		fontSize: 16,
		letterSpacing: -0.4,
		lineHeight: 24
	});
});

test('support font-variant-numeric', t => {
	// Default
	let tailwind = getMockedTailwind({width: 639});
	t.deepEqual(tailwind('md:proportional-nums oldstyle-nums sm:lining-nums md:tabular-nums xl:oldstyle-nums'), {
		fontVariant: ['oldstyle-nums']
	});

	// Sm
	tailwind = getMockedTailwind({width: 767});
	t.deepEqual(tailwind('md:proportional-nums oldstyle-nums sm:lining-nums md:tabular-nums xl:oldstyle-nums'), {
		fontVariant: ['lining-nums']
	});

	// Md
	tailwind = getMockedTailwind({width: 1023});
	t.deepEqual(tailwind('md:proportional-nums oldstyle-nums sm:lining-nums md:tabular-nums xl:oldstyle-nums'), {
		fontVariant: ['proportional-nums', 'tabular-nums']
	});

	// Lg
	tailwind = getMockedTailwind({width: 1279});
	t.deepEqual(tailwind('md:proportional-nums oldstyle-nums sm:lining-nums md:tabular-nums xl:oldstyle-nums'), {
		fontVariant: ['proportional-nums', 'tabular-nums']
	});

	// Xl
	tailwind = getMockedTailwind({width: 1535});
	t.deepEqual(tailwind('md:proportional-nums oldstyle-nums sm:lining-nums md:tabular-nums xl:oldstyle-nums'), {
		fontVariant: ['oldstyle-nums']
	});
});

