/* eslint-disable ava/no-ignored-test-files */
const test = require('ava');
const DataLoader = require('dataloader');
const compile = require('./compile');

const compiler = new DataLoader(async classNames => {
	const {tailwind} = await compile(classNames.join(' '));
	return classNames.map(_ => tailwind);
});

const tailwindTest = (classNames, expected) => {
	test(classNames, async t => {
		const tailwind = await compiler.load(classNames);
		t.deepEqual(tailwind(classNames), expected);
	});
};

module.exports = tailwindTest;
