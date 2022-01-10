const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('tracking-tighter text-base', {
	fontSize: 16,
	letterSpacing: -0.8,
	lineHeight: 24
});

tailwindTest('tracking-tight text-base', {
	fontSize: 16,
	letterSpacing: -0.4,
	lineHeight: 24
});

tailwindTest('tracking-normal text-base', {
	fontSize: 16,
	letterSpacing: 0,
	lineHeight: 24
});

tailwindTest('tracking-wide text-base', {
	fontSize: 16,
	letterSpacing: 0.4,
	lineHeight: 24
});

tailwindTest('tracking-wider text-base', {
	fontSize: 16,
	letterSpacing: 0.8,
	lineHeight: 24
});

tailwindTest('tracking-widest text-base', {
	fontSize: 16,
	letterSpacing: 1.6,
	lineHeight: 24
});
