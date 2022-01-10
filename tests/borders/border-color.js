const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('border-transparent', {
	borderTopColor: 'transparent',
	borderRightColor: 'transparent',
	borderBottomColor: 'transparent',
	borderLeftColor: 'transparent'
});

tailwindTest('border-black', {
	borderTopColor: 'rgba(0, 0, 0, 1)',
	borderRightColor: 'rgba(0, 0, 0, 1)',
	borderBottomColor: 'rgba(0, 0, 0, 1)',
	borderLeftColor: 'rgba(0, 0, 0, 1)'
});

tailwindTest('border-white', {
	borderTopColor: 'rgba(255, 255, 255, 1)',
	borderRightColor: 'rgba(255, 255, 255, 1)',
	borderBottomColor: 'rgba(255, 255, 255, 1)',
	borderLeftColor: 'rgba(255, 255, 255, 1)'
});

tailwindTest('border-blue-500', {
	borderTopColor: 'rgba(59, 130, 246, 1)',
	borderRightColor: 'rgba(59, 130, 246, 1)',
	borderBottomColor: 'rgba(59, 130, 246, 1)',
	borderLeftColor: 'rgba(59, 130, 246, 1)'
});

tailwindTest('border-blue-500/50', {
	borderTopColor: 'rgba(59, 130, 246, 0.5)',
	borderRightColor: 'rgba(59, 130, 246, 0.5)',
	borderBottomColor: 'rgba(59, 130, 246, 0.5)',
	borderLeftColor: 'rgba(59, 130, 246, 0.5)'
});

tailwindTest('border-[#50d71e]', {
	borderTopColor: 'rgba(80, 215, 30, 1)',
	borderRightColor: 'rgba(80, 215, 30, 1)',
	borderBottomColor: 'rgba(80, 215, 30, 1)',
	borderLeftColor: 'rgba(80, 215, 30, 1)'
});

tailwindTest('border-x-transparent', {
	borderRightColor: 'transparent',
	borderLeftColor: 'transparent'
});

tailwindTest('border-x-black', {
	borderRightColor: 'rgba(0, 0, 0, 1)',
	borderLeftColor: 'rgba(0, 0, 0, 1)'
});

tailwindTest('border-x-white', {
	borderRightColor: 'rgba(255, 255, 255, 1)',
	borderLeftColor: 'rgba(255, 255, 255, 1)'
});

tailwindTest('border-x-blue-500', {
	borderRightColor: 'rgba(59, 130, 246, 1)',
	borderLeftColor: 'rgba(59, 130, 246, 1)'
});

tailwindTest('border-x-blue-500/50', {
	borderRightColor: 'rgba(59, 130, 246, 0.5)',
	borderLeftColor: 'rgba(59, 130, 246, 0.5)'
});

tailwindTest('border-x-[#50d71e]', {
	borderRightColor: 'rgba(80, 215, 30, 1)',
	borderLeftColor: 'rgba(80, 215, 30, 1)'
});

tailwindTest('border-y-transparent', {
	borderTopColor: 'transparent',
	borderBottomColor: 'transparent'
});

tailwindTest('border-y-black', {
	borderTopColor: 'rgba(0, 0, 0, 1)',
	borderBottomColor: 'rgba(0, 0, 0, 1)'
});

tailwindTest('border-y-white', {
	borderTopColor: 'rgba(255, 255, 255, 1)',
	borderBottomColor: 'rgba(255, 255, 255, 1)'
});

tailwindTest('border-y-blue-500', {
	borderTopColor: 'rgba(59, 130, 246, 1)',
	borderBottomColor: 'rgba(59, 130, 246, 1)'
});

tailwindTest('border-y-blue-500/50', {
	borderTopColor: 'rgba(59, 130, 246, 0.5)',
	borderBottomColor: 'rgba(59, 130, 246, 0.5)'
});

tailwindTest('border-y-[#50d71e]', {
	borderTopColor: 'rgba(80, 215, 30, 1)',
	borderBottomColor: 'rgba(80, 215, 30, 1)'
});

for (const [side, prop] of Object.entries({
	t: 'borderTopColor',
	r: 'borderRightColor',
	b: 'borderBottomColor',
	l: 'borderLeftColor'
})) {
	tailwindTest(`border-${side}-transparent`, {
		[prop]: 'transparent'
	});

	tailwindTest(`border-${side}-black`, {
		[prop]: 'rgba(0, 0, 0, 1)'
	});

	tailwindTest(`border-${side}-white`, {
		[prop]: 'rgba(255, 255, 255, 1)'
	});

	tailwindTest(`border-${side}-blue-500`, {
		[prop]: 'rgba(59, 130, 246, 1)'
	});

	tailwindTest(`border-${side}-blue-500/50`, {
		[prop]: 'rgba(59, 130, 246, 0.5)'
	});

	tailwindTest(`border-${side}-[#50d71e]`, {
		[prop]: 'rgba(80, 215, 30, 1)'
	});
}
