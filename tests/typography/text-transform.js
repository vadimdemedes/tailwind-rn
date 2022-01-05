const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('uppercase', {
	textTransform: 'uppercase'
});

tailwindTest('lowercase', {
	textTransform: 'lowercase'
});

tailwindTest('capitalize', {
	textTransform: 'capitalize'
});

tailwindTest('normal-case', {
	textTransform: 'none'
});
