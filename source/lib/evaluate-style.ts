import {Style} from '../types';

const evaluateStyle = (object: Style) => {
	const newObject: Style = {};

	for (const [key, value] of Object.entries(object)) {
		if (!key.startsWith('--')) {
			if (typeof value === 'string') {
				newObject[key] = value.replace(/var\(([a-zA-Z-]+)\)/, (_, name) => {
					return object[name] as string;
				});
			} else {
				newObject[key] = value;
			}
		}
	}

	return newObject;
};

export default evaluateStyle;
