const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('flex-wrap', {
	flexWrap: 'wrap'
});

tailwindTest('flex-wrap-reverse', {
	flexWrap: 'wrap-reverse'
});

tailwindTest('flex-nowrap', {
	flexWrap: 'nowrap'
});
