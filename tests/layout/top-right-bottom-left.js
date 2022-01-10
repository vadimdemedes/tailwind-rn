const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('inset-0', {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
});

tailwindTest('inset-px', {
	top: 1,
	right: 1,
	bottom: 1,
	left: 1
});

tailwindTest('inset-0.5', {
	top: 2,
	right: 2,
	bottom: 2,
	left: 2
});

tailwindTest('inset-1', {
	top: 4,
	right: 4,
	bottom: 4,
	left: 4
});

tailwindTest('inset-1/2', {
	top: '50%',
	right: '50%',
	bottom: '50%',
	left: '50%'
});

tailwindTest('inset-full', {
	top: '100%',
	right: '100%',
	bottom: '100%',
	left: '100%'
});

tailwindTest('inset-x-0', {
	left: 0,
	right: 0
});

tailwindTest('inset-x-px', {
	left: 1,
	right: 1
});

tailwindTest('inset-x-0.5', {
	left: 2,
	right: 2
});

tailwindTest('inset-x-1', {
	left: 4,
	right: 4
});

tailwindTest('inset-x-1/2', {
	left: '50%',
	right: '50%'
});

tailwindTest('inset-x-full', {
	left: '100%',
	right: '100%'
});

tailwindTest('inset-y-0', {
	top: 0,
	bottom: 0
});

tailwindTest('inset-y-px', {
	top: 1,
	bottom: 1
});

tailwindTest('inset-y-0.5', {
	top: 2,
	bottom: 2
});

tailwindTest('inset-y-1', {
	top: 4,
	bottom: 4
});

tailwindTest('inset-y-1/2', {
	top: '50%',
	bottom: '50%'
});

tailwindTest('inset-y-full', {
	top: '100%',
	bottom: '100%'
});

for (const side of ['top', 'right', 'bottom', 'left']) {
	tailwindTest(`${side}-0`, {
		[side]: 0
	});

	tailwindTest(`${side}-px`, {
		[side]: 1
	});

	tailwindTest(`-${side}-px`, {
		[side]: -1
	});

	tailwindTest(`${side}-0.5`, {
		[side]: 2
	});

	tailwindTest(`-${side}-0.5`, {
		[side]: -2
	});

	tailwindTest(`${side}-1`, {
		[side]: 4
	});

	tailwindTest(`-${side}-1`, {
		[side]: -4
	});

	tailwindTest(`${side}-1/2`, {
		[side]: '50%'
	});

	tailwindTest(`-${side}-1/2`, {
		[side]: '-50%'
	});

	tailwindTest(`${side}-full`, {
		[side]: '100%'
	});

	tailwindTest(`-${side}-full`, {
		[side]: '-100%'
	});

	tailwindTest(`${side}-[3px]`, {
		[side]: 3
	});

	tailwindTest(`${side}-[-3px]`, {
		[side]: -3
	});
}
