const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('flex-1', {
	flexBasis: '0%',
	flexGrow: 1,
	flexShrink: 1
});

tailwindTest('flex-auto', {
	flexBasis: 'auto',
	flexGrow: 1,
	flexShrink: 1
});

tailwindTest('flex-initial', {
	flexBasis: 'auto',
	flexGrow: 0,
	flexShrink: 1
});

tailwindTest('flex-none', {
	flexBasis: 'auto',
	flexGrow: 0,
	flexShrink: 0
});

tailwindTest('flex-[2_2_0%]', {
	flexBasis: '0%',
	flexGrow: 2,
	flexShrink: 2
});
