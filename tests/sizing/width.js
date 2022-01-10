const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('w-0', {
	width: 0
});

tailwindTest('w-px', {
	width: 1
});

tailwindTest('w-0.5', {
	width: 2
});

tailwindTest('w-1', {
	width: 4
});

tailwindTest('w-1/2', {
	width: '50%'
});

tailwindTest('w-[3px]', {
	width: 3
});
