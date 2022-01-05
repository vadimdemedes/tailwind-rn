const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('italic', {
	fontStyle: 'italic'
});

tailwindTest('not-italic', {
	fontStyle: 'normal'
});
