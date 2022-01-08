#!/usr/bin/env node
import * as fs from 'fs';
import meow = require('meow');
import build from './build';

const cli = meow(`
	Usage
	  $ create-tailwind-rn [output.css]
`);

if (!cli.input[0]) {
	throw new Error('Path to output CSS is missing');
}

const source = fs.readFileSync(cli.input[0], 'utf8');
const utilities = build(source);
fs.writeFileSync('tailwind.json', JSON.stringify(utilities, null, '\t'));
