const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('opacity-0', {
	opacity: 0
});

tailwindTest('opacity-10', {
	opacity: 0.1
});

tailwindTest('opacity-[.67]', {
	opacity: 0.67
});
