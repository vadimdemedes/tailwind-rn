#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const build = require('./build');

meow(`
	Usage
	  $ create-tailwind-rn
`);

// Todo: Check if possible to get the config directly from tailwind
const configPath = `${process.cwd()}/tailwind.config.js`;

const config = fs.existsSync(configPath) ? require(configPath) : null;

const breakpoints = config && config.theme && config.theme.screens;
const defaultBreakpoints = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px'
};

const source = `
@tailwind components;
@tailwind utilities;
`;

postcss([tailwind])
	.process(source, {from: undefined})
	.then(({css}) => {
		const {screens, styles} = build(css, breakpoints || defaultBreakpoints);
		fs.writeFileSync('styles.json', JSON.stringify(styles, null, '\t'));
		fs.writeFileSync('screens.json', JSON.stringify(screens, null, '\t'));
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
