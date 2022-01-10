const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('overflow-hidden', {
	overflow: 'hidden'
});

tailwindTest('overflow-scroll', {
	overflow: 'scroll'
});

tailwindTest('overflow-visible', {
	overflow: 'visible'
});
