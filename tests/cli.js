const path = require('path');
const fs = require('fs');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const create = require('../dist/create').default;

test.serial('no arguments', async t => {
	await tempy.directory.task(async cwd => {
		fs.writeFileSync(path.join(cwd, 'app.js'), 'text-black');
		fs.writeFileSync(path.join(cwd, 'input.css'), '@tailwind utilities;');

		await execa('npx', [
			'tailwindcss',
			'--input',
			path.join(cwd, 'input.css'),
			'--output',
			path.join(cwd, 'tailwind.css'),
			'--content',
			path.join(cwd, 'app.js')
		]);

		await execa('node', [path.join(__dirname, '../dist/cli')], {cwd});

		const utilities = JSON.parse(
			fs.readFileSync(path.join(cwd, 'tailwind.json'))
		);
		const tailwind = create(utilities);

		t.deepEqual(tailwind('text-black'), {
			color: 'rgba(0, 0, 0, 1)'
		});
	});
});

test.serial('custom input file', async t => {
	await tempy.directory.task(async cwd => {
		fs.writeFileSync(path.join(cwd, 'app.js'), 'text-black');
		fs.writeFileSync(path.join(cwd, 'input.css'), '@tailwind utilities;');

		await execa('npx', [
			'tailwindcss',
			'--input',
			path.join(cwd, 'input.css'),
			'--output',
			path.join(cwd, 'custom.css'),
			'--content',
			path.join(cwd, 'app.js')
		]);

		await execa(
			'node',
			[path.join(__dirname, '../dist/cli'), '--input', 'custom.css'],
			{cwd}
		);

		const utilities = JSON.parse(
			fs.readFileSync(path.join(cwd, 'tailwind.json'))
		);
		const tailwind = create(utilities);

		t.deepEqual(tailwind('text-black'), {
			color: 'rgba(0, 0, 0, 1)'
		});
	});
});

test.serial('custom output file', async t => {
	await tempy.directory.task(async cwd => {
		fs.writeFileSync(path.join(cwd, 'app.js'), 'text-black');
		fs.writeFileSync(path.join(cwd, 'input.css'), '@tailwind utilities;');

		await execa('npx', [
			'tailwindcss',
			'--input',
			path.join(cwd, 'input.css'),
			'--output',
			path.join(cwd, 'tailwind.css'),
			'--content',
			path.join(cwd, 'app.js')
		]);

		await execa(
			'node',
			[path.join(__dirname, '../dist/cli'), '--output', 'custom.json'],
			{cwd}
		);

		const utilities = JSON.parse(
			fs.readFileSync(path.join(cwd, 'custom.json'))
		);
		const tailwind = create(utilities);

		t.deepEqual(tailwind('text-black'), {
			color: 'rgba(0, 0, 0, 1)'
		});
	});
});
