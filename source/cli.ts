#!/usr/bin/env node
import * as fs from 'fs';
import * as chokidar from 'chokidar';
import meow = require('meow');
import buildTailwind from './build';

const cli = meow(
	`
	Usage
	  $ tailwind-rn [options]

	Options
	  -i, --input    Path to CSS file that Tailwind generates (default: tailwind.css)
	  -o, --output   Output file (default: tailwind.json)
	  -w, --watch    Watch for changes and rebuild as needed
`,
	{
		flags: {
			input: {
				type: 'string',
				alias: 'i',
				default: 'tailwind.css'
			},
			output: {
				type: 'string',
				alias: 'o',
				default: 'tailwind.json'
			},
			watch: {
				type: 'boolean',
				alias: 'w'
			}
		}
	}
);

const {input, output, watch} = cli.flags;

let inputExists;

try {
	fs.statSync(input);
	inputExists = true;
} catch {
	inputExists = false;
}

if (!inputExists) {
	console.error(`Input file "${input}" doesn't exist`);
	process.exit(1);
}

const build = () => {
	const source = fs.readFileSync(input, 'utf8');
	const utilities = buildTailwind(source);
	fs.writeFileSync(output, JSON.stringify(utilities, null, '\t'));
};

if (watch) {
	chokidar.watch(input, {awaitWriteFinish: true}).on('all', build);
} else {
	build();
}
