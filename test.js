import test from 'ava';
import tailwind, {getColor} from '.';

test('get styles for one class', t => {
	t.deepEqual(tailwind('text-blue-500'), {color: 'rgba(66, 153, 225, 1)'});
});

test('get styles for multiple classes', t => {
	t.deepEqual(tailwind('text-blue-500 bg-blue-100'), {
		color: 'rgba(66, 153, 225, 1)',
		backgroundColor: 'rgba(235, 248, 255, 1)'
	});
});

test('ignore unknown classes', t => {
	t.deepEqual(tailwind('text-blue-500 unknown'), {
		color: 'rgba(66, 153, 225, 1)'
	});
});

test('support color opacity', t => {
	t.deepEqual(
		tailwind('text-blue-500 text-opacity-50 bg-blue-100 bg-opacity-50'),
		{
			color: 'rgba(66, 153, 225, 0.5)',
			backgroundColor: 'rgba(235, 248, 255, 0.5)'
		}
	);
});

test('get color value', t => {
	t.is(getColor('blue-500'), 'rgba(66, 153, 225, 1)');
});

test('ignore no value param', t => {
	t.deepEqual(tailwind(null), {});
	t.deepEqual(tailwind(false), {});
	t.deepEqual(tailwind(undefined), {});
	t.deepEqual(tailwind(0), {});
});
