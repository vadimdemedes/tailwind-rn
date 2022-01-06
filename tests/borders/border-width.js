const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('border', {
	borderTopWidth: 1,
	borderRightWidth: 1,
	borderBottomWidth: 1,
	borderLeftWidth: 1
});

tailwindTest('border-0', {
	borderTopWidth: 0,
	borderRightWidth: 0,
	borderBottomWidth: 0,
	borderLeftWidth: 0
});

tailwindTest('border-x', {
	borderLeftWidth: 1,
	borderRightWidth: 1
});

tailwindTest('border-x-0', {
	borderLeftWidth: 0,
	borderRightWidth: 0
});

tailwindTest('border-y', {
	borderTopWidth: 1,
	borderBottomWidth: 1
});

tailwindTest('border-y-0', {
	borderTopWidth: 0,
	borderBottomWidth: 0
});

tailwindTest('border-t', {
	borderTopWidth: 1
});

tailwindTest('border-t-0', {
	borderTopWidth: 0
});

tailwindTest('border-r', {
	borderRightWidth: 1
});

tailwindTest('border-r-0', {
	borderRightWidth: 0
});

tailwindTest('border-b', {
	borderBottomWidth: 1
});

tailwindTest('border-b-0', {
	borderBottomWidth: 0
});

tailwindTest('border-l', {
	borderLeftWidth: 1
});

tailwindTest('border-l-0', {
	borderLeftWidth: 0
});
