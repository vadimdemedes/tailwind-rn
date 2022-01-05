const fs = require('fs');
const execa = require('execa');
const tempfile = require('tempfile');
const build = require('../../build');
const {create} = require('../..');

const compile = async classNames => {
	const input = tempfile();
	fs.writeFileSync(input, '@tailwind utilities;');

	const content = tempfile();
	fs.writeFileSync(content, classNames);

	const output = tempfile();

	await execa('npx', [
		'tailwindcss',
		'--input',
		input,
		'--content',
		content,
		'--no-autoprefixer',
		'--output',
		output
	]);

	const source = fs.readFileSync(output, 'utf8');
	const styles = build(source);
	return create(styles);
};

module.exports = compile;
