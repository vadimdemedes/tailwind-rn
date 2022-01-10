const test = require('ava');
const compile = require('../helpers/compile');
const tailwindTest = require('../helpers/tailwind-test');

test('font-inter', async t => {
	const {tailwind} = await compile('font-inter', {
		theme: {
			extend: {
				fontFamily: {
					inter: ['Inter']
				}
			}
		}
	});

	t.deepEqual(tailwind('font-inter'), {
		fontFamily: 'Inter'
	});
});

tailwindTest("font-['Open_Sans']", {
	fontFamily: 'Open Sans'
});
