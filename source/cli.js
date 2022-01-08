#!/usr/bin/env node
'use strict';
const fs = require('fs');
const meow = require('meow');
const build = require('./build');

const cli = meow(`
	Usage
	  $ create-tailwind-rn [output.css]
`);

const source = fs.readFileSync(cli.input[0], 'utf8');
const styles = build(source);
fs.writeFileSync('styles.json', JSON.stringify(styles, null, '\t'));
