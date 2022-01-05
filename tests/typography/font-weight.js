const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('font-thin', {
	fontWeight: '100'
});

tailwindTest('font-extralight', {
	fontWeight: '200'
});

tailwindTest('font-light', {
	fontWeight: '300'
});

tailwindTest('font-normal', {
	fontWeight: '400'
});

tailwindTest('font-medium', {
	fontWeight: '500'
});

tailwindTest('font-semibold', {
	fontWeight: '600'
});

tailwindTest('font-bold', {
	fontWeight: '700'
});

tailwindTest('font-extrabold', {
	fontWeight: '800'
});

tailwindTest('font-black', {
	fontWeight: '900'
});
