import test from 'ava';
import create from './create';
import defaultStyles from '../styles.json';

const {tailwind, getColor} = create(defaultStyles, []);

test('get styles for one class', t => {
	t.deepEqual(tailwind('text-blue-500'), {color: 'rgba(59, 130, 246, 1)'});
});

test('get styles for multiple classes', t => {
	t.deepEqual(tailwind('text-blue-500 bg-blue-100'), {
		color: 'rgba(59, 130, 246, 1)',
		backgroundColor: 'rgba(219, 234, 254, 1)'
	});
});

test('ignore unknown classes', t => {
	t.deepEqual(tailwind('text-blue-500 unknown'), {
		color: 'rgba(59, 130, 246, 1)'
	});
});

test('support color opacity', t => {
	t.deepEqual(
		tailwind(
			'text-blue-500 text-opacity-50 bg-blue-100 bg-opacity-50 border-blue-100 border-opacity-50'
		),
		{
			color: 'rgba(59, 130, 246, 0.5)',
			backgroundColor: 'rgba(219, 234, 254, 0.5)',
			borderTopColor: 'rgba(219, 234, 254, 0.5)',
			borderRightColor: 'rgba(219, 234, 254, 0.5)',
			borderBottomColor: 'rgba(219, 234, 254, 0.5)',
			borderLeftColor: 'rgba(219, 234, 254, 0.5)'
		}
	);
});

test('ignore non-string values when transforming CSS variables', t => {
	t.deepEqual(tailwind('bg-blue-500 p-12'), {
		backgroundColor: 'rgba(59, 130, 246, 1)',
		paddingTop: 48,
		paddingRight: 48,
		paddingBottom: 48,
		paddingLeft: 48
	});
});

test('get color value', t => {
	t.is(getColor('blue-500'), 'rgba(59, 130, 246, 1)');
});

test('get color with opacity value', t => {
	t.is(getColor('blue-500 opacity-50'), 'rgba(59, 130, 246, 0.5)');
});

test('ignore no value param', t => {
	t.deepEqual(tailwind(null), {});
	t.deepEqual(tailwind(false), {});
	t.deepEqual(tailwind(undefined), {});
	t.deepEqual(tailwind(0), {});
});

test('ignore extra spaces', t => {
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

test('support font-variant-numeric', t => {
	t.deepEqual(tailwind('oldstyle-nums'), {
		fontVariant: ['oldstyle-nums']
	});

	t.deepEqual(tailwind('lining-nums'), {
		fontVariant: ['lining-nums']
	});

	t.deepEqual(tailwind('tabular-nums'), {
		fontVariant: ['tabular-nums']
	});

	t.deepEqual(tailwind('proportional-nums'), {
		fontVariant: ['proportional-nums']
	});

	t.deepEqual(
		tailwind('oldstyle-nums lining-nums tabular-nums proportional-nums'),
		{
			fontVariant: [
				'oldstyle-nums',
				'lining-nums',
				'tabular-nums',
				'proportional-nums'
			]
		}
	);
});

test('support letter spacing', t => {
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

test('ignore breakpoints classes', t => {
	t.deepEqual(tailwind('text-blue-500 sm:text-red-500 md:text-red-500 lg:text-red-500 xl:text-red-500 2xl:text-red-500'), {
		color: 'rgba(59, 130, 246, 1)'
	});
});
