const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('oldstyle-nums', {
	fontVariant: ['oldstyle-nums']
});

tailwindTest('lining-nums', {
	fontVariant: ['lining-nums']
});

tailwindTest('tabular-nums', {
	fontVariant: ['tabular-nums']
});

tailwindTest('proportional-nums', {
	fontVariant: ['proportional-nums']
});

tailwindTest('oldstyle-nums lining-nums tabular-nums proportional-nums', {
	fontVariant: [
		'oldstyle-nums',
		'lining-nums',
		'tabular-nums',
		'proportional-nums'
	]
});
