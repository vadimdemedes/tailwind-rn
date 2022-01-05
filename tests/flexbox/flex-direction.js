const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('flex-row', {
	flexDirection: 'row'
});

tailwindTest('flex-row-reverse', {
	flexDirection: 'row-reverse'
});

tailwindTest('flex-col', {
	flexDirection: 'column'
});

tailwindTest('flex-col-reverse', {
	flexDirection: 'column-reverse'
});
