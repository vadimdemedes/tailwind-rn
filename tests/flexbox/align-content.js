const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('content-start', {
	alignContent: 'flex-start'
});

tailwindTest('content-end', {
	alignContent: 'flex-end'
});

tailwindTest('content-center', {
	alignContent: 'center'
});

tailwindTest('content-between', {
	alignContent: 'space-between'
});

tailwindTest('content-around', {
	alignContent: 'space-around'
});

tailwindTest('content-evenly', {
	alignContent: 'space-evenly'
});
