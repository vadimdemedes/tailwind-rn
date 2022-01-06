const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('max-w-0', {
	maxWidth: 0
});

tailwindTest('max-w-xs', {
	maxWidth: 20 * 16
});

tailwindTest('max-w-sm', {
	maxWidth: 24 * 16
});

tailwindTest('max-w-md', {
	maxWidth: 28 * 16
});

tailwindTest('max-w-lg', {
	maxWidth: 32 * 16
});

tailwindTest('max-w-xl', {
	maxWidth: 36 * 16
});

tailwindTest('max-w-2xl', {
	maxWidth: 42 * 16
});

tailwindTest('max-w-3xl', {
	maxWidth: 48 * 16
});

tailwindTest('max-w-4xl', {
	maxWidth: 56 * 16
});

tailwindTest('max-w-5xl', {
	maxWidth: 64 * 16
});

tailwindTest('max-w-6xl', {
	maxWidth: 72 * 16
});

tailwindTest('max-w-7xl', {
	maxWidth: 80 * 16
});

tailwindTest('max-w-full', {
	maxWidth: '100%'
});

tailwindTest('max-w-screen-sm', {
	maxWidth: 640
});

tailwindTest('max-w-screen-md', {
	maxWidth: 768
});

tailwindTest('max-w-screen-lg', {
	maxWidth: 1024
});

tailwindTest('max-w-screen-xl', {
	maxWidth: 1280
});

tailwindTest('max-w-screen-2xl', {
	maxWidth: 1536
});

tailwindTest('max-w-[10px]', {
	maxWidth: 10
});
