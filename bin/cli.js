#!/usr/bin/env node
'use strict';
const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const build = require('../utils/build');

const flags = require('../utils/cli-parse')

const source = `
@tailwind components;
@tailwind utilities;
`;

postcss([tailwind])
	.process(source, {from: undefined})
	.then(({css}) => {
		const styles = build(css, flags.rem);
    fs.writeFileSync(flags.outFile, JSON.stringify(styles, null, '\t'));
	})
	.catch(error => {
		console.error('> Error occurred while generating styles');
		console.error(error.stack);
		process.exit(1);
	});
