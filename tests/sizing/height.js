const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('h-0', {
	height: 0
});

tailwindTest('h-px', {
	height: 1
});

tailwindTest('h-0.5', {
	height: 2
});

tailwindTest('h-1', {
	height: 4
});

tailwindTest('h-1/2', {
	height: '50%'
});

tailwindTest('h-[3px]', {
	height: 3
});
