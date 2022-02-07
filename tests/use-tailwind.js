const Module = require('module');
const test = require('ava');
const React = require('react');
const TestRenderer = require('react-test-renderer');
const delay = require('delay');
const compile = require('./helpers/compile');

const originalLoad = Module._load;
let reduceMotion = false;
let colorScheme = null;
let width = 1000;
let height = 400;
let orientation = 'portrait';

Module._load = function (request, parent) {
	if (request === 'react-native') {
		return {
			useColorScheme: () => colorScheme
		};
	}

	if (request === '@react-native-community/hooks') {
		return {
			useAccessibilityInfo: () => ({
				reduceMotionEnabled: reduceMotion
			}),
			useDimensions: () => ({
				window: {width, height}
			}),
			useDeviceOrientation: () => ({
				portrait: orientation === 'portrait',
				landscape: orientation === 'landscape'
			})
		};
	}

	return originalLoad.call(this, request, parent);
};

const {TailwindProvider, useTailwind} = require('..');

const render = async (classNames, {colorScheme} = {}) => {
	const {utilities} = await compile(classNames, {
		theme: {
			extend: {
				screens: {
					'sm-height': {
						raw: '(min-height: 640px)'
					}
				}
			}
		}
	});

	const Component = () => {
		const tailwind = useTailwind();

		return React.createElement('span', {style: tailwind(classNames)});
	};

	let testRenderer;

	TestRenderer.act(() => {
		testRenderer = TestRenderer.create(
			React.createElement(
				TailwindProvider,
				{utilities, colorScheme},
				React.createElement(Component)
			)
		);
	});

	await delay(100);

	return testRenderer.toJSON().props.style;
};

test.serial('apply style', async t => {
	const style = await render('bg-white');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('light mode', async t => {
	colorScheme = 'light';

	const style = await render('bg-white dark:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('dark mode', async t => {
	colorScheme = 'dark';

	const style = await render('bg-white dark:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('override native color scheme to light', async t => {
	colorScheme = 'dark';

	const style = await render('bg-white dark:bg-black', {colorScheme: 'light'});

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('override native color scheme to dark', async t => {
	const style = await render('bg-white dark:bg-black', {colorScheme: 'dark'});

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('without reduced motion', async t => {
	reduceMotion = false;

	const style = await render('bg-white motion-reduce:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('with reduced motion', async t => {
	reduceMotion = true;

	const style = await render('bg-white motion-reduce:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('matches portrait', async t => {
	orientation = 'portrait';

	const style = await render('bg-white portrait:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match portrait', async t => {
	orientation = 'landscape';

	const style = await render('bg-white portrait:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches landscape', async t => {
	orientation = 'landscape';

	const style = await render('bg-white landscape:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match landscape', async t => {
	orientation = 'portrait';

	const style = await render('bg-white landscape:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches width breakpoint', async t => {
	width = 1000;

	const style = await render('bg-white sm:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match width breakpoint', async t => {
	width = 100;

	const style = await render('bg-white sm:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches height breakpoint', async t => {
	height = 1000;

	const style = await render('bg-white sm-height:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match height breakpoint', async t => {
	height = 100;

	const style = await render('bg-white sm-height:bg-black');

	t.deepEqual(style, {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});
