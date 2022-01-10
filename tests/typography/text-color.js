const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('text-inherit', {
	color: 'inherit'
});

tailwindTest('text-transparent', {
	color: 'transparent'
});

tailwindTest('text-black', {
	color: 'rgba(0, 0, 0, 1)'
});

tailwindTest('text-white', {
	color: 'rgba(255, 255, 255, 1)'
});

tailwindTest('text-blue-500', {
	color: 'rgba(59, 130, 246, 1)'
});

tailwindTest('text-blue-500/50', {
	color: 'rgba(59, 130, 246, 0.5)'
});

tailwindTest('text-blue-500/[.67]', {
	color: 'rgba(59, 130, 246, 0.67)'
});
