const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('p-0', {
	paddingTop: 0,
	paddingRight: 0,
	paddingBottom: 0,
	paddingLeft: 0
});

tailwindTest('p-px', {
	paddingTop: 1,
	paddingRight: 1,
	paddingBottom: 1,
	paddingLeft: 1
});

tailwindTest('p-0.5', {
	paddingTop: 2,
	paddingRight: 2,
	paddingBottom: 2,
	paddingLeft: 2
});

tailwindTest('p-1', {
	paddingTop: 4,
	paddingRight: 4,
	paddingBottom: 4,
	paddingLeft: 4
});

tailwindTest('p-[3px]', {
	paddingTop: 3,
	paddingRight: 3,
	paddingBottom: 3,
	paddingLeft: 3
});

tailwindTest('px-0', {
	paddingRight: 0,
	paddingLeft: 0
});

tailwindTest('px-px', {
	paddingRight: 1,
	paddingLeft: 1
});

tailwindTest('px-0.5', {
	paddingRight: 2,
	paddingLeft: 2
});

tailwindTest('px-1', {
	paddingRight: 4,
	paddingLeft: 4
});

tailwindTest('px-[3px]', {
	paddingRight: 3,
	paddingLeft: 3
});

tailwindTest('py-0', {
	paddingTop: 0,
	paddingBottom: 0
});

tailwindTest('py-px', {
	paddingTop: 1,
	paddingBottom: 1
});

tailwindTest('py-0.5', {
	paddingTop: 2,
	paddingBottom: 2
});

tailwindTest('py-1', {
	paddingTop: 4,
	paddingBottom: 4
});

tailwindTest('py-[3px]', {
	paddingTop: 3,
	paddingBottom: 3
});

for (const [side, prop] of Object.entries({
	t: 'paddingTop',
	r: 'paddingRight',
	b: 'paddingBottom',
	l: 'paddingLeft'
})) {
	tailwindTest(`p${side}-0`, {
		[prop]: 0
	});

	tailwindTest(`p${side}-px`, {
		[prop]: 1
	});

	tailwindTest(`p${side}-0.5`, {
		[prop]: 2
	});

	tailwindTest(`p${side}-1`, {
		[prop]: 4
	});

	tailwindTest(`p${side}-[3px]`, {
		[prop]: 3
	});
}
