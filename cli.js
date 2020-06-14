#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const build = require('./build');

meow(`
	Usage
	  $ create-tailwind-rn
`);

const source = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

/**
 * @returns {String[]} A list of provided custom colors
 */
const getCustomColors = () => {
	try {
		const config = require(path.resolve('tailwind.config'));

		if (
			config &&
			config.theme &&
			config.theme.extend &&
			config.theme.extend.colors
		) {
			return Object.keys(config.theme.extend.colors);
		}
	} catch (error) {
		if (error.code !== 'MODULE_NOT_FOUND') {
			throw error;
		}
	}

	return [];
};

postcss([tailwind])
	.process(source, {from: undefined})
	.then(({css}) => {
		const customColors = getCustomColors();
		const styles = build(css, customColors);
		fs.writeFileSync('styles.json', JSON.stringify(styles, null, '\t'));
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
