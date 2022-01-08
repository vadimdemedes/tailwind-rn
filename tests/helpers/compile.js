const fs = require('fs');
const execa = require('execa');
const tempfile = require('tempfile');
const build = require('../../dist/build').default;
const create = require('../../dist/create').default;

const compile = async (classNames, config, media) => {
	const input = tempfile();
	fs.writeFileSync(input, '@tailwind utilities;');

	const content = tempfile();
	fs.writeFileSync(content, classNames);

	const output = tempfile();

	const args = [
		'tailwindcss',
		'--input',
		input,
		'--content',
		content,
		'--no-autoprefixer',
		'--output',
		output
	];

	if (config) {
		const path = tempfile();
		fs.writeFileSync(path, `module.exports = ${JSON.stringify(config)}`);
		args.push('--config', path);
	}

	await execa('npx', args);

	const source = fs.readFileSync(output, 'utf8');
	const styles = build(source);
	return {
		...create(styles, media),
		styles
	};
};

module.exports = compile;
