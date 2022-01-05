const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('self-start', {
	alignSelf: 'flex-start'
});

tailwindTest('self-end', {
	alignSelf: 'flex-end'
});

tailwindTest('self-center', {
	alignSelf: 'center'
});

tailwindTest('self-baseline', {
	alignSelf: 'baseline'
});

tailwindTest('self-stretch', {
	alignSelf: 'stretch'
});

tailwindTest('self-auto', {
	alignSelf: 'auto'
});
