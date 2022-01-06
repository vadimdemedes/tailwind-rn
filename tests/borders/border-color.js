const tailwindTest = require('../helpers/tailwind-test');

tailwindTest('border-transparent', {
	borderTopColor: 'transparent',
	borderRightColor: 'transparent',
	borderBottomColor: 'transparent',
	borderLeftColor: 'transparent'
});

tailwindTest('border-black', {
	borderTopColor: 'rgb(0 0 0 / 1)',
	borderRightColor: 'rgb(0 0 0 / 1)',
	borderBottomColor: 'rgb(0 0 0 / 1)',
	borderLeftColor: 'rgb(0 0 0 / 1)'
});

tailwindTest('border-white', {
	borderTopColor: 'rgb(255 255 255 / 1)',
	borderRightColor: 'rgb(255 255 255 / 1)',
	borderBottomColor: 'rgb(255 255 255 / 1)',
	borderLeftColor: 'rgb(255 255 255 / 1)'
});

tailwindTest('border-blue-500', {
	borderTopColor: 'rgb(59 130 246 / 1)',
	borderRightColor: 'rgb(59 130 246 / 1)',
	borderBottomColor: 'rgb(59 130 246 / 1)',
	borderLeftColor: 'rgb(59 130 246 / 1)'
});

tailwindTest('border-blue-500/50', {
	borderTopColor: 'rgb(59 130 246 / 0.5)',
	borderRightColor: 'rgb(59 130 246 / 0.5)',
	borderBottomColor: 'rgb(59 130 246 / 0.5)',
	borderLeftColor: 'rgb(59 130 246 / 0.5)'
});

tailwindTest('border-[#50d71e]', {
	borderTopColor: 'rgb(80 215 30 / 1)',
	borderRightColor: 'rgb(80 215 30 / 1)',
	borderBottomColor: 'rgb(80 215 30 / 1)',
	borderLeftColor: 'rgb(80 215 30 / 1)'
});

tailwindTest('border-x-transparent', {
	borderRightColor: 'transparent',
	borderLeftColor: 'transparent'
});

tailwindTest('border-x-black', {
	borderRightColor: 'rgb(0 0 0 / 1)',
	borderLeftColor: 'rgb(0 0 0 / 1)'
});

tailwindTest('border-x-white', {
	borderRightColor: 'rgb(255 255 255 / 1)',
	borderLeftColor: 'rgb(255 255 255 / 1)'
});

tailwindTest('border-x-blue-500', {
	borderRightColor: 'rgb(59 130 246 / 1)',
	borderLeftColor: 'rgb(59 130 246 / 1)'
});

tailwindTest('border-x-blue-500/50', {
	borderRightColor: 'rgb(59 130 246 / 0.5)',
	borderLeftColor: 'rgb(59 130 246 / 0.5)'
});

tailwindTest('border-x-[#50d71e]', {
	borderRightColor: 'rgb(80 215 30 / 1)',
	borderLeftColor: 'rgb(80 215 30 / 1)'
});

tailwindTest('border-y-transparent', {
	borderTopColor: 'transparent',
	borderBottomColor: 'transparent'
});

tailwindTest('border-y-black', {
	borderTopColor: 'rgb(0 0 0 / 1)',
	borderBottomColor: 'rgb(0 0 0 / 1)'
});

tailwindTest('border-y-white', {
	borderTopColor: 'rgb(255 255 255 / 1)',
	borderBottomColor: 'rgb(255 255 255 / 1)'
});

tailwindTest('border-y-blue-500', {
	borderTopColor: 'rgb(59 130 246 / 1)',
	borderBottomColor: 'rgb(59 130 246 / 1)'
});

tailwindTest('border-y-blue-500/50', {
	borderTopColor: 'rgb(59 130 246 / 0.5)',
	borderBottomColor: 'rgb(59 130 246 / 0.5)'
});

tailwindTest('border-y-[#50d71e]', {
	borderTopColor: 'rgb(80 215 30 / 1)',
	borderBottomColor: 'rgb(80 215 30 / 1)'
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
		[prop]: 'rgb(0 0 0 / 1)'
	});

	tailwindTest(`border-${side}-white`, {
		[prop]: 'rgb(255 255 255 / 1)'
	});

	tailwindTest(`border-${side}-blue-500`, {
		[prop]: 'rgb(59 130 246 / 1)'
	});

	tailwindTest(`border-${side}-blue-500/50`, {
		[prop]: 'rgb(59 130 246 / 0.5)'
	});

	tailwindTest(`border-${side}-[#50d71e]`, {
		[prop]: 'rgb(80 215 30 / 1)'
	});
}
