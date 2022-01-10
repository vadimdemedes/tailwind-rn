const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('underline', {
	textDecorationLine: 'underline'
});

tailwindTest('line-through', {
	textDecorationLine: 'line-through'
});

tailwindTest('no-underline', {
	textDecorationLine: 'none'
});
