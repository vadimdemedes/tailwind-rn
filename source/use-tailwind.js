const {useContext} = require('react');
const TailwindContext = require('./tailwind-context');

const useTailwind = () => {
	return useContext(TailwindContext);
};

module.exports = useTailwind;
