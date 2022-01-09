#!/usr/bin/env node
import * as fs from 'fs';
import * as chokidar from 'chokidar';
import meow = require('meow');
import buildTailwind from './build';

const cli = meow(
	`
	Usage
	  $ create-tailwind-rn [output.css]
`,
	{
		flags: {
			watch: {
				alias: 'w',
				type: 'boolean'
			}
		}
	}
);

if (!cli.input[0]) {
	throw new Error('Path to output CSS is missing');
}

const input = cli.input[0];

const build = () => {
	const source = fs.readFileSync(input, 'utf8');
	const utilities = buildTailwind(source);
	fs.writeFileSync('tailwind.json', JSON.stringify(utilities, null, '\t'));
};

if (cli.flags.watch) {
	chokidar.watch(input).on('all', build);
} else {
	build();
}
