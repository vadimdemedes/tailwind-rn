const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
	return alias({
		'tailwind-rn': '../../index.js'
	})(config);
};
