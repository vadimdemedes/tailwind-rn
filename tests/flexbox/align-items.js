const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('items-start', {
	alignItems: 'flex-start'
});

tailwindTest('items-end', {
	alignItems: 'flex-end'
});

tailwindTest('items-center', {
	alignItems: 'center'
});

tailwindTest('items-baseline', {
	alignItems: 'baseline'
});

tailwindTest('items-stretch', {
	alignItems: 'stretch'
});
