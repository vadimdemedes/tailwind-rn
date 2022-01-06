const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('bg-inherit', {
	backgroundColor: 'inherit'
});

tailwindTest('bg-transparent', {
	backgroundColor: 'transparent'
});

tailwindTest('bg-black', {
	backgroundColor: 'rgb(0 0 0 / 1)'
});

tailwindTest('bg-white', {
	backgroundColor: 'rgb(255 255 255 / 1)'
});

tailwindTest('bg-blue-500', {
	backgroundColor: 'rgb(59 130 246 / 1)'
});

tailwindTest('bg-blue-500/50', {
	backgroundColor: 'rgb(59 130 246 / 0.5)'
});

tailwindTest('bg-[#50d71e]', {
	backgroundColor: 'rgb(80 215 30 / 1)'
});
