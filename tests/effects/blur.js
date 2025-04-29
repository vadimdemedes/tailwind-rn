const tailwindTest = require('../helpers/tailwind-test');



tailwindTest('blur-0', {
	filter: 0 ,
});

tailwindTest('blur-sm', {
	filter: 4 ,
});

tailwindTest('blur-md', {
	filter: 8 ,
});
tailwindTest('blur-lg', {
	filter: 12 ,
});
