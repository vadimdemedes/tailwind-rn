/* eslint-disable ava/no-ignored-test-files */
const test = require('ava');
const compile = require('./compile');

const tailwindTest = (classNames, expected) => {
	test(classNames, async t => {
		const {tailwind} = await compile(classNames);
		t.deepEqual(tailwind(classNames), expected);
	});
};

module.exports = tailwindTest;
