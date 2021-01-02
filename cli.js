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

// Todo: replace the hard coded config path
const configPath = `${process.cwd()}/tailwind.config.js`;

const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath)) : null;

const source = `
@tailwind components;
@tailwind utilities;
`;

postcss([tailwind])
	.process(source, {from: undefined})
	.then(({css}) => {
		const {screens, styles} = build(css, config);
		fs.writeFileSync('styles.json', JSON.stringify(styles, null, '\t'));
		fs.writeFileSync('screens.json', JSON.stringify(screens, null, '\t'));
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
