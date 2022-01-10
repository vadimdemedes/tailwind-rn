const fs = require('fs');
const execa = require('execa');
const tempy = require('tempy');
const build = require('../../dist/build').default;
const create = require('../../dist/create').default;

const compile = async (classNames, config, media) => {
	const input = tempy.file();
	fs.writeFileSync(input, '@tailwind utilities;');

	const content = tempy.file();
	fs.writeFileSync(content, classNames);

	const output = tempy.file();

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
		const path = tempy.file();
		fs.writeFileSync(path, `module.exports = ${JSON.stringify(config)}`);
		args.push('--config', path);
	}

	await execa('npx', args);

	const source = fs.readFileSync(output, 'utf8');
	const utilities = build(source);
	const tailwind = create(utilities, media);

	return {
		tailwind,
		utilities
	};
};

module.exports = compile;
