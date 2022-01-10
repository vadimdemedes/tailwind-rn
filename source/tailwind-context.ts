import {createContext} from 'react';
import {Style} from './types';

const TailwindContext = createContext((_classNames: string): Style => ({}));

export default TailwindContext;
