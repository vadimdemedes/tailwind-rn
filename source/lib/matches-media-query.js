const mediaQuery = require('css-mediaquery');

const isConditionSatisfied = (condition, value) => {
	if (condition.inverse) {
		if (value) {
			return false;
		}

		return true;
	}

	if (!value) {
		return false;
	}

	return true;
};

const matchesMediaQuery = (query, media) => {
	const conditions = mediaQuery.parse(query);

	for (const condition of conditions) {
		for (const expression of condition.expressions) {
			if (expression.feature === 'prefers-color-scheme') {
				const matches = expression.value === media.colorScheme;

				if (!isConditionSatisfied(condition, matches)) {
					return false;
				}
			}

			if (expression.feature === 'prefers-reduced-motion') {
				const enabled = expression.value === 'reduce';
				const matches = enabled === media.reduceMotion;

				if (!isConditionSatisfied(condition, matches)) {
					return false;
				}
			}

			if (expression.feature === 'orientation') {
				const matches = expression.value === media.orientation;

				if (!isConditionSatisfied(condition, matches)) {
					return false;
				}
			}

			if (expression.feature === 'width') {
				const width = Number.parseInt(expression.value, 10);

				if (expression.modifier === 'min') {
					const matches = media.width >= width;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}

				if (expression.modifier === 'max') {
					const matches = media.width <= width;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}
			}

			if (expression.feature === 'height') {
				const height = Number.parseInt(expression.value, 10);

				if (expression.modifier === 'min') {
					const matches = media.height >= height;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}

				if (expression.modifier === 'max') {
					const matches = media.height <= height;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}
			}
		}
	}

	return true;
};

module.exports = matchesMediaQuery;
