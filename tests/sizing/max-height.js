const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('max-h-0', {
	maxHeight: 0
});

tailwindTest('max-h-px', {
	maxHeight: 1
});

tailwindTest('max-h-0.5', {
	maxHeight: 2
});

tailwindTest('max-h-1', {
	maxHeight: 4
});

tailwindTest('max-h-full', {
	maxHeight: '100%'
});
