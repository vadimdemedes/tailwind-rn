const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('justify-start', {
	justifyContent: 'flex-start'
});

tailwindTest('justify-end', {
	justifyContent: 'flex-end'
});

tailwindTest('justify-center', {
	justifyContent: 'center'
});

tailwindTest('justify-between', {
	justifyContent: 'space-between'
});

tailwindTest('justify-around', {
	justifyContent: 'space-around'
});

tailwindTest('justify-evenly', {
	justifyContent: 'space-evenly'
});
