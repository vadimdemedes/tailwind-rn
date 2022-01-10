const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('min-h-0', {
	minHeight: 0
});

tailwindTest('min-h-full', {
	minHeight: '100%'
});

tailwindTest('min-h-[10px]', {
	minHeight: 10
});
