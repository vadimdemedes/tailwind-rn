import * as mediaQuery from 'css-mediaquery';
import {Environment} from '../types';

const isConditionSatisfied = (
	condition: mediaQuery.QueryNode,
	value: boolean
) => {
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

const matchesMediaQuery = (
	query: string,
	environment: Environment
): boolean => {
	const conditions = mediaQuery.parse(query);

	for (const condition of conditions) {
		for (const expression of condition.expressions) {
			if (expression.feature === 'prefers-color-scheme') {
				const matches = expression.value === environment.colorScheme;

				if (!isConditionSatisfied(condition, matches)) {
					return false;
				}
			}

			if (expression.feature === 'prefers-reduced-motion') {
				const enabled = expression.value === 'reduce';
				const matches = enabled === environment.reduceMotion;

				if (!isConditionSatisfied(condition, matches)) {
					return false;
				}
			}

			if (expression.feature === 'orientation') {
				const matches = expression.value === environment.orientation;

				if (!isConditionSatisfied(condition, matches)) {
					return false;
				}
			}

			if (expression.feature === 'width') {
				const width = Number.parseInt(expression.value, 10);

				if (expression.modifier === 'min') {
					const matches = environment.width >= width;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}

				if (expression.modifier === 'max') {
					const matches = environment.width <= width;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}
			}

			if (expression.feature === 'height') {
				const height = Number.parseInt(expression.value, 10);

				if (expression.modifier === 'min') {
					const matches = environment.height >= height;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}

				if (expression.modifier === 'max') {
					const matches = environment.height <= height;

					if (!isConditionSatisfied(condition, matches)) {
						return false;
					}
				}
			}
		}
	}

	return true;
};

export default matchesMediaQuery;
