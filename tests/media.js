const test = require('ava');
const compile = require('./helpers/compile');

test.serial('light mode', async t => {
	const {tailwind} = await compile('bg-white dark:bg-black', undefined, {
		colorScheme: 'light'
	});

	t.deepEqual(tailwind('bg-white dark:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('dark mode', async t => {
	const {tailwind} = await compile('bg-white dark:bg-black', undefined, {
		colorScheme: 'dark'
	});

	t.deepEqual(tailwind('bg-white dark:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('without reduced motion', async t => {
	const {tailwind} = await compile(
		'bg-white motion-reduce:bg-black',
		undefined,
		{
			reduceMotion: false
		}
	);

	t.deepEqual(tailwind('bg-white motion-reduce:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('with reduced motion', async t => {
	const {tailwind} = await compile(
		'bg-white motion-reduce:bg-black',
		undefined,
		{
			reduceMotion: true
		}
	);

	t.deepEqual(tailwind('bg-white motion-reduce:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('matches portrait', async t => {
	const {tailwind} = await compile('bg-white portrait:bg-black', undefined, {
		orientation: 'portrait'
	});

	t.deepEqual(tailwind('bg-white portrait:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match portrait', async t => {
	const {tailwind} = await compile('bg-white portrait:bg-black', undefined, {
		orientation: 'landscape'
	});

	t.deepEqual(tailwind('bg-white portrait:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches landscape', async t => {
	const {tailwind} = await compile('bg-white landscape:bg-black', undefined, {
		orientation: 'landscape'
	});

	t.deepEqual(tailwind('bg-white landscape:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match landscape', async t => {
	const {tailwind} = await compile('bg-white landscape:bg-black', undefined, {
		orientation: 'portrait'
	});

	t.deepEqual(tailwind('bg-white landscape:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches min-width', async t => {
	const {tailwind} = await compile('bg-white sm:bg-black', undefined, {
		width: 1000
	});

	t.deepEqual(tailwind('bg-white sm:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match min-width', async t => {
	const {tailwind} = await compile('bg-white sm:bg-black', undefined, {
		width: 100
	});

	t.deepEqual(tailwind('bg-white sm:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches custom min-width', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: '640px'
				}
			}
		},
		{
			width: 1000
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match custom min-width', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: '640px'
				}
			}
		},
		{
			width: 100
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches max-width', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: {
						max: '640px'
					}
				}
			}
		},
		{
			width: 100
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match max-width', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: {
						max: '640px'
					}
				}
			}
		},
		{
			width: 1000
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches fixed-range breakpoint', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: {
						min: '480px',
						max: '640px'
					}
				}
			}
		},
		{
			width: 500
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match fixed-range breakpoint', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: {
						min: '480px',
						max: '640px'
					}
				}
			}
		},
		{
			width: 1000
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});

test.serial('matches custom media query', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: {
						raw: '(min-height: 640px)'
					}
				}
			}
		},
		{
			height: 1000
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(0, 0, 0, 1)'
	});
});

test.serial('does not match custom media query', async t => {
	const {tailwind} = await compile(
		'bg-white tablet:bg-black',
		{
			theme: {
				screens: {
					tablet: {
						raw: '(min-height: 640px)'
					}
				}
			}
		},
		{
			height: 100
		}
	);

	t.deepEqual(tailwind('bg-white tablet:bg-black'), {
		backgroundColor: 'rgba(255, 255, 255, 1)'
	});
});
