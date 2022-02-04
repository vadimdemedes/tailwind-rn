const test = require('ava');
const compile = require('./helpers/compile');

test('get styles for multiple classes', async t => {
	const classNames = 'text-blue-500 bg-blue-100';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		color: 'rgba(59, 130, 246, 1)',
		backgroundColor: 'rgba(219, 234, 254, 1)'
	});
});

test('ignore unknown classes', async t => {
	const classNames = 'text-blue-500 unknown';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		color: 'rgba(59, 130, 246, 1)'
	});
});

test('ignore disabled classes', async t => {
	const classNames = 'text-blue-500 transform scale-95';
	const {tailwind} = await compile(classNames);

	t.deepEqual(tailwind(classNames), {
		color: 'rgba(59, 130, 246, 1)'
	});
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
		color: 'rgba(59, 130, 246, 1)',
		backgroundColor: 'rgba(219, 234, 254, 1)'
	});

	t.deepEqual(
		tailwind(`
		text-blue-500
		bg-blue-100
	`),
		{
			color: 'rgba(59, 130, 246, 1)',
			backgroundColor: 'rgba(219, 234, 254, 1)'
		}
	);
});

test('ignore transforms', async t => {
	const {tailwind} = await compile('rotate-45');

	t.deepEqual(tailwind('rotate-45'), {});
});
