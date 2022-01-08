const evaluateStyle = object => {
	const newObject = {};

	for (const [key, value] of Object.entries(object)) {
		if (!key.startsWith('--')) {
			if (typeof value === 'string') {
				newObject[key] = value.replace(/var\(([a-zA-Z-]+)\)/, (_, name) => {
					return object[name];
				});
			} else {
				newObject[key] = value;
			}
		}
	}

	return newObject;
};

module.exports = evaluateStyle;
