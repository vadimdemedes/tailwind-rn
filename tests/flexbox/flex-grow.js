const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('grow', {
	flexGrow: 1
});

tailwindTest('grow-0', {
	flexGrow: 0
});

tailwindTest('grow-[2]', {
	flexGrow: 2
});
