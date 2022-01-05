const test = require('ava');
const compile = require('./helpers/compile');

test('get styles for one class', async t => {
	const classNames = 'text-blue-500';
	const {tailwind} = await compile(classNames);
	t.deepEqual(tailwind(classNames), {color: 'rgb(59 130 246 / 1)'});
});

test('get styles for multiple classes', async t => {
	const classNames = 'text-blue-500 bg-blue-100';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		color: 'rgb(59 130 246 / 1)',
		backgroundColor: 'rgb(219 234 254 / 1)'
	});
});

test('ignore unknown classes', async t => {
	const classNames = 'text-blue-500 unknown';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		color: 'rgb(59 130 246 / 1)'
	});
});

test('support color opacity', async t => {
	const classNames =
		'text-blue-500 text-opacity-50 bg-blue-100 bg-opacity-50 border-blue-100 border-opacity-50';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		color: 'rgb(59 130 246 / 0.5)',
		backgroundColor: 'rgb(219 234 254 / 0.5)',
		borderTopColor: 'rgb(219 234 254 / 0.5)',
		borderRightColor: 'rgb(219 234 254 / 0.5)',
		borderBottomColor: 'rgb(219 234 254 / 0.5)',
		borderLeftColor: 'rgb(219 234 254 / 0.5)'
	});
});

test('ignore non-string values when transforming CSS variables', async t => {
	const classNames = 'bg-blue-500 p-12';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		backgroundColor: 'rgb(59 130 246 / 1)',
		paddingTop: 48,
		paddingRight: 48,
		paddingBottom: 48,
		paddingLeft: 48
	});
});

test('get color value', async t => {
	const classNames = 'bg-blue-500';
	const {getColor} = await compile(classNames);
	t.is(getColor(classNames), 'rgb(59 130 246 / 1)');
});

test('get color with opacity value', async t => {
	const classNames = 'bg-blue-500 bg-opacity-50';
	const {getColor} = await compile(classNames);
	t.is(getColor(classNames), 'rgb(59 130 246 / 0.5)');
});

test('ignore no value param', async t => {
	const {tailwind} = await compile('');

	t.deepEqual(tailwind(null), {});
	t.deepEqual(tailwind(false), {});
	t.deepEqual(tailwind(undefined), {});
	t.deepEqual(tailwind(0), {});
});

test('ignore extra spaces', async t => {
	const {tailwind} = await compile('text-blue-500 bg-blue-100');

	t.deepEqual(tailwind('text-blue-500  bg-blue-100'), {
		color: 'rgb(59 130 246 / 1)',
		backgroundColor: 'rgb(219 234 254 / 1)'
	});

	t.deepEqual(
		tailwind(`
		text-blue-500
		bg-blue-100
	`),
		{
			color: 'rgb(59 130 246 / 1)',
			backgroundColor: 'rgb(219 234 254 / 1)'
		}
	);
});
