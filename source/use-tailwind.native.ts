import {useContext} from 'react';
import TailwindContext from './tailwind-context';

const useTailwind = () => {
	return useContext(TailwindContext);
};

export default useTailwind;
