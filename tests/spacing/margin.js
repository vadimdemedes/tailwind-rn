const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('m-0', {
	marginTop: 0,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0
});

tailwindTest('m-px', {
	marginTop: 1,
	marginRight: 1,
	marginBottom: 1,
	marginLeft: 1
});

tailwindTest('m-0.5', {
	marginTop: 2,
	marginRight: 2,
	marginBottom: 2,
	marginLeft: 2
});

tailwindTest('m-1', {
	marginTop: 4,
	marginRight: 4,
	marginBottom: 4,
	marginLeft: 4
});

tailwindTest('-m-1', {
	marginTop: -4,
	marginRight: -4,
	marginBottom: -4,
	marginLeft: -4
});

tailwindTest('m-[3px]', {
	marginTop: 3,
	marginRight: 3,
	marginBottom: 3,
	marginLeft: 3
});

tailwindTest('m-[-3px]', {
	marginTop: -3,
	marginRight: -3,
	marginBottom: -3,
	marginLeft: -3
});

tailwindTest('mx-auto', {
	marginRight: 'auto',
	marginLeft: 'auto'
});

tailwindTest('mx-0', {
	marginRight: 0,
	marginLeft: 0
});

tailwindTest('mx-px', {
	marginRight: 1,
	marginLeft: 1
});

tailwindTest('mx-0.5', {
	marginRight: 2,
	marginLeft: 2
});

tailwindTest('mx-1', {
	marginRight: 4,
	marginLeft: 4
});

tailwindTest('-mx-1', {
	marginRight: -4,
	marginLeft: -4
});

tailwindTest('mx-[3px]', {
	marginRight: 3,
	marginLeft: 3
});

tailwindTest('mx-[-3px]', {
	marginRight: -3,
	marginLeft: -3
});

tailwindTest('my-0', {
	marginTop: 0,
	marginBottom: 0
});

tailwindTest('my-auto', {
	marginTop: 'auto',
	marginBottom: 'auto'
});

tailwindTest('my-px', {
	marginTop: 1,
	marginBottom: 1
});

tailwindTest('my-0.5', {
	marginTop: 2,
	marginBottom: 2
});

tailwindTest('my-1', {
	marginTop: 4,
	marginBottom: 4
});

tailwindTest('-my-1', {
	marginTop: -4,
	marginBottom: -4
});

tailwindTest('my-[3px]', {
	marginTop: 3,
	marginBottom: 3
});

tailwindTest('my-[-3px]', {
	marginTop: -3,
	marginBottom: -3
});

for (const [side, prop] of Object.entries({
	t: 'marginTop',
	r: 'marginRight',
	b: 'marginBottom',
	l: 'marginLeft'
})) {
	tailwindTest(`m${side}-auto`, {
		[prop]: 'auto'
	});

	tailwindTest(`m${side}-0`, {
		[prop]: 0
	});

	tailwindTest(`m${side}-px`, {
		[prop]: 1
	});

	tailwindTest(`m${side}-0.5`, {
		[prop]: 2
	});

	tailwindTest(`m${side}-1`, {
		[prop]: 4
	});

	tailwindTest(`-m${side}-1`, {
		[prop]: -4
	});

	tailwindTest(`m${side}-[3px]`, {
		[prop]: 3
	});

	tailwindTest(`m${side}-[-3px]`, {
		[prop]: -3
	});
}
