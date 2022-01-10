const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('shrink', {
	flexShrink: 1
});

tailwindTest('shrink-0', {
	flexShrink: 0
});

tailwindTest('shrink-[2]', {
	flexShrink: 2
});
