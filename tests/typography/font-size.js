const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('text-xs', {
	fontSize: 12,
	lineHeight: 16
});

tailwindTest('text-sm', {
	fontSize: 14,
	lineHeight: 20
});

tailwindTest('text-base', {
	fontSize: 16,
	lineHeight: 24
});

tailwindTest('text-lg', {
	fontSize: 18,
	lineHeight: 28
});

tailwindTest('text-xl', {
	fontSize: 20,
	lineHeight: 28
});

tailwindTest('text-2xl', {
	fontSize: 24,
	lineHeight: 32
});

tailwindTest('text-3xl', {
	fontSize: 30,
	lineHeight: 36
});

tailwindTest('text-4xl', {
	fontSize: 36,
	lineHeight: 40
});
