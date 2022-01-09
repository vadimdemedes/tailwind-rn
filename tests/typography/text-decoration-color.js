const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('decoration-inherit', {
	textDecorationColor: 'inherit'
});

tailwindTest('decoration-transparent', {
	textDecorationColor: 'transparent'
});

tailwindTest('decoration-black', {
	textDecorationColor: '#000'
});

tailwindTest('decoration-white', {
	textDecorationColor: '#fff'
});

tailwindTest('decoration-blue-500', {
	textDecorationColor: '#3b82f6'
});

tailwindTest('decoration-blue-500/50', {
	textDecorationColor: 'rgba(59, 130, 246, 0.5)'
});
