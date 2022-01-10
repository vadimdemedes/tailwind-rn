const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('min-w-0', {
	minWidth: 0
});

tailwindTest('min-w-full', {
	minWidth: '100%'
});

tailwindTest('min-w-[10px]', {
	minWidth: 10
});
