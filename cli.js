#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const build = require('./build');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const isValidPath = require('is-valid-path');

const {argv} = yargs(hideBin(process.argv));

meow(`
	Usage
	  $ create-tailwind-rn
`);

const source = `
@tailwind components;
@tailwind utilities;
`;

function checkArg(arg) {
	return arg && isValidPath(arg);
}

postcss([checkArg(argv.i) ? tailwind(argv.i) : tailwind])
	.process(source, {from: undefined})
	.then(({css}) => {
		if (checkArg(argv.o)) {
			fs.promises.mkdir(path.dirname(argv.o), {recursive: true});
		}
		const styles = build(css);
		fs.writeFileSync(
			checkArg(argv.o) ? argv.o : 'styles.json',
			JSON.stringify(styles, null, '\t')
		);
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
