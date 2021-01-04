#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const resolveConfig = require('tailwindcss/resolveConfig');
const build = require('./build');

meow(`
	Usage
	  $ create-tailwind-rn
`);

const getConfig = () => {
	try {
		const defaultConfigPath = path.resolve('tailwind.config.js');
		fs.accessSync(defaultConfigPath);
		const configObject = require(defaultConfigPath);
		return resolveConfig(configObject);
	} catch {
		return resolveConfig();
	}
};

const breakpoints = getConfig().theme.screens;

const source = `
@tailwind components;
@tailwind utilities;
`;

postcss([tailwind])
	.process(source, {from: undefined})
	.then(({css}) => {
		const {screens, styles} = build(css, breakpoints);
		fs.writeFileSync('styles.json', JSON.stringify(styles, null, '\t'));
		fs.writeFileSync('screens.json', JSON.stringify(screens, null, '\t'));
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
