const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('z-0', {
	zIndex: 0
});

tailwindTest('z-10', {
	zIndex: 10
});

tailwindTest('z-20', {
	zIndex: 20
});

tailwindTest('z-30', {
	zIndex: 30
});

tailwindTest('z-40', {
	zIndex: 40
});

tailwindTest('z-50', {
	zIndex: 50
});

tailwindTest('-z-50', {
	zIndex: -50
});

tailwindTest('z-[100]', {
	zIndex: 100
});
